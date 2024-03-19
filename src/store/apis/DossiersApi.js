import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

//const authToken = localStorage.getItem("accessToken");

const dossiersApi = createApi({

    reducerPath: 'dossiers',
    baseQuery: fetchBaseQuery({
        baseUrl:'http://localhost:3000/doctor',
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
                        url:'/patients',
                        params:{},
                        method: 'GET',
                    };
                }
            }),
            addDossier:builder.mutation({
                invalidatesTags:['Dossiers'],
                query:(dossier)=>{
                    return{
                        url:'/patients/create',
                        params:{},
                        method: 'POST',
                        body:{
                            nom:dossier.nom,
                            prenom:dossier.prenom,
                            date_naissance:dossier.date_naissance,
                            numero_securite_social:dossier.numero_securite_social,
                            genre:dossier.genre,
                            address:{nom_rue: dossier.nom_rue,
                                numero_rue: dossier.numero_rue,
                                ville: dossier.ville,
                                pays: dossier.pays,
                                code_postal: dossier.code_postal,}
                        }
                    };
                }
            }),
            updateDossier: builder.mutation({
                invalidatesTags: ['Dossiers'],
                query: (dossier) => ({
                  url: `/patients/${dossier.id}`,
                  method: 'POST', // Assuming your API supports PUT for updates, adjust accordingly
                  body:{
                    nom:dossier.nom,
                    prenom:dossier.prenom,
                    date_naissance:dossier.date_naissance,
                    numero_securite_social:dossier.numero_securite_social,
                    genre:dossier.genre,
                    address:{nom_rue: dossier.nom_rue,
                        numero_rue: dossier.numero_rue,
                        ville: dossier.ville,
                        pays: dossier.pays,
                        code_postal: dossier.code_postal,}
                }
                }),
              }),
            removeDossier: builder.mutation({
                invalidatesTags:['Dossiers'],
                query:(dossier)=>{
                    return {
                        url:`/patients/${dossier.id}`,
                        method:'DELETE'
                    };
                }
            })
        };
    }
});

export const {useFetchDossiersQuery,useAddDossierMutation,useRemoveDossierMutation,useUpdateDossierMutation} = dossiersApi;
export {dossiersApi};