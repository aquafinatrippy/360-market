import React from "react";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail, getAuth } from "firebase/auth";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { useState } from "react";
import { toast } from "react-toastify";

export const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const onChange = (e) => {
    setEmail(e.target.value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success("Password recovery mail is sent");
    } catch (error) {
      toast.error("Failed to send recovery mail");
    }
  };
  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Forgot Password</p>
      </header>
      <main>
        <form onSubmit={onSubmit}>
          <input
            id="email"
            value={email}
            type="text"
            placeholder="Email"
            className="emailInput"
            onChange={onChange}
          />
          <div className="linkTarget">
            <Link className="forgotPasswordLink" to="/signin">
              SignIn
            </Link>
          </div>

          <button type="submit" className="signInBar">
            <div className="signInText">Send Reset Link</div>
            <ArrowCircleRightIcon sx={{ fontSize: 34 }} />
          </button>
        </form>
      </main>
    </div>
  );
};
