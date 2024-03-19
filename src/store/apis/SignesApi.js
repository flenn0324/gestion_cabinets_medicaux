import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

//const authToken = localStorage.getItem("accessToken");

const signesApi = createApi({

    reducerPath: 'signes',
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
            fetchSignes:builder.query({
                providesTags:['Signes'],
                query:(signe)=>{
                    return{
                        url:`/patient/signesvitaux/${signe}`,
                        params:{},
                        method: 'GET',
                    };
                }
            }),
            addSigne:builder.mutation({
                invalidatesTags:['Signes'],
                query:(signe)=>{
                    return{
                        url:'/patient/signesvitaux/add',
                        params:{},
                        method: 'POST',
                        body:{
                            frequence_cardiaque:signe.frequence_cardiaque,
                            tension_arterielle: signe.tension_arterielle,
                            frequence_resperatoire: signe.frequence_resperatoire,
                            temperature_corporelle: signe.temperature_corporelle,
                            nss: signe.nss,
                        }
                    };
                }
            }),
            removeSigne: builder.mutation({
                invalidatesTags:['Signes'],
                query:(signe)=>{
                    return {
                        url:`/patient/signesvitaux/${signe}`,
                        method:'DELETE'
                    };
                }
            })
        };
    }
});

export const {useFetchSignesQuery,useAddSigneMutation,useRemoveSigneMutation} = signesApi;
export {signesApi};