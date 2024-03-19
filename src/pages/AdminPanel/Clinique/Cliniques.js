import React from "react";
import { Box, Button } from "@mui/material";
import HeadContent from '../../../components/dashboard/HeadContent';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useFetchCliniquesQuery } from "../../../store/apis/CliniquesApi";

function Cliniques() {

  const { data, error, isLoading } = useFetchCliniquesQuery();

  if (error) {
    return (
      <Container>
        <h1 className="mt-5 text-center">ERREUR 500</h1>
        <h3 className="m-5 text-center">
          erreur de chargement du liste des cliniques
        </h3>
      </Container>
    );
  }


  const dataTransformed = isLoading ? [] : data.listeClinique.map((item) => {
    return {
      id: item._id,
      nom: item.nom,
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
      field: "nom",
      headerName: "Nom",
      flex: 1,
    },
    {
      field: "numero_rue",
      headerName: "Numéro rue",
      flex: 1,
    },
    {
      field: "nom_rue",
      headerName: "Nom rue",
      flex: 1,
    },
    {
      field: "ville",
      headerName: "Ville",
      flex: 1,
    },
    {
      field: "pays",
      headerName: "Pays",
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
    <div data-testid="cliniques">
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
        <Box m="40px 0 0 0">
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