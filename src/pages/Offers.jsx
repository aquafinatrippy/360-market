import React, { useEffect } from "react";
import { useParams } from "react-router";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../firebase.config";
import { Spinner } from "../components/Spinner";
import { useState } from "react";
import { ListingItem } from "../components/ListingItem";

export const Offers = () => {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);

  const params = useParams();
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listingsRef = collection(db, "listings");
        const q = query(
          listingsRef,
          where("offer", "==", true),
          orderBy("timestamp", "desc"),
          limit(10)
        );
        const querySnap = await getDocs(q);
        const dbData = [];
        querySnap.forEach((doc) => {
          return dbData.push({ id: doc.id, data: doc.data() });
        });
        setListings(dbData);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to get listing");
      }
    };
    fetchListings();
  }, []);
  return (
    <div className="category">
      <header>
        <p className="pageHeader">Offers</p>
      </header>
      {loading ? (
        <Spinner></Spinner>
      ) : listings && listings.length > 0 ? (
        <>
          <main>
            <ul>
              {listings.map((listing, i) => (
                <ListingItem
                  key={i}
                  listing={listing.data}
                  id={listing.id}
                ></ListingItem>
              ))}
            </ul>
          </main>
        </>
      ) : (
        <p>No offers currently available</p>
      )}
    </div>
  );
};
