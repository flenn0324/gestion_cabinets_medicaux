import React from "react";
import { Box, Button } from "@mui/material";
import HeadContent from '../../../components/dashboard/HeadContent';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { Container, Row, Col,Modal,
  ModalBody,
  ModalFooter } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function Documents() {

  const [modal, setModal] = React.useState(false);

  const toggle = () => setModal(!modal);

  const handleRemoveDocument = async () => {
    setModal(!modal);
    window.location.replace("/medecin");
};

  const dataTransformed = [
    {
      id: 1,
      description: 12345,
      nom: 'zakaria',
      fichier: 'Paris',
      date: '12/45/7852'
    },
    {
      id: 2,
      description: 1,
      nom: 'zakaria',
      fichier: 'Paris',
      date: '12/45/7852'
    },
    {
      id: 3,
      description: 1,
      nom: 'pino',
      fichier: 'file',
      date: '12/45/7852'
    },
  ];

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "nom",
      headerName: "Nom de document",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
    },
    {
      field: "fichier",
      headerName: "Fichier",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: ({ row }) => (
        <Box>
          <Button
            size="small"
            variant="outlined"
            color="primary"
            component={Link}
            to={`/telecharger`}
            state={{ document: row }}
          >
            Consulter
          </Button>
          <Button
            className="ms-1"
            size="small"
            variant="outlined"
            color="error"
            onClick={toggle}
          >
            Supprimer
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <div>
      <Box m="20px">
        <HeadContent title="Documents du dossier numéro : " subtitle="Listes des documents du patient ......." />
        <Container fluid>
          <Row className="text-end">
            <Col>
              <Button
                size="medium"
                className={"m-2 text-white bg-success"}
                variant="outlined"
                color="success"
                component={Link}
                to={`/medecin/dossier/document/add`}
              >
                Ajouter nouveau
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
            localeText={{ noRowsLabel: "Pas de documents" }}
          />
        </Box>
      </Box>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalBody>
          Etes vous sur de vouloir supprimer ce document ?
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleRemoveDocument}>
            Oui
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Annuler
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default Documents;