import { api } from "../api/baseApi";


const settingApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSetting: builder.query({
      query: () => ({
        url: "/admin/settings",
        method: "GET",
      }),
      transformResponse: ({ data }) => data,
    }),
    updateSetting: builder.mutation({
      query: (data) => ({
        url: "/admin/settings",
        method: "PUT",
        body: data,
      }),
      transformResponse: ({ data }) => data,
    }),
  }),
});

export const { useGetSettingQuery, useUpdateSettingMutation } = settingApi;
