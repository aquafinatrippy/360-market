import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Spinner } from "../components/Spinner";
import { db } from "../firebase.config";
import ShareIcon from "@mui/icons-material/Share";
import Carousel from "react-material-ui-carousel";
import { Box } from "@mui/system";
import BedIcon from "@mui/icons-material/Bed";
import BathtubIcon from "@mui/icons-material/Bathtub";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";

export const Listing = () => {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const auth = getAuth();

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const docRef = doc(db, "listings", params.listingId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log(docSnap.data());
          setListing(docSnap.data());
          setLoading(false);
        }
      } catch (error) {
        toast.error("failed to get listing");
      }
    };
    fetchListing();
  }, []);

  if (loading) return <Spinner />;

  return (
    <main>
      <Carousel height={600} swipe={true}>
        {listing.imageUrls.map((url, i) => (
          <div className="Carousel_image">
            <img src={url} alt="" />
          </div>
        ))}
      </Carousel>

      <div
        className="shareIconDiv"
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          setShareLinkCopied(true);
          setTimeout(() => {
            setShareLinkCopied(false);
          }, 2000);
        }}
      >
        <ShareIcon />
      </div>
      {shareLinkCopied && <p className="linkeCopied">Link Copied</p>}

      <div className="listingDetails">
        <p className="listingName">{listing.name}</p>
        <Chip label={`For ${listing.type === "rent" ? "Rent" : "Sale"}`} />
        <Box
          sx={{
            width: "100%",
            margin: "20px 0",
          }}
        >
          <p className="categoryListingLocation">{listing.location}</p>
          <p className="categoryListingPrice">
            €
            {listing.discountedPrice
              ? listing.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : listing.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            {listing.type === "rent" && "/ Month"}
          </p>
          <p className="categoryListingInfoText">
            <BedIcon></BedIcon>
            {listing.bedrooms}
            {listing.bedrooms > 1 ? " Bedrooms" : " Bedroom"}
          </p>
          <p className="categoryListingInfoText">
            <BathtubIcon></BathtubIcon>
            {listing.bathrooms}
            {listing.bathrooms > 1 ? " Bedrooms" : " Bedroom"}
          </p>
          <p className="categoryListingInfoText">
            <LocalParkingIcon></LocalParkingIcon>
            {listing.parking ? "Has Parking space" : "No parking space"}
          </p>
          {listing.offer && (
            <p>
              {listing.regularPrice - listing.discountedPrice} off from original
              price.
            </p>
          )}
          <p>{listing.furniced && "Furniced"}</p>
          {auth.currentUser?.id !== listing.userRef && (
            <Button
              onClick={() =>
                navigate(`/contact/${listing.userRef}?${listing.name}`)
              }
              variant="contained"
            >
              Contact landlord
            </Button>
          )}
        </Box>
      </div>
    </main>
  );
};
