import React from 'react'
import { useState } from "react"
import { Outlet  } from "react-router-dom"
import ProSideBar from '../../pages/Medecin/ProSideBar';
import Header from '../../components/dashboard/Header';

function MedecinLayout() {
    const [isSidebar, setIsSidebar] = useState(true);

      return (
        <div className="app">
          <ProSideBar isSidebar={isSidebar} />
          <main className="content">
            <Header setIsSidebar={setIsSidebar} />
            <Outlet />
          </main>
        </div>
      );
}

export default MedecinLayout