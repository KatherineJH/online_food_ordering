import React, { useState, useEffect } from "react";
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  InputBase,
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import "./Navbar.css";
import SearchIcon from "@mui/icons-material/Search";
import { purple } from "@mui/material/colors";
import { Person, ShoppingCart } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { elasticSearchRestaurant } from "../state/restaurant/Action";
import axios from "axios";
import { api } from "../config/Api";

export const Navbar = () => {
  const { auth, cart } = useSelector((store) => store);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = (selectedKeyword = keyword) => {
    if (selectedKeyword.trim() !== "") {
      dispatch(elasticSearchRestaurant(selectedKeyword));
      navigate(`/search?keyword=${selectedKeyword}`);
      setSuggestions([]); // 검색 후 추천어 숨기기
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleAutocomplete = async (value) => {
    try {
      const res = await api.get(`/search/autocomplete?prefix=${value}`);
      setSuggestions(res.data);
    } catch (error) {
      console.error("Autocomplete error:", error);
    }
  };

  useEffect(() => {
    if (keyword.trim().length > 0) {
      handleAutocomplete(keyword);
    } else {
      setSuggestions([]);
    }
  }, [keyword]);

  const handleClickAvatar = () => {
    if (auth.user?.role === "ROLE_CUSTOMER") {
      navigate("/my-profile");
    } else {
      navigate("/admin/restaurant");
    }
  };

  return (
    <Box className="px-5 sticky top-0 z-50 py-[1.8rem] bg-[#a885ed] lg:px-20 flex flex-col items-center space-y-2">
      <div className="w-full flex justify-between items-center">
        <div className="lg:mr-10 cursor-pointer flex items-center space-x-4">
          <li
            onClick={() => navigate("/")}
            className="logo font-semibold text-white text-2xl"
          >
            Vibrant Fresh Grub
          </li>
        </div>

        <div className="px-4 w-full max-w-md relative">
          <Paper
            component="form"
            className="flex items-center px-2 rounded-xl"
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            sx={{ backgroundColor: "white" }}
          >
            <InputBase
              placeholder="Search restaurants..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={handleKeyDown}
              sx={{ ml: 1, flex: 1, color: "#555" }}
            />
            <IconButton onClick={() => handleSearch()}>
              <SearchIcon sx={{ color: "#555" }} />
            </IconButton>
          </Paper>

          {/* 자동완성 결과 */}
          {suggestions.length > 0 && (
            <Paper
              className="absolute left-0 right-0 mt-1 max-h-60 overflow-y-auto z-50"
              elevation={3}
            >
              <List>
                {suggestions.map((suggestion, idx) => (
                  <ListItem key={idx} disablePadding>
                    <ListItemButton onClick={() => handleSearch(suggestion)}>
                      <ListItemText primary={suggestion} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Paper>
          )}
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
      </div>
    </Box>
  );
};
