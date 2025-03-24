package com.katjh.service;

import com.katjh.model.IngredientCategory;
import com.katjh.model.IngredientItem;

import java.util.List;

public interface IngredientsService {

    public IngredientCategory createIngredientCategory(String name, Long restaurantID) throws Exception;

    public IngredientCategory findIngredientCategoryById(Long id) throws Exception;

    public List<IngredientCategory> findIngredientCategoryByRestaurantId(Long id) throws Exception;

    public IngredientItem createIngredientItem(Long restaurantId, String ingredientName, Long categoryId) throws Exception;

    public List<IngredientItem> findRestaurantsIngredients(Long restaurantId) throws Exception;

    public IngredientItem updateStock(Long id) throws Exception;
}
