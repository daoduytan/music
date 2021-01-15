const prod = process.env.NODE_ENV === "production";

export const API_URL = prod
  ? "https://tanmusic.herokuapp.com"
  : "http://localhost:8080";
