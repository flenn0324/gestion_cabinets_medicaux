import { Box, Button, TextField } from "@mui/material";
import Alert from '@mui/material/Alert';
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import HeadContent from '../../../components/dashboard/HeadContent';


const AddClinique = () => {

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const alert =()=>{
    return (<Alert severity="success">This is a success alert — check it out!</Alert>);
  }

  const handleFormSubmit = async (values) => {
    console.log(values)
    alert()
    window.location.replace('/admin')
  };

  

  return (
    <Box m="20px">
      <HeadContent
          title="Nouvelle clinique"
          subtitle="Ajouter une nouvelle clinique"
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
                sx={{ gridColumn: "span 4" }}
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
  adresse: yup.string().required("required"),
  nom: yup.string().required("required"),
});
const initialValues = {
  adresse: "",
  nom: "",
};

export default AddClinique;