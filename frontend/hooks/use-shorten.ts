"use client";
import { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3030";

export default function useShorten() {
  const [shortenUrsl, setShortenUrls] = useState<string[]>();

  const shortUrl = async (url: string) => {
    try {
      const res = await fetch(API_URL + "/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ longUrl: url }),
      });
      const json = await res.json();

      return json.shortUrl;
    } catch (error) {
			console.log(error)
      throw new Error();
    }
  };

  return {
    shortenUrsl,
    shortUrl,
  };
}
