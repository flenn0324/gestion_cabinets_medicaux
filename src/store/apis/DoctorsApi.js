import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

//const authToken = localStorage.getItem("accessToken");

const doctorsApi = createApi({

    reducerPath: 'doctors',
    baseQuery: fetchBaseQuery({
        baseUrl:'http://localhost:3000/admin',
        credentials: 'include',
        /*prepareHeaders: (headers) => {
            // Include the token directly in the headers
            headers.set('Authorization', `Bearer ${authToken}`);
            return headers;
        },*/
    }),
    endpoints(builder) {
        return{
            fetchDoctors:builder.query({
                providesTags:['Doctors'],
                query:()=>{
                    return{
                        url:'/doctors',
                        params:{},
                        method: 'GET',
                    };
                }
            }),
            addDoctor:builder.mutation({
                invalidatesTags:['Doctors'],
                query:(doctor)=>{
                    return{
                        url:'/doctors',
                        params:{},
                        method: 'POST',
                        body:{
                            siren:doctor.siren,
                            greffe: doctor.greffe,
                            forme_sociale: doctor.forme_sociale,
                            denomination: doctor.denomination,
                            objet_sociale: doctor.objet_sociale,
                            date: doctor.date,
                            duree: doctor.duree,
                            capital_social: doctor.capital_social,
                        }
                    };
                }
            }),
            updateDoctor: builder.mutation({
                invalidatesTags: ['Doctors'],
                query: (doctor) => ({
                  url: `/doctors/${doctor.id}`,
                  method: 'PATCH', // Assuming your API supports PUT for updates, adjust accordingly
                  body: {
                    siren: doctor.siren,
                    greffe: doctor.greffe,
                    forme_sociale: doctor.forme_sociale,
                    denomination: doctor.denomination,
                    objet_sociale: doctor.objet_sociale,
                    date: doctor.date,
                    duree: doctor.duree,
                    capital_social: doctor.capital_social,
                  },
                }),
              }),
            removeDoctor: builder.mutation({
                invalidatesTags:['Doctors'],
                query:(doctor)=>{
                    return {
                        url:`/doctors/${doctor.id}`,
                        method:'DELETE'
                    };
                }
            })
        };
    }
});

export const {useFetchDoctorsQuery,useAddDoctorMutation,useRemoveDoctorMutation,useUpdateDoctorMutation} = doctorsApi;
export {doctorsApi};