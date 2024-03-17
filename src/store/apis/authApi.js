import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/admin",
  }),
  endpoints(builder) {
    return {
        loginUser:builder.mutation({
        query: (datalogin) => {
          return {
            url: "/signin",
            params: {},
            method: "POST",
            body: {
              email: datalogin.email,
              password: datalogin.password,
            },
          };
        },
      }),
    };
  },
});

export const {
  useLoginUserMutation
} = authApi;
export { authApi };