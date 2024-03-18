import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

//const authToken = localStorage.getItem("accessToken");

const documentsApi = createApi({

    reducerPath: 'documents',
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
            fetchDocuments:builder.query({
                providesTags:['Documents'],
                query:()=>{
                    return{
                        url:'/documents',
                        params:{},
                        method: 'GET',
                    };
                }
            }),
            addDocument:builder.mutation({
                invalidatesTags:['Documents'],
                query:(document)=>{
                    return{
                        url:'/documents',
                        params:{},
                        method: 'POST',
                        body:{
                            siren:document.siren,
                            greffe: document.greffe,
                            forme_sociale: document.forme_sociale,
                            denomination: document.denomination,
                            objet_sociale: document.objet_sociale,
                            date: document.date,
                            duree: document.duree,
                            capital_social: document.capital_social,
                        }
                    };
                }
            }),
            updateDocument: builder.mutation({
                invalidatesTags: ['Documents'],
                query: (document) => ({
                  url: `/documents/${document.id}`,
                  method: 'PATCH', // Assuming your API supports PUT for updates, adjust accordingly
                  body: {
                    siren: document.siren,
                    greffe: document.greffe,
                    forme_sociale: document.forme_sociale,
                    denomination: document.denomination,
                    objet_sociale: document.objet_sociale,
                    date: document.date,
                    duree: document.duree,
                    capital_social: document.capital_social,
                  },
                }),
              }),
            removeDocument: builder.mutation({
                invalidatesTags:['Documents'],
                query:(document)=>{
                    return {
                        url:`/documents/${document.id}`,
                        method:'DELETE'
                    };
                }
            })
        };
    }
});

export const {useFetchDocumentsQuery,useAddDocumentMutation,useRemoveDocumentMutation,useUpdateDocumentMutation} = documentsApi;
export {documentsApi};