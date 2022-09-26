import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY as string,
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
});

export default instance;
