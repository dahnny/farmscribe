import { useState } from "react";

import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import { emailSignUpAPI } from "../actions/user";

import AddProduct from "./AddProduct";
import { Redirect } from "react-router-dom";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.user.isAuthenticated);

  const formHandler = async (event) => {
    event.preventDefault();
    if (password !== confirmedPassword) {
      toast("Passwords not identical");
      return;
    }
    await dispatch(emailSignUpAPI(email, password));
  };
  return (
    <>
      {isAuth && <Redirect to="/" />}

      <main>
        <div style={{ padding: "30px" }} className="contacts">
          <div className="container d-flex justify-content-center">
            <div className="contacts_form col-lg-5 col-8">
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
                  Register
                </h2>
              </div>
              <form
                onSubmit={formHandler}
                className="contacts_form-form d-flex flex-column"
              >
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
                <label
                  className="contacts_form-form_label"
                  htmlFor="contactsEmail"
                >
                  Confirm Password
                </label>
                <input
                  className="contacts_form-form_field field required"
                  type="password"
                  name="contactsEmail"
                  id="contactsEmail"
                  placeholder="Confirm Password"
                  onChange={(e) => setConfirmedPassword(e.target.value)}
                />
                <button className="contacts_form-form_btn btn" type="submit">
                  Register
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

export default Register;
