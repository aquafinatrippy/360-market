import React from "react";
import { useLocation, useNavigate } from "react-router";
import { ReactComponent as ExploreIcon } from "../assets/svg/localOfferIcon.svg";
import { ReactComponent as PersonOutlineIcon } from "../assets/svg/personOutlineIcon.svg";
import { ReactComponent as OfferIcon } from "../assets/svg/localOfferIcon.svg";

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathMatchRoute = (route) => {
    if (route === location.pathname) return true;
    return false;
  };
  return (
    <footer className="navbar">
      <nav className="navbarNav">
        <ul className="navbarListItems">
          <li className="navbarListItem" onClick={() => navigate("/")}>
            <ExploreIcon
              fill={
                pathMatchRoute("/")
                  ? "navbarListItemNameActive"
                  : "navbarListItemName"
              }
              width={36}
              height={36}
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
            <OfferIcon
              fill={
                pathMatchRoute("/offers")
                  ? "navbarListItemNameActive"
                  : "navbarListName"
              }
              width={36}
              height={36}
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
            <PersonOutlineIcon
              fill={
                pathMatchRoute("/profile")
                  ? "navbarListItemNameActive"
                  : "navbarListName"
              }
              width={36}
              height={36}
            />
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
    </footer>
  );
};
