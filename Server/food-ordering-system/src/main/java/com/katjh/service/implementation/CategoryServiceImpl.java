package com.katjh.service.implementation;

import com.katjh.model.Category;
import com.katjh.model.Restaurant;
import com.katjh.repository.CategoryRepository;
import com.katjh.service.CategoryService;
import com.katjh.service.RestaurantService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final RestaurantService restaurantService;

    @Override
    public Category createCategory(String name, Long userId) throws Exception {

        Restaurant restaurant = restaurantService.getRestaurantByUserId(userId);
        Category category = new Category();
        category.setName(name);
        category.setRestaurant(restaurant);

        return categoryRepository.save(category);
    }

    @Override
    public List<Category> findCategoryByRestaurantId(Long id) throws Exception {
        Restaurant restaurant = restaurantService.getRestaurantByUserId(id);
        return categoryRepository.findByRestaurantId(restaurant.getId());
    }

    @Override
    public Category findCategoryById(Long id) throws Exception {
        Optional<Category> optionalCategory = categoryRepository.findById(id);

        if(optionalCategory.isEmpty()){
            throw new Exception("Category not found with id: " + id);
        }
        return optionalCategory.get();
    }
}
