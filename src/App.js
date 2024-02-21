import React from 'react';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/authpages/login';
import AdminLayouts from './layout/dashboard/AdminLayout';
import MedecinLayout from './layout/dashboard/MedecinLayout';
import IndexAdmin from './pages/AdminPanel/index';
import IndexMedecin from './pages/Medecin/index';
import Profil from './pages/Medecin/Profil/Profil';
import AddDossier from './pages/Medecin/Dossier/AddDossier';
import Dossiers from './pages/Medecin/Dossier/Dossiers';
import ReadDossier from './pages/Medecin/Dossier/ReadDossier';
import AddConsultation from './pages/Medecin/Consultation/AddConsultation';
import Consultations from './pages/Medecin/Consultation/Consultations';
import ReadConsultation from './pages/Medecin/Consultation/ReadConsultation';
import AddDocument from './pages/Medecin/Document/AddDocument';
import AddSigne from './pages/Medecin/Signe/AddSigne';
import Documents from './pages/Medecin/Document/Documents';
import Signes from './pages/Medecin/Signe/Signes';
import UpdateProfil from './pages/Medecin/Profil/UpdateProfil';
import UpdateDossier from './pages/Medecin/Dossier/UpdateDossier';
import UpdateConsultation from './pages/Medecin/Consultation/UpdateConsultation';
import ReadClinique from './pages/AdminPanel/Clinique/ReadClinique';
import Cliniques from './pages/AdminPanel/Clinique/Cliniques';
import AddClinique from './pages/AdminPanel/Clinique/AddClinique';
import UpdateClinique from './pages/AdminPanel/Clinique/UpdateClinique';
import Medecins from './pages/AdminPanel/Medecin/Medecins';
import AddMedecin from './pages/AdminPanel/Medecin/AddMedecin';
import ReadMedecin from './pages/AdminPanel/Medecin/ReadMedecin';
import UpdateMedecin from './pages/AdminPanel/Medecin/UpdateMedecin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path={`/admin`} element={<AdminLayouts />}>
            <Route path={`/admin`} element={<IndexAdmin />} />
            <Route path={`/admin/cliniques`} element={<Cliniques />} />
            <Route path={`/admin/clinique/read`} element={<ReadClinique />} />
            <Route path={`/admin/clinique/add`} element={<AddClinique />} />
            <Route path={`/admin/clinique/update`} element={<UpdateClinique />} />

            <Route path={`/admin/medecins`} element={<Medecins />} />
            <Route path={`/admin/medecin/add`} element={<AddMedecin />} />
            <Route path={`/admin/medecin/read`} element={<ReadMedecin />} />
            <Route path={`/admin/medecin/update`} element={<UpdateMedecin />} />
        </Route>

        <Route path={`/medecin`} element={<MedecinLayout />}>
            <Route path={`/medecin`} element={<IndexMedecin />} />
            <Route path={`/medecin/profil`} element={<Profil />} />
            <Route path={`/medecin/profil/update`} element={<UpdateProfil />} />

            <Route path={`/medecin/dossier/add`} element={<AddDossier />} />
            <Route path={`/medecin/dossier/read`} element={<ReadDossier />} />
            <Route path={`/medecin/dossier/update`} element={<UpdateDossier />} />
            <Route path={`/medecin/dossiers`} element={<Dossiers />} />

            <Route path={`/medecin/consultation/add`} element={<AddConsultation />} />
            <Route path={`/medecin/consultations`} element={<Consultations />} />
            <Route path={`/medecin/consultation/read`} element={<ReadConsultation />} />
            <Route path={`/medecin/consultation/update`} element={<UpdateConsultation />} />

            <Route path={`/medecin/dossier/document/add`} element={<AddDocument />} />
            <Route path={`/medecin/dossier/documents`} element={<Documents />} />

            <Route path={`/medecin/dossier/signe/add`} element={<AddSigne />} />
            <Route path={`/medecin/dossier/signes`} element={<Signes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
