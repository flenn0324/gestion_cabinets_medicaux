import React from "react";
import { Box, Button } from "@mui/material";
import HeadContent from '../../../components/dashboard/HeadContent';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useFetchDossiersQuery } from "../../../store/apis/DossiersApi";

function Dossiers() {

  const { data, error, isLoading } = useFetchDossiersQuery();

  if (error) {
    return (
      <Container>
        <h1 className="mt-5 text-center">ERREUR 500</h1>
        <h3 className="m-5 text-center">
          erreur de chargement du liste des patients
        </h3>
      </Container>
    );
  }


  const dataTransformed = isLoading ? [] : data.listOfPatients.map((item) => {
    return {
      id: item._id,
      nom: item.nom,
      prenom: item.prenom,
      numero_securite_social: item.numero_securite_social,
      date_naissance: item.date_naissance,
      genre: item.genre,
      numero_rue: item.address?.numero_rue || '', 
      nom_rue: item.address?.nom_rue || '', 
      code_postal: item.address?.code_postal || '', 
      ville: item.address?.ville || '', 
      pays: item.address?.pays || '',
    };
  });

  const columns = [
    { field: "id", headerName: "ID" },
    {
        field: "numero_securite_social",
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
      field: "date_naissance",
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
          to={`/medecin/dossier/read`}
          state={{ dossier: row }}
        >
          Consulter
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Box m="20px">
        <HeadContent title="Dossiers" subtitle="Listes des dossiers patients" />
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
                Créer nouveau
              </Button>
            </Col>
          </Row>
        </Container>
        <Box m="40px 0 0 0">
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

export default Dossiers;