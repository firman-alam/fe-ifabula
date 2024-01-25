import { mainApi } from './api'

export const bookApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBooks: builder.query({
      query: () => `book`,
      transformResponse: (res) => res.data || [],
      providesTags: ['Data'],
    }),

    borrowBook: builder.mutation({
      query: (data) => ({
        url: 'book/borrow',
        method: 'POST',
        body: { ...data },
      }),
      invalidatesTags: ['Data'],
    }),
    returnBook: builder.mutation({
      query: (data) => ({
        url: 'book/return',
        method: 'POST',
        body: { ...data },
      }),
      invalidatesTags: ['Data'],
    }),
  }),
})

export const {
  useGetAllBooksQuery,
  useBorrowBookMutation,
  useReturnBookMutation,
} = bookApi
