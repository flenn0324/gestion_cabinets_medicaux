import React from "react";
import HeadContent from '../../../components/dashboard/HeadContent';
import { Link } from "react-router-dom";
import {
    Container,
    Row,
    Col,
    Modal,
    ModalBody,
    ModalFooter,
} from "reactstrap";
import { Box, Button } from "@mui/material";
import { useLocation } from "react-router-dom";

const ReadMedecin = () => {
    const [modal, setModal] = React.useState(false);

    const toggle = () => setModal(!modal);

    const location = useLocation();
    const { medecin } = location.state ? location.state : "";

    const handleRemoveSociete = async () => {
        setModal(!modal);
        window.location.replace("/admin");
    };

    return (
        <div data-testid="read-medecin">
            <Box m="20px">
                <HeadContent
                    title="Consulter un medecin"
                    subtitle="Consulter les informations d'un medecin"
                />
                <Container fluid>
                    <Row className="text-end">
                        <Col>
                            <Button
                                size="medium"
                                className={"m-2 text-white bg-success"}
                                variant="outlined"
                                color="success"
                                component={Link}
                                to={`/admin/medecin/update`}
                                state={{ medecin: medecin }}
                            >
                                Modifier
                            </Button>
                            <Button
                                className={"m-2 text-white bg-danger"}
                                size="medium"
                                variant="outlined"
                                style={{ color: "red" }}
                                onClick={toggle}
                            >
                                Supprimer
                            </Button>
                        </Col>
                    </Row>
                    <Row className="py-5">
                        <Col lg={6} md={6}>
                            <h3 className="fw-bold mb-4"><u>informations générales :</u></h3>
                            <div className="ms-5 my-1">
                                <span className="text-black fs-5">Nom :</span>
                                <span> {medecin ? medecin.nom : medecin} </span>
                            </div>
                            <div className="ms-5 my-1">
                                <span className="text-black fs-5">Prénom :</span>
                                <span> {medecin ? medecin.prenom : medecin} </span>
                            </div>
                            <div className="ms-5 my-1">
                                <span className="text-black fs-5">Date de naissance :</span>
                                <span> {medecin ? medecin.datenaissance : medecin} </span>
                            </div>
                            <div className="ms-5 my-1">
                                <span className="text-black fs-5">Lieu de naissance :</span>
                                <span> {medecin ? medecin.lieu_naissance : medecin} </span>
                            </div>
                            <div className="ms-5 my-1">
                                <span className="text-black fs-5">Email :</span>
                                <span> {medecin ? medecin.email : medecin} </span>
                            </div>
                            <div className="ms-5 my-1">
                                <span className="text-black fs-5">Adresse :</span>
                                <span> {medecin ? medecin.adresse : medecin} </span>
                            </div>
                        </Col>
    
                    </Row>
                </Container>
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalBody>
                        Etes vous sur de vouloir supprimer ce medecin ?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={handleRemoveSociete}>
                            Oui
                        </Button>{" "}
                        <Button color="secondary" onClick={toggle}>
                            Annuler
                        </Button>
                    </ModalFooter>
                </Modal>
            </Box>
        </div>
    );
};

export default ReadMedecin;