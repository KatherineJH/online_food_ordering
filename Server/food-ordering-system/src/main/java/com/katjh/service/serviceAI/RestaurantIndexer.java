package com.katjh.service.serviceAI;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import com.katjh.model.*;
import com.katjh.repository.RestaurantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RestaurantIndexer {

    private final RestaurantRepository restaurantRepository;
    private final ElasticsearchClient elasticsearchClient;

    public void indexAllRestaurants() {
        List<Restaurant> restaurants = restaurantRepository.findAll();

        restaurants.forEach(r -> {
            List<Food> foods = r.getFoods();
            List<String> foodNames = foods.stream().map(Food::getName).toList();
            List<String> foodDescriptions = foods.stream().map(Food::getDescription).toList();
            List<String> categories = foods.stream().map(f -> f.getFoodCategory().getName()).toList();
            List<String> ingredientNames = foods.stream()
                    .flatMap(f -> f.getIngredients().stream())
                    .map(IngredientItem::getName)
                    .distinct()
                    .toList();

            RestaurantDocument doc = RestaurantDocument.builder()
                    .id(r.getId())
                    .name(r.getName())
                    .cuisineType(r.getCuisineType())
                    .foodNames(foodNames)
                    .foodDescriptions(foodDescriptions)
                    .ingredientNames(ingredientNames)
                    .foodCategories(categories)
                    .build();

            try {
                elasticsearchClient.index(i -> i
                        .index("restaurants")
                        .id(String.valueOf(doc.getId()))
                        .document(doc));
            } catch (IOException e) {
                throw new RuntimeException("엘라스틱서치 인덱싱 중 오류", e);
            }
        });
    }
}
