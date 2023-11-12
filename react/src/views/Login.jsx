import { Link } from "react-router-dom";
import axiosClient from "../axios-client.js";
import { createRef } from "react";
import { useStateContext } from "../context/ContextProvider.jsx";
import { useState } from "react";

export default function Login() {
  const emailRef = createRef();
  const passwordRef = createRef();
  const { setUser, setToken } = useStateContext();
  const [message, setMessage] = useState(null);

  const onSubmit = (ev) => {
    ev.preventDefault();

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    axiosClient
      .post("/login", payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setMessage(response.data.message);
        }
      });
  };

  return (
    <div
      className="bg-no-repeat bg-cover bg-center relative"
      style={{
        backgroundImage: `url(https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1951&amp;q=80)`,
      }}
    >
      <div className="absolute bg-gradient-to-b from-green-500 to-green-400 opacity-75 inset-0 z-0"></div>
      <div className="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
        <div className="flex-col flex  self-center p-10 sm:max-w-5xl xl:max-w-2xl  z-10">
          <div className="self-start hidden lg:flex flex-col  text-white">
            <img src="" className="mb-3" />
            <h1 className="mb-3 font-bold text-5xl">Hi ? Welcome Back Aji </h1>
            <p className="pr-3">
              Lorem ipsum is placeholder text commonly used in the graphic,
              print, and publishing industries for previewing layouts and visual
              mockups
            </p>
          </div>
        </div>
        <div className="flex justify-center self-center  z-10">
          <div className="p-12 bg-white mx-auto rounded-2xl w-100 ">
            <div className="mb-4">
              <h3 className="font-semibold text-2xl text-gray-800">Sign In </h3>
              <p className="text-gray-500">Please sign in to your account.</p>
              {message && (
                <div className="alert">
                  <p>{message}</p>
                </div>
              )}
            </div>

            <form onSubmit={onSubmit}>
              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 tracking-wide">
                    Email
                  </label>
                  <input
                    className=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                    type="email"
                    ref={emailRef}
                    placeholder="mail@gmail.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
                    Password
                  </label>
                  <input
                    className="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                    type="password"
                    ref={passwordRef}
                    placeholder="Enter your password"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember_me"
                      name="remember_me"
                      type="checkbox"
                      className="h-4 w-4 bg-blue-500 focus:ring-blue-400 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember_me"
                      className="ml-2 block text-sm text-gray-800"
                    >
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <a href="#" className="text-green-400 hover:text-green-500">
                      Forgot your password?
                    </a>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center bg-green-400  hover:bg-green-500 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
                  >
                    Sign in
                  </button>
                </div>
              </div>
            </form>
            <div className="pt-5 text-center text-gray-400 text-xs">
              <span>
                Copyright © 2021-2022
                <a
                  href="https://codepen.io/uidesignhub"
                  rel=""
                  target="_blank"
                  title="Ajimon"
                  className="text-green hover:text-green-500 "
                >
                  AJI
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div className="login-signup-form animated fadeInDown">
    //   <div className="form">
    //     <form onSubmit={onSubmit}>
    //       <h1 className="title">Login into your account</h1>

    //       {message &&
    //         <div className="alert">
    //           <p>{message}</p>
    //         </div>
    //       }

    //       <input ref={emailRef} type="email" placeholder="Email"//>
    //       <input ref={passwordRef} type="password" placeholder="Password"//>
    //       <button className="btn btn-block">Login</button>
    //       <p className="message">Not registered? <Link to="/signup">Create an account</Link></p>
    //     </form>
    //   </div>
    // </div>
  );
}
