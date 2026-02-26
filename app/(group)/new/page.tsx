"use client";
import { condition } from "@/app/client-utils/constants";
import { newListingAction } from "@/lib/listing.lib";
import {
  ChangeEvent,
  KeyboardEvent,
  SubmitEvent,
  useEffect,
  useState,
} from "react";

import * as z from "zod";

import { MdAddToPhotos } from "react-icons/md";
import { useUser } from "@/app/store/zustand";
import { decrypt, getSession } from "@/lib/lib";
import { redirect } from "next/navigation";

const ListingForm = z.object({
  title: z.string().min(1, "Title Too Short"),
  price: z.number().min(0),
  description: z.string().min(0),
  location: z.object({
    lng: z.number(),
    lat: z.number(),
  }),
  condition: z.string().min(3, "Please Choose a Condition"),
});

const NewListingPage = () => {
  const { user, setUser } = useUser();
  const [rows, setInputRows] = useState(1);
  // Listing form data inferred by ZOD
  const [listingFormData, setListingFormData] = useState<
    z.infer<typeof ListingForm>
  >({
    title: "",
    price: 0,
    description: "",
    location: { lng: 0, lat: 0 },
    condition: "",
  });
  async function mountUser() {
    const session = await getSession();
    if (!session) {
      redirect("/sign-in");
    }
    setUser(session);
  }
  useEffect(() => {
    mountUser()
  }, []);
  console.log(user);
  function emptyLine() {
    const lines = listingFormData.description.split("\n");
    return lines[lines.length - 1].length === 0;
  }
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setListingFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleEnter = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      setInputRows((prev) => prev + 1);
      console.log("Enter key pressed!", rows);
    } else if (e.key === "Backspace" && emptyLine()) {
      console.log("Enter key pressed!", rows);
      setInputRows((prev) => {
        if (prev !== 1) {
          return prev - 1;
        }
        return prev;
      });
    }
  };
  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.stopPropagation();
    e.preventDefault();
    const parseListingForm = ListingForm.safeParse(listingFormData);
    if (!parseListingForm.success) {
      console.log("error occured", parseListingForm.error);
      return;
    } else {
      const listing = parseListingForm.data;
      if (user) {
        newListingAction({
          ...listing,
          latitude: listing.location.lat,
          longitude: listing.location.lng,
          imageUrls: [""],
          sellerId: user.uid,
        });
      } else {
        console.log("Sign in loser");
        return;
      }
    }
  };
  return (
    <main className="overflow-auto h-screen">
      {/* <div className="px-2 flex relative justify-end ">
      <button className="bg-primary  rounded-xl cursor-pointer text-white mt-4 font-bold px-4 py-2">
        Post Listing
      </button>

      </div> */}
      <header className="grid grid-cols-1 p-2">
        <div className="flex  w-full justify-center border border-secondary hover:bg-secondary/25  rounded-xl items-center h-40 relative">
          <span className="flex flex-col items-center font-semibold  text-secondary">
            <MdAddToPhotos className="w-6 h-6" /> Add Photos / Video
          </span>
          <label
            htmlFor="file"
            className="cursor-pointer absolute w-full h-full"
          ></label>
          <input
            type="file"
            name="file"
            id="file"
            className="hidden absolute w-full h-full"
          />
        </div>
        <article className="p-1 text-sm text-gray-400">Photos: 0/10</article>
      </header>
      <section className="p-2">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex  form flex-col gap-2 p-2"
        >
          <div className="">
            <label className="" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              className=""
              name="title"
              id="title"
              onChange={handleChange}
              value={listingFormData.title}
              placeholder="Title"
            />
          </div>

          <div className="">
            <label>Price</label>
            <input
              type="number"
              className=""
              name="price"
              id="price"
              onChange={handleChange}
              value={listingFormData.price}
              placeholder="Price"
            />
          </div>
          <h2 className="mt-2 text-xl font-semibold">Condition</h2>
          <ul className="flex gap-4 overflow-x-auto no-scrollbar">
            {condition.map((c) => {
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() =>
                    setListingFormData((prev) => {
                      return { ...prev, condition: c };
                    })
                  }
                  className={`${c === listingFormData.condition ? "bg-secondary" : "bg-secondary/20"} bg-secondary cursor-pointer text-sm text-text font-semibold px-2 rounded-md py-1  text-nowrap`}
                >
                  {c}
                </button>
              );
            })}
          </ul>
          <div className="">
            <label>Description</label>
            <textarea
              className=""
              name="description"
              id="description"
              rows={rows}
              onChange={handleChange}
              value={listingFormData.description}
              onKeyDown={(e) => handleEnter(e)}
              placeholder="Description "
            />
          </div>
          <div className="">
            <label>Location</label>
            <input
              type="number"
              className=""
              name="location"
              id="location"
              onChange={handleChange}
              value={listingFormData.location.lng}
              placeholder="Location"
            />
          </div>
          <button className="bg-primary rounded-xl cursor-pointer text-white mt-4 font-bold w-full h-12">
            Post Listing
          </button>
        </form>
      </section>
    </main>
  );
};

export default NewListingPage;
