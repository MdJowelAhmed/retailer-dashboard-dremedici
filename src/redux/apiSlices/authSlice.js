import { api } from "../api/baseApi";

const authSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        otpVerify: builder.mutation({
            query: (data) => {
                return{
                    method: "POST",
                    url: "/auth/verify-email",
                    body: data,
                }
            }
        }),
        resentOtp: builder.mutation({
            query: (data) => {
                return{
                    method: "POST",
                    url: "/auth/resend-otp",
                    body: data,
                }
            }
        }),
        createAccount: builder.mutation({
            query: (data) => {
                return{
                    method: "POST",
                    url: "/users",
                    body: data,
                }
            }
        }),
        login: builder.mutation({
            query: (data) => {
                return{
                    method: "POST",
                    url: "/auth/login",
                    body: data
                }
            },
            transformResponse: (data)=>{
                return data;
            },
           
        }),
        forgotPassword: builder.mutation({
            query: (data) => {
                return{
                    method: "POST",
                    url: "/auth/forget-password",
                    body: data
                }
            }
        }),
        resetPassword: builder.mutation({
            query: (value) => {
                return{
                    method: "POST",
                    url: "/auth/reset-password",
                    body: value,
                     headers: {
          resetToken: localStorage.getItem("verifyToken"), 
        },
                }
                
            }
        }),
        changePassword: builder.mutation({
            query: (data) => {
                return{
                    method: "POST",
                    url: "/auth/change-password",
                    body: data,
                   
                }
            }
        }),

        updateProfile: builder.mutation({
            query: (data) => {
                return{
                    method: "POST",
                    url: "/auth/update-profile",
                    body: data,
                   
                }
            }
        }),

        profile: builder.query({
            query: () => {
                return{
                    method: "GET",
                    url: "/users/profile", 
                    
                }
            },
            
        }),
    })
});

export const {
    useOtpVerifyMutation,
    useCreateAccountMutation,
    useLoginMutation,
    useResentOtpMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useChangePasswordMutation,
    useUpdateProfileMutation,
    useProfileQuery,
} = authSlice;