import { api } from "../api/baseApi";

const loyaltiProgramApi = api.injectEndpoints({
  endpoints: (builder) => ({
    loyaltiProgram: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((arg) => {
            params.append(arg.name, arg.value);
          });
        }

        return {
          url: "/retailer/loyalty",
          method: "GET",
          params,
        };
      },
      providesTags: ["OrderManagement"],
    }),

    orderDetails: builder.query({
      query: (id) => {
        return {
          url: `/retailer/dashboard/orders/${id}`,
          method: "GET",
        };
      },
    }),
    orderProduct: builder.mutation({
      query: (data) => {
        return {
          url: `/retailer/dashboard/create`,
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const {
    useLoyaltiProgramQuery,
    useOrderDetailsQuery,
    useOrderProductMutation
} = loyaltiProgramApi;