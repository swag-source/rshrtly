"use client";
import { useState } from "react";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3030";

export default function useShorten() {
  const shortUrl = async (url: string, custom : string) => {
    try {
      const res = await axios.post(API_URL + "/url/shorten", {
        longUrl: url,
        customTitle: custom, 
      });

      return { data: res.data.shortUrl, ok: res.status !== 200 };
    } catch (error: any) {
      console.log(error);
      return { ok: false, message: error?.message };
    }
  };

  // v2 jeje
  const getUrlList = async () => {
    try {
      const res = await axios.get(API_URL + "/url/list");
      return { data: res.data.generated_hashes, ok: true };
    } catch (error) {
      console.log(error);
      return { ok: false };
    }
  };

  return {
    shortUrl,
		getUrlList
  };
}
