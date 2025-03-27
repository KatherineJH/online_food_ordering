import {
  Divider,
  FormControl,
  Grid,
  RadioGroup,
  Radio,
  FormControlLabel,
  Typography,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import React, { useEffect, useState } from "react";
import MenuCard from "./MenuCard";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurantById, getRestaurantsCategory } from "../state/restaurant/Action";

const categories = [
  "All",
  "Chicken",
  "Pizza",
  "Burger",
  "Bibimbap",
  "Bulgogi",
  "Gimbap",
];

const foodTypes = [
  { label: "All", value: "all" },
  { label: "Vegetarian", value: "vegetarian" },
  { label: "Non-Vegetarian", value: "non vegetarian" },
  { label: "Seasonal", value: "seasonal" },
];

const menu = [1, 1, 1, 1, 1, 1];

const RestaurantDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth, restaurant } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");
  const { id, city } = useParams();

  const [foodType, setFoodType] = useState("all"); // Food Type 상태
  const [foodCategory, setFoodCategory] = useState("All"); // Food Category 상태

  const handleFoodTypeFilter = (e) => {
    setFoodType(e.target.value);
    console.log(e.target.value, e.target.name);
  };

  const handleFoodCategoryFilter = (e) => {
    setFoodCategory(e.target.value);
    console.log(e.target.value, e.target.name);
  };
console.log("restaurant", restaurant);

  useEffect(() => {
    dispatch(getRestaurantById({ jwt, id }));
    dispatch(getRestaurantsCategory({ jwt, id }));
  }, []);

  return (
    <div className="px-5 lg:px-20">
      <section>
        <h3 className="text-gray-300 py-2 mt-10">
          Home/Korean/Korean Delivery Food/3
        </h3>
        <div>
          <Grid container spacing={2}>
            {/* 첫 번째 큰 이미지 (전체 너비) */}
            <Grid item xs={12}>
              <img
                className="w-full h-[40vh] object-cover"
                src={restaurant.restaurant?.images[0]}
                alt="First Image"
              />
            </Grid>

            {/* 두 번째와 세 번째 이미지 (각각 반 너비, 같은 높이로 가로로 배치) */}
            <Grid item xs={6}>
              <img
                className="w-full h-[40vh] object-cover"
                src={restaurant.restaurant?.images[1]}
                alt="Second Image"
              />
            </Grid>
            <Grid item xs={6}>
              <img
                className="w-full h-[40vh] object-cover"
                src={restaurant.restaurant?.images[2]}
                alt="Third Image"
              />
            </Grid>
          </Grid>
        </div>
        <div className="pt-3 pb-5">
          <h1 className="text-4xl font-semibold">{restaurant.restaurant?.name}</h1>

          <p className="text-gray-400 mt-1">
            {restaurant.restaurant?.description}
          </p>
          <p className="text-gray-400 flex items-center gap-3">
            <CalendarMonthIcon />
            <span>Mon-Sun: 9:00 AM - 9:00 PM (Today)</span>
          </p>
          <div className="space-y-3 mt-3">
            <p className="text-gray-400 flex item-center gap-2">
              <LocationOnIcon />
              <span>Gangnam, Seoul</span>
            </p>
          </div>
        </div>
      </section>
      <Divider />
      <section className="pt-[2rem] lg:flex relative">
        <div className="space-y-10 lg:w-[20%] filter">
          <div className="box space-y-5 lg:sticky top-28">
            <div>
              <Typography variant="h5" sx={{ paddingBottom: "1rem" }}>
                Food Type
              </Typography>

              <FormControl className="py-10 space-y-5" component={"fieldset"}>
                <RadioGroup
                  onChange={handleFoodTypeFilter}
                  name="food_type"
                  value={foodType} // foodType 상태 사용
                >
                  {foodTypes.map((item) => (
                    <FormControlLabel
                      key={item.value}
                      value={item.value}
                      control={<Radio />}
                      label={item.label}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </div>
            <Divider />
            <div>
              <Typography variant="h5" sx={{ paddingBottom: "1rem" }}>
                Food Category
              </Typography>

              <FormControl className="py-10 space-y-5" component={"fieldset"}>
                <RadioGroup
                  onChange={handleFoodCategoryFilter} // foodCategory 상태 변경
                  name="food_category"
                  value={foodCategory} // foodCategory 상태 사용
                >
                  {categories.map((item) => (
                    <FormControlLabel
                      key={item}
                      value={item}
                      control={<Radio />}
                      label={item}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </div>
          </div>
        </div>
        <div className="space-y-5 lg:w-[80%] filter lg:pl-10">
          {menu.map((item) => (
            <MenuCard />
          ))}
        </div>
      </section>
    </div>
  );
};

export default RestaurantDetails;
