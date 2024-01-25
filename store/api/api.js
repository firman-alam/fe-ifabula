import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const mainApi = createApi({
  reducerPath: "ifabula",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:9000/",
  }),
  endpoints: () => ({}),
  overrideExisting: true,
  tagTypes: ["User", "Book"],
})
