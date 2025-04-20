import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminRouter from "./AdminRouter";
import CustomerRouter from "./CustomerRouter";
import PredictSample from "../component/review/PredictSample";
import TopWords from "../component/review/TopWords";
import RankedRestaurant from "../component/review/RankedRestaurant";

const Routers = () => {
  return (
    <Routes>
      <Route path="/admin/restaurant/*" element={<AdminRouter />}></Route>
      <Route path="/*" element={<CustomerRouter />}></Route>
      {/* 테스트 화면 추가 */}
      <Route path="/test/predict" element={<PredictSample />}></Route>
      {/* <Route path="/top-words" element={<TopWords />} /> 
      <Route path="/rank-restaurants" element={<RankedRestaurant />} /> */}
    </Routes>
  );
};

export default Routers;
