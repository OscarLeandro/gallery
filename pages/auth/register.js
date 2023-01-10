import axios from "axios";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import InputError from "../../components/inputs/inputError";
import { uploadImage } from "../../lib/cloudinary";
import { auth } from "../../lib/firebase";

export default function Register() {
  const [name, setName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [profileImage, setProfileImage] = useState("");

  const [errorName, setErrorName] = useState("");
  const [errorDisplayName, setErrorDisplayName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorRepeatPassword, setErrorRepeatPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorName("");
    setErrorDisplayName("");
    setErrorEmail("");
    setErrorPassword("");
    setErrorRepeatPassword("");

    if (name == "") {
      setErrorName("Please enter an Name");
      return;
    }

    if (displayName == "") {
      setErrorDisplayName("Please enter an displayname");
      return;
    }
    const resp = await axios.get(
      "http://localhost:8000/api/user/" + displayName
    );
    if (resp.data == true) {
      setErrorDisplayName("Username already exist. Please choose another one.");
      return;
    }
    if (email == "") {
      setErrorEmail("Please enter an email");
      return;
    }
    if (password == "") {
      setErrorPassword("Please put a Password");
      return;
    }
    if (password !== repeatPassword) {
      setErrorRepeatPassword("Password must be equal");
      return;
    }

    if (displayName !== "" && email !== "" && password == repeatPassword) {
      console.log("TODOS LOS DATOS SON CORRECTOS");
      try {
        const {user} = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await updateProfile(auth.currentUser, {
          displayName: displayName,
          photoURL: profileImage,
        });

        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            email: user.email,
            photoURL: user.photoURL,
            displayName: user.displayName,
          },
        });

        console.log(user);
      } catch (error) {
        console.log(error.code);
        if (error.code == "auth/email-already-in-use") {
          setErrorEmail("Email already in use. Please choose another one");
          return;
        }
        if (error.code == "auth/invalid-email") {
          setErrorEmail("Invalid Email. Please choose another one");
          return;
        }
        
      }
    }
  }
  async function onImageChange({ target }) {
    const uploadProfileImage = await uploadImage(
      target.files[0],
      target.files[0].name,
      "profile"
    );

    setProfileImage(uploadProfileImage);
  }

  const imageRef = useRef();

  return (
    <>
      <div className="flex h-screen flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Don you already have an account?{" "}
            <Link
              href="/auth/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Login here
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6">
              {errorName ? (
                <InputError
                  id={"name"}
                  name={"name"}
                  changeFunction={setName}
                  value={name}
                  title={"Name"}
                  type={"text"}
                  errorMessage={errorName}
                />
              ) : (
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <div className="mt-1">
                    <input
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              )}
              {errorDisplayName ? (
                <InputError
                  id={"displayname"}
                  changeFunction={setDisplayName}
                  value={displayName}
                  name={"displayname"}
                  title={"DisplayName"}
                  type={"text"}
                  errorMessage={errorDisplayName}
                />
              ) : (
                <div>
                  <label
                    htmlFor="displayname"
                    className="block text-sm font-medium text-gray-700"
                  >
                    DisplayName
                  </label>
                  <div className="mt-1">
                    <input
                      onChange={(e) => setDisplayName(e.target.value)}
                      value={displayName}
                      id="displayname"
                      name="displayname"
                      type="displayname"
                      required
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              )}
              {errorEmail ? (
                <InputError
                  id={"email"}
                  changeFunction={setEmail}
                  value={email}
                  name={"email"}
                  title={"Email address"}
                  type={"text"}
                  errorMessage={errorEmail}
                />
              ) : (
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              )}
              {errorPassword ? (
                <InputError
                  id={"password"}
                  changeFunction={setPassword}
                  value={password}
                  name={"password"}
                  title={"Password"}
                  type={"password"}
                  errorMessage={errorPassword}
                />
              ) : (
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      id="password"
                      name="password"
                      type="password"
                      required
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              )}
              {errorRepeatPassword ? (
                <InputError
                  id={"repeatPassword"}
                  changeFunction={setRepeatPassword}
                  value={repeatPassword}
                  name={"repeatPassword"}
                  title={"Repeat Password"}
                  type={"password"}
                  errorMessage={errorRepeatPassword}
                />
              ) : (
                <div>
                  <label
                    htmlFor="repeatPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Repeat Password
                  </label>
                  <div className="mt-1">
                    <input
                      onChange={(e) => setRepeatPassword(e.target.value)}
                      value={repeatPassword}
                      id="repeatPassword"
                      name="repeatPassword"
                      type="password"
                      required
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              )}
              <div className="sm:grid sm:grid-cols-3 sm:items-center sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="photo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Photo
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <div className="flex items-center">
                    <span className="h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                      {profileImage ? (
                        <Image
                          src={profileImage}
                          alt="profile-image"
                          width={500}
                          height={500}
                        />
                      ) : (
                        <svg
                          className="h-full w-full text-gray-300"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      )}
                    </span>
                    <input
                      type="file"
                      onChange={onImageChange}
                      ref={imageRef}
                      style={{ display: "none" }}
                    />
                    <button
                      onClick={() => imageRef.current.click()}
                      type="button"
                      className="ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Upload
                    </button>
                  </div>
                </div>
              </div>

              

              <div>
                <button
                  onClick={handleSubmit}
                  type="submit"
                  className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Sign in
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
              
                <div>
                  <a
                    href="#"
                    className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
                  >
                    <span className="sr-only">Sign in with Google</span>
                    <svg
                      className="h-5 w-5"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
