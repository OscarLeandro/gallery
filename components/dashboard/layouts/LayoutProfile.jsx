
import { useContext, useEffect, useState } from "react";

import {
  BellIcon,
  CogIcon,
  CreditCardIcon,
  KeyIcon,
  SquaresPlusIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { classNames } from "../../../helper/classNames";
import { auth } from "../../../lib/firebase";
import Image from "next/image";
import { AuthContext } from "../../../context/authContext";
import { getUsers, updateUser } from "../../../hooks/useFetchUser";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { KEY_USER } from "../../../helper/query_keys";
import { BASE_URL } from "../../../helper/base_url";
import { onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import { uploadImage } from "../../../lib/cloudinary";
import { useUsersInfo } from "../../../context/userContext";

const userr = {
  name: "Debbie Lewis",
  handle: "deblewis",
  email: "debbielewis@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=320&h=320&q=80",
};

const subNavigation = [
  { name: "Profile", href: "#", icon: UserCircleIcon, current: true },
  { name: "Account", href: "#", icon: CogIcon, current: false },
  { name: "Password", href: "#", icon: KeyIcon, current: false },
  { name: "Notifications", href: "#", icon: BellIcon, current: false },
  { name: "Billing", href: "#", icon: CreditCardIcon, current: false },
  { name: "Integrations", href: "#", icon: SquaresPlusIcon, current: false },
];

export default function LayoutProfile() {
  const [currentId, setCurrentId] = useState("");
  const [currentDisplayName, setCurrentDisplayName] = useState("");
  const [currentEmail, setCurrentEmail] = useState("");

  const [currentName, setCurrentName] = useState("");
  const [currentPhoneNumber, setCurrentPhoneNumber] = useState("");
  const [disable, setDisable] = useState(true);
  const [uploadPhoto, setUploadPhoto] = useState('')
  const { dispatch } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const {
    currentPhotoURL,
    setCurrentPhotoURL,
    oldPhotoURL,
    setOldPhotoURL,

  } = useUsersInfo();
  const { state } = useContext(AuthContext);

  const user = auth.currentUser;

  const {propsUsersQuery} = useUsersInfo()
  const { data, isSuccess, isLoading, isError } = propsUsersQuery;
  
  const mutationUpdate = useMutation(
    (body) => updateUser(`${BASE_URL}/api/user`, body),
    {
      onSuccess: (data) => {
        const updatedUser = data;
        const oldUser = queryClient.getQueryData([KEY_USER]);

        const newUpdatedUser = oldUser.map((person) => {
          if (person._id == updatedUser._id) {
            return updatedUser;
          } else {
            return person;
          }
        });
        queryClient.setQueryData([KEY_USER], newUpdatedUser);
      },
    }
  );
  useEffect(() => {
    setCurrentPhotoURL("");
    onAuthStateChanged(auth, (user)=> {

      if (user) {
        const displayName = user.displayName;
        const email = user.email;
        const photoURL = user.photoURL;
        setCurrentDisplayName(displayName);
        setCurrentEmail(email);
        setOldPhotoURL(photoURL);
        if (data) {
          //const finded = data.find(person => console.log(person.displayName,user.displayName ))
          if (isLoading) {
            return;
          }
          const finded = data.find(
            (person) => person.displayName == user.displayName
          );
          
          if (finded) {
            setCurrentName(finded.fullName);
            setCurrentId(finded._id);
          }
        }
      }else{
        signOut(auth)
      }
    })
    
  }, [data, user, isLoading]);

  async function onImageChange({ target }) {
    setUploadPhoto(target.files[0])
    const updateProfileImage = await uploadImage(
      target.files[0],
      target.files[0].name,
      "profile"
    );
    setCurrentPhotoURL(updateProfileImage);
    setUploadPhoto('')
    setDisable(false);
  }

  async function onSubmit(e) {
    e.preventDefault();
    
    //console.log(e.target)
    if(e.target.name == 'Edit'){
      setDisable(false)
      return
    }
    try {
      if (currentName !== "" || currentDisplayName !== "") {
        setOldPhotoURL(currentPhotoURL ? currentPhotoURL : oldPhotoURL);

        await updateProfile(auth.currentUser, {
          displayName: currentDisplayName,
          photoURL: currentPhotoURL ? currentPhotoURL : oldPhotoURL,
          email: currentEmail,
          phoneNumber: currentPhoneNumber,
        });
        mutationUpdate.mutate({
          id: currentId,
          fullName: currentName,
          displayName: currentDisplayName,
          email: currentEmail,
          photoURL: currentPhotoURL ? currentPhotoURL : oldPhotoURL,
        });

         
      }
      setOldPhotoURL(currentPhotoURL ? currentPhotoURL : oldPhotoURL);
      setDisable(true);
    } catch (error) {
      console.log(error);
    }
  }


  function onDisable(e){
    setCurrentDisplayName(user.displayName)
    setCurrentEmail(user.email)
    setCurrentPhoneNumber(user.phoneNumber ? user.phoneNumber : '')
    const finded = data.find(
      (person) => person.displayName == user.displayName
    );
    setCurrentName(finded.fullName)
    setCurrentPhotoURL('')
    setDisable(true)

  }



  return (
    <div className="">
      {isLoading && <p>Loading</p>}
      {isError && <p>Error</p>}
      {isSuccess && (
        <main className="h-screen ">
          <div className="">
            <div className="overflow-hidden rounded-lg bg-white shadow">
              <div className="divide-y  divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x">
                <aside className="py-6  lg:col-span-3">
                  <nav className="space-y-1">
                    {subNavigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-teal-50 border-teal-500 text-teal-700 hover:bg-teal-50 hover:text-teal-700"
                            : "border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900",
                          "group border-l-4 px-3 py-2 flex items-center text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        <item.icon
                          className={classNames(
                            item.current
                              ? "text-teal-500 group-hover:text-teal-500"
                              : "text-gray-400 group-hover:text-gray-500",
                            "flex-shrink-0 -ml-1 mr-3 h-6 w-6"
                          )}
                          aria-hidden="true"
                        />
                        <span className="truncate">{item.name}</span>
                      </a>
                    ))}
                  </nav>
                </aside>

                <form
                  className="divide-y divide-gray-200 lg:col-span-9"
                  action="#"
                  method="POST"
                >
                  {/* Profile section */}
                  <div className="py-6 hs-screen px-4 sm:p-6 lg:pb-10">
                    <div>
                      <h2 className="text-lg font-medium leading-6 text-gray-900">
                        Profile
                      </h2>
                    </div>

                    <div className="mt-6 flex flex-col lg:flex-row">
                      <div className="flex-grow-0 space-y-6 ">
                        <div className="">
                          <label
                            htmlFor="username"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Username
                          </label>
                          <div className="mt-1 flex rounded-md shadow-sm">
                            <input
                              type="text"
                              name="username"
                              disabled={disable}
                              id="username"
                              onChange={(e) =>
                                setCurrentDisplayName(e.target.value)
                              }
                              value={currentDisplayName}
                              className={classNames(
                                disable  ? 'block w-full min-w-0 flex-grow rounded-none rounded-r-md border-gray-300 bg-gray-300 sm:text-sm'
                                : "block w-full min-w-0 flex-grow rounded-none rounded-r-md border-gray-300 focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                              )}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 flex-grow lg:mt-0 lg:ml-48 lg:flex-shrink-0 lg:flex-grow-0 ">
                        <p
                          className="text-sm font-medium text-gray-700"
                          aria-hidden="true"
                        >
                          Photo
                        </p>
                        <div className="mt-1 lg:hidden">
                          {/* lg:hidden */}
                          <div className="flex items-center">
                            <div
                              className="inline-block h-12 w-12 flex-shrink-0 overflow-hidden rounded-full"
                              aria-hidden="true"
                            >
                              <img
                                className="h-full w-full rounded-full"
                                src={
                                  currentPhotoURL
                                    ? currentPhotoURL
                                    : oldPhotoURL || "/images/custom-user.png"
                                }
                                alt="a"
                              />
                            </div>
                            <div className="ml-5 rounded-md shadow-sm">
                              <div className="group relative flex items-center justify-center rounded-md border border-gray-300 py-2 px-3 focus-within:ring-2 focus-within:ring-sky-500 focus-within:ring-offset-2 hover:bg-gray-50">
                                <label
                                  htmlFor="mobile-user-photo"
                                  className="pointer-events-none relative text-sm font-medium leading-4 text-gray-700"
                                >
                                  <span>Change</span>
                                  <span className="sr-only"> user photo</span>
                                </label>
                                <input
                                  onChange={onImageChange}
                                  id="mobile-user-photo"
                                  name="user-photo"
                                  type="file"
                                  disabled={disable}
                                  className="absolute h-full w-full cursor-pointer rounded-md border-gray-300 opacity-0"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="relative hidden overflow-hidden rounded-full lg:block">
                          <img
                            className="relative h-40 w-40 rounded-full"
                            src={
                              currentPhotoURL
                                ? currentPhotoURL
                                : oldPhotoURL || "/images/custom-user.png"
                            }
                            alt=""
                          />
                          <label
                            htmlFor="desktop-user-photo"
                            className="absolute inset-0 flex h-full w-full items-center justify-center bg-black bg-opacity-75 text-sm font-medium text-white opacity-0 focus-within:opacity-100 hover:opacity-100"
                          >
                            <span>Change</span>
                            <span className="sr-only"> user photo</span>
                            <input
                              onChange={onImageChange}
                              type="file"
                              id="desktop-user-photo"
                              disabled={disable}
                              name="user-photo"
                              className="absolute inset-0 h-full w-full cursor-pointer rounded-md border-gray-300 opacity-0"
                            />
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-12 gap-6">
                      <div className="col-span-12 sm:col-span-6">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          disabled={disable}
                          value={currentName}
                          onChange={(e) => setCurrentName(e.target.value)}
                          autoComplete="given-name"
                          className={classNames(
                            disable  ? ' mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm bg-gray-300 sm:text-sm':
                            "mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                          )}
                        />
                      </div>

                      {/* <div className="col-span-12 sm:col-span-6">
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Phone Number
                        </label>
                        <input
                          value={currentPhoneNumber}
                          onChange={(e) =>
                            setCurrentPhoneNumber(e.target.value)
                          }
                          type="text"
                          name="phone"
                          disabled={disable}
                          id="phone"
                          placeholder="example: 912345678"
                          autoComplete="phone"
                          className={classNames(
                            disable ? ' mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm bg-gray-300':
                            "mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                            )}
                        />
                      </div> */}

                      {/* <div className="col-span-12">
                        <label
                          htmlFor="url"
                          className="block text-sm font-medium text-gray-700"
                        >
                          URL
                        </label>
                        <input
                          type="text"
                          name="url"
                          id="url"
                          className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                        />
                      </div> */}

                      <div className="col-span-12 sm:col-span-6">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email
                        </label>
                        <input
                          type="text"
                          name="email"
                          id="email"
                          disabled={disable}
                          onChange={(e) => setCurrentEmail(e.target.value)}
                          value={currentEmail}
                          autoComplete="email"
                          className={classNames(
                            disable ? 'mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm bg-gray-300':
                            "mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"

                          )}
                          
                        />
                      </div>
                    </div>
                  </div>

                  {/* Privacy section */}
                  <div className="divide-y divide-gray-200  pt-96">
                    <div className="mt-4 flex justify-end py-5 px-4 sm:px-6">
                      {
                        disable == false &&
                      (<button
                        type="button"
                        name='cancel'
                        onClick={onDisable}
                        className="inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                      >
                        Cancel
                      </button>)
                      }
                        <button
                        name={disable == false ? 'Save' : 'Edit'}
                          onClick={onSubmit }
                          type="submit"
                          className="ml-5 inline-flex justify-center rounded-md border border-transparent bg-sky-700 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                        >
                          {disable == true ? 'Edit' : 'Save'}
                        </button>
                      
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}
