'use server';

import { type Listing } from "@/src/generated/prisma/client";


export const getClientListings = async () => {
    const response = await fetch("http://localhost:3000/api/listings/", {
        cache: "no-store"
    })

    console.log(response)
    return response.json();
}
export const newListingAction = async (newListing: listingFormData) => {
    const response = await fetch("http://localhost:3000/api/listings/", {
        cache: "no-store",
        method: "post",
        body: JSON.stringify(newListing)
    })

    console.log(response)
    return response.json();
}