import { api } from "../api/baseApi";

const homeSlice = api.injectEndpoints({
    endpoints: (builder)=>({
        summary: builder.query({
            query: ()=> {
                return {
                  url: `/retailer/dashboard/summary`,
                  method: "GET",
                };
            }
        }),
        getProducts: builder.query({
            query: ()=> {
                return {
                  url: `/retailer/dashboard/get-products`,
                  method: "GET",
                };
            }
        }),
        orderProduct: builder.mutation({
            query: (data)=> {
                return {
                  url: `/retailer/dashboard/create`,
                    method: "POST",
                  body:data
                };
            }
        }),
    })
})

export const {
    useSummaryQuery,
    useGetProductsQuery,
    useOrderProductMutation
} = homeSlice;