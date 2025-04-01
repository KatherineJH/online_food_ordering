import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminRouter from "./AdminRouter";
import CustomerRouter from "./CustomerRouter";

const Routers = () => {
  return (
    <Routes>
      <Route path="/admin/restaurant/*" element={<AdminRouter />}></Route>
      <Route path="/*" element={<CustomerRouter />}></Route>
    </Routes>
  );
};

export default Routers;
