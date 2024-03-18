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
import { useRemoveCliniqueMutation } from "../../../store/apis/CliniquesApi";

const ReadClinique = () => {
    const [modal, setModal] = React.useState(false);

    const toggle = () => setModal(!modal);

    const location = useLocation();
    const { clinique } = location.state ? location.state : "";

    const [removeClinique, results] = useRemoveCliniqueMutation();



    const handleRemoveClinique = async () => {
        await removeClinique(clinique);
        setModal(!modal);
        window.location.replace("/admin/cliniques");
    };

    return (
        <div data-testid="read-clinique">
            <Box m="20px">
                <HeadContent
                    title="Consulter une clinique"
                    subtitle="Consulter les informations d'une clinique"
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
                                to={`/admin/clinique/update`}
                                state={{ clinique: clinique }}
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
                            <h3 className="fw-bold mb-4"><u>informations sur la clinique :</u></h3>
                            <div className="ms-5 my-1">
                                <span className="text-black fs-5">Nom de la clinique :</span>
                                <span> {clinique ? clinique.nom : clinique} </span>
                            </div>
                            <div className="ms-5 my-1">
                                <span className="text-black fs-5">Numero de la rue :</span>
                                <span> {clinique ? clinique.numero_rue : clinique} </span>
                            </div>
                            <div className="ms-5 my-1">
                                <span className="text-black fs-5">Nome de la rue :</span>
                                <span> {clinique ? clinique.nom_rue : clinique} </span>
                            </div>
                            <div className="ms-5 my-1">
                                <span className="text-black fs-5">Code postal :</span>
                                <span> {clinique ? clinique.code_postal : clinique} </span>
                            </div>
                            <div className="ms-5 my-1">
                                <span className="text-black fs-5">Ville :</span>
                                <span> {clinique ? clinique.ville : clinique} </span>
                            </div>
                            <div className="ms-5 my-1">
                                <span className="text-black fs-5">Pays :</span>
                                <span> {clinique ? clinique.pays : clinique} </span>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalBody>
                        Etes vous sur de vouloir supprimer cette clinique ?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={handleRemoveClinique}>
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

export default ReadClinique;