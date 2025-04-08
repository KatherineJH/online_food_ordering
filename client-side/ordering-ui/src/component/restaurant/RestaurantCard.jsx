import { Card, Chip, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isPresentInFavorites } from "../config/logic";
import { addToFavorite } from "../state/authentication/Action";

export const RestaurantCard = ({ item }) => {
  if (!item || typeof item !== "object") return null; // 에러 방어
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");
  const handleAddToFavorites = () => {
    dispatch(addToFavorite({ restaurantId: item.id, jwt }));
  };
  const handleNavigateToRestaurant = () => {
    if (item.open)
      navigate(`/restaurant/${item.address.city}/${item.name}/${item.id}`);
  };

  return (
    <Card className="w-[18rem]">
      <div
        className={`${true ? "cursor-pointer" : "cursor-not-allowed"} relative`}
      >
        <img
          className="w-full h-[10rem] rounded-t-md object-cover"
          src={
            Array.isArray(item.images) && item.images.length > 0
              ? item.images[0]
              : "https://via.placeholder.com/300x200"
          } // 에러 시에 대체 이미지 사용
          alt={item.name}
        />
        <Chip
          size="small"
          className="absolute top-2 left-2"
          color={item.open ? "success" : "error"}
          label={item.open ? "open" : "closed"}
        />
      </div>
      <div className="p-4 textPart lg:flex w-full justify-between">
        <div className="space-y-1">
          <p
            onClick={handleNavigateToRestaurant}
            className="font-semibold text-lg cursor-pointer"
          >
            {" "}
            {item.name}{" "}
          </p>
          <p className="text-gray-500 text-sm"> {item.description}</p>
        </div>
        <div>
          <IconButton onClick={handleAddToFavorites}>
            {isPresentInFavorites(auth.favorites, item) ? (
              <FavoriteIcon />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
        </div>
      </div>
    </Card>
  );
};
