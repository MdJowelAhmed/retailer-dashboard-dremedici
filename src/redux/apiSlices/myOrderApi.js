import { api } from "../api/baseApi";

const myOrderApi = api.injectEndpoints({
    endpoints: (builder)=>({
        myOrder: builder.query({
            query: ()=> {
                return {
                  url: `/retailer/dashboard/orders`,
                  method: "GET",
                };
            }
        }),
        orderDetails: builder.query({
            query: (id)=> {
                return {
                  url: `/dashboard/orders/${id}`,
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
    useMyOrderQuery,
    useOrderDetailsQuery,
    useOrderProductMutation
} = myOrderApi;