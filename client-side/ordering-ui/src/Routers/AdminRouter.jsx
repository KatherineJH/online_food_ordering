import React from "react";
import { Route, Routes } from "react-router-dom";
import CreateRestaurantForm from "../adminComponent/CreateRestaurantForm/CreateRestaurantForm";
import Admin from "../adminComponent/admin/Admin";

const AdminRouter = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/*"
          element={false ? <CreateRestaurantForm /> : <Admin />}
        ></Route>
      </Routes>
    </div>
  );
};

export default AdminRouter;
