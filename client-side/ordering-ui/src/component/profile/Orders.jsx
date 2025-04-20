import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUsersOrders } from "../state/order/Action";
import {
  Card,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  Box,
} from "@mui/material";
import OrderCard from "./OrderCard";

const orderStatus = [
  { label: "Pending", value: "PENDING" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Out For Delivery", value: "OUT_FOR_DELIVERY" },
  { label: "Delivered", value: "DELIVERED" },
  { label: "All", value: "ALL" },
];

const Orders = () => {
  const auth = useSelector((store) => store.auth);
  const order = useSelector((store) => store.order);
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");
  const dispatch = useDispatch();

  const [filterValue, setFilterValue] = useState("ALL");

  useEffect(() => {
    dispatch(getUsersOrders(jwt));
  }, [dispatch, jwt]);

  const handleFilter = (e) => {
    setFilterValue(e.target.value);
  };

  // 필터링된 주문 목록
  const filteredOrders =
    filterValue && filterValue !== "ALL"
      ? order.orders.filter((ord) => ord.orderStatus === filterValue)
      : order.orders;

  return (
    <div className="px-2 flex flex-col items-center">
      {/* 필터링 UI */}
      <Card className="p-5 w-full lg:w-1/2 mb-5">
        {/* <Typography sx={{ padding: "1rem" }} variant="h5">
          Filter Orders by Status
        </Typography> */}
        <FormControl>
          <RadioGroup
            onChange={handleFilter}
            row
            name="order-status"
            value={filterValue}
          >
            {orderStatus.map((item) => (
              <FormControlLabel
                key={item.value}
                value={item.value}
                control={<Radio />}
                label={item.label}
                sx={{ color: "gray" }}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Card>

      {/* 주문 목록 */}
      <Box className="w-full lg:w-1/2 space-y-5">
        <Typography variant="h4" className="text-center py-7 font-semibold">
          My Orders
        </Typography>
        {filteredOrders?.length > 0 ? (
          filteredOrders.map((ord) => <OrderCard key={ord.id} order={ord} />)
        ) : (
          <Typography className="text-center">No orders available</Typography>
        )}
      </Box>
    </div>
  );
};

export default Orders;
