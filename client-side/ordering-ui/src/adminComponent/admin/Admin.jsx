import React from "react";
import AdminSideBar from "./AdminSideBar";
import { Route, Routes } from "react-router-dom";
import FoodCategory from "../foodCategory/FoodCategory";
import Ingredients from "../ingredients/Ingredients";
import Events from "../events/Events";
import CreateRestaurantForm from "../CreateRestaurantForm/CreateRestaurantForm";
import RestaurantOrders from "../orders/RestaurantOrders";
import RestaurantDashboard from "../dashboard/RestaurantDashboard";
import Details from "../details/Details";
import Menu from "../menu/Menu";
import StoreDetails from "./StoreDetails";
import CreateMenuForm from "../menu/CreateMenuForm";

const Admin = () => {
  const handleClose = () => {};
  return (
    <div>
      <div className="lg:flex justify-between">
        <div>
          <AdminSideBar handleClose={handleClose} />
        </div>
        <div className="lg:w-[80%]">
          <Routes>
            <Route path="/" element={<RestaurantDashboard />} />
            <Route path="/orders" element={<RestaurantOrders />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/add-restaurant" element={<CreateRestaurantForm />} />
            <Route path="/event" element={<Events />} />
            <Route path="/ingredients" element={<Ingredients />} />
            <Route path="/category" element={<FoodCategory />} />
            <Route path="/details" element={<StoreDetails />} />
            <Route path="/add-menu" element={<CreateMenuForm />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Admin;
