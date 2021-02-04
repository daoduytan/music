const prod = process.env.NODE_ENV === "production";

const urlApi = "https://tanmusic.herokuapp.com";
const urlApiLocal = "http://localhost:8080";

export const API_URL = prod ? urlApi : urlApiLocal;
export const baseUrl = prod ? "https://daoduytan.github.io/music/" : "/";
