import { Avatar, Badge, Box, IconButton } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { purple } from "@mui/material/colors";
import { Person, ShoppingCart } from "@mui/icons-material";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();
  return (
    <Box className="px-5 sticky top-0 z-50 py-[1.8rem] bg-[#a885ed] lg:px-20 flex justify-between">
      <div className="lg:mr-10 cursor-pointer flex items-center space-x-4">
        <li className="logo font-semibold text-white text-2xl">
          Vibrant Fresh Grub
        </li>
      </div>
      <div className="flex items-center space-x-2 lg:space-x-10">
        <div className="">
          <IconButton>
            <SearchIcon sx={{ fontSize: "1.5rem" }} />
          </IconButton>
        </div>
        <div className="">
          {false ? (
            <Avatar sx={{ bgcolor: "white", color: purple.A700 }}>K</Avatar>
          ) : (
            <IconButton onClick={()=>navigate("/account/login")}>
              <Person />
            </IconButton>
          )}
        </div>
        <div className="">
          <IconButton>
            <Badge color="secondary" badgeContent={3}>
              <ShoppingCart sx={{ fontSize: "1.5rem" }} />
            </Badge>
          </IconButton>
        </div>
      </div>
    </Box>
  );
};
