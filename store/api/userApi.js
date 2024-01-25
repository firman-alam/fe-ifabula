import { mainApi } from './api'

export const authApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (data) => ({
        url: `user/sign-in`,
        method: 'POST',
        body: { ...data },
      }),
      invalidatesTags: ['Data'],
    }),
    signUp: builder.mutation({
      query: (data) => ({
        url: `user/sign-up`,
        method: 'POST',
        body: { ...data },
      }),
      invalidatesTags: ['Data'],
    }),
    getUser: builder.query({
      query: () => `user/data`,
      transformResponse: (res) => res.data,
      providesTags: ['Data'],
    }),
    getUsers: builder.query({
      query: () => `user/all`,
      transformResponse: (res) => res.data,
      providesTags: ['Data'],
    }),
    getBorrowUsers: builder.query({
      query: () => `user/borrow`,
      transformResponse: (res) => res.data,
      providesTags: ['Data'],
    }),
  }),
})

export const {
  useSignInMutation,
  useSignUpMutation,
  useGetUserQuery,
  useGetUsersQuery,
  useGetBorrowUsersQuery,
} = authApi
