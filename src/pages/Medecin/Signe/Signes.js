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
import { useLocation } from "react-router-dom";
import { useFetchSignesQuery, useRemoveSigneMutation } from "../../../store";

function Documents() {

    const location = useLocation();
    const { signes } = location.state ? location.state : "";


    const { data, error, isLoading } = useFetchSignesQuery(signes.numero_securite_social);

    const [removeSigne, results] = useRemoveSigneMutation();


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

    const handleRemoveSigne = async (id) => {
        console.log(id);
        await removeSigne(id);
        //window.location.replace("/medecin/dossiers");
    };

    const dataTransformed = isLoading ? [] : data.listeSignesVitaux.map((item) => {
        return {
          id:item._id,
          nss: item.nss,
          frequence_cardiaque: item.frequence_cardiaque,
          frequence_resperatoire: item.frequence_resperatoire,
          temperature_corporelle: item.temperature_corporelle,
          tension_arterielle: item.tension_arterielle,
          date:item.date_creation
        };
      });

    const columns = [
        {
            field: "id",
            headerName: "id",
            flex: 1,
        },
        {
            field: "date",
            headerName: "Date",
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
                    onClick={()=> handleRemoveSigne(row.id)}
                >
                    Supprimer
                </Button>
            ),
        },
    ];

    return (
        <div>
            <Box m="20px">
                <HeadContent title="Signes vitaux du dossier numéro : " subtitle="Listes des signes vitaux du patient " />
                <Box m="40px 0 0 0">
                    <DataGrid
                        checkboxSelection
                        rows={dataTransformed}
                        columns={columns}
                        components={{ Toolbar: GridToolbar }}
                        localeText={{ noRowsLabel: "Pas de signes" }}
                    />
                </Box>
            </Box>
        </div>
    );
}

export default Documents;