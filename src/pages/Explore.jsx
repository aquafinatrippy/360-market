import React from "react";
import { Link } from "react-router-dom";
import rentCategoryImage from "../assets/jpg/rentCategoryImage.jpg";
import sellCategoryImage from "../assets/jpg/sellCategoryImage.jpg";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { useResponsivness } from "../hooks/useResponsivness";
import { Slider } from "../components/Slider";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

export const Explore = () => {
  const { isMobile } = useResponsivness();
  return (
    <div className="explore">
      <div>
        <Slider></Slider>
      </div>
      <header>
        <h2>Explore</h2>
      </header>
      <main>
        <p className="exploreCategoryHeading">Categories</p>
        <Box sx={{ width: "100%" }}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6} md={6}>
              <ImageListItem>
                <Link to="/category/rent">
                  <Box
                    component="img"
                    sx={{
                      height: 250,
                      display: "block",
                      overflow: "hidden",
                      width: "100%",
                      objectFit: "cover",
                    }}
                    src={rentCategoryImage}
                    alt={"test"}
                  />
                </Link>
                <ImageListItemBar
                  title={"Rent"}
                  subtitle={"Apartments and houses for rent"}
                />
              </ImageListItem>
            </Grid>
            <Grid item xs={6} md={6}>
              <ImageListItem>
                <Link to="/category/sell">
                  <Box
                    component="img"
                    sx={{
                      height: 250,
                      display: "block",
                      overflow: "hidden",
                      width: "100%",
                    }}
                    src={sellCategoryImage}
                    alt={"test"}
                  />
                </Link>
                <ImageListItemBar
                  title={"Sell"}
                  subtitle={"Apartments and houses for sell"}
                />
              </ImageListItem>
            </Grid>
          </Grid>
        </Box>
      </main>
    </div>
  );
};
