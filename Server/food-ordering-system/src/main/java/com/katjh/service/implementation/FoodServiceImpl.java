package com.katjh.service.implementation;

import com.katjh.model.Category;
import com.katjh.model.Food;
import com.katjh.model.Restaurant;
import com.katjh.request.CreateFoodRequest;
import com.katjh.request.FoodRepository;
import com.katjh.service.FoodService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FoodServiceImpl implements FoodService {

    private final FoodRepository foodRepository;

    @Override
    public Food createFood(CreateFoodRequest req, Category category, Restaurant restaurant) {

        Food food = new Food();
        food.setFoodCategory(category);
        food.setRestaurant(restaurant);
        food.setDescription(req.getDescription());
        food.setImages(req.getImages());
        food.setName(req.getName());
        food.setPrice(req.getPrice());
        food.setIngredients(req.getIngredients());
        food.setSeasonal(req.isSeasonal());
        food.setVegetarian(req.isVegetarian());

        Food savedFood = foodRepository.save(food);
        restaurant.getFoods().add(savedFood);
        return foodRepository.save(food);
    }

    /**
     * Food 객체를 삭제하는 것이 아니라 Food와 Restaurant 사이의 관계를 끊는 작업
     * foodRepository.save(food)로 그 변경 사항을 데이터베이스에 반영
     * @param foodId the id of the food to be deleted
     * @throws Exception if the food is not found
     * (Food 객체 자체를 삭제하고 싶다면 foodRepository.delete(food)를 사용)
     */
    @Override
    public void deleteFood(Long foodId) throws Exception {
        Food food = findFoodById(foodId);
        food.setRestaurant(null);
        foodRepository.save(food);
    }

    /**
     * 식당의 음식 목록을 반환
     * @param restaurantId the id of the restaurant
     * @param foodCategory the category of the food
     * @param isVegetarian true if the food is vegetarian
     * @param isSeasonal true if the food is seasonal
     * @param isNonVegetarian true if the food is non-vegetarian
     * @return the list of foods
     */
    @Override
    public List<Food> getRestaurantFoods(Long restaurantId, String foodCategory,
                                         boolean isVegetarian, boolean isSeasonal, boolean isNonVegetarian) {
        List<Food> foods = foodRepository.findByRestaurantId(restaurantId);
        if(foodCategory!=null && !foodCategory.isEmpty()){
            foods = filterByCategory(foods, foodCategory);
        }
        if(isVegetarian){
            foods = filterByVegetarian(foods, isVegetarian);
        }
        if(isSeasonal){
            foods = filterBySeasonal(foods, isSeasonal);
        }
        if(isNonVegetarian){
            foods = filterByNonVegetarian(foods, isNonVegetarian);
        }
        return foods;
    }

    private List<Food> filterByCategory(List<Food> foods, String foodCategory) {
        return foods.stream().filter(food -> {
            if(food.getFoodCategory() != null){
                return food.getFoodCategory().getName().equals(foodCategory);
            }
            return false;
        }).collect(Collectors.toList());
    }

    private List<Food> filterByVegetarian(List<Food> foods, boolean isVegetarian) {
        return foods.stream().filter(food -> food.isVegetarian() == isVegetarian).collect(Collectors.toList());
    }

    private List<Food> filterBySeasonal(List<Food> foods, boolean isSeasonal) {
        return foods.stream().filter(food -> food.isSeasonal() == isSeasonal).collect(Collectors.toList());
    }

    private List<Food> filterByNonVegetarian(List<Food> foods, boolean isNonVegetarian) {
        return foods.stream().filter(food -> !food.isVegetarian()).collect(Collectors.toList());
    }

    @Override
    public List<Food> searchFoods(String keyword) {
        return foodRepository.searchFood(keyword);
    }

    @Override
    public Food findFoodById(Long foodId) throws Exception {
        Optional<Food> optionalFood = foodRepository.findById(foodId);
        if(optionalFood.isEmpty()){
            throw new Exception("Food not found with id: "+foodId);
        }
        return optionalFood.get();
    }

    @Override
    public Food updateAvailableStatus(Long foodId) throws Exception {
        Food food = findFoodById(foodId);
        food.setAvailable(!food.isAvailable());
        return foodRepository.save(food);
    }
}
