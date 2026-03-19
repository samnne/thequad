"use client";
import { usePlaceKit } from "@placekit/autocomplete-react";
import "@placekit/autocomplete-js/dist/placekit-autocomplete.css";
import { useCallback, useEffect, useState } from "react";
import { PKAClient } from "@placekit/autocomplete-js";
import placekit, { PKResult } from "@placekit/client-js";
const API_KEY = process.env.NEXT_PUBLIC_PLACEKIT_API_KEY || "";
const pk = placekit(API_KEY);
const LocationInput = (props: { llSetter: Function, ll: number[] }) => {
  const { target, client, state } = usePlaceKit(API_KEY, {
    maxResults: 3,
    timeout: 1000,
  });
  const [value, setValue] = useState("V8W 2Y2");
  const handleResultsPick = useCallback((item: PKResult) => {
   
    const cordsString = item.coordinates;
    const cordsStringArr = cordsString.split(",");
    const cleanedStringArr = cordsStringArr.map((str) => str.trim());
    const numberArr = cleanedStringArr.map((str) => Number.parseFloat(str));
    return numberArr;
  }, []);
  const handleSearch = async () => {
    if (value.length < 3) return;
    const results = await pk.search(value, {
      maxResults: 2,
      
    });
    console.log(results)

    if (results.results.length > 0) {
      const [lat, lng] = handleResultsPick(results.results[0]);
      props.llSetter([lat, lng]);
      console.log(`Lat: ${lat}, Lng: ${lng}`);
    }
  };
  useEffect(() => {

    handleSearch();
  }, [value]);
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="V8<X>..."
    />
    // <PlaceKit
    //   onResults={(query, results) => {
    //     console.log(query, results, "hey");
    //   }}
    //   options={{
    //     maxResults: 5,
    //     timeout: 2000,
    //   }}
    //   apiKey={process.env.NEXT_PUBLIC_PLACEKIT_API_KEY || ""}
    // />
  );
};

export default LocationInput;
