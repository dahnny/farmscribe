import AddProduct from "./AddProduct";
import "./css/contacts.css";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { emailSignInAPI } from "../actions/user";
import { Redirect } from "react-router-dom";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(emailSignInAPI(email, password));
  };
  const isAuth = useSelector((state) => state.user.isAuthenticated);
  return (
    <>
      {isAuth && <Redirect to="/" />}
      <main>
        <div style={{ padding: "30px" }} className="contacts">
          <div className="container d-flex justify-content-center">
            <div className="contacts_form col-lg-5">
              <div className="contacts_form-header text-align-center">
                <a
                  className="brand header_logo d-flex align-items-center"
                  href=""
                >
                  <span className="logo">
                    <img
                      src="img/logo.png"
                      style={{ width: "50px", textAlign: "center" }}
                      alt=""
                    />
                  </span>
                  <span className="accent">Farm</span>
                  <span>Scribe</span>
                </a>
                <h2 className="contacts_form-header_title align-items-center">
                  Login
                </h2>
              </div>
              <form onSubmit={submitHandler} className="contacts_form-form d-flex flex-column">
                <label
                  className="contacts_form-form_label"
                  htmlFor="contactsName"
                >
                  Email Address
                </label>
                <input
                  className="contacts_form-form_field field required"
                  type="text"
                  name="contactsName"
                  id="contactsName"
                  placeholder="Email Address"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label
                  className="contacts_form-form_label"
                  htmlFor="contactsEmail"
                >
                  Password
                </label>
                <input
                  className="contacts_form-form_field field required"
                  type="password"
                  name="contactsEmail"
                  id="contactsEmail"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button className="contacts_form-form_btn btn" type="submit">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <AddProduct />
    </>
  );
};

export default Login;
