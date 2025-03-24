package com.katjh.service;

import com.katjh.model.Category;
import com.katjh.model.Food;
import com.katjh.model.Restaurant;
import com.katjh.request.CreateFoodRequest;

import java.util.List;

public interface FoodService {

    public Food createFood(CreateFoodRequest req, Category category, Restaurant restaurant);

    void deleteFood(Long foodId) throws Exception;

    public List<Food> getRestaurantFoods(Long restaurantId, String foodCategory,
                                         boolean isVegetarian, boolean isSeasonal, boolean isNonVegetarian);

    public List<Food> searchFoods(String keyword);

    public Food findFoodById(Long foodId) throws Exception;

    public Food updateAvailableStatus(Long foodId) throws Exception;
}
