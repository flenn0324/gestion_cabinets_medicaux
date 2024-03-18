import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

//const authToken = localStorage.getItem("accessToken");

const dossiersApi = createApi({

    reducerPath: 'dossiers',
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
            fetchDossiers:builder.query({
                providesTags:['Dossiers'],
                query:()=>{
                    return{
                        url:'/dossiers',
                        params:{},
                        method: 'GET',
                    };
                }
            }),
            addDossier:builder.mutation({
                invalidatesTags:['Dossiers'],
                query:(dossier)=>{
                    return{
                        url:'/dossiers',
                        params:{},
                        method: 'POST',
                        body:{
                            siren:dossier.siren,
                            greffe: dossier.greffe,
                            forme_sociale: dossier.forme_sociale,
                            denomination: dossier.denomination,
                            objet_sociale: dossier.objet_sociale,
                            date: dossier.date,
                            duree: dossier.duree,
                            capital_social: dossier.capital_social,
                        }
                    };
                }
            }),
            updateDossier: builder.mutation({
                invalidatesTags: ['Dossiers'],
                query: (dossier) => ({
                  url: `/dossiers/${dossier.id}`,
                  method: 'PATCH', // Assuming your API supports PUT for updates, adjust accordingly
                  body: {
                    siren: dossier.siren,
                    greffe: dossier.greffe,
                    forme_sociale: dossier.forme_sociale,
                    denomination: dossier.denomination,
                    objet_sociale: dossier.objet_sociale,
                    date: dossier.date,
                    duree: dossier.duree,
                    capital_social: dossier.capital_social,
                  },
                }),
              }),
            removeDossier: builder.mutation({
                invalidatesTags:['Dossiers'],
                query:(dossier)=>{
                    return {
                        url:`/dossiers/${dossier.id}`,
                        method:'DELETE'
                    };
                }
            })
        };
    }
});

export const {useFetchDossiersQuery,useAddDossierMutation,useRemoveDossierMutation,useUpdateDossierMutation} = dossiersApi;
export {dossiersApi};