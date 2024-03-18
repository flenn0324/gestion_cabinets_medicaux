import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

//const authToken = localStorage.getItem("accessToken");

const signesApi = createApi({

    reducerPath: 'signes',
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
            fetchSignes:builder.query({
                providesTags:['Signes'],
                query:()=>{
                    return{
                        url:'/signes',
                        params:{},
                        method: 'GET',
                    };
                }
            }),
            addSigne:builder.mutation({
                invalidatesTags:['Signes'],
                query:(signe)=>{
                    return{
                        url:'/signes',
                        params:{},
                        method: 'POST',
                        body:{
                            siren:signe.siren,
                            greffe: signe.greffe,
                            forme_sociale: signe.forme_sociale,
                            denomination: signe.denomination,
                            objet_sociale: signe.objet_sociale,
                            date: signe.date,
                            duree: signe.duree,
                            capital_social: signe.capital_social,
                        }
                    };
                }
            }),
            updateSigne: builder.mutation({
                invalidatesTags: ['Signes'],
                query: (signe) => ({
                  url: `/signes/${signe.id}`,
                  method: 'PATCH', // Assuming your API supports PUT for updates, adjust accordingly
                  body: {
                    siren: signe.siren,
                    greffe: signe.greffe,
                    forme_sociale: signe.forme_sociale,
                    denomination: signe.denomination,
                    objet_sociale: signe.objet_sociale,
                    date: signe.date,
                    duree: signe.duree,
                    capital_social: signe.capital_social,
                  },
                }),
              }),
            removeSigne: builder.mutation({
                invalidatesTags:['Signes'],
                query:(signe)=>{
                    return {
                        url:`/signes/${signe.id}`,
                        method:'DELETE'
                    };
                }
            })
        };
    }
});

export const {useFetchSignesQuery,useAddSigneMutation,useRemoveSigneMutation,useUpdateSigneMutation} = signesApi;
export {signesApi};