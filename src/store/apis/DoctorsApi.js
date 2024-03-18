import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

//const authToken = localStorage.getItem("accessToken");

const doctorsApi = createApi({

    reducerPath: 'doctors',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000/admin',
        /*prepareHeaders: (headers) => {
            // Include the token directly in the headers
            headers.set('Authorization', `Bearer ${authToken}`);
            return headers;
        },*/
    }),
    endpoints(builder) {
        return {
            fetchDoctors: builder.query({
                providesTags: ['Doctors'],
                query: () => {
                    return {
                        url: '/doctors',
                        params: {},
                        method: 'GET',
                    };
                }
            }),
            addDoctor: builder.mutation({
                invalidatesTags: ['Doctors'],
                query: (doctor) => {
                    return {
                        url: '/doctors/create',
                        params: {},
                        method: 'POST',
                        body: {
                            nom: doctor.nom,
                            prenom: doctor.prenom,
                            date_naissance: doctor.date_naissance,
                            id_clinique: doctor.id_clinique,
                            email: doctor.email,
                            password: doctor.password,
                        }
                    };
                }
            }),
            updateDoctor: builder.mutation({
                invalidatesTags: ['Doctors'],
                query: (doctor) => ({
                    url: `/doctors/${doctor.id}`,
                    method: 'POST', 
                    body: {
                        nom: doctor.nom,
                        prenom: doctor.prenom,
                        date_naissance: doctor.date_naissance,
                        id_clinique: doctor.id_clinique,
                        email: doctor.email,
                        password: doctor.password,
                    },
                }),
            }),
            removeDoctor: builder.mutation({
                invalidatesTags: ['Doctors'],
                query: (doctor) => {
                    return {
                        url: `/doctors/${doctor.id}`,
                        method: 'DELETE'
                    };
                }
            })
        };
    }
});

export const { useFetchDoctorsQuery, useAddDoctorMutation, useRemoveDoctorMutation, useUpdateDoctorMutation } = doctorsApi;
export { doctorsApi };