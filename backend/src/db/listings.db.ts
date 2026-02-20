import { type Listing } from "../generated/prisma/client.ts";
import { prisma } from "./db.ts";

export async function getListings(): Promise<Listing[]> {
  const listings = await prisma.listing.findMany({
    orderBy: {
      createdAt: "asc",
    },
    take: 10,
    where: {
      archived: false,
    },
  });

  return listings;
}

export async function getListingByID(lid: string): Promise<Listing | null> {
  const listing = await prisma.listing.findUnique({
    where: {
      lid,
    },
  });
  if (!listing) {
    return null;
  }

  return listing;
}

export async function createNewListing(
  listingData: listingFormData,
): Promise<Listing> {
  const listing = await prisma.listing.create({
    data: {
      ...listingData,
    },
  });

  return listing;
}

export async function updateListing(lid: string, listingData: listingFormData) {
  const listing = await prisma.listing.update({
    data: {
      ...listingData,
    },
    where: {
      lid,
    },
  });

  return listing;
}
export async function deleteListing(lid: string) {
  const listing = await prisma.listing.delete({
    where: {
      lid,
    },
  });

  return listing;
}
