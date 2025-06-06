import {
  Divider,
  FormControl,
  Grid,
  RadioGroup,
  Radio,
  FormControlLabel,
  Typography,
  Button,
  Modal,
  Box,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import React, { useEffect, useState } from "react";
import MenuCard from "./MenuCard";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getRestaurantById,
  getRestaurantsCategory,
  getVisitsRestaurantEvents,
} from "../state/restaurant/Action";
import { getMenuItemsByRestaurantId } from "../state/menu/Action";
import EventsCard from "./EventsCard";

const foodTypes = [
  { label: "All", value: "all" },
  { label: "Vegetarian", value: "vegetarian" },
  { label: "Non-Vegetarian", value: "non-vegetarian" },
  { label: "Seasonal", value: "seasonal" },
];

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  maxWidth: 800,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  maxHeight: "80vh",
  overflowY: "auto",
};

const RestaurantDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const restaurant = useSelector((state) => state.restaurant);
  const menu = useSelector((state) => state.menu);

  const jwt = localStorage.getItem("jwt");
  const { id, city } = useParams();
  console.log(id);
  console.log(menu?.menuItems);

  const [selectedCategory, setSelectedCategory] = useState("all"); // Food Category 상태
  const [foodType, setFoodType] = useState("all"); // Food Type 상태
  const [openModal, setOpenModal] = useState(false); // 모달 상태 추가

  const handleFoodTypeFilter = (e) => {
    setFoodType(e.target.value);
    console.log(e.target.value, e.target.name);
  };

  const handleFoodCategoryFilter = (e, value) => {
    // setFoodCategory(e.target.value);
    if (value === "all") {
      setSelectedCategory("all"); // "All"을 선택하면 모든 카테고리를 보여줍니다
    } else {
      setSelectedCategory(value); // 선택한 카테고리를 업데이트
    }
    // setSelectedCategory(value);
    console.log(e.target.value, e.target.name, value);
  };
  console.log("restaurant", restaurant);

  const handleOpenModal = () => {
    setOpenModal(true);
    // 모달 열릴 때 이벤트 데이터 가져오기 (필요 시)
    dispatch(getVisitsRestaurantEvents({ jwt, restaurantId: id }));
  };

  const handleCloseModal = () => setOpenModal(false);

  useEffect(() => {
    if (id) {
      dispatch(getRestaurantById({ jwt, id }));
      dispatch(getRestaurantsCategory({ jwt, id }));
      dispatch(getMenuItemsByRestaurantId({ jwt, restaurantId: id }));
    } else {
      console.error("Restaurant ID is missing");
    }
  }, [id]);

  useEffect(() => {
    dispatch(
      getMenuItemsByRestaurantId({
        jwt,
        restaurantId: id,
        vegetarian: foodType === "vegetarian",
        nonVegetarian: foodType === "non-Vegetarian",
        seasonal: foodType === "seasonal",
        // foodCategory: selectedCategory,
        foodCategory: selectedCategory === "all" ? "" : selectedCategory,
      })
    );
  }, [selectedCategory, foodType]);

  return (
    <div className="px-5 lg:px-20">
      <section>
        <h3 className="text-gray-300 py-2 mt-10">{}</h3>
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
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center lg:gap-5 mt-5">
          {/* 왼쪽 텍스트 블록 */}
          <div className="pt-3 pb-5 flex-1">
            <h1 className="text-4xl font-semibold">
              {restaurant.restaurant?.name}
            </h1>
            <p className="text-gray-400 mt-1">
              {restaurant.restaurant?.description}
            </p>
            <p className="text-gray-400 flex items-center gap-3">
              <CalendarMonthIcon />
              <span>{restaurant.restaurant?.openingHours}</span>
            </p>
            <div className="space-y-3 mt-3">
              <p className="text-gray-400 flex items-center gap-2">
                <LocationOnIcon />
                <span>
                  {restaurant.restaurant?.address.streetAddress},{" "}
                  {restaurant.restaurant?.address.city}
                </span>
              </p>
            </div>
          </div>

          {/* 오른쪽 버튼 블록 */}
          <div className="pt-3 pb-5 flex-shrink-0">
            <Button
              onClick={handleOpenModal}
              variant="contained"
              color="success"
            >
              Check Coupons
            </Button>
          </div>
        </div>
      </section>

      {/* 모달 추가 */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="events-modal-title"
        aria-describedby="events-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography
            id="events-modal-title"
            variant="h6"
            component="h2"
            gutterBottom
          >
            Restaurant Events
          </Typography>
          <EventsCard /> {/* EventsCard 컴포넌트 렌더링 */}
        </Box>
      </Modal>

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
                  name="food_category"
                  value={foodType || "all"}
                >
                  {foodTypes?.map((item) => (
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
            </div>
            <Divider />
            <div>
              <Typography variant="h5" sx={{ paddingBottom: "1rem" }}>
                Food Category
              </Typography>

              <FormControl className="py-10 space-y-5" component={"fieldset"}>
                {/* <RadioGroup
                  onChange={handleFoodCategoryFilter} // foodCategory 상태 변경
                  name="food_category"
                  value={selectedCategory} // foodCategory 상태 사용
                >
                  {restaurant?.categories.map((item) => (
                    <FormControlLabel
                      key={item.name}
                      value={item.name}
                      control={<Radio />}
                      label={item.name}
                    />
                  ))}
                </RadioGroup> */}
                <RadioGroup
                  onChange={handleFoodCategoryFilter}
                  name="food_category"
                  value={selectedCategory}
                >
                  {/* Add the "All" category */}
                  <FormControlLabel
                    value="all"
                    control={<Radio />}
                    label="All"
                    sx={{ color: "gray" }}
                  />
                  {restaurant?.categories?.map((item) => (
                    <FormControlLabel
                      key={item.name}
                      value={item.name}
                      control={<Radio />}
                      label={item.name}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </div>
          </div>
        </div>
        <div className="space-y-5 lg:w-[80%] filter lg:pl-10">
          {menu?.menuItems.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default RestaurantDetails;
