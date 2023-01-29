import React from "react";
import { getAuth, updateProfile } from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Spinner } from "../components/Spinner";
import { ListingItem } from "../components/ListingItem";
import TextField from "@mui/material/TextField";

export const Profile = () => {
  const auth = getAuth();
  const [changeDetails, setChangeDetails] = useState(false);
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const navigate = useNavigate();
  const onLogOut = () => {
    auth.signOut();
    navigate("/");
  };
  const { name, email } = formData;
  useEffect(() => {
    const fetchUserListings = async () => {
      try {
        const listingsRef = collection(db, "listings");
        const q = query(
          listingsRef,
          where("userRef", "==", auth.currentUser.uid),
          orderBy("timestamp", "desc")
        );
        const querySnap = await getDocs(q);
        const listingsArr = [];
        querySnap.forEach((doc) => {
          return listingsArr.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setListings(listingsArr);
        setLoading(false);
      } catch (error) {
        console.log(error);
        toast.error("Failed to get user listings for profile");
      }
    };
    fetchUserListings();
  }, [auth.currentUser.uid]);
  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
        const userRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userRef, {
          name,
        });
      }
    } catch (error) {
      toast.error("Failed to display user data");
    }
  };
  const onChange = async (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onDelete = async (listingId) => {
    if (window.confirm("Are you sure that you want to delete?")) {
      await deleteDoc(doc(db), "listings", listingId);
      const updatedListings = listings.filter(
        (listing) => listing.id !== listingId
      );
      setListings(updatedListings);
      toast.success("Listing item deleted successfully");
    }
  };

  const onEdit = (id) => {
    navigate(`/editlisting/${id}`);
  };

  if (loading) return <Spinner></Spinner>;

  return (
    <div className="profile">
      <header className="profileHeader">
        <p className="pageHeader">My Profile</p>
        <Button variant="contained" onClick={onLogOut}>
          Log Out
        </Button>
      </header>
      <main>
        <div className="profileDetailsHeader">
          <p className="profileDetailsText">Personal Details</p>
          <Button
            variant="text"
            onClick={() => {
              changeDetails && onSubmit();
              setChangeDetails(!changeDetails);
            }}
          >
            {changeDetails ? "done" : "change"}
          </Button>
        </div>
        <div className="profileCard">
          <form>
            <TextField
              fullWidth
              variant="standard"
              disabled={!changeDetails}
              id="name"
              onChange={onChange}
              value={name}
            />
            <br />
            <TextField
              fullWidth
              variant="standard"
              disabled={!changeDetails}
              id="email"
              onChange={onChange}
              value={email}
            />
          </form>
        </div>
        <Button
          sx={{
            margin: "15px 0 0 0",
          }}
          variant="contained"
          startIcon={<HomeIcon />}
          endIcon={<ArrowForwardIcon />}
          onClick={() => navigate("/createlisting")}
        >
          Sell or rent your home
        </Button>
        {!loading && listings?.length > 0 && (
          <>
            <p className="listingText">Your listings</p>
            <ul
              className="listingsList"
              style={{
                padding: 0,
              }}
            >
              {listings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                  onDelete={() => onDelete(listing.id)}
                  onEdit={() => onEdit(listing.id)}
                />
              ))}
            </ul>
          </>
        )}
      </main>
    </div>
  );
};
