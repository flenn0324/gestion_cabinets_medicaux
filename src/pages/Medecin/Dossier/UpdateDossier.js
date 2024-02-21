import { Box, Button, TextField } from "@mui/material";
import Alert from '@mui/material/Alert';
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import HeadContent from '../../../components/dashboard/HeadContent';
import { useLocation } from "react-router-dom";


const UpdateDossier = () => {

  const location = useLocation();
  const { dossier } = location.state ? location.state : "";

  const initialValues = {
    nss : dossier.nss,
    nom : dossier.nom,
    prenom: dossier.prenom,
    datenaissance: dossier.datenaissance,
    genre: dossier.genre,
    telephone: dossier.telephone,
    email: dossier.email,
    adresse: dossier.adresse,
  };

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const alert =()=>{
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
          title="Modifier un dossier patient"
          subtitle="Modifier le dossier pour ce patient"
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
                label="Prénom"
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
                type="date"
                label="Date de naissance"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.datenaissance}
                name="datenaissance"
                error={!!touched.datenaissance && !!errors.datenaissance}
                helperText={touched.datenaissance && errors.datenaissance}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="phone"
                label="Téléphone portable"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.telephone}
                name="telephone"
                error={!!touched.telephone && !!errors.telephone}
                helperText={touched.telephone && errors.telephone}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="email"
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
                label="Genre"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.genre}
                name="genre"
                error={!!touched.genre && !!errors.genre}
                helperText={touched.genre && errors.genre}
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
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Ville"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.ville}
                name="ville"
                error={!!touched.ville && !!errors.ville}
                helperText={touched.ville && errors.ville}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Code postal"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.codepostal}
                name="codepostal"
                error={!!touched.codepostal && !!errors.codepostal}
                helperText={touched.codepostal && errors.codepostal}
                sx={{ gridColumn: "span 2" }}
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


export default UpdateDossier;