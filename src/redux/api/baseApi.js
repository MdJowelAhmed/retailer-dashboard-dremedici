import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://10.0.60.126:7001/api/v1",
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
    endpoints: () => ({})
});

// export const imageUrl = "http://10.0.60.126:7001";
export const imageUrl = "http://10.0.60.126:7001";