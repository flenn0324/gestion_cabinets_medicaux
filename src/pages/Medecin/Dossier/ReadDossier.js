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

const ReadDossier = () => {
    const [modal, setModal] = React.useState(false);

    const toggle = () => setModal(!modal);

    const location = useLocation();
    const { dossier } = location.state ? location.state : "";

    const handleRemoveSociete = async () => {
        setModal(!modal);
        window.location.replace("/medecin");
    };

    return (
        <div>
            <Box m="20px">
                <HeadContent
                    title="Consulter un dossier patient"
                    subtitle="Consulter les informations d'un dossier patient"
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
                                to={`/medecin/dossier/update`}
                                state={{ dossier: dossier }}
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
                            <h3 className="fw-bold mb-4"><u>informations personnelles :</u></h3>
                            <div className="ms-5 my-1">
                                <span className="text-black fs-5">Numéro sécurité social :</span>
                                <span> {dossier ? dossier.nss : dossier} </span>
                            </div>
                            <div className="ms-5 my-1">
                                <span className="text-black fs-5">Nom :</span>
                                <span> {dossier ? dossier.nom : dossier} </span>
                            </div>
                            <div className="ms-5 my-1">
                                <span className="text-black fs-5">Prénom :</span>
                                <span> {dossier ? dossier.prenom : dossier} </span>
                            </div>
                            <div className="ms-5 my-1">
                                <span className="text-black fs-5">Date de naissance :</span>
                                <span> {dossier ? dossier.datenaissance : dossier} </span>
                            </div>
                            <div className="ms-5 my-1">
                                <span className="text-black fs-5">Genre :</span>
                                <span> {dossier ? dossier.genre : dossier} </span>
                            </div>
                            <div className="ms-5 my-1">
                                <span className="text-black fs-5">Téléphone Portable :</span>
                                <span> {dossier ? dossier.telephone : dossier} </span>
                            </div>
                            <div className="ms-5 my-1">
                                <span className="text-black fs-5">Email :</span>
                                <span> {dossier ? dossier.email : dossier} </span>
                            </div>
                            <div className="ms-5 my-1">
                                <span className="text-black fs-5">Adresse :</span>
                                <span> {dossier ? dossier.adresse : dossier} </span>
                            </div>
                            <div className="ms-5 my-1">
                                <span className="text-black fs-5">Ville :</span>
                                <span> {dossier ? dossier.ville : dossier} </span>
                            </div>
                        </Col>
                        <Col lg={6} md={6}>
                            <h4 className="fw-bold mb-1"><u>Document médical :</u></h4>
                            <Row className="mb-5">
                                <Col>
                                    <div>
                                        <span className="text-black fs-5">Consulter la liste du documents :</span>
                                        <Button
                                            size="small"
                                            className={"m-2"}
                                            variant="outlined"
                                            color="primary"
                                            component={Link}
                                            to={`/medecin/dossier/documents`}
                                        >
                                            Consulter
                                        </Button>
                                    </div>
                                    <div>
                                        <span className="text-black fs-5">Ajouter un nouveau document pour ce patient :</span>
                                        <Button
                                            size="small"
                                            className={"m-2"}
                                            variant="outlined"
                                            color="success"
                                            component={Link}
                                            to={`/medecin/dossier/document/add`}
                                        >
                                            Ajouter
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                            <h4 className="fw-bold"><u>Signe vitaux :</u></h4>
                            <Row>
                                <Col>
                                    <div>
                                        <span className="text-black fs-5">Consulter la liste des anciens signes vitaux :</span>
                                        <Button
                                            size="small"
                                            className={"m-2"}
                                            variant="outlined"
                                            color="primary"
                                            component={Link}
                                            to={`/medecin/dossier/signes`}
                                        >
                                            Consulter
                                        </Button>
                                    </div>
                                    <div>
                                        <span className="text-black fs-5">Ajouter des nouveau signes viteaux pour ce patient :</span>
                                        <Button
                                            size="small"
                                            className={"m-2"}
                                            variant="outlined"
                                            color="success"
                                            component={Link}
                                            to={`/medecin/dossier/signe/add`}
                                        >
                                            Ajouter
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalBody>
                        Etes vous sur de vouloir supprimer ce dossier ?
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

export default ReadDossier;