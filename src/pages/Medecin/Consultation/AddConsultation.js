import React, { useState } from 'react';
import Alert from '@mui/material/Alert';
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import HeadContent from '../../../components/dashboard/HeadContent';
import { TextField, Button, RadioGroup, Radio, FormControlLabel, Box, FormControl, FormLabel } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';



const AddConsultation = () => {

    const [ordonnance, setOrdonnance] = useState(false);
    const [justificatif, setJustificatif] = useState(false);


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
                title="Ajouter une consultation"
                subtitle="Ajouter une nouvelle consultation pour un patient"
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
                                value={values.siren}
                                name="nss"
                                error={!!touched.siren && !!errors.siren}
                                helperText={touched.siren && errors.siren}
                                sx={{ gridColumn: "span 2" }}
                            />

                            <TextField
                                fullWidth
                                variant="filled"
                                type="textarea"
                                label="Note"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.objet_sociale}
                                name="adresse"
                                error={!!touched.objet_sociale && !!errors.objet_sociale}
                                helperText={touched.objet_sociale && errors.objet_sociale}
                                sx={{ gridColumn: "span 4" }}
                            />

                            <TextField
                                fullWidth
                                variant="filled"
                                type="textarea"
                                label="Remarque"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.objet_sociale}
                                name="remarque"
                                error={!!touched.objet_sociale && !!errors.objet_sociale}
                                helperText={touched.objet_sociale && errors.objet_sociale}
                                sx={{ gridColumn: "span 4" }}
                            />

                            <Box sx={{ gridColumn: "span 4" }}>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend" className='text_black fs-5 fw-bold'>Voulez-vous ajouter une ordonnance ?</FormLabel>
                                    <RadioGroup
                                        name="addOrdonnance"
                                        onChange={handleChange}
                                        row
                                    >
                                        <FormControlLabel value="oui" onClick={() => setOrdonnance(true)} control={<Radio />} label="Oui" />
                                        <FormControlLabel value="non" onClick={() => setOrdonnance(false)} control={<Radio />} label="Non" />
                                    </RadioGroup>
                                </FormControl>
                            </Box>
                            {ordonnance && (
                                <>
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        type="text"
                                        label="Médicament"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.medicament}
                                        name="medicament"
                                        error={!!touched.medicament && !!errors.medicament}
                                        helperText={touched.medicament && errors.medicament}
                                        sx={{ gridColumn: "span 4" }}
                                    />

                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        type="text"
                                        label="Traitement"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.traitement}
                                        name="traitement"
                                        error={!!touched.traitement && !!errors.traitement}
                                        helperText={touched.traitement && errors.traitement}
                                        sx={{ gridColumn: "span 4" }}
                                    />
                                </>
                            )}
                            <Box sx={{ gridColumn: "span 4" }}>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend" className='text_black fs-5 fw-bold'>Voulez-vous ajouter un justification médicale ?</FormLabel>
                                    <RadioGroup
                                        name="addJustif"
                                        onChange={handleChange}
                                        row
                                    >
                                        <FormControlLabel value="oui" onClick={() => setJustificatif(true)} control={<Radio />} label="Oui" />
                                        <FormControlLabel value="non" onClick={() => setJustificatif(false)} control={<Radio />} label="Non" />
                                    </RadioGroup>
                                </FormControl>
                            </Box>
                            {justificatif && (
                                <>
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        type="date"
                                        label="Date debut"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.medicament}
                                        name="date_debut"
                                        error={!!touched.medicament && !!errors.medicament}
                                        helperText={touched.medicament && errors.medicament}
                                        sx={{ gridColumn: "span 4" }}
                                    />
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        type="date"
                                        label="Date fin"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.medicament}
                                        name="date_fin"
                                        error={!!touched.medicament && !!errors.medicament}
                                        helperText={touched.medicament && errors.medicament}
                                        sx={{ gridColumn: "span 4" }}
                                    />
                                </>
                            )}

                            
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
const initialValues = {
    nss: "",
    nom: "",
    prenom: "",
    genre: "",
    datenaissance: "",
    adresse: "",
    ville: "",
    codepostal: "",
    telephone: "",
    email: "",
};

export default AddConsultation;