import React from "react";
import { Box, Button } from "@mui/material";
import HeadContent from '../../../components/dashboard/HeadContent';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function Consultations() {

    const dataTransformed = [
        {
          id:1,
          nss: 12345,
          nom: 'zakaria',
          prenom: 'Paris',
          datenaissance: 'SARL',
          genre: 'Ma Société 1',
          adresse: 'Fourniture de services 1',
          ville: '2024-02-07',
          codepostal: 'Illimitée',
          telephone: '10000 EUR',
          email: 'Annuel',
        },
        {
            id:2,
            nss: 1,
            nom: 'zakaria',
            prenom: 'Paris',
            datenaissance: 'SARL',
            genre: 'Ma Société 1',
            adresse: 'Fourniture de services 1',
            ville: '2024-02-07',
            codepostal: 'Illimitée',
            telephone: '10000 EUR',
            email: 'Annuel',
        },
        {
            id:3,
            nss: 1,
            nom: 'pino',
            prenom: 'Paris',
            datenaissance: 'SARL',
            genre: 'Ma Société 1',
            adresse: 'Fourniture de services 1',
            ville: '2024-02-07',
            codepostal: 'Illimitée',
            telephone: '10000 EUR',
            email: 'Annuel',
        },
      ];

  const columns = [
    { field: "id", headerName: "ID" },
    {
        field: "nss",
        headerName: "Num secu social",
        flex: 1,
      },
    {
      field: "nom",
      headerName: "Nom",
      flex: 1,
    },
    {
      field: "prenom",
      headerName: "Prenom",
      flex: 1,
    },
    {
      field: "datenaissance",
      headerName: "Date de naissance",
      flex: 1,
    },
    {
      field: "genre",
      headerName: "Genre",
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
          to={`/medecin/consultation/read`}
          state={{ consultation: row }}
        >
          Consulter
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Box m="20px">
        <HeadContent title="Consultations" subtitle="Listes des consultations des patients" />
        <Container fluid>
          <Row className="text-end">
            <Col>
              <Button
                size="medium"
                className={"m-2 text-white bg-success"}
                variant="outlined"
                color="success"
                component={Link}
                to={`/medecin/dossier/add`}
              >
                Créer une nouvelle
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
            localeText={{ noRowsLabel: "Pas de dossiers" }}
          />
        </Box>
      </Box>
    </div>
  );
}

export default Consultations;