import React from "react";
import { useLocation, useNavigate } from "react-router";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import { Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { toast } from "react-toastify";

export const Oauth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const onGoogleClick = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName,
          email: user.email,
          createdAt: serverTimestamp(),
        });
      }
      navigate("/");
    } catch (error) {
      toast.error("Failed to log with Oauth");
    }
  };
  return (
    <div className="socialLogin">
      <p>Sign {location.pathname === "/signup" ? "up" : "in"}</p>
      <Button
        sx={{ borderRadius: 28, backgroundColor: "#fff" }}
        variant="filled"
        onClick={onGoogleClick}
      >
        <GoogleIcon sx={{ fontSize: 34 }} />
      </Button>
    </div>
  );
};
