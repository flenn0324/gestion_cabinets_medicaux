import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import HeadContent from '../../../components/dashboard/HeadContent';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useFetchDoctorsQuery } from "../../../store/apis/DoctorsApi";

function Medecins() {

    const { data, error, isLoading } = useFetchDoctorsQuery();


   if (error) {
    return (
      <Container>
        <h1 className="mt-5 text-center">ERREUR 500</h1>
        <h3 className="m-5 text-center">
          erreur de chargement du liste des medecins
        </h3>
      </Container>
    );
  }


    const dataTransformed = isLoading ? [] : data.doctors.map((item) => {
        return {
          id: item._id,
          nom: item.nom,
          prenom: item.prenom,
          date_naissance: item.date_naissance,
          email: item.email,
          id_clinique: item.id_clinique,
        };
      });

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
        <div data-testid="medecin">
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
                        loading={isLoading}
                        error={error}
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