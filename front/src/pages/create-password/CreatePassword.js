import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useParams } from "react-router";
import { Input } from "antd";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCheck } from "@fortawesome/free-solid-svg-icons";

import authImg from "../../assets/images/auth-image.jpg";
import { createPassword } from "../../actions/user";
// import { login } from "../../actions/auth";

import "./style.scss";

const CreatePassword = (props) => {
  const form = useRef();
  const checkBtn = useRef();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();

    console.log(
      /[A-Z]/.test(password) &&
        /[0-9]/.test(password) &&
        /[!@#$%^&*]/.test(password) &&
        password.length > 7
    );

    if (
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[!@#$%^&*]/.test(password) &&
      password.length > 7
    ) {
      setLoading(true);

      form.current.validateAll();
      dispatch(createPassword(id, {password}))
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

  const valid = (item, v_icon, inv_icon) => {
    let text = document.querySelector(`#${item}`);
    text.style.opacity = "1";

    let valid_icon = document.querySelector(`#${item} .${v_icon}`);
    valid_icon.style.opacity = "1";

    let invalid_icon = document.querySelector(`#${item} .${inv_icon}`);
    invalid_icon.style.opacity = "0";
  };

  const invalid = (item, v_icon, inv_icon) => {
    let text = document.querySelector(`#${item}`);
    text.style.opacity = ".5";

    let valid_icon = document.querySelector(`#${item} .${v_icon}`);
    valid_icon.style.opacity = "0";

    let invalid_icon = document.querySelector(`#${item} .${inv_icon}`);
    invalid_icon.style.opacity = "1";
  };

  const handleInputChange = (e) => {
    setPassword(e.target.value);
    const passwordMath = e.target.value;

    if (passwordMath.match(/[A-Z]/) != null) {
      valid("capital", "fa-check", "fa-times");
    } else {
      invalid("capital", "fa-check", "fa-times");
    }
    if (passwordMath.match(/[0-9]/) != null) {
      valid("num", "fa-check", "fa-times");
    } else {
      invalid("num", "fa-check", "fa-times");
    }
    if (passwordMath.match(/[!@#$%^&*]/) != null) {
      valid("char", "fa-check", "fa-times");
    } else {
      invalid("char", "fa-check", "fa-times");
    }
    if (passwordMath.length > 7) {
      valid("more8", "fa-check", "fa-times");
    } else {
      invalid("more8", "fa-check", "fa-times");
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
        <div class="create-password flex flex-col justify-center px-8 pt-8 my-auto md:justify-start md:pt-0 md:px-24 lg:px-32">
          <p class="text-xl text-center text-black font-bold">
            Vous y êtes presque, John
          </p>
          <Form
            onSubmit={handleLogin}
            ref={form}
            className="container mx-auto px-3 mt-8 space-y-6"
          >
            <div className="-space-y-px">
              <div className="mb-3">
                <label
                  htmlFor="password"
                  className="block text-sm text-gray-600 font-medium"
                >
                  Créez votre mot de passe
                </label>
                <Input.Password
                  className="rounded shadow-sm relative w-full px-3 py-2 
                  border border-gray-100 placeholder-gray-500 text-gray-900 
                  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 
                  focus:z-10 sm:text-sm mb-4"
                  placeholder="Entrez votre mot de passe"
                  onChange={handleInputChange}
                  value={password}
                  iconRender={(visible) =>
                    visible ? <HiOutlineEye /> : <HiOutlineEyeOff />
                  }
                />

                <p id="capital">
                  <FontAwesomeIcon className="fa-times icon" icon={faTimes} />
                  <FontAwesomeIcon className="fa-check icon" icon={faCheck} />
                  <span>Au moins une lettre majuscule</span>
                </p>
                <p id="char">
                  <FontAwesomeIcon className="fa-times icon" icon={faTimes} />
                  <FontAwesomeIcon className="fa-check icon" icon={faCheck} />
                  <span>Au moins un symbole</span>
                </p>
                <p id="num">
                  <FontAwesomeIcon className="fa-times icon" icon={faTimes} />
                  <FontAwesomeIcon className="fa-check icon" icon={faCheck} />
                  <span>Au moins un chiffre</span>
                </p>
                <p id="more8">
                  <FontAwesomeIcon className="fa-times icon" icon={faTimes} />
                  <FontAwesomeIcon className="fa-check icon" icon={faCheck} />
                  <span>Au moins 8 caractères</span>
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
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
                Continuer
              </button>
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

export default CreatePassword;
