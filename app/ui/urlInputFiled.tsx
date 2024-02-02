"use client";

import React, { useState } from "react";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { fetchReviews, generateSummary } from "@/app/lib/actions";

export default function URLInputField({
  placeholder,
}: {
  placeholder: string;
}) {
  const [searchURL, setSearchURL] = useState("");
  const [reviewSummary, setReviewSummary] = useState<string | null>(null);

  const handleSearch = async () => {
    console.log(searchURL);
    const reviews = await fetchReviews(searchURL);
    const reviewSummary = await generateSummary(reviews);
    setReviewSummary(reviewSummary.message.content);
  };

  const handleInputChange = (url: string) => {
    setSearchURL(url);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="relative w-full mb-4 ">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <input
          className="peer text-black  w-full rounded-md border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
          placeholder={placeholder}
          onChange={(e) => {
            handleInputChange(e.target.value);
          }}
        />
        <GlobeAltIcon className="absolute  top-1/2 h-[18px] w-[18px] -translate-y-1/2  text-gray-500 peer-focus:text-gray-900" />
      </div>
      <button
        type="button"
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
        onClick={handleSearch}
      >
        Submit
      </button>
      <p>{reviewSummary}</p>
    </div>
  );
}
