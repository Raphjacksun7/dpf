import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import Form from "react-validation/build/form";
import { Input } from "antd";
import CheckButton from "react-validation/build/button";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import authImg from "../../assets/images/auth-image.jpg";

import { login } from "../../actions/auth";
import "./style.scss";

const required = (value) => {
  if (!value) {
    return (
      <span className="text-xs text-red-500 font-medium">
        Ce champ est obligation !
      </span>
    );
  }
};

const Login = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(login(email, password))
        .then((data) => {
          props.history.push("/dashboard");
          window.location.reload();
          console.log(data);
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  if (isLoggedIn) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div class="bg-white flex flex-wrap w-full">
      <div class="flex flex-col w-full md:w-1/2">
        <div class="flex justify-center pt-12 md:justify-start md:pl-12 md:-mb-24">
          <span class="p-4 text-xl font-bold text-white bg-blue-700">
            DigitAct.
          </span>
        </div>
        <div class="flex flex-col justify-center px-8 pt-8 my-auto md:justify-start md:pt-0 md:px-24 lg:px-32">
          <p class="text-3xl text-center text-black font-bold">Bienvenu ! ✨</p>
          <Form
            onSubmit={handleLogin}
            ref={form}
            className="container mx-auto px-5 mt-8 space-y-6"
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px">
              <div className="mb-3">
                <label
                  htmlFor="email-address"
                  className="block text-sm text-gray-600 font-medium"
                >
                  Addresse email
                </label>
                <Input
                  id="email-address"
                  name="email"
                  type="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required]}
                  className="rounded shadow-sm relative block w-full px-3 py-2 
                  border border-gray-100 placeholder-gray-500 text-gray-900 
                  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 
                  focus:z-10 sm:text-sm"
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="password"
                  className="block text-sm text-gray-600 font-medium"
                >
                  Mot de passe
                </label>
                <Input.Password
                  id="password"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required]}
                  className="rounded shadow-sm relative w-full px-3 py-2 
                  border border-gray-100 placeholder-gray-500 text-gray-900 
                  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 
                  focus:z-10 sm:text-sm"
                  placeholder="Entrez votre mot de passe"
                  iconRender={(visible) =>
                    visible ? <HiOutlineEye /> : <HiOutlineEyeOff />
                  }
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              {/* <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Se souvenir de moi
                </label>
              </div> */}

              <div className="text-sm">
                <a
                  href="/"
                  className="font-medium text-indigo-600 hover:text-blue-500"
                >
                  Mot de passe oublié ?
                </a>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full flex justify-center py-2 px-4 border 
                border-transparent text-sm font-medium rounded-md text-white bg-blue-600 
                hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 
                focus:ring-blue-500 btn-login"
                >
                  {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  Se connecter
                </button>
              </div>
            </div>

            {message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              </div>
            )}
            <CheckButton style={{ display: "none" }} ref={checkBtn} />
          </Form>
        </div>
      </div>
      <div class="w-1/2 shadow-2xl">
        <img
          class="hidden object-cover w-full h-screen md:block"
          src={authImg}
          alt=""
        />
      </div>
    </div>
  );
};

export default Login;
