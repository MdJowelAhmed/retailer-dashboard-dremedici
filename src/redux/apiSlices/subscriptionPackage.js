import { api } from "../api/baseApi";

const subscriptionApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch all subscription packages
    getSubscriptions: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/retailer/subscription",
        };
      },
      providesTags: ["Subscriptions"],
    }),

    // Fetch details of a single subscription package
    getCurrentSubscription: builder.query({
      query: () => {
        return {
          method: "GET",
          url: `//retailer/subscription/current`,
        };
      },
      providesTags: ["Subscriptions"],
    }),

    // Create a new subscription package
    buySubcriptionPackage: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/retailer/subscription",
          body: data,
        };
      },
      invalidatesTags: ["Subscriptions"],
    }),

    // Update an existing subscription package
    updateSubscription: builder.mutation({
      query: ({ id, body }) => {
        return {
          method: "PATCH",
          url: `/admin/subscription/${id}`,
          body: body,
        };
      },
      invalidatesTags: (result, error, { id }) => [
        { type: "Subscriptions", id },
        "Subscriptions",
      ],
    }),

    // Delete a subscription package
    deleteSubscription: builder.mutation({
      query: (id) => {
        return {
          method: "DELETE",
          url: `/admin/subscription/${id}`,
        };
      },
      invalidatesTags: (result, error, id) => [
        { type: "Subscriptions", id },
        "Subscriptions",
      ],
    }),

    // Update subscription package status (active/inactive)
    updateSubscriptionStatus: builder.mutation({
      query: ({ id, status }) => {
        return {
          method: "PATCH",
          url: `/admin/subscription/status/${id}`,
          body: { status },
        };
      },
      invalidatesTags: (result, error, { id }) => [
        { type: "Subscriptions", id },
        "Subscriptions",
      ],
    }),
  }),
});

export const {
    useGetSubscriptionsQuery,
    useGetCurrentSubscriptionQuery,
  useGetSubscriptionDetailsQuery,
  useBuySubcriptionPackageMutation,
  useUpdateSubscriptionMutation,
  useDeleteSubscriptionMutation,
  useUpdateSubscriptionStatusMutation,
} = subscriptionApi;
