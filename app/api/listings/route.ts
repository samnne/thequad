
import { NextRequest, NextResponse } from "next/server.js";
import { createNewListing, getListings } from "@/db/listings.db";



export async function GET(req: NextRequest){
  try {
    const listings = await getListings();
    

    return NextResponse.json({
      listings,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({message:"Failed to Fetch Listings",status: 500})
  }
};
export async function POST(req: NextRequest) {
  const listingFormData: listingFormData = req.body;
  try {
    const createdListing = await createNewListing(listingFormData);

    return NextResponse.json({
      message: "Successfully Created Listing",
      listing: createdListing,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({message:"Failed to Create Listing",status: 500})
  }
};

