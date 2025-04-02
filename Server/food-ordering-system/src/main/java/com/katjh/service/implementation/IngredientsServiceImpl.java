package com.katjh.service.implementation;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.katjh.model.IngredientCategory;
import com.katjh.model.IngredientItem;
import com.katjh.model.Restaurant;
import com.katjh.repository.IngredientCategoryRepository;
import com.katjh.repository.IngredientsItemRepository;
import com.katjh.service.IngredientsService;
import com.katjh.service.RestaurantService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class IngredientsServiceImpl implements IngredientsService {

    private final IngredientCategoryRepository ingredientCategoryRepository;
    private final IngredientsItemRepository ingredientsItemRepository;
    private final RestaurantService restaurantService;

    @Override
    public IngredientCategory createIngredientCategory(String name, Long restaurantID)
            throws Exception {

        Restaurant restaurant = restaurantService.findRestaurantById(restaurantID);
        IngredientCategory category = new IngredientCategory();
        category.setRestaurant(restaurant);
        category.setName(name);

        return ingredientCategoryRepository.save(category);
    }

    @Override
    public IngredientCategory findIngredientCategoryById(Long id) throws Exception {
        Optional<IngredientCategory> opt = ingredientCategoryRepository.findById(id);

        if (opt.isEmpty()) {
            throw new Exception("Ingredient category not found");
        }
        return opt.get();
    }

    @Override
    public List<IngredientCategory> findIngredientCategoryByRestaurantId(Long id) throws Exception {
        restaurantService.findRestaurantById(id);
        return ingredientCategoryRepository.findByRestaurantId(id);
    }

    @Override
    public IngredientItem createIngredientItem(
            Long restaurantId, String ingredientName, Long categoryId) throws Exception {
        Restaurant restaurant = restaurantService.findRestaurantById(restaurantId);
        IngredientCategory category = findIngredientCategoryById(categoryId);

        IngredientItem item = new IngredientItem();
        item.setName(ingredientName);
        item.setRestaurant(restaurant);
        item.setCategory(category);

        IngredientItem ingredient = ingredientsItemRepository.save(item);
        category.getIngredients().add(ingredient);

        return ingredient;
    }

    @Override
    public List<IngredientItem> findRestaurantsIngredients(Long restaurantId) throws Exception {
        return ingredientsItemRepository.findByRestaurantId(restaurantId);
    }

    @Override
    public IngredientItem updateStock(Long id) throws Exception {
        Optional<IngredientItem> optionalIngredientItem = ingredientsItemRepository.findById(id);
        if (optionalIngredientItem.isEmpty()) {
            throw new Exception("ingredient item not found");
        }
        IngredientItem ingredientItem = optionalIngredientItem.get();
        ingredientItem.setInStock(!ingredientItem.isInStock());
        return ingredientsItemRepository.save(ingredientItem);
    }
}
