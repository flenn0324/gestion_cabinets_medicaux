import React from 'react';
import Alert from '@mui/material/Alert';
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import HeadContent from '../../../components/dashboard/HeadContent';
import { TextField, Button, Box } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from "react-router-dom";



const UpdateConsultation = () => {

    const location = useLocation();
    const { consultation } = location.state ? location.state : "";

    const initialValues = {
        nss: consultation.nss,
        nom: consultation.nom,
        prenom: consultation.prenom,
        datenaissance: consultation.datenaissance,
        genre: consultation.genre,
        telephone: consultation.telephone,
        email: consultation.email,
        adresse: consultation.adresse,
    };

    const isNonMobile = useMediaQuery("(min-width:600px)");

    const alert = () => {
        return (<Alert severity="success">This is a success alert — check it out!</Alert>);
    }

    const handleFormSubmit = async (values) => {
        console.log(values)
        alert()
        window.location.replace('/medecin')
    };



    return (
        <Box m="20px">
            <HeadContent
                title="Modifier une consultation"
                subtitle="modifier cette consultation"
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
                                label="Numéro sécurité social"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.nss}
                                name="nss"
                                error={!!touched.nss && !!errors.nss}
                                helperText={touched.nss && errors.nss}
                                sx={{ gridColumn: "span 2" }}
                            />

                            <TextField
                                fullWidth
                                variant="filled"
                                type="textarea"
                                label="Note"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.adresse}
                                name="adresse"
                                error={!!touched.adresse && !!errors.adresse}
                                helperText={touched.adresse && errors.adresse}
                                sx={{ gridColumn: "span 4" }}
                            />

                            <TextField
                                fullWidth
                                variant="filled"
                                type="textarea"
                                label="Remarque"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.remarque}
                                name="remarque"
                                error={!!touched.remarque && !!errors.remarque}
                                helperText={touched.remarque && errors.remarque}
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
    nss: yup.string().required("required"),
    nom: yup.string().required("required"),
    prenom: yup.string().required("required"),
    datenaissance: yup.string().required("required"),
    genre: yup.string().required("required"),
    adresse: yup.string().required("required"),
    ville: yup.date().required("required"),
    codepostal: yup.string().required("required"),
    telephone: yup.string().required("required"),
    email: yup.string().required("required"),
});

export default UpdateConsultation;