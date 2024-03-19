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
                            nom:document.nom,
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
                    nom: document.nom,
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