import React from "react";
import { Box, Button } from "@mui/material";
import HeadContent from '../../../components/dashboard/HeadContent';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useFetchDoctorsQuery } from "../../../store/apis/DoctorsApi";

function Medecins() {

    const { data, error, isLoading } = useFetchDoctorsQuery();


    const dataTransformed = [
        {
            id: 1,
            nom: "brahimi",
            prenom: "zakaria",
            date_naissance: "03/02/2021",
            lieu_naissance: 'alger',
            adresse: "elharrach kdjh lkf",
            email: "zaki@gmail.com",

        },
        {
            id: 2,
            nom: "gggg",
            prenom: "vvvv",
            date_naissance: "03/02/2021",
            lieu_naissance: 'alger',
            adresse: "elharrach kdjh lkf",
            email: "zaki@gmail.com",
        },
        {
            id: 3,
            nom: "sszszs",
            prenom: "ffff",
            date_naissance: "03/02/2021",
            lieu_naissance: 'alger',
            adresse: "elharrach kdjh lkf",
            email: "zaki@gmail.com",
        },
    ];

    const columns = [
        { field: "id", headerName: "ID" },
        {
            field: "nom",
            headerName: "Nom",
            flex: 1,
        },
        {
            field: "prenom",
            headerName: "Prénom",
            flex: 1,
        },
        {
            field: "date_naissance",
            headerName: "Date de naissance",
            flex: 1,
        },
        {
            field: "adresse",
            headerName: "Adresse",
            flex: 1,
        },
        {
            field: "actions",
            headerName: "Actions",
            flex: 1,
            renderCell: ({ row }) => (
                <Button
                    size="small"
                    variant="outlined"
                    color="primary"
                    component={Link}
                    to={`/admin/medecin/read`}
                    state={{ medecin: row }}
                >
                    Consulter
                </Button>
            ),
        },
    ];

    return (
        <div>
            <Box m="20px">
                <HeadContent title="Medecins" subtitle="Listes des medecins" />
                <Container fluid>
                    <Row className="text-end">
                        <Col>
                            <Button
                                size="medium"
                                className={"m-2 text-white bg-success"}
                                variant="outlined"
                                color="success"
                                component={Link}
                                to={`/admin/medecin/add`}
                            >
                                Créer nouveau
                            </Button>
                        </Col>
                    </Row>
                </Container>
                <Box m="40px 0 0 0" height="75vh">
                    <DataGrid
                        checkboxSelection
                        rows={dataTransformed}
                        columns={columns}
                        components={{ Toolbar: GridToolbar }}
                        localeText={{ noRowsLabel: "Pas de medecins" }}
                    />
                </Box>
            </Box>
        </div>
    );
}

export default Medecins;