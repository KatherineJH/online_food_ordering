import React from "react";
import { Navbar } from "../component/navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "../component/home/Home";
import RestaurantDetails from "../component/restaurant/RestaurantDetails";
import Cart from "../component/cart/Cart";
import Profile from "../component/profile/Profile";
import Orders from "../component/profile/Orders";
import Auth from "../component/auth/Auth";

const CustomerRouter = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account/:register" element={<Home />} />
        <Route
          path="/retaurant/:city/:title/:id"
          element={<RestaurantDetails />}
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/my-profile/*" element={<Profile />} />
      </Routes>
      <Auth />
    </div>
  );
};

export default CustomerRouter;
