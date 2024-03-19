import { Box, Button, TextField } from "@mui/material";
import Alert from '@mui/material/Alert';
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import HeadContent from '../../../components/dashboard/HeadContent';
import { useLocation } from "react-router-dom";
import { useUpdateDossierMutation } from "../../../store/apis/DossiersApi";


const UpdateDossier = () => {

  const location = useLocation();
  const { dossier } = location.state ? location.state : "";

  const initialValues = {
    numero_securite_social : dossier.numero_securite_social,
    nom : dossier.nom,
    prenom: dossier.prenom,
    date_naissance: dossier.date_naissance,
    genre: dossier.genre,
    numero_rue: dossier.numero_rue,
    nom_rue: dossier.nom_rue,
    code_postal: dossier.code_postal,
    ville: dossier.ville,
    pays: dossier.pays,
  };

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const alert =()=>{
    return (<Alert severity="success">This is a success alert — check it out!</Alert>);
  }

  const [UpdatePatient, results] = useUpdateDossierMutation();

  const handleFormSubmit = async (values) => {
        values.id = dossier.id;
        console.log(values);
        const reponse = await UpdatePatient(values);
        console.log(reponse);
        window.location.replace('/medecin/dossiers');
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
                value={values.numero_securite_social}
                name="numero_securite_social"
                error={!!touched.numero_securite_social && !!errors.numero_securite_social}
                helperText={touched.numero_securite_social && errors.numero_securite_social}
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
                label="Numero rue"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.numero_rue}
                name="numero_rue"
                error={!!touched.numero_rue && !!errors.numero_rue}
                helperText={touched.numero_rue && errors.numero_rue}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Nom rue"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.nom_rue}
                name="nom_rue"
                error={!!touched.nom_rue && !!errors.nom_rue}
                helperText={touched.nom_rue && errors.nom_rue}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Code postal"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.code_postal}
                name="code_postal"
                error={!!touched.code_postal && !!errors.code_postal}
                helperText={touched.code_postal && errors.code_postal}
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
                label="Pays"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.pays}
                name="pays"
                error={!!touched.pays && !!errors.pays}
                helperText={touched.pays && errors.pays}
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
    numero_securite_social: yup.string().required("required"),
    nom: yup.string().required("required"),
    prenom: yup.string().required("required"),
    date_naissance: yup.string().required("required"),
    genre: yup.string().required("required"),
    numero_rue: yup.string().required("required"),
    nom_rue: yup.string().required("required"),
    code_postal: yup.string().required("required"),
    ville: yup.string().required("required"),
    pays: yup.string().required("required"),
  });


export default UpdateDossier;