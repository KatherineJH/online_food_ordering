import { Button, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const OrderCard = ({ order }) => {
  const navigate = useNavigate();

  const handlePredictClick = () => {
    if (order.reviews && order.reviews.length > 0) {
      alert("이미 리뷰가 작성된 주문입니다.");
      return;
    }
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
        {/* <Typography variant="body2" color="text.secondary">
          Customer: {order.customer?.fullName || "N/A"}
        </Typography> */}
        <Typography variant="body2" color="text.secondary">
          Total Price: ₩{order.totalPrice}
        </Typography>
        {/* <Typography variant="body2" color="text.secondary">
          Status: {order.orderStatus}
        </Typography> */}

        {/* 주문 아이템 목록 */}
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
                {/* {order.orderStatus} */}
                {order.reviews?.length > 0
                  ? "Review Complete"
                  : order.orderStatus}
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderCard;
