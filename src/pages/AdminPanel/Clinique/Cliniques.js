import React from "react";
import { Box, Button } from "@mui/material";
import HeadContent from '../../../components/dashboard/HeadContent';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function Cliniques() {

    const dataTransformed = [
        {
            id:1,
            adresse: "kdkcdkjcdjkcd",
            nom: 'clinique bibicho',
        },
        {
            id:2,
            adresse: "alo alo kda mena",
            nom: 'clinique dabicho',
        },
        {
            id:3,
            adresse: "mena melhih dabich",
            nom: 'clinique pino',
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
          to={`/admin/clinique/read`}
          state={{ clinique: row }}
        >
          Consulter
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Box m="20px">
        <HeadContent title="Cliniques" subtitle="Listes des cliniques" />
        <Container fluid>
          <Row className="text-end">
            <Col>
              <Button
                size="medium"
                className={"m-2 text-white bg-success"}
                variant="outlined"
                color="success"
                component={Link}
                to={`/admin/clinique/add`}
              >
                Créer nouvelle
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
            localeText={{ noRowsLabel: "Pas de clinique" }}
          />
        </Box>
      </Box>
    </div>
  );
}

export default Cliniques;