import React from "react";
import { useLocation, useNavigate } from "react-router";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExploreIcon from "@mui/icons-material/Explore";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathMatchRoute = (route) => {
    if (route === location.pathname) return true;
    return false;
  };
  return (
    <>
      <BottomNavigation
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        showLabels
      >
        <BottomNavigationAction
          label="Recents"
          icon={
            <ExploreIcon
              sx={{
                color: pathMatchRoute("/profile")
                  ? "navbarListItemNameActive"
                  : "navbarListName",
              }}
            />
          }
        />
        <BottomNavigationAction
          label="Recents"
          icon={
            <LocalOfferIcon
              sx={{
                color: pathMatchRoute("/profile")
                  ? "navbarListItemNameActive"
                  : "navbarListName",
              }}
            />
          }
        />
        <BottomNavigationAction
          label="Recents"
          icon={
            <AccountCircleIcon
              sx={{
                color: pathMatchRoute("/profile")
                  ? "navbarListItemNameActive"
                  : "navbarListName",
              }}
            ></AccountCircleIcon>
          }
        />
        {/* <Container maxWidth="xl">
          <Toolbar>
            <ul className="navbarListItems">
              <li className="navbarListItem" onClick={() => navigate("/")}>
                <ExploreIcon
                  sx={{
                    fontSize: 36,
                    color: pathMatchRoute("/profile")
                      ? "navbarListItemNameActive"
                      : "navbarListName",
                  }}
                />
                <p
                  className={
                    pathMatchRoute("/")
                      ? "navbarListItemNameActive"
                      : "navbarListName"
                  }
                >
                  Explore
                </p>
              </li>
              <li
                className="navbarListItem"
                onClick={() => navigate("/offers")}
              >
                <LocalOfferIcon
                  sx={{
                    fontSize: 36,
                    color: pathMatchRoute("/profile")
                      ? "navbarListItemNameActive"
                      : "navbarListName",
                  }}
                />
                <p
                  className={
                    pathMatchRoute("/offers")
                      ? "navbarListItemNameActive"
                      : "navbarListName"
                  }
                >
                  Offers
                </p>
              </li>
              <li
                className="navbarListItem"
                onClick={() => navigate("/profile")}
              >
                <AccountCircleIcon
                  sx={{
                    fontSize: 36,
                    color: pathMatchRoute("/profile")
                      ? "navbarListItemNameActive"
                      : "navbarListName",
                  }}
                ></AccountCircleIcon>
                <p
                  className={
                    pathMatchRoute("/profile")
                      ? "navbarListItemNameActive"
                      : "navbarListName"
                  }
                >
                  Profile
                </p>
              </li>
            </ul>
          </Toolbar>
        </Container> */}
      </BottomNavigation>

      {/* <footer className="navbar">
        <nav className="navbarNav">
          <ul className="navbarListItems">
            <li className="navbarListItem" onClick={() => navigate("/")}>
              <ExploreIcon
                sx={{
                  fontSize: 36,
                  color: pathMatchRoute("/profile")
                    ? "navbarListItemNameActive"
                    : "navbarListName",
                }}
              />
              <p
                className={
                  pathMatchRoute("/")
                    ? "navbarListItemNameActive"
                    : "navbarListName"
                }
              >
                Explore
              </p>
            </li>
            <li className="navbarListItem" onClick={() => navigate("/offers")}>
              <LocalOfferIcon
                sx={{
                  fontSize: 36,
                  color: pathMatchRoute("/profile")
                    ? "navbarListItemNameActive"
                    : "navbarListName",
                }}
              />
              <p
                className={
                  pathMatchRoute("/offers")
                    ? "navbarListItemNameActive"
                    : "navbarListName"
                }
              >
                Offers
              </p>
            </li>
            <li className="navbarListItem" onClick={() => navigate("/profile")}>
              <AccountCircleIcon
                sx={{
                  fontSize: 36,
                  color: pathMatchRoute("/profile")
                    ? "navbarListItemNameActive"
                    : "navbarListName",
                }}
              ></AccountCircleIcon>
              <p
                className={
                  pathMatchRoute("/profile")
                    ? "navbarListItemNameActive"
                    : "navbarListName"
                }
              >
                Profile
              </p>
            </li>
          </ul>
        </nav>
      </footer> */}
    </>
  );
};
