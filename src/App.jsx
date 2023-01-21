import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import { Navbar } from "./components/Navbar";
import { Explore } from "./pages/Explore";
import { ForgetPassword } from "./pages/ForgotPassword";
import { Offers } from "./pages/Offers";
import { Profile } from "./pages/Profile";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Explore />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgotpassword" element={<ForgetPassword />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Navbar></Navbar>
      </Router>
    </>
  );
}

export default App;
