// package com.katjh.service.serviceAI;
//
// import co.elastic.clients.elasticsearch.ElasticsearchClient;
// import com.katjh.model.*;
// import com.katjh.repository.RestaurantRepository;
// import lombok.RequiredArgsConstructor;
// import org.springframework.data.elasticsearch.core.suggest.Completion;
// import org.springframework.stereotype.Service;
//
// import java.io.IOException;
// import java.util.List;
// import java.util.stream.Stream;
//
// @Service
// @RequiredArgsConstructor
// public class RestaurantIndexer {
//
//    private final RestaurantRepository restaurantRepository;
//    private final ElasticsearchClient elasticsearchClient;
//
//    public void indexAllRestaurants() {
//        List<Restaurant> restaurants = restaurantRepository.findAll();
//
//        restaurants.forEach(r -> {
//            List<Food> foods = r.getFoods();
//            List<String> foodNames = foods.stream().map(Food::getName).toList();
//            List<String> foodDescriptions = foods.stream().map(Food::getDescription).toList();
//            List<String> categories = foods.stream().map(f ->
// f.getFoodCategory().getName()).toList();
//            List<String> ingredientNames = foods.stream()
//                    .flatMap(f -> f.getIngredients().stream())
//                    .map(IngredientItem::getName)
//                    .distinct()
//                    .toList();
//
//            RestaurantDocument doc = RestaurantDocument.builder()
//                    .id(r.getId())
//                    .name(r.getName())
//                    .cuisineType(r.getCuisineType())
//                    .foodNames(foodNames)
//                    .foodDescriptions(foodDescriptions)
//                    .ingredientNames(ingredientNames)
//                    .foodCategories(categories)
//                    .build();
//
//            try {
//                elasticsearchClient.index(i -> i
//                        .index("restaurants")
//                        .id(String.valueOf(doc.getId()))
//                        .document(doc));
//            } catch (IOException e) {
//                throw new RuntimeException("엘라스틱서치 인덱싱 중 오류", e);
//            }
//        });
//    }
// }
package com.katjh.service.serviceAI;

import java.io.IOException;
import java.util.List;
import java.util.Objects;
import java.util.stream.Stream;

import org.springframework.data.elasticsearch.core.suggest.Completion;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.katjh.model.*;
import com.katjh.repository.RestaurantRepository;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RestaurantIndexer {

    private final RestaurantRepository restaurantRepository;
    private final ElasticsearchClient elasticsearchClient;

    @Transactional(readOnly = true)
    public void indexAllRestaurants() {
        List<Restaurant> restaurants = restaurantRepository.findAll();

        restaurants.forEach(
                r -> {
                    List<Food> foods = r.getFoods();
                    List<String> foodNames = foods.stream().map(Food::getName).toList();
                    List<String> foodDescriptions =
                            foods.stream().map(Food::getDescription).toList();
                    List<String> categories =
                            foods.stream().map(f -> f.getFoodCategory().getName()).toList();
                    List<String> ingredientNames =
                            foods.stream()
                                    .flatMap(f -> f.getIngredients().stream())
                                    .map(IngredientItem::getName)
                                    .distinct()
                                    .toList();

                    // ✅ 여기서 suggest.input 값 생성
                    Completion suggest = new Completion();
                    suggest.setInput(
                            Stream.of(
                                            Stream.of(r.getName()),
                                            Stream.of(r.getCuisineType()),
                                            foodNames.stream())
                                    .flatMap(s -> s)
                                    .map(String::toLowerCase) // 소문자 변환
                                    .filter(Objects::nonNull) // null 제거
                                    .distinct() // 중복 제거
                                    .toList()
                                    .toArray(new String[0]) // String[] 변환
                            );

                    // ✅ 문서 생성
                    RestaurantDocument doc =
                            RestaurantDocument.builder()
                                    .id(r.getId())
                                    .name(r.getName())
                                    .cuisineType(r.getCuisineType())
                                    .foodNames(foodNames)
                                    .foodDescriptions(foodDescriptions)
                                    .ingredientNames(ingredientNames)
                                    .foodCategories(categories)
                                    .suggest(suggest) // ✅ 자동완성용 suggest 필드 세팅
                                    .build();

                    // ✅ 인덱싱 수행
                    try {
                        elasticsearchClient.index(
                                i ->
                                        i.index("restaurants")
                                                .id(String.valueOf(doc.getId()))
                                                .document(doc));
                    } catch (IOException e) {
                        throw new RuntimeException("엘라스틱서치 인덱싱 중 오류", e);
                    }
                });
    }
}
