import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar, Footer, Sidebar } from "../components";

const SharedLayout = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <section>
        <Outlet />
      </section>
      <Footer />
    </>
  );
};

export default SharedLayout;
