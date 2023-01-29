import React from "react";
import { Link } from "react-router-dom";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import BedIcon from "@mui/icons-material/Bed";
import BathtubIcon from "@mui/icons-material/Bathtub";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import EditIcon from "@mui/icons-material/Edit";
import Card from "@mui/material/Card";
import { Box } from "@mui/system";
import { Button } from "@mui/material";

export const ListingItem = ({ listing, id, onDelete, onEdit }) => {
  return (
    <Card className="categoryListing">
      <Link
        to={`/category/${listing.type}/${id}`}
        className="categoryListingLink"
      >
        <Box
          component="img"
          sx={{
            height: 250,
            display: "block",
            overflow: "hidden",
            width: "100%",
            objectFit: "cover",
            maxWidth: 300,
          }}
          src={listing.imageUrls[0]}
          alt={"test"}
        />
        <Box
          sx={{
            width: "100%",
            margin: "0 30px",
          }}
        >
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
        </Box>
      </Link>
      <Box>
        {onDelete && (
          <Button
            startIcon={<DeleteForeverIcon />}
            fullWidth
            onClick={() => onDelete(listing.id, listing.name)}
          >
            Delete
          </Button>
        )}
        {onEdit && (
          <Button fullWidth startIcon={<EditIcon />} onClick={() => onEdit(id)}>
            Edit
          </Button>
        )}
      </Box>
    </Card>
  );
};
