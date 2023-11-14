import { Link } from "react-router-dom";
import { createRef, useState } from "react";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../context/ContextProvider.jsx";

export default function Signup() {
  const nameRef = createRef();
  const emailRef = createRef();
  const passwordRef = createRef();
  const passwordConfirmationRef = createRef();
  const { setUser, setToken } = useStateContext();
  const [errors, setErrors] = useState(null);

  const onSubmit = (ev) => {
    ev.preventDefault();

    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    };
    axiosClient
      .post("/signup", payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      });
  };

  return (
    <>
      <div className="login-signup-form animated fadeInDown">
        <div className="form">
          <form onSubmit={onSubmit}>
            {errors && (
              <div className="alert">
                {Object.keys(errors).map((key) => (
                  <p key={key}>{errors[key][0]}</p>
                ))}
              </div>
            )}
            <div className="card w-2/5 shadow-xl image-full">
              <figure>
                <img
                  className="object-contain  w-2/5"
                  src="../src/assets/registerBackground.png"
                />
              </figure>

              <div className="card-body">
                <figure>
                  <img
                    className="object-contain h-20 w-13"
                    src="/nt-logo.png"
                  />
                </figure>
                <h2
                  style={{
                    alignSelf: "center",
                    marginTop: "5%",
                    marginBottom: "5%",
                  }}
                  className="card-title"
                >
                  Welcome to Nove Techset Ltd. Registration!
                </h2>

                <div className="flex w-full component-preview p-4 items-center justify-center gap-2 font-sans">
                  <div className="form-control w-full max-w-xs">
                    <label htmlFor="name" className="label">
                      Full Name
                    </label>
                    <input
                      ref={nameRef}
                      type="text"
                      placeholder="Name"
                      className="input w-80 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />

                    <label htmlFor="email" className="label">
                      Email
                    </label>
                    <input
                      ref={nameRef}
                      type="email"
                      placeholder="john@novatechset.com"
                      className="input w-80 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />

                    <label htmlFor="password" className="label">
                      Password
                    </label>
                    <input
                      ref={nameRef}
                      type="password"
                      placeholder="Password"
                      className="input w-80 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />

                    <label htmlFor="checkPassword" className="label">
                      Confirm Password
                    </label>
                    <input
                      ref={nameRef}
                      type="password"
                      placeholder="Confirm Password"
                      className="input w-80 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="card-actions justify-center">
                  <button className="btn btn-primary">Register</button>
                </div>
                <p className="message">
                  Already registered? <Link to="/login">Sign In</Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
