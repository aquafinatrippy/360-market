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
        <p className="listingName">
          {listing.name} -{"€"}
          {listing.offer ? listing.discountedPrice : listing.regularPrice}
        </p>
        <p className="listingLocation">{listing.location}</p>
        <p className="listingType">
          For {listing.type === "rent" ? "Rent" : "Sale"}
        </p>
        {listing.offer && (
          <p>{listing.regularPrice - listing.discountedPrice}</p>
        )}
        <ul className="listingDetailsList">
          <li>
            {listing.bedrooms > 1
              ? `${listing.bedrooms} Bedrooms`
              : "1 Bedroom"}
          </li>
          <li>
            {listing.bathrooms > 1
              ? `${listing.bathrooms} Bathrooms`
              : "1 Bathroom"}
          </li>
          <li>{listing.parking && "Parking spot"}</li>
          <li>{listing.furniced && "Furniced"}</li>
        </ul>
        {auth.currentUser?.id !== listing.userRef && (
          <Link to={`/contact/${listing.userRef}?${listing.name}`}>
            Contact landlord
          </Link>
        )}
      </div>
    </main>
  );
};
