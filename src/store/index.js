import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import {doctorsApi} from "./apis/DoctorsApi";
import {authApi} from "./apis/authApi";

export const store = configureStore({
    reducer:{
        [doctorsApi.reducerPath] : doctorsApi.reducer,
        [authApi.reducerPath] : authApi.reducer,
    }, 
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(doctorsApi.middleware)
        .concat(authApi.middleware)
    } 
});

setupListeners(store.dispatch);

export {useFetchDoctorsQuery,useAddDoctorMutation,useRemoveDoctorMutation,useUpdateDoctorMutation} from './apis/DoctorsApi';
export {useLoginUserMutation} from './apis/authApi';