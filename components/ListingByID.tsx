import { useListings, useUser } from "@/app/store/zustand";
import { type Listing } from "@/src/generated/prisma/client";
import { type ListingInclude } from "@/src/generated/prisma/models";

import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { AiFillMessage, AiOutlineMessage } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";

import { IoClose, IoSearch } from "react-icons/io5";
import Rating from "react-rating";
import StarRating from "./StarRating";
import ListingMap from "./ListingMap";

const getRandomFirstMessage = (): string => {
  const randomMessages = [
    "Is this still avaliable?",
    "What time could this be picked up?",
    "Hey, I'm interested, when could I pick it up?",
    "I can come pick this up today, does that work?",
    "I'll take it, where should I bring the cash?",
  ];
  const message =
    randomMessages[Math.floor(Math.random() * randomMessages.length)];

  return message;
};

const ListingModal = ({ listing }: { listing: Listing }) => {
  const { setSelectedListing } = useListings();
  const { user, setUser } = useUser();
  const [date, setDate] = useState("No Time Available");
  const [message, setMessage] = useState<string>("");
  function getTimeElapsed() {
    // Get Time difference
    const currentTime = new Date(Date.now());
    const listingDate = new Date(listing?.createdAt);
    const timeMs = currentTime.getTime() - listingDate.getTime();

    let hoursDiff = timeMs / (1000 * 60 * 60);
    let hoursString = `${Math.floor(hoursDiff).toString()} hours ago`;

    if (hoursDiff < 1) {
      hoursDiff = hoursDiff * 60;
      hoursString = `${Math.round(hoursDiff).toString()} minutes ago`;
    }

    setDate(hoursString);
  }
  function getUser() {
    setUser(listing?.seller);
  }
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };
  useEffect(() => {
    getTimeElapsed();
    getUser();
    setMessage(getRandomFirstMessage());
  }, [listing]);
  function closeModal() {
    setSelectedListing({});
  }
  return (
    <>
      {listing.title ? (
        <section className="absolute flex flex-col min-h-screen h-fit w-screen inset-0 bg-white z-50">
          <nav className="flex fixed w-full h-fit bg-white justify-between p-4">
            <button onClick={closeModal} className="w-6 h-6">
              <IoClose className="w-full h-full " />
            </button>
            <div className="flex gap-2">
              <span className="w-6 h-6 ">
                <IoSearch className="w-full h-full" />
              </span>
              <span className="w-6 h-6">
                <BsThreeDots className="w-full h-full" />
              </span>
            </div>
          </nav>
          <section className="flex flex-col">
            <div className="w-full py-10 ">
              <Image
                className="w-full"
                src={"https://picsum.photos/500"}
                width={200}
                height={200}
                alt="Bigger Listing View"
              />
            </div>
            <article className="p-2 flex flex-col">
              <h3 className="text-2xl font-bold">{listing?.title}</h3>
              <span className="text-lg">${listing?.price / 100}</span>
              <span>{date}</span>
              <div className="w-full h-25 rounded-2xl mt-4  bg-white drop-shadow-xl drop-shadow-black/20">
                <h4 className="p-2 flex gap-2 font-semibold text-sm items-center">
                  <AiFillMessage className="w-6 h-6  text-primary" />
                  Send a Message!
                </h4>
                <form action="#" className="p-2 flex gap-2">
                  <input
                    type="text"
                    placeholder="Send a Message!"
                    onChange={handleInput}
                    value={message}
                    className="p-2 w-full outline-0  rounded-2xl bg-gray-200"
                  />
                  <button className="font-bold bg-accent rounded-2xl px-2 text-white">
                    Send
                  </button>
                </form>
              </div>
              <div className="mt-2 p-2">
                <h4 className="font-bold ">Description</h4>
                <p className="text-md">{listing?.description}</p>
              </div>

              <div className="mt-2 p-2">
                <h4 className="font-bold ">Details</h4>
                <p className="text-md">{listing?.views}</p>
              </div>
              <div className="mt-2 p-2">
                <h4 className="font-bold">Seller</h4>
                <div className="text-md mt-3 flex gap-2">
                  <div>
                    {user?.profileURL ? (
                      <div className=""></div>
                    ) : (
                      <div className="w-14 h-14 bg-accent/50 rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-col flex">
                    <h1 className="w-full pl-1 font-semibold">{user?.name}</h1>
                    <div className="w-30 flex gap-1">
                      {user?.rating ? (
                        <StarRating value={user?.rating} />
                      ) : (
                        <StarRating value={4} />
                      )}{" "}
                      <span className="text-sm text-gray-500">(20)</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-2 p-2">
                <h4 className="font-bold ">Location</h4>
                <p className="text-md">{listing?.latitude}</p>
              </div>
              <div>
                <ListingMap />
              </div>
            </article>
          </section>
        </section>
      ) : (
        ""
        // <section className="absolute flex flex-col min-h-screen h-fit w-screen inset-0 bg-white z-50">
        //   <nav className="flex fixed w-full h-fit bg-white justify-between p-4">
        //     <button onClick={closeModal} className="w-6 h-6">
        //       <IoClose className="w-full h-full " />
        //     </button>
        //     <div className="flex gap-2">
        //       <span className="w-6 h-6 ">
        //         <IoSearch className="w-full h-full" />
        //       </span>
        //       <span className="w-6 h-6">
        //         <BsThreeDots className="w-full h-full" />
        //       </span>
        //     </div>
        //   </nav>
        //   <article className="flex justify-center items-center text-black text-2xl w-full h-full">
        //     <p>
        //         Error Initializing Listing.
        //     </p>
        //   </article>
        // </section>
      )}
    </>
  );
};

export default ListingModal;
