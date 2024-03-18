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
                        url:'/cliniques/create',
                        params:{},
                        method: 'POST',
                        body:{
                            nom:clinique.nom,
                            address:{nom_rue: clinique.nom_rue,
                                numero_rue: clinique.numero_rue,
                                ville: clinique.ville,
                                pays: clinique.pays,
                                code_postal: clinique.code_postal,}
                        }
                    };
                }
            }),
            updateClinique: builder.mutation({
                invalidatesTags: ['Cliniques'],
                query: (clinique) => ({
                  url: `/cliniques/${clinique.id}`,
                  method: 'POST', 
                  body: {
                    nom:clinique.nom,
                    address:{nom_rue: clinique.nom_rue,
                        numero_rue: clinique.numero_rue,
                        ville: clinique.ville,
                        pays: clinique.pays,
                        code_postal: clinique.code_postal,}
                }
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