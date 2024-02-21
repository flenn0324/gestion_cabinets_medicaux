import React from "react";
import { Box, Button } from "@mui/material";
import HeadContent from '../../../components/dashboard/HeadContent';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import {
    Container, Row, Col, Modal,
    ModalBody,
    ModalFooter
} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function Documents() {

    const [modal, setModal] = React.useState(false);

    const toggle = () => setModal(!modal);

    const handleRemoveSigne = async () => {
        setModal(!modal);
        window.location.replace("/medecin");
    };

    const dataTransformed = [
        {
            id: 1,
            frequence_cardiaque: 14.5,
            tension_arterielle: 10.5,
            frequence_resperatoire: 4.5,
            temperature_corporelle: 74.5,
            date: '12/12/2023'
        },
        {
            id: 2,
            frequence_cardiaque: 14.5,
            tension_arterielle: 10.5,
            frequence_resperatoire: 4.5,
            temperature_corporelle: 74.5,
            date: '12/45/7852'
        },
        {
            id: 3,
            frequence_cardiaque: 14.5,
            tension_arterielle: 10.5,
            frequence_resperatoire: 4.5,
            temperature_corporelle: 74.5,
            date: '12/45/7852'
        },
    ];

    const columns = [
        {
            field: "date",
            headerName: "date",
            flex: 1,
        },
        {
            field: "frequence_cardiaque",
            headerName: "Fréquence Cardiaque",
            flex: 1,
        },
        {
            field: "tension_arterielle",
            headerName: "Tension Arterielle",
            flex: 1,
        },
        {
            field: "frequence_resperatoire",
            headerName: "Fréquence Resperatoire",
            flex: 1,
        },
        {
            field: "temperature_corporelle",
            headerName: "Temperature Corporelle",
            flex: 1,
        },
        {
            field: "actions",
            headerName: "Actions",
            flex: 1,
            renderCell: ({ row }) => (
                <Button
                    className="ms-1"
                    size="small"
                    variant="outlined"
                    color="error"
                    onClick={toggle}
                >
                    Supprimer
                </Button>
            ),
        },
    ];

    return (
        <div>
            <Box m="20px">
                <HeadContent title="Signes vitaux du dossier numéro : " subtitle="Listes des signes vitaux du patient ......." />
                <Container fluid>
                    <Row className="text-end">
                        <Col>
                            <Button
                                size="medium"
                                className={"m-2 text-white bg-success"}
                                variant="outlined"
                                color="success"
                                component={Link}
                                to={`/medecin/dossier/signe/add`}
                            >
                                Ajouter nouveau
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
                        localeText={{ noRowsLabel: "Pas de signes" }}
                    />
                </Box>
            </Box>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalBody>
                    Etes vous sur de vouloir supprimer ce signe ?
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleRemoveSigne}>
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