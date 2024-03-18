import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

//const authToken = localStorage.getItem("accessToken");

const cliniquesApi = createApi({

    reducerPath: 'cliniques',
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
            fetchCliniques:builder.query({
                providesTags:['Cliniques'],
                query:()=>{
                    return{
                        url:'/cliniques',
                        params:{},
                        method: 'GET',
                    };
                }
            }),
            addClinique:builder.mutation({
                invalidatesTags:['Cliniques'],
                query:(clinique)=>{
                    return{
                        url:'/cliniques',
                        params:{},
                        method: 'POST',
                        body:{
                            siren:clinique.siren,
                            greffe: clinique.greffe,
                            forme_sociale: clinique.forme_sociale,
                            denomination: clinique.denomination,
                            objet_sociale: clinique.objet_sociale,
                            date: clinique.date,
                            duree: clinique.duree,
                            capital_social: clinique.capital_social,
                        }
                    };
                }
            }),
            updateClinique: builder.mutation({
                invalidatesTags: ['Cliniques'],
                query: (clinique) => ({
                  url: `/cliniques/${clinique.id}`,
                  method: 'PATCH', // Assuming your API supports PUT for updates, adjust accordingly
                  body: {
                    siren: clinique.siren,
                    greffe: clinique.greffe,
                    forme_sociale: clinique.forme_sociale,
                    denomination: clinique.denomination,
                    objet_sociale: clinique.objet_sociale,
                    date: clinique.date,
                    duree: clinique.duree,
                    capital_social: clinique.capital_social,
                  },
                }),
              }),
            removeClinique: builder.mutation({
                invalidatesTags:['Cliniques'],
                query:(clinique)=>{
                    return {
                        url:`/cliniques/${clinique.id}`,
                        method:'DELETE'
                    };
                }
            })
        };
    }
});

export const {useFetchCliniquesQuery,useAddCliniqueMutation,useRemoveCliniqueMutation,useUpdateCliniqueMutation} = cliniquesApi;
export {cliniquesApi};