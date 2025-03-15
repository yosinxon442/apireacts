import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const AppLayout = () => {
  return (
    <div>
      <Header />  {/* Header har doim ekranda turadi */}
      <main>
        <Outlet /> {/* Ichki sahifalar shu joyda ko‘rinadi */}
      </main>
    </div>
  );
};

export default AppLayout;
