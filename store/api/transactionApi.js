import { mainApi } from './api'

export const txApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTransactions: builder.query({
      query: () => `transaction`,
      transformResponse: (res) => res.data || [],
      providesTags: ['Data'],
    }),
  }),
})

export const { useGetAllTransactionsQuery } = txApi
