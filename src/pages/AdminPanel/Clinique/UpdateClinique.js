import { Box, Button, TextField } from "@mui/material";
import Alert from '@mui/material/Alert';
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import HeadContent from '../../../components/dashboard/HeadContent';
import { useLocation } from "react-router-dom";
import { useUpdateCliniqueMutation } from "../../../store/apis/CliniquesApi";


const UpdateClinique = () => {

    const location = useLocation();
    const { clinique } = location.state ? location.state : "";

    const initialValues = {
        numero_rue: clinique.numero_rue,
        nom_rue: clinique.nom_rue,
        code_postal: clinique.code_postal,
        ville: clinique.ville,
        pays: clinique.pays,
        nom: clinique.nom,
    };

    const isNonMobile = useMediaQuery("(min-width:600px)");

    const alert = () => {
        return (<Alert severity="success">This is a success alert — check it out!</Alert>);
    }

    const [UpdateClinique, results] = useUpdateCliniqueMutation();


    const handleFormSubmit = async (values) => {
        values.id = clinique.id;
        console.log(values);
        await UpdateClinique(values);
        //window.location.replace('/admin/cliniques');
    };



    return (
        <Box m="20px" data-testid="update-clinique">
            <HeadContent
                title="Modifier clinique"
                subtitle="Modifier cette clinique"
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
                                label="Numéro rue"
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
    numero_rue: yup.string().required("required"),
    nom: yup.string().required("required"),
    nom_rue: yup.string().required("required"),
    code_postal: yup.string().required("required"),
    ville: yup.string().required("required"),
    pays: yup.string().required("required"),
  });

export default UpdateClinique;