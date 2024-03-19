import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const doctorauthApi = createApi({
  reducerPath: "doctorauth",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/doctor",
  }),
  endpoints(builder) {
    return {
        loginDoctor:builder.mutation({
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
  useLoginDoctorMutation
} = doctorauthApi;
export { doctorauthApi };