import jwtDecode from "jwt-decode";
import { get } from "lodash";
import axios from "axios";

export async function fetchAccessToken(): Promise<string> {
  const url = `/refresh_token`;

  try {
    const res = await axios(url, {
      method: "POST",
      withCredentials: true,
    });

    const { access_token } = res.data;

    return access_token as string;
  } catch (error) {
    return "";
  }
}

export const getToken = (): string => {
  const token = localStorage.getItem("token");
  return token || "";
};

export const getAccessToken = async (): Promise<string> => {
  try {
    const token = getToken();

    if (!token || token.length === 0) return "";

    const decode = jwtDecode(token);
    const exp = get(decode, "exp");
    const isExpired = !exp || Date.now() >= exp * 1000;

    if (isExpired) {
      const access_token = await fetchAccessToken();

      return access_token;
    }

    return token;
  } catch (error) {
    return "";
  }
};
