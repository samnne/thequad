"use client";

import { useListings } from "@/app/store/zustand";
import ListingModal from "@/components/ListingByID";
import { getClientListings } from "@/lib/listing.lib";
import { type Listing } from "@/src/generated/prisma/client";
import Image from "next/image";
import { useEffect, useState } from "react";

const Listing = () => {

 const {listings, setListings, selectedListing, setSelectedListing} = useListings();
  const [loading, setLoading] = useState(true);
  const fetchListings = async () => {
    const temp = await getClientListings();
    setListings(temp?.listings);

    return temp;
  };
  useEffect(() => {
    try {
      setLoading(true);
      if (listings.length === 0){

        fetchListings();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);
  function openListingModal(listing: Listing){
    setSelectedListing(listing);

  }
  return (
    <main className=" ">
      <header className="px-2">
        <h1 className="text-lg font-semibold">
          Today's Listings
        </h1>
      </header>
      <section className="grid grid-cols-2 p-1 gap-1">

      {listings ? (
        listings.map((listing: Listing) => {
          return (
            <section onClick={()=> openListingModal(listing)} className="" key={listing.lid}>
              <div className="h-50 ">
              
                <Image className="w-full h-full object-cover" width={250} loading="eager"  height={250} src="https://picsum.photos/200" alt="listing photo" />
              </div>
              <div className="p-1 text-lg font-semibold overflow-hidden text-nowrap flex gap-1 items-center">
                <span className="">${listing.price / 100} ⋅</span>
                <h3 className="">{listing.title}</h3>
              </div>
            </section>
          );
        })
      ) : (
        <div>Empty</div>
      )}
      {loading && (
        <>
          <section className="">
            <div className="h-50 bg-gray-200 animate-pulse ">
              <img src="#" alt="" />
            </div>
            <div className=" pt-2 animate-pulse  text-lg font-semibold overflow-hidden text-nowrap flex gap-1 items-center">
              <span className="bg-gray-300 w-1/2 h-6 "></span>
              <h3 className=" bg-gray-300  w-full h-6"></h3>
            </div>
          </section>
          <section className="">
            <div className="h-50 bg-gray-200 animate-pulse ">
              <img src="#" alt="" />
            </div>
            <div className=" pt-2 animate-pulse  text-lg font-semibold overflow-hidden text-nowrap flex gap-1 items-center">
              <span className="bg-gray-300 w-1/2 h-6 "></span>
              <h3 className=" bg-gray-300  w-full h-6"></h3>
            </div>
          </section>
        </>
      )}
      </section>
      <ListingModal listing={selectedListing}></ListingModal>
    </main>
  );
};

export default Listing;
