import React, { useState } from "react";
import { db } from "../firebase.config";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcons from "../assets/svg/visibilityIcon.svg";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";

export const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { email, password, name } = formData;

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;
      updateProfile(auth.currentUser, {
        displayName: name,
      });

      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, "users", user.uid), formDataCopy);

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="pagecontainer">
        <header>
          <p className="pageHeader">Welcome Back</p>
        </header>
        <main>
          <form onSubmit={onSubmit}>
            <input
              onChange={onChange}
              type="text"
              placeholder="Name"
              className="nameInput"
              value={name}
              id="name"
            />
            <input
              onChange={onChange}
              type="email"
              placeholder="Email"
              className="emailInput"
              value={email}
              id="email"
            />
            <div className="passwordInputDiv">
              <input
                type={showPassword ? "text" : "password"}
                className="passwordInput"
                placeholder="Password"
                id="password"
                value={password}
                onChange={onChange}
              />
              <img
                src={visibilityIcons}
                className="showPassword"
                alt="show password"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
            <Link to="/forgotpassword" className="forgotPasswordLink">
              {" "}
              Forgot Password
            </Link>
            <div className="signInBar">
              <p className="signInText">Sign Up</p>
              <button className="signInButton">
                <ArrowRightIcon fill="#fff" width={34} height={34} />
              </button>
            </div>
          </form>

          <Link to="/signin" className="registerLink">
            Sign In{" "}
          </Link>
        </main>
      </div>
    </>
  );
};
