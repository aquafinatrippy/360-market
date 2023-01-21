import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcons from "../assets/svg/visibilityIcon.svg";

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

  return (
    <>
      <div className="pagecontainer">
        <header>
          <p className="pageHeader">Welcome Back</p>
        </header>
        <main>
          <form>
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
