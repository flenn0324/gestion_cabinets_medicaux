import React from 'react';
import Alert from '@mui/material/Alert';
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import HeadContent from '../../../components/dashboard/HeadContent';
import { TextField, Button, Box } from '@mui/material';



const AddDocument = () => {

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
                title="Ajouter un document"
                subtitle="Ajouter un nouveau document pour un patient"
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
                                label="Nom du document"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.siren}
                                name="nom"
                                error={!!touched.siren && !!errors.siren}
                                helperText={touched.siren && errors.siren}
                                sx={{ gridColumn: "span 2" }}
                            />

                            <TextField
                                fullWidth
                                variant="filled"
                                type="textarea"
                                label="Description"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.objet_sociale}
                                name="description"
                                error={!!touched.objet_sociale && !!errors.objet_sociale}
                                helperText={touched.objet_sociale && errors.objet_sociale}
                                sx={{ gridColumn: "span 4" }}
                            />

                            <TextField
                                fullWidth
                                variant="filled"
                                type="file"
                                label="Document"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.objet_sociale}
                                name="document"
                                error={!!touched.objet_sociale && !!errors.objet_sociale}
                                helperText={touched.objet_sociale && errors.objet_sociale}
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
    document: yup.string().required("required"),
    nom: yup.string().required("required"),
});
const initialValues = {
    nom: "",
    description: "",
};

export default AddDocument;