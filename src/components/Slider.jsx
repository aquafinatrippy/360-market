import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { db } from "../firebase.config";
import { Spinner } from "./Spinner";
import Carousel from "react-material-ui-carousel";
import Box from "@mui/material/Box";

export const Slider = () => {
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const getListings = async () => {
      try {
        const listingRef = collection(db, "listings");
        const q = query(listingRef, orderBy("timestamp", "desc"), limit(5));
        const querySnap = await getDocs(q);
        let listingsCopy = [];
        querySnap.forEach((doc) => {
          return listingsCopy.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setListings(listingsCopy);
        setLoading(false);
      } catch (error) {
        toast.error("failed to get the listings at slider");
      }
    };
    getListings();
  }, []);

  if (loading) return <Spinner></Spinner>;

  if (listings.length < 0) return <></>;

  return (
    listings && (
      <>
        <p className="exploreCategoryHeading">Recommended</p>
        <Carousel height={500} swipe={true}>
          {listings.map(({ data, id }) => (
            <div
              className="Carousel_image"
              key={id}
              onClick={() => navigate(`/category/${data.type}/${id}`)}
            >
              <Box
                component="img"
                sx={{
                  height: 600,
                  display: "block",
                  maxWidth: 1056,
                  overflow: "hidden",
                  width: "100%",
                  cursor: "pointer",
                  "&:hover": {
                    filter: "brightness(0.5) drop-shadow(2px 4px 6px black)",
                  },
                }}
                src={data.imageUrls[0]}
                alt={"test"}
              />
              <p className="swiperSlideText">{data.name}</p>
              <p className="swiperSlidePrice">
                {data.discountedPrice || data.regularPrice}
                {data.type === "rent" && "/ month"}
              </p>
            </div>
          ))}
        </Carousel>
      </>
    )
  );
};
