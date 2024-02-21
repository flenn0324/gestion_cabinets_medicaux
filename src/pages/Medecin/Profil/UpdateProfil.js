import React from "react";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import HeadContent from '../../../components/dashboard/HeadContent';
import "../../../components/dashboard/dashboard.css";
import { useLocation } from "react-router-dom";

const UpdateProfil = () => {
  const location = useLocation();
  const { profil } = location.state ? location.state : "";

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const initialValues = {
    nom : profil.nom,
    prenom: profil.prenom,
    date_naissance: profil.date_naissance,
    lieu_naissance: profil.lieu_naissance,
    adresse: profil.adresse,
    email: profil.email,
  };


  const handleFormSubmit = async (values) => {
    console.log(values);
    window.location.replace('/admin'); 
  };

  return (
    <Box m="20px">
      <HeadContent
        title="Modifier profil"
        subtitle="Modifier les informations du profil"
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
                label="Lieu de naissance"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lieu_naissance}
                name="lieu_naissance"
                error={!!touched.lieu_naissance && !!errors.lieu_naissance}
                helperText={touched.lieu_naissance && errors.lieu_naissance}
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
                type="text"
                label="Adresse"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.adresse}
                name="adresse"
                error={!!touched.adresse && !!errors.adresse}
                helperText={touched.adresse && errors.adresse}
                sx={{ gridColumn: "span 2" }}
              />
              {values.id = profil.id}
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
  lieu_naissance: yup.string().required("required"),
});

export default UpdateProfil;