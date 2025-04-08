import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RestaurantCard } from "./RestaurantCard";
import {
  elasticSearchRestaurant,
  getRestaurantById,
} from "../state/restaurant/Action";

export const SearchPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get("keyword");
  const jwt = localStorage.getItem("jwt");

  const restaurant = useSelector((state) => state.restaurant);
  const searchResults = restaurant.restaurants || [];
  const latestRestaurant = restaurant.restaurant;

  const [restaurantDetails, setRestaurantDetails] = useState([]);
  const [requestedIds, setRequestedIds] = useState([]);
  const [addedIds, setAddedIds] = useState([]);

  // keyword 바뀌면 검색 시작
  useEffect(() => {
    if (keyword) {
      dispatch(elasticSearchRestaurant(keyword));
      setRestaurantDetails([]);
      setRequestedIds([]);
      setAddedIds([]);
    }
  }, [keyword]);

  // 검색 결과로부터 ID별 요청
  useEffect(() => {
    searchResults.forEach((res) => {
      if (!requestedIds.includes(res.id)) {
        dispatch(getRestaurantById({ id: res.id, jwt }));
        setRequestedIds((prev) => [...prev, res.id]);
      }
    });
  }, [searchResults]);

  // 리덕스에서 restaurant.restaurant가 바뀔 때마다 추가
  useEffect(() => {
    if (
      latestRestaurant &&
      !addedIds.includes(latestRestaurant.id) &&
      requestedIds.includes(latestRestaurant.id)
    ) {
      setRestaurantDetails((prev) => [...prev, latestRestaurant]);
      setAddedIds((prev) => [...prev, latestRestaurant.id]);
    }
  }, [latestRestaurant]);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-4">
        Search Results for "{keyword}"
      </h2>
      {restaurantDetails.length > 0 ? (
        <div className="flex flex-wrap gap-6">
          {restaurantDetails.map((item) => (
            <RestaurantCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <p>No results found. Debug: {JSON.stringify(searchResults)}</p>
      )}
    </div>
  );
};
