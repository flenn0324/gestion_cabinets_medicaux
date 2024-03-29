import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

//const authToken = localStorage.getItem("accessToken");

const ordonancesApi = createApi({

    reducerPath: 'ordonances',
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
            fetchOrdonances:builder.query({
                providesTags:['Ordonances'],
                query:()=>{
                    return{
                        url:'/ordonances',
                        params:{},
                        method: 'GET',
                    };
                }
            }),
            addOrdonance:builder.mutation({
                invalidatesTags:['Ordonances'],
                query:(ordonance)=>{
                    return{
                        url:'/ordonances',
                        params:{},
                        method: 'POST',
                        body:{
                            nom:ordonance.nom,
                        }
                    };
                }
            }),
            updateOrdonance: builder.mutation({
                invalidatesTags: ['Ordonances'],
                query: (ordonance) => ({
                  url: `/ordonances/${ordonance.id}`,
                  method: 'PATCH', 
                  body: {
                    nom: ordonance.nom,
                  },
                }),
              }),
            removeOrdonance: builder.mutation({
                invalidatesTags:['Ordonances'],
                query:(ordonance)=>{
                    return {
                        url:`/ordonances/${ordonance.id}`,
                        method:'DELETE'
                    };
                }
            })
        };
    }
});

export const {useFetchOrdonancesQuery,useAddOrdonanceMutation,useRemoveOrdonanceMutation,useUpdateOrdonanceMutation} = ordonancesApi;
export {ordonancesApi};