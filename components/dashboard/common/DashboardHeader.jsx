import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  Bars3BottomLeftIcon,
  PlusIcon as PlusIconOutline,
  Squares2X2Icon as Squares2X2IconOutline,
} from "@heroicons/react/24/outline";
import {
  MagnifyingGlassIcon,
  PlusIcon as PlusIconMini,
  Squares2X2Icon as Squares2X2IconMini,
} from "@heroicons/react/20/solid";
import Link from "next/link";
import { signOut } from "firebase/auth";
import { auth } from "../../../lib/firebase";
import Image from "next/image";
import { AuthContext } from "../../../context/authContext";
import { classNames } from "../../../helper/classNames";
import { useUsersInfo } from "../../../context/userContext";
import { getPhoto, postPhoto } from "../../../hooks/useFetchPhoto";
import { BASE_URL } from "../../../helper/base_url";
import { QueryClient, useMutation, useQuery, useQueryClient } from "react-query";
import { KEY_PHOTO, KEY_USER } from "../../../helper/query_keys";
import { uploadImage } from "../../../lib/cloudinary";
import { addPhotoToUser, patchUser } from "../../../hooks/useFetchUser";

const userNavigation = [
  { name: "Your profile", href: "/dashboard/profile" },
  { name: "Sign out", href: "/auth/login" },
];

export default function DashboardHeader({ mobileMenuOpen, setMobileMenuOpen }) {
  
  function headerOptions(href) {
    if (href == "/auth/login") {
      signOut(auth);
      return;
    }
  }

  const { state } = useContext(AuthContext);
  const queryClient = useQueryClient()
  const { propsUsersQuery, currentPhotoURL, setCurrentPhotoURL, oldPhotoURL, setOldPhotoURL,newPhoto, setNewPhoto } = useUsersInfo();
  const user = auth.currentUser;

  const {data} = propsUsersQuery;
  console.log(data);

  useEffect(() => {
    if (user) {
      const photoURL = user.photoURL;
      setOldPhotoURL(photoURL);
    }
  }, [setOldPhotoURL, user]);

  const inputRef = useRef();

  const patchUserMutate = useMutation(body => patchUser(`${BASE_URL}/api/user/`,body),{
    onSuccess: data => {
      
      const oldUsers = queryClient.getQueryData([KEY_USER]);
      queryClient.setQueryData([KEY_USER],[...oldUsers, data])
      setNewPhoto(true)
      
    }

  })

  
  
  async function onUploadPhoto(e){
    const file = e.target.files[0]
    const fileSize = (file.size / 1048576).toFixed(2);
    const uploadPhoto = await uploadImage(file, file.name, 'Images')
    
    const userFinded =  await data.find( person => person.displayName == user.displayName)

    patchUserMutate.mutate({
      userId:userFinded._id,
      photoName:file.name,
      description:'',
      photoURL: uploadPhoto,
      imageType:file.type,
      size:`${fileSize} MB`
    })

  }



  return (
    <header className="w-full">
      <div className="relative z-10 flex h-16 flex-shrink-0 border-b border-gray-200 bg-white shadow-sm">
        <button
          type="button"
          className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
          onClick={() => setMobileMenuOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <Bars3BottomLeftIcon className="h-6 w-6" aria-hidden="true" />
        </button>
        <div className="flex flex-1 justify-between px-4 sm:px-6">
          <div className="flex flex-1">
            <form className="flex w-full md:ml-0" action="#" method="GET">
              <label htmlFor="desktop-search-field" className="sr-only">
                Search all files
              </label>
              <label htmlFor="mobile-search-field" className="sr-only">
                Search all files
              </label>
              <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                  <MagnifyingGlassIcon
                    className="h-5 w-5 flex-shrink-0"
                    aria-hidden="true"
                  />
                </div>
                <input
                  name="mobile-search-field"
                  id="mobile-search-field"
                  className="h-full w-full border-transparent py-2 pl-8 pr-3 text-base text-gray-900 placeholder-gray-500 focus:border-transparent focus:placeholder-gray-400 focus:outline-none focus:ring-0 sm:hidden"
                  placeholder="Search"
                  type="search"
                />
                <input
                  name="desktop-search-field"
                  id="desktop-search-field"
                  className="hidden h-full w-full border-transparent py-2 pl-8 pr-3 text-base text-gray-900 placeholder-gray-500 focus:border-transparent focus:placeholder-gray-400 focus:outline-none focus:ring-0 sm:block"
                  placeholder="Search all files"
                  type="search"
                />
              </div>
            </form>
          </div>
          <div className="ml-2 flex items-center space-x-4 sm:ml-6 sm:space-x-6">
            {/* Profile dropdown */}
            <Menu as="div" className="relative flex-shrink-0">
              <div>
                <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  <span className="sr-only">Open user menu</span>
                  <Image
                    className="h-8 w-8 rounded-full"
                    src={
                      currentPhotoURL
                        ? currentPhotoURL
                        : oldPhotoURL || "/images/custom-user.png"
                    }
                    alt={"user"}
                    width={50}
                    height={50}
                  />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {userNavigation.map((item) => (
                    <Menu.Item key={item.name}>
                      {({ active }) => (
                        <Link
                          onClick={() => headerOptions(item.href)}
                          href={item.href}
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          {item.name}
                        </Link>
                      )}
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </Transition>
            </Menu>
            <input ref={inputRef} onChange={onUploadPhoto} type="file" style={{ display: "none" }} />
            <button
              onClick={() => inputRef.current.click()}
              type="button"
              className="flex items-center justify-center rounded-full bg-indigo-600 p-1 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <PlusIconOutline className="h-6 w-6" aria-hidden="true" />
              <span className="sr-only">Add file</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
