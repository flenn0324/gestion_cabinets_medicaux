import React from 'react';
import Alert from '@mui/material/Alert';
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import HeadContent from '../../../components/dashboard/HeadContent';
import { TextField, Button, Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useAddSigneMutation } from '../../../store';



const AddSigne = () => {

    const isNonMobile = useMediaQuery("(min-width:600px)");

    const[AddSigne,results] = useAddSigneMutation();

    const alert = () => {
        return (<Alert severity="success">This is a success alert — check it out!</Alert>);
    }

    const location = useLocation();
    const { signes } = location.state ? location.state : "";
    console.log(signes);

    const handleFormSubmit = async (values) => {
        console.log(values);
        values.nss = signes;
        console.log(values);
        await AddSigne(values);
        alert();
        console.log(results);
        window.location.replace('/medecin/dossiers')
    };



    return (
        <Box m="20px">
            <HeadContent
                title="Ajouter des signes vitaux"
                subtitle="Ajouter des nouveaux signes vitaux pour un patient"
            />

            <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={checkoutSchema}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <Box
                            display="grid"
                            gap="30px"
                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                            sx={{
                                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                            }}
                        >

                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Fréquence cardiaque"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.frequence_cardiaque}
                                name="frequence_cardiaque"
                                error={!!touched.frequence_cardiaque && !!errors.frequence_cardiaque}
                                helperText={touched.frequence_cardiaque && errors.frequence_cardiaque}
                                sx={{ gridColumn: "span 4" }}
                            />

                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Tension Arterielle"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.tension_arterielle}
                                name="tension_arterielle"
                                error={!!touched.tension_arterielle && !!errors.tension_arterielle}
                                helperText={touched.tension_arterielle && errors.tension_arterielle}
                                sx={{ gridColumn: "span 4" }}
                            />

                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Fréquence respératoire"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.frequence_resperatoire}
                                name="frequence_resperatoire"
                                error={!!touched.frequence_resperatoire && !!errors.frequence_resperatoire}
                                helperText={touched.frequence_resperatoire && errors.frequence_resperatoire}
                                sx={{ gridColumn: "span 4" }}
                            />

                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Température corporelle"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.temperature_corporelle}
                                name="temperature_corporelle"
                                error={!!touched.temperature_corporelle && !!errors.temperature_corporelle}
                                helperText={touched.temperature_corporelle && errors.temperature_corporelle}
                                sx={{ gridColumn: "span 4" }}
                            />

                        </Box>
                        <Box display="flex" justifyContent="end">
                            <Button type="submit" color="secondary" variant="contained" className="mt-3">
                                Valider
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    );
};

/*const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;*/

const checkoutSchema = yup.object().shape({
    frequence_cardiaque: yup.string().required("required"),
    frequence_resperatoire: yup.string().required("required"),
    tension_arterielle: yup.string().required("required"),
    temperature_corporelle: yup.string().required("required"),
});
const initialValues = {
    frequence_cardiaque: "",
    frequence_resperatoire: "",
    tension_arterielle: "",
    temperature_corporelle: "",
};

export default AddSigne;