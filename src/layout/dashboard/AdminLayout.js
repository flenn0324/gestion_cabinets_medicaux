import React from 'react'
import { useState } from "react"
import { Outlet  } from "react-router-dom"
import ProSideBar from '../../pages/AdminPanel/ProSideBar';
import Header from '../../components/dashboard/Header';

function AdminLayouts() {
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

export default AdminLayouts