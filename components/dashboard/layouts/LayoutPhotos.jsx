import {
  HeartIcon,
  PlusIcon as PlusIconOutline,
  Squares2X2Icon as Squares2X2IconOutline,
} from "@heroicons/react/24/outline";
import {
  Bars4Icon,
  PencilIcon,
  PlusIcon as PlusIconMini,
  Squares2X2Icon as Squares2X2IconMini,
} from "@heroicons/react/20/solid";
import { useQuery } from "react-query";
import { KEY_PHOTO } from "../../../helper/query_keys";
import { getPhoto } from "../../../hooks/useFetchPhoto";
import { BASE_URL } from "../../../helper/base_url";
import { Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { usePhotosInfo } from "../../../context/photoContext";
import { useUsersInfo } from "../../../context/userContext";

const tabs = [
  { name: "Recently Viewed", href: "#", current: true },
  { name: "Recently Added", href: "#", current: false },
  { name: "Favorited", href: "#", current: false },
];
const files = [
  {
    name: "IMG_4985.HEIC",
    size: "3.9 MB",
    source:
      "https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80",
    current: true,
  },
  // More files...
];
const currentFile = {
  name: "IMG_4985.HEIC",
  size: "3.9 MB",
  source:
    "https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80",
  information: {
    "Uploaded by": "Marie Culver",
    Created: "June 8, 2020",
    "Last modified": "June 8, 2020",
    Dimensions: "4032 x 3024",
    Resolution: "72 x 72",
  },
  sharedWith: [
    {
      id: 1,
      name: "Aimee Douglas",
      imageUrl:
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=1024&h=1024&q=80",
    },
    {
      id: 2,
      name: "Andrea McMillan",
      imageUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=oilqXxSqey&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  ],
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function LayoutPhotos() {
  const [currentImage, setCurrentImage] = useState(null);
  const [detailsUser, setDetailsUser] = useState(null);
  const { propsPhotosQuery } = usePhotosInfo();
  const { data, isSuccess, isLoading, isError, refetch } = propsPhotosQuery;

  const { newPhoto, setNewPhoto, propsUsersQuery } = useUsersInfo();
  const { data: usersData } = propsUsersQuery;

  useEffect(() => {
    if (currentImage) {
      const userDataFinded = usersData.find((person) =>
        person.photos.some((photo) => photo._id === currentImage._id)
      );
      setDetailsUser(userDataFinded);
    }
  }, [usersData, currentImage]);

  useEffect(() => {
    if (newPhoto) {
      refetch();
      setNewPhoto(false);
    }
  }, [data, setNewPhoto, newPhoto]);

  function onCurrentImage(file) {
    setCurrentImage(file);
  }

  return (
    <div className="flex flex-1 items-stretch overflow-hidden">
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
          <div className="flex">
            <h1 className="flex-1 text-2xl font-bold text-gray-900">Photos</h1>
            <div className="ml-6 flex items-center rounded-lg bg-gray-100 p-0.5 sm:hidden">
              <button
                type="button"
                className="rounded-md p-1.5 text-gray-400 hover:bg-white hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                <Bars4Icon className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">Use list view</span>
              </button>
              <button
                type="button"
                className="ml-0.5 rounded-md bg-white p-1.5 text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                <Squares2X2IconMini className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">Use grid view</span>
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-3 sm:mt-2">
            <div className="sm:hidden">
              <label htmlFor="tabs" className="sr-only">
                Select a tab
              </label>
              {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
              <select
                id="tabs"
                name="tabs"
                className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                defaultValue="Recently Viewed"
              >
                <option>Recently Viewed</option>
                <option>Recently Added</option>
                <option>Favorited</option>
              </select>
            </div>
            <div className="hidden sm:block">
              <div className="flex items-center border-b border-gray-200">
                <nav
                  className="-mb-px flex flex-1 space-x-6 xl:space-x-8"
                  aria-label="Tabs"
                >
                  {tabs.map((tab) => (
                    <a
                      key={tab.name}
                      href={tab.href}
                      aria-current={tab.current ? "page" : undefined}
                      className={classNames(
                        tab.current
                          ? "border-indigo-500 text-indigo-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                        "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                      )}
                    >
                      {tab.name}
                    </a>
                  ))}
                </nav>
                <div className="ml-6 hidden items-center rounded-lg bg-gray-100 p-0.5 sm:flex">
                  <button
                    type="button"
                    className="rounded-md p-1.5 text-gray-400 hover:bg-white hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                  >
                    <Bars4Icon className="h-5 w-5" aria-hidden="true" />
                    <span className="sr-only">Use list view</span>
                  </button>
                  <button
                    type="button"
                    className="ml-0.5 rounded-md bg-white p-1.5 text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                  >
                    <Squares2X2IconMini
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                    <span className="sr-only">Use grid view</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Gallery */}
          <section className="mt-8 pb-16" aria-labelledby="gallery-heading">
            <h2 id="gallery-heading" className="sr-only">
              Recently viewed
            </h2>
            <ul
              role="list"
              className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
            >
              {isLoading && <p>Loading</p>}
              {isSuccess &&
                data
                  .map((file) => (
                    <li key={file._id} className="relative">
                      <div
                        className={classNames(
                          file.current
                            ? "ring-2 ring-offset-2 ring-indigo-500"
                            : "focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500",
                          "group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 overflow-hidden"
                        )}
                      >
                        <img
                          src={file.photoURL}
                          alt=""
                          className={classNames(
                            file.current ? "" : "group-hover:opacity-75",
                            "object-cover pointer-events-none"
                          )}
                        />
                        <button
                          onClick={() => onCurrentImage(file)}
                          type="button"
                          className="absolute inset-0 focus:outline-none"
                        >
                          <span className="sr-only">
                            View details for {file.photoName}
                          </span>
                        </button>
                      </div>
                      <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">
                        {file.photoName}
                      </p>
                      <p className="pointer-events-none block text-sm font-medium text-gray-500">
                        {file.size}
                      </p>
                    </li>
                  ))
                  .reverse()}
            </ul>
          </section>
        </div>
      </main>

      {/* Details sidebar */}

      {currentImage ? (
        <aside className="hidden w-96 overflow-y-auto border-l border-gray-200 bg-white p-8 lg:block">
          <div className="space-y-6 pb-16">
            <div>
              <div className="aspect-w-10 aspect-h-7 block w-full overflow-hidden rounded-lg">
                <img
                  src={currentImage.photoURL}
                  alt=""
                  className="object-cover"
                />
              </div>
              <div className="mt-4 flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-medium text-gray-900">
                    <span className="sr-only">Details for </span>
                    {currentImage.photoName}
                  </h2>
                  <p className="text-sm font-medium text-gray-500">
                    {currentImage.size}
                  </p>
                </div>
                <button
                  type="button"
                  className="ml-4 flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <HeartIcon className="h-6 w-6" aria-hidden="true" />
                  <span className="sr-only">Favorite</span>
                </button>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Information</h3>
              <dl className="mt-2 divide-y divide-gray-200 border-t border-b border-gray-200">
                <div className="flex justify-between py-3 text-sm font-medium">
                  <dt className="text-gray-500">Uploaded by </dt>
                  <dd className="whitespace-nowrap text-gray-900">
                    {detailsUser && detailsUser.fullName}
                  </dd>
                </div>
              </dl>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Description</h3>
              <div className="mt-2 flex items-center justify-between">
                <p className="text-sm italic text-gray-500">
                  Add a description to this image.
                </p>
                <button
                  type="button"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <PencilIcon className="h-5 w-5" aria-hidden="true" />
                  <span className="sr-only">Add description</span>
                </button>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Shared with</h3>
              <ul
                role="list"
                className="mt-2 divide-y divide-gray-200 border-t border-b border-gray-200"
              >
                {currentFile.sharedWith.map((person) => (
                  <li
                    key={person.id}
                    className="flex items-center justify-between py-3"
                  >
                    <div className="flex items-center">
                      <img
                        src={person.imageUrl}
                        alt=""
                        className="h-8 w-8 rounded-full"
                      />
                      <p className="ml-4 text-sm font-medium text-gray-900">
                        {person.name}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="ml-6 rounded-md bg-white text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Remove<span className="sr-only"> {person.name}</span>
                    </button>
                  </li>
                ))}
                <li className="flex items-center justify-between py-2">
                  <button
                    type="button"
                    className="group -ml-1 flex items-center rounded-md bg-white p-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-dashed border-gray-300 text-gray-400">
                      <PlusIconMini className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="ml-4 text-sm font-medium text-indigo-600 group-hover:text-indigo-500">
                      Share
                    </span>
                  </button>
                </li>
              </ul>
            </div>
            <div className="flex">
              <button
                type="button"
                className="flex-1 rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Download
              </button>
              <button
                type="button"
                className="ml-3 flex-1 rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Delete
              </button>
            </div>
          </div>
        </aside>
      ) : (
        <aside className="hidden w-96 overflow-y-auto border-l border-gray-200 bg-white p-8 lg:block">
          <div className="space-y-6 pb-16">
            <div>
              <div className="aspect-w-10 aspect-h-7 block w-full overflow-hidden rounded-lg"></div>
              <div className="mt-4 flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500"></p>
                </div>
              </div>
            </div>
            <div></div>
            <div className="  mt-4">
              <h3 className=" text-center mt-28 font-medium text-gray-900">
                Select an image to View
              </h3>
              <div className="mt-2 flex items-center justify-between">
                <button
                  type="button"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <span className="sr-only">Select an image to View</span>
                </button>
              </div>
            </div>
          </div>
        </aside>
      )}
    </div>
  );
}
