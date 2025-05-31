import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.elmagocigarsapp.com/api/v1",
    // baseUrl: "https://rakibur5003.binarybards.online/api/v1",
    prepareHeaders: (headers) => {
      // Get the token from localStorage
      const token = localStorage.getItem("accessToken");

      // If we have a token, set the authorization header
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: () => ({}),
});

export const imageUrl = "https://api.elmagocigarsapp.com";
// export const imageUrl = "https://rakibur5003.binarybards.online";