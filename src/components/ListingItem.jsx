import React from "react";
import { Link } from "react-router-dom";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import BedIcon from "@mui/icons-material/Bed";
import BathtubIcon from "@mui/icons-material/Bathtub";
import LocalParkingIcon from "@mui/icons-material/LocalParking";

export const ListingItem = ({ listing, id }) => {
  return (
    <li className="categoryListing">
      <Link
        to={`/category/${listing.type}/${id}`}
        className="categoryListingLink"
      >
        <img
          src={listing.imageUrls[0]}
          alt="Listing name"
          className="categoryListingImg"
        />
        <div className="categoryListingDetails">
          <p className="categoryListingLocation">{listing.location}</p>
          <p className="categoryListingName">{listing.name}</p>
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
          <div className="categoryListingInfoDiv">
            <BedIcon></BedIcon>
            <p className="categoryListingInfoText">
              {listing.bedrooms}
              {listing.bedrooms > 1 ? " Bedrooms" : " Bedroom"}
            </p>
            <BathtubIcon></BathtubIcon>
            <p className="categoryListingInfoText">
              {listing.bathrooms}
              {listing.bathrooms > 1 ? " Bedrooms" : " Bedroom"}
            </p>
          </div>
          <div className="categoryListingInfoDiv">
            <LocalParkingIcon></LocalParkingIcon>
            <p className="categoryListingInfoText">
              {listing.parking ? "Has Parking space" : "No parking space"}
            </p>
          </div>
        </div>
      </Link>
      {/* {onDelete && (
        <div onClick={() => onDelete(listing.id, listing.name)}>
          <DeleteForeverIcon></DeleteForeverIcon>
        </div>
      )} */}
    </li>
  );
};
