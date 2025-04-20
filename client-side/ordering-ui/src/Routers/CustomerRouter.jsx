import React from "react";
import { Navbar } from "../component/navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "../component/home/Home";
import RestaurantDetails from "../component/restaurant/RestaurantDetails";
import Cart from "../component/cart/Cart";
import Profile from "../component/profile/Profile";
import Auth from "../component/auth/Auth";
import { SearchPage } from "../component/restaurant/SearchPage";
import Predict from "../component/review/Predict";

const CustomerRouter = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account/:register" element={<Home />} />
        <Route
          path="/restaurant/:city/:title/:id"
          element={<RestaurantDetails />}
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/my-profile/*" element={<Profile />} />
        <Route path="/predict" element={<Predict />} /> {/* 리뷰 등록 */}
        <Route path="/search" element={<SearchPage />} />
      </Routes>
      <Auth />
    </div>
  );
};

export default CustomerRouter;
