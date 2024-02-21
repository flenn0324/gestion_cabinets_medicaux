import React from "react";
import HeadContent from '../../components/dashboard/HeadContent';
import "../../components/dashboard/dashboard.css";
import { useLocation } from "react-router-dom";



const Index = () => {
  const location = useLocation();
  const {payment} = location.state ? location.state : "";
  return (
    <main>
        <HeadContent title="Dashboard" subtitle="Nouvelles notifications"/>
        <p className="ms-5">    liste : {payment ? payment.name : payment}</p>
    </main>
  );
};

export default Index;