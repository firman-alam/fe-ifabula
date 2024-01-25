import { mainApi } from "./api"

export const authApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (data) => ({
        url: `user/sign-in`,
        method: "POST",
        body: { ...data },
      }),
    }),
    signUp: builder.mutation({
      query: (data) => ({
        url: `user/sign-up`,
        method: "POST",
        body: { ...data },
      }),
    }),
  }),
})

export const { useSignInMutation, useSignUpMutation } = authApi
