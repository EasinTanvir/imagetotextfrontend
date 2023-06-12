import React from "react";
import { Outlet } from "react-router-dom";
import Headers from "./Headers";

const Layout = () => {
  return (
    <>
      <Headers />
      <Outlet />
    </>
  );
};

export default Layout;
