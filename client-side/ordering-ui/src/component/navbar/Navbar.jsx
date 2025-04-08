// import { Avatar, Badge, Box, IconButton } from "@mui/material";
// import React from "react";
// import SearchIcon from "@mui/icons-material/Search";
// import { purple } from "@mui/material/colors";
// import { Person, ShoppingCart } from "@mui/icons-material";
// import "./Navbar.css";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// export const Navbar = () => {
//   const { auth, cart } = useSelector((store) => store);
//   const navigate = useNavigate();
//   const handleClickAvatar = () => {
//     if (auth.user?.role === "ROLE_CUSTOMER") {
//       navigate("/my-profile");
//     } else {
//       navigate("/admin/restaurant");
//     }
//   };
//   return (
//     <Box className="px-5 sticky top-0 z-50 py-[1.8rem] bg-[#a885ed] lg:px-20 flex justify-between">
//       <div className="lg:mr-10 cursor-pointer flex items-center space-x-4">
//         <li
//           onClick={() => navigate("/")}
//           className="logo font-semibold text-white text-2xl"
//         >
//           Vibrant Fresh Grub
//         </li>
//       </div>
//       <div className="flex items-center space-x-2 lg:space-x-10">
//         <div className="">
//           <IconButton>
//             <SearchIcon sx={{ fontSize: "1.5rem" }} />
//           </IconButton>
//         </div>
//         <div className="">
//           {auth.user ? (
//             <Avatar
//               onClick={handleClickAvatar}
//               sx={{ bgcolor: "white", color: purple.A700 }}
//             >
//               {auth.user?.fullName[0].toUpperCase()}
//             </Avatar>
//           ) : (
//             <IconButton onClick={() => navigate("/account/login")}>
//               <Person />
//             </IconButton>
//           )}
//         </div>
//         <div className="">
//           <IconButton onClick={() => navigate("/cart")}>
//             <Badge color="secondary" badgeContent={cart.cart?.item?.length || 0}>
//               <ShoppingCart sx={{ fontSize: "1.5rem" }} />
//             </Badge>
//           </IconButton>
//         </div>
//       </div>
//     </Box>
//   );
// };

import {
  Avatar,
  Badge,
  Box,
  IconButton,
  InputBase,
  Paper,
} from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { purple } from "@mui/material/colors";
import { Person, ShoppingCart } from "@mui/icons-material";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { elasticSearchRestaurant } from "../state/restaurant/Action";

export const Navbar = () => {
  const { auth, cart } = useSelector((store) => store);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");

  const handleSearch = () => {
    if (keyword.trim() !== "") {
      dispatch(elasticSearchRestaurant(keyword));
      navigate(`/search?keyword=${keyword}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleClickAvatar = () => {
    if (auth.user?.role === "ROLE_CUSTOMER") {
      navigate("/my-profile");
    } else {
      navigate("/admin/restaurant");
    }
  };

  return (
    <Box className="px-5 sticky top-0 z-50 py-[1.8rem] bg-[#a885ed] lg:px-20 flex justify-between items-center">
      <div className="lg:mr-10 cursor-pointer flex items-center space-x-4">
        <li
          onClick={() => navigate("/")}
          className="logo font-semibold text-white text-2xl"
        >
          Vibrant Fresh Grub
        </li>
      </div>

      {/* 검색창 추가 */}
      <div className="flex-1 px-4">
        <Paper
          component="form"
          className="flex items-center px-2 rounded-xl"
          onSubmit={(e) => e.preventDefault()}
          sx={{ backgroundColor: "white" }}
        >
          <InputBase
            placeholder="Search restaurants..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={handleKeyDown}
            sx={{ ml: 1, flex: 1 }}
          />
          <IconButton onClick={handleSearch}>
            <SearchIcon />
          </IconButton>
        </Paper>
      </div>

      <div className="flex items-center space-x-2 lg:space-x-10">
        <div>
          {auth.user ? (
            <Avatar
              onClick={handleClickAvatar}
              sx={{ bgcolor: "white", color: purple.A700 }}
            >
              {auth.user?.fullName[0].toUpperCase()}
            </Avatar>
          ) : (
            <IconButton onClick={() => navigate("/account/login")}>
              <Person />
            </IconButton>
          )}
        </div>
        <div>
          <IconButton onClick={() => navigate("/cart")}>
            <Badge
              color="secondary"
              badgeContent={cart.cart?.item?.length || 0}
            >
              <ShoppingCart sx={{ fontSize: "1.5rem" }} />
            </Badge>
          </IconButton>
        </div>
      </div>
    </Box>
  );
};
