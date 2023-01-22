import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcons from "../assets/svg/visibilityIcon.svg";

export const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

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
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        navigate("/");
      }
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
              type="email"
              placeholder="Email"
              value={email}
              className="emailInput"
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
              <p className="signInText">Sign In</p>
              <button className="signInButton">
                <ArrowRightIcon fill="#fff" width={34} height={34} />
              </button>
            </div>
          </form>

          <Link to="/signup" className="registerLink">
            Sign Up{" "}
          </Link>
        </main>
      </div>
    </>
  );
};
