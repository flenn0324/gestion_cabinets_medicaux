import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

//const authToken = localStorage.getItem("accessToken");

const consultationsApi = createApi({

    reducerPath: 'consultations',
    baseQuery: fetchBaseQuery({
        baseUrl:'http://localhost:3000/medecin',
        credentials: 'include',
        /*prepareHeaders: (headers) => {
            // Include the token directly in the headers
            headers.set('Authorization', `Bearer ${authToken}`);
            return headers;
        },*/
    }),
    endpoints(builder) {
        return{
            fetchConsultations:builder.query({
                providesTags:['Consultations'],
                query:()=>{
                    return{
                        url:'/consultations',
                        params:{},
                        method: 'GET',
                    };
                }
            }),
            addConsultation:builder.mutation({
                invalidatesTags:['Consultations'],
                query:(consultation)=>{
                    return{
                        url:'/consultations',
                        params:{},
                        method: 'POST',
                        body:{
                            siren:consultation.siren,
                            greffe: consultation.greffe,
                            forme_sociale: consultation.forme_sociale,
                            denomination: consultation.denomination,
                            objet_sociale: consultation.objet_sociale,
                            date: consultation.date,
                            duree: consultation.duree,
                            capital_social: consultation.capital_social,
                        }
                    };
                }
            }),
            updateConsultation: builder.mutation({
                invalidatesTags: ['Consultations'],
                query: (consultation) => ({
                  url: `/consultations/${consultation.id}`,
                  method: 'PATCH', // Assuming your API supports PUT for updates, adjust accordingly
                  body: {
                    siren: consultation.siren,
                    greffe: consultation.greffe,
                    forme_sociale: consultation.forme_sociale,
                    denomination: consultation.denomination,
                    objet_sociale: consultation.objet_sociale,
                    date: consultation.date,
                    duree: consultation.duree,
                    capital_social: consultation.capital_social,
                  },
                }),
              }),
            removeConsultation: builder.mutation({
                invalidatesTags:['Consultations'],
                query:(consultation)=>{
                    return {
                        url:`/consultations/${consultation.id}`,
                        method:'DELETE'
                    };
                }
            })
        };
    }
});

export const {useFetchConsultationsQuery,useAddConsultationMutation,useRemoveConsultationMutation,useUpdateConsultationMutation} = consultationsApi;
export {consultationsApi};