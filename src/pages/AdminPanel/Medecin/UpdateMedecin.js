import React from "react";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import HeadContent from '../../../components/dashboard/HeadContent';
import "../../../components/dashboard/dashboard.css";
import { useLocation } from "react-router-dom";
import { useUpdateDoctorMutation } from "../../../store/apis/DoctorsApi";

const UpdateMedecin = () => {

    const location = useLocation();
    const { medecin } = location.state ? location.state : "";

    const isNonMobile = useMediaQuery("(min-width:600px)");

    const initialValues = {
        nom: medecin.nom,
        prenom: medecin.prenom,
        date_naissance: medecin.date_naissance,
        lieu_naissance: medecin.lieu_naissance,
        adresse: medecin.adresse,
        email: medecin.email,
    };

    const [UpdateDoctor, results] = useUpdateDoctorMutation();


    const handleFormSubmit = async (values) => {
        console.log(values);
        values.id = medecin.id;
        console.log(values);
        await UpdateDoctor(values);
        window.location.replace('/admin/medecin');
    };

    return (
        <Box m="20px" data-testid="update-medecin">
            <HeadContent
                title="Modifier Medecin"
                subtitle="Modifier les informations d'un medecin"
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
                                label="Nom"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.nom}
                                name="nom"
                                error={!!touched.nom && !!errors.nom}
                                helperText={touched.nom && errors.nom}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Prenom"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.prenom}
                                name="prenom"
                                error={!!touched.prenom && !!errors.prenom}
                                helperText={touched.prenom && errors.prenom}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.email}
                                name="email"
                                error={!!touched.email && !!errors.email}
                                helperText={touched.email && errors.email}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Clinique"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.id_clinique}
                                name="id_clinique"
                                error={!!touched.id_clinique && !!errors.id_clinique}
                                helperText={touched.id_clinique && errors.id_clinique}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="date"
                                label="Date de naissance"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.date_naissance}
                                name="date_naissance"
                                error={!!touched.date_naissance && !!errors.date_naissance}
                                helperText={touched.date_naissance && errors.date_naissance}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="password"
                                label="Password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.password}
                                name="password"
                                error={!!touched.password && !!errors.password}
                                helperText={touched.password && errors.password}
                                sx={{ gridColumn: "span 2" }}
                            />
                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="submit" color="secondary" variant="contained">
                                Valider
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    );
};

const checkoutSchema = yup.object().shape({
    nom: yup.string().required("required"),
    prenom: yup.string().required("required"),
    date_naissance: yup.string().required("required"),
    id_clinique: yup.string().required("required"),
    email: yup.string().required("required"),
    password: yup.string().required("required"),
  });

export default UpdateMedecin;