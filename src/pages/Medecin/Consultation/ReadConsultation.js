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

const ReadConsultation = () => {
    const [modal, setModal] = React.useState(false);

    const toggle = () => setModal(!modal);

    const location = useLocation();
    const { consultation } = location.state ? location.state : "";

    const handleRemoveSociete = async () => {
        setModal(!modal);
        window.location.replace("/medecin");
    };

    return (
        <div>
            <Box m="20px">
                <HeadContent
                    title="Consulter une consultation d'un patient"
                    subtitle="Consulter les informations d'une consultation"
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
                                to={`/medecin/consultation/update`}
                                state={{ consultation: consultation }}
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
                            <h3 className="fw-bold mb-4"><u>informations de la consultation :</u></h3>
                            <div className="ms-5 my-1">
                                <span className="text-black fs-5">Numéro sécurité social :</span>
                                <span> {consultation ? consultation.nss : consultation} </span>
                            </div>
                            <div className="ms-5 my-1">
                                <span className="text-black fs-5">Note :</span>
                                <span> {consultation ? consultation.note : consultation} </span>
                            </div>
                            <div className="ms-5 my-1">
                                <span className="text-black fs-5">Résultat :</span>
                                <span> {consultation ? consultation.resultat : consultation} </span>
                            </div>
                            <div className="ms-5 my-1">
                                <span className="text-black fs-5">Ordonnance :</span>
                                <span>  </span>
                            </div>
                            <div className="ms-5 my-1">
                                <span className="text-black fs-5">Justificatif médical :</span>
                                <span>  </span>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalBody>
                        Etes vous sur de vouloir supprimer ce consultation ?
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

export default ReadConsultation;