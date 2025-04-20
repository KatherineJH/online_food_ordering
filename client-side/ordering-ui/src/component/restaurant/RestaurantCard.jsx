// import { Card, Chip, IconButton } from "@mui/material";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { isPresentInFavorites } from "../config/logic";
// import { addToFavorite } from "../state/authentication/Action";

// export const RestaurantCard = ({ item }) => {
//   // 방어 코드: item 혹은 item.address가 없으면 렌더링하지 않음
//   if (!item || typeof item !== "object") return null;

//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const auth = useSelector((store) => store.auth);
//   const jwt = localStorage.getItem("jwt");

//   const handleAddToFavorites = () => {
//     dispatch(addToFavorite({ restaurantId: item.id, jwt }));
//   };

//   const handleNavigateToRestaurant = () => {
//     if (item.open) {
//       // 주소(city)가 없을 경우 기본값 사용
//       const city = item.address?.city || "unknown";
//       navigate(`/restaurant/${city}/${item.name}/${item.id}`);
//     }
//   };

//   return (
//     <Card className="w-[18rem]">
//       <div
//         className={`${true ? "cursor-pointer" : "cursor-not-allowed"} relative`}
//         onClick={handleNavigateToRestaurant}
//       >
//         <img
//           className="w-full h-[10rem] rounded-t-md object-cover"
//           src={
//             Array.isArray(item.images) && item.images.length > 0
//               ? item.images[0]
//               : "https://images.pexels.com/photos/3129810/pexels-photo-3129810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
//           }
//           alt={item.name}
//         />
//         <Chip
//           size="small"
//           className="absolute top-2 left-2"
//           color={item.open ? "success" : "error"}
//           label={item.open ? "open" : "closed"}
//         />
//       </div>
//       <div className="p-4 textPart lg:flex w-full justify-between">
//         <div className="space-y-1">
//           <p
//             className="font-semibold text-lg cursor-pointer"
//             onClick={handleNavigateToRestaurant}
//           >
//             {item.name}
//           </p>
//           <p className="text-gray-500 text-sm">{item.description}</p>
//         </div>
//         <div>
//           <IconButton onClick={handleAddToFavorites}>
//             {isPresentInFavorites(auth.favorites, item) ? (
//               <FavoriteIcon />
//             ) : (
//               <FavoriteBorderIcon />
//             )}
//           </IconButton>
//         </div>
//       </div>
//     </Card>
//   );
// };

import { Card, Chip, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isPresentInFavorites } from "../config/logic";
import { addToFavorite } from "../state/authentication/Action";

export const RestaurantCard = ({ item }) => {
  if (!item || typeof item !== "object") return null;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);
  const jwt = localStorage.getItem("jwt");

  const handleAddToFavorites = () => {
    if (!jwt) {
      alert("즐겨찾기를 사용하려면 로그인이 필요합니다.");
      return;
    }
    dispatch(addToFavorite({ restaurantId: item.id, jwt }));
  };

  const handleNavigateToRestaurant = () => {
    if (!jwt) {
      alert("레스토랑 상세 페이지는 로그인 후 이용 가능합니다.");
      return;
    }

    if (item.open) {
      const city = item.address?.city || "unknown";
      navigate(`/restaurant/${city}/${item.name}/${item.id}`);
    }
  };

  return (
    <Card className="w-[18rem]">
      <div
        className={`${true ? "cursor-pointer" : "cursor-not-allowed"} relative`}
        onClick={handleNavigateToRestaurant}
      >
        <img
          className="w-full h-[10rem] rounded-t-md object-cover"
          src={
            Array.isArray(item.images) && item.images.length > 0
              ? item.images[0]
              : "https://images.pexels.com/photos/3129810/pexels-photo-3129810.jpeg"
          }
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
            className="font-semibold text-lg cursor-pointer"
            onClick={handleNavigateToRestaurant}
          >
            {item.name}
          </p>
          <p className="text-gray-500 text-sm">{item.description}</p>
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
