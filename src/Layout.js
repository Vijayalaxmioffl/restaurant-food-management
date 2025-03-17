import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Header />
      <div className="container mt-3">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
