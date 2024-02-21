import { Box, Button, TextField } from "@mui/material";
import Alert from '@mui/material/Alert';
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import HeadContent from '../../../components/dashboard/HeadContent';


const AddDossier = () => {

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
          title="Ajouter un dossier patient"
          subtitle="Ajouter un nouveau dossier pour un patient"
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
                type="text"
                label="Nom"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.greffe}
                name="nom"
                error={!!touched.greffe && !!errors.greffe}
                helperText={touched.greffe && errors.greffe}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Prénom"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.forme_sociale}
                name="prenom"
                error={!!touched.forme_sociale && !!errors.forme_sociale}
                helperText={touched.forme_sociale && errors.forme_sociale}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Date de naissance"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.denomination}
                name="datenaissance"
                error={!!touched.denomination && !!errors.denomination}
                helperText={touched.denomination && errors.denomination}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="phone"
                label="Téléphone portable"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.denomination}
                name="telephone"
                error={!!touched.denomination && !!errors.denomination}
                helperText={touched.denomination && errors.denomination}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="email"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.denomination}
                name="email"
                error={!!touched.denomination && !!errors.denomination}
                helperText={touched.denomination && errors.denomination}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Genre"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.objet_sociale}
                name="genre"
                error={!!touched.objet_sociale && !!errors.objet_sociale}
                helperText={touched.objet_sociale && errors.objet_sociale}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Adresse"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.objet_sociale}
                name="adresse"
                error={!!touched.objet_sociale && !!errors.objet_sociale}
                helperText={touched.objet_sociale && errors.objet_sociale}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Ville"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.objet_sociale}
                name="ville"
                error={!!touched.objet_sociale && !!errors.objet_sociale}
                helperText={touched.objet_sociale && errors.objet_sociale}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Code postal"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.objet_sociale}
                name="codepostal"
                error={!!touched.objet_sociale && !!errors.objet_sociale}
                helperText={touched.objet_sociale && errors.objet_sociale}
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
const initialValues = {
  nss: "",
  nom: "",
  prenom: "",
  genre: "",
  datenaissance:"" ,
  adresse: "",
  ville: "",
  codepostal: "",
  telephone: "",
  email: "",
};

export default AddDossier;