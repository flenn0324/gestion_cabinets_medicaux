import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import {doctorsApi} from "./apis/DoctorsApi";
import {authApi} from "./apis/authApi";
import { cliniquesApi } from "./apis/CliniquesApi";
import { dossiersApi } from "./apis/DossiersApi";
import { documentsApi } from "./apis/DocumentsApi";
import { consultationsApi } from "./apis/ConsultationsApi";
import { ordonancesApi } from "./apis/OrdonancesApi";
import { signesApi } from "./apis/SignesApi";
import { doctorauthApi } from "./apis/doctorauthApi";

export const store = configureStore({
    reducer:{
        [doctorsApi.reducerPath] : doctorsApi.reducer,
        [authApi.reducerPath] : authApi.reducer,
        [cliniquesApi.reducerPath] : cliniquesApi.reducer,
        [dossiersApi.reducerPath] : dossiersApi.reducer,
        [documentsApi.reducerPath] : documentsApi.reducer,
        [consultationsApi.reducerPath] : consultationsApi.reducer,
        [ordonancesApi.reducerPath] : ordonancesApi.reducer,
        [signesApi.reducerPath] : signesApi.reducer,
        [doctorauthApi.reducerPath] : doctorauthApi.reducer,
    }, 
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(doctorsApi.middleware)
        .concat(authApi.middleware)
        .concat(cliniquesApi.middleware)
        .concat(dossiersApi.middleware)
        .concat(documentsApi.middleware)
        .concat(signesApi.middleware)
        .concat(doctorauthApi.middleware)
    } 
});

setupListeners(store.dispatch);

export {useFetchDoctorsQuery,useAddDoctorMutation,useRemoveDoctorMutation,useUpdateDoctorMutation} from './apis/DoctorsApi';
export {useLoginUserMutation} from './apis/authApi';
export {useLoginDoctorMutation} from './apis/doctorauthApi';
export {useFetchCliniquesQuery,useAddCliniqueMutation,useRemoveCliniqueMutation,useUpdateCliniqueMutation} from './apis/CliniquesApi';
export {useFetchDossiersQuery,useAddDossierMutation,useRemoveDossierMutation,useUpdateDossierMutation} from './apis/DossiersApi';
export {useFetchDocumentsQuery,useAddDocumentMutation,useRemoveDocumentMutation,useUpdateDocumentMutation} from './apis/DocumentsApi';
export {useFetchConsultationsQuery,useAddConsultationMutation,useRemoveConsultationMutation,useUpdateConsultationMutation} from './apis/ConsultationsApi';
export {useFetchOrdonancesQuery,useAddOrdonanceMutation,useRemoveOrdonanceMutation,useUpdateOrdonanceMutation} from './apis/OrdonancesApi';
export {useFetchSignesQuery,useAddSigneMutation,useRemoveSigneMutation} from './apis/SignesApi';