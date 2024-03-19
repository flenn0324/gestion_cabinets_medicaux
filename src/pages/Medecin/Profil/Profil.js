import React from "react";
import HeadContent from '../../../components/dashboard/HeadContent';
import "../../../components/dashboard/dashboard.css";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { Box, Button } from "@mui/material";
import 'bootstrap/dist/css/bootstrap.min.css';



const Profil = () => {

  const profil = {
    nom: 'zaki',
    prenom: 'pino'
  }

  return (
    <div>
      <Box m="20px">
        <HeadContent title="Profil" subtitle="Mes informations personnelles" />
        <Container fluid>
          <Row className="text-end">
            <Col>
              <Button
                size="medium"
                className={"m-2 text-white bg-success"}
                variant="outlined"
                color="success"
                component={Link}
                to={`/medecin/profil/update`}
                state={{ profil: profil }}
              >
                Modifier
              </Button>
            </Col>
          </Row>

          <Row className="border py-5">
            <Col lg={6} md={6}>
              <div className="ms-5 my-1">
                <span className="text-black fs-5">Nom :</span>
                <span> {profil ? profil.nom : profil} </span>
              </div>
              <div className="ms-5 my-1">
                <span className="text-black fs-5">Prénom :</span>
                <span> {profil ? profil.prenom : profil} </span>
              </div>
              <div className="ms-5 my-1">
                <span className="text-black fs-5">Date de naissance :</span>
                <span> {profil ? profil.date_naissance : profil} </span>
              </div>
              <div className="ms-5 my-1">
                <span className="text-black fs-5">Email :</span>
                <span> {profil ? profil.email : profil} </span>
              </div>
              <div className="ms-5 my-1">
                <span className="text-black fs-5">Adresse :</span>
                <span> {profil ? profil.adresse : profil} </span>
              </div>
            </Col>
          </Row>
        </Container>
      </Box>
    </div>
  );
};

export default Profil;