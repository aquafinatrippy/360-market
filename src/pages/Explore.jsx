import React from "react";
import { Link } from "react-router-dom";
import rentCategoryImage from "../assets/jpg/rentCategoryImage.jpg";
import sellCategoryImage from "../assets/jpg/sellCategoryImage.jpg";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";

export const Explore = () => {
  return (
    <div className="explore">
      <header>
        <h2>Explore</h2>
      </header>
      <main>
        <p className="exploreCategoryHeading">Categories</p>
        <ImageList cols={2}>
          <ImageListItem>
            <Link to="/category/rent">
              <img className="CategoryLink" src={rentCategoryImage} alt="" />
            </Link>
            <ImageListItemBar
              title={"Rent"}
              subtitle={"Apartments and houses for rent"}
            />
          </ImageListItem>
          <ImageListItem>
            <Link to="/category/sell">
              <img className="CategoryLink" src={sellCategoryImage} alt="" />
            </Link>
            <ImageListItemBar
              title={"Sell"}
              subtitle={"Apartments and houses for sell"}
            />
          </ImageListItem>
        </ImageList>
      </main>
    </div>
  );
};
