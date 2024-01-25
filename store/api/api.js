import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie'

const getToken = () => Cookies.get('token')

export const mainApi = createApi({
  reducerPath: 'ifabula',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:9000/',
    prepareHeaders: (headers) => {
      const token = getToken()

      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }

      return headers
    },
  }),
  endpoints: () => ({}),
  overrideExisting: true,
  tagTypes: ['Data'],
})
