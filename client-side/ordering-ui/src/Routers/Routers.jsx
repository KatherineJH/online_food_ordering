import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminRouter from "./AdminRouter";
import CustomerRouter from "./CustomerRouter";
import Predict from "../Predict";
import TopWords from "../TopWords";
import RankedRestaurant from "../RankedRestaurant";

const Routers = () => {
  return (
    <Routes>
      <Route path="/admin/restaurant/*" element={<AdminRouter />}></Route>
      <Route path="/*" element={<CustomerRouter />}></Route>
      {/* 테스트 화면 추가 */}
      <Route path="/predict" element={<Predict />} />
      <Route path="/top-words" element={<TopWords />} /> {/* best 20와 worst 20 을 동시에 로드 */}
      <Route path="/rank-restaurants" element={<RankedRestaurant />} />
    </Routes>
  );
};

export default Routers;
