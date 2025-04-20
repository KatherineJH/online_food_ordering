import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RestaurantCard } from "../restaurant/RestaurantCard";
import { getFavoriteRestaurants } from "../state/restaurant/Action";

const Favorites = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  const { favorites, loading, error } = useSelector(
    (store) => store.restaurant
  );

  useEffect(() => {
    dispatch(getFavoriteRestaurants(jwt));
  }, [dispatch, jwt]);

  return (
    <div>
      <h1 className="py-5 text-2xl font-semibold text-center">
        ❤️ My Favorites
      </h1>

      {loading && <p className="text-center text-gray-500">불러오는 중...</p>}

      {error && (
        <p className="text-center text-red-500">
          에러: {error.message || "불러오기 실패"}
        </p>
      )}

      <p className="text-center text-sm text-gray-400 mb-6">
        총 {favorites?.length || 0}개의 레스토랑
      </p>

      <div className="flex flex-wrap gap-3 justify-center">
        {favorites.map((item) => (
          <RestaurantCard item={item} key={item.id} />
        ))}
      </div>

      {!loading && favorites.length === 0 && (
        <p className="text-center text-gray-400">
          즐겨찾기한 레스토랑이 없습니다.
        </p>
      )}
    </div>
  );
};

export default Favorites;