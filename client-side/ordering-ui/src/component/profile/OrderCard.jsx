import { Button, Card, CardContent, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getOrderReview } from "../state/order/Action";
import { useDispatch } from "react-redux";
import ReviewModal from "./ReviewModal";

const OrderCard = ({ order }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const [openModal, setOpenModal] = useState(false);

  const handlePredictClick = () => {
    const jwt = localStorage.getItem("jwt"); 
    if (order.reviews && order.reviews.length > 0) {
      // console.log("🔍 리뷰 요청:", order.id, jwt); // 로그 확인
      dispatch(getOrderReview(order.id, jwt));
      setOpenModal(true); 
      return;
    }
    // 리뷰 없는 경우 리뷰 작성(예측 ML 페이지) 이동
    navigate("/predict", {
      state: {
        orderId: order.id,
        restaurantId: order.items[0].food.restaurant.id,
      },
    });
  };

  return (
    <Card className="p-5">
      <CardContent>
        <Typography variant="h6">Order #{order.id}</Typography>
        <Typography variant="body2" color="text.secondary">
          Total Price: ₩{order.totalPrice}
        </Typography>

        <div className="mt-3 space-y-3">
          {order.items.map((item, index) => (
            <div
              key={item.id || index}
              className="flex justify-between items-center"
            >
              <div className="flex items-center space-x-5">
                <img
                  className="h-16 w-16 object-cover"
                  src={item.food?.images[0] || "https://via.placeholder.com/64"}
                  alt={item.food?.name}
                />
                <div>
                  <Typography>{item.food?.name || "Unknown Item"}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    ₩{item.totalPrice}
                  </Typography>
                </div>
              </div>
              <Button
                size="small"
                onClick={handlePredictClick}
                disabled={order.orderStatus !== "COMPLETED"}
              >
                {order.reviews?.length > 0
                  ? "Review Complete"
                  : order.orderStatus}
              </Button>
            </div>
          ))}
        </div>
      </CardContent>

      {/* 리뷰 모달 */}
      <ReviewModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        review={order.reviews?.[0]} // 첫 번째 리뷰만 표시
      />
    </Card>
  );
};

export default OrderCard;
