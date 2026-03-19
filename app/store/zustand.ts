import { Conversation, Listing } from "@/src/generated/prisma/client";
import { create, StoreApi, UseBoundStore } from "zustand";
import { FormType, SafeUser } from "../types";
import { ConversationInclude } from "@/src/generated/prisma/models";
import { User, UserResponse } from "@supabase/supabase-js";
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

type ListingStore = {
  listings: Listing[];
  setListings: Function;
  selectedListing?: Listing | null;
  setSelectedListing: Function;
  reset: Function;
};

export const useListings: UseBoundStore<StoreApi<ListingStore>> = create(
  (set) => {
    return {
      listings: [],
      setListings: (listings: Listing[]) => set({ listings: listings }),
      selectedListing: null,
      setSelectedListing: (listing: Listing) =>
        set({ selectedListing: listing }),
      reset: () => set({ listings: [], selectedListing: null }),
    };
  },
);

type UserState = {
  user: User | null;
  setUser: Function;
  userListings: Listing[];
  setUserListings: Function;
  reset: Function;
};
export const useUser: UseBoundStore<StoreApi<UserState>> = create((set) => {
  return {
    user: null,
    setUser: (user: User) => set({ user: user }),
    userListings: [],
    setUserListings: (listings: Listing[]) => set({ userListings: listings }),
    reset: () => set({ user: null, userListings: [] }),
  };
});

type MessagePopUp = {
  error: boolean;
  success: boolean;
  setSuccess: Function;
  setError: Function;
};

export const useMessage: UseBoundStore<StoreApi<MessagePopUp>> = create(
  (set) => {
    return {
      error: false,
      success: false,
      setSuccess: (success: boolean) => set({ success: success }),
      setError: (error: boolean) => set({ error: error }),
    };
  },
);

type ConvosState = {
  convos: (Conversation & ConversationInclude)[] | null;
  setConvos: Function;
  selectedConvo: Conversation | null;
  setSelectedConvo: Function;
  reset: Function;
};
export const useConvos: UseBoundStore<StoreApi<ConvosState>> = create((set) => {
  return {
    convos: null,
    selectedConvo: null,
    setSelectedConvo: (convo: Conversation) => set({ selectedConvo: convo }),
    setConvos: (convos: (Conversation & ConversationInclude)[]) =>
      set({ convos: convos }),
    reset: () => set({ convos: null, selectedConvo: null }),
  };
});
