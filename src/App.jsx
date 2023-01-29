import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import "./styles/link.scss";
import "./styles/overall.scss";
import { Navbar } from "./components/Navbar";
import { Explore } from "./pages/Explore";
import { ForgetPassword } from "./pages/ForgotPassword";
import { Offers } from "./pages/Offers";
import { Profile } from "./pages/Profile";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { PrivateRoute } from "./components/PrivateRoute";
import Container from "@mui/material/Container";
import { Category } from "./pages/Category";
import DesktopNavbar from "./components/DesktopNavbar";
import { useResponsivness } from "./hooks/useResponsivness";
import { CreateListing } from "./pages/CreateListing";
import { Listing } from "./pages/Listing";
import { Contact } from "./pages/Contact";
import { EditListing } from "./pages/EditListing";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: "#023047",
    },
    secondary: {
      // This is green.A700 as hex.
      main: "#11cb5f",
    },
  },
});

function App() {
  const { isMobile } = useResponsivness();
  return (
    <>
      <ThemeProvider theme={theme}>
        <Router>
          {!isMobile && <DesktopNavbar></DesktopNavbar>}
          <Container
            sx={{
              marginBottom: isMobile ? "70px" : 0,
            }}
          >
            <Routes>
              <Route path="/" element={<Explore />} />
              <Route path="/offers" element={<Offers />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/category/:categoryName" element={<Category />} />
              <Route
                path="/category/:categoryName/:listingId"
                element={<Listing />}
              />
              <Route path="/contact/:landlordId" element={<Contact />} />

              <Route path="/forgotpassword" element={<ForgetPassword />} />
              <Route path="/profile" element={<PrivateRoute />}>
                <Route path="/profile" element={<Profile />} />
              </Route>
              <Route path="/createlisting" element={<CreateListing />} />
              <Route path="/editlisting/:listingId" element={<EditListing />} />
            </Routes>
          </Container>

          {isMobile && <Navbar></Navbar>}
        </Router>
      </ThemeProvider>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      ></ToastContainer>
    </>
  );
}

export default App;
