import React from "react";
import { Route, Routes } from "react-router-dom";
import CreateRestaurantForm from "../adminComponent/CreateRestaurantForm/CreateRestaurantForm";
import Admin from "../adminComponent/admin/Admin";
import { useSelector } from "react-redux";

const AdminRouter = () => {
  const { auth, restaurant } = useSelector((store) => store);
  return (
    <div>
      <Routes>
        <Route
          path="/*"
          element={
            !restaurant.usersRestaurant ? <CreateRestaurantForm /> : <Admin />
          }
        ></Route>
      </Routes>
    </div>
  );
};

export default AdminRouter;
