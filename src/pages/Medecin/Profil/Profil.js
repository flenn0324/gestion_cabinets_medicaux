import React from "react";
import HeadContent from '../../../components/dashboard/HeadContent';
import "../../../components/dashboard/dashboard.css";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { Box, Button } from "@mui/material";
import 'bootstrap/dist/css/bootstrap.min.css';



const Profil = () => {

const profil = {
  nom : 'zaki',
  prenom : 'pino'
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
                <span className="text-black fs-5 fw-bold">Nom :</span>
                <span className="text-black fs-5"> {profil.nom} </span>
              </div>
              <div className="ms-5 my-1">
                <span className="text-black fs-5 fw-bold">Prénom :</span>
                <span className="text-black fs-5">  {profil.prenom} </span>
              </div>
              <div className="ms-5 my-1">
                <span className="text-black fs-5 fw-bold">Date de naissance :</span>
                <span className="text-black fs-5">  </span>
              </div>
              <div className="ms-5 my-1">
                <span className="text-black fs-5 fw-bold">Lieu de naissance :</span>
                <span className="text-black fs-5">  </span>
              </div>
              <div className="ms-5 my-1">
                <span className="text-black fs-5 fw-bold">Adresse :</span>
                <span className="text-black fs-5">  </span>
              </div>
              <div className="ms-5 my-1">
                <span className="text-black fs-5 fw-bold">Email :</span>
                <span className="text-black fs-5">  </span>
              </div>
              <div className="ms-5 my-1">
                <span className="text-black fs-5 fw-bold">Mot de passe :</span>
                <span className="text-black fs-5">  </span>
              </div>
            </Col>
            <Col lg={6} md={6} className="text-center d-flex justify-content-center align-items-center">
              <div className="ms-5 my-1">
                <img src="https://picsum.photos/300/200" className="img-fluid rounded-circle" alt="profil pic"/>
              </div>
            </Col>
          </Row>
        </Container>
      </Box>
    </div>
  );
};

export default Profil;