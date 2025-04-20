import React from "react";
import { Route, Routes } from "react-router-dom";
import CreateRestaurantForm from "../adminComponent/createRestaurantForm/CreateRestaurantForm";
import Admin from "../adminComponent/admin/Admin";
import { useSelector } from "react-redux";

const AdminRouter = () => {
  const restaurant = useSelector((state) => state.restaurant.usersRestaurant);
  return (
    <div>
      <Routes>
        <Route
          path="/*"
          element={!restaurant ? <CreateRestaurantForm /> : <Admin />}
        />
      </Routes>
    </div>
  );
};

export default AdminRouter;
