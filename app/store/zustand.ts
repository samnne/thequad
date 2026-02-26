import { Listing, User } from "@/src/generated/prisma/client";
import { create } from "zustand";
interface Store {
  type: FormType;
  changeType: Function;
}
export const useType = create((set) => {
  const store: Store = {
    type: "sign-in",
    changeType: (newType: string) => set({ type: newType }),
  };
  return { ...store };
});

export const useListings = create((set) => {
  return {
    listings: [],
    setListings: (listings: Listing[]) => set({ listings: listings }),
    selectedListing: {},
    setSelectedListing: (listing: Listing) => set({ selectedListing: listing }),
  };
});
export const useUser = create((set) => {
  return {
    user: [],
    setUser: (user: User) => set({ user: user }),
  };
});
