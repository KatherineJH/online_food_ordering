package com.katjh.controller;

import com.katjh.model.Food;
import com.katjh.model.User;
import com.katjh.service.FoodService;
import com.katjh.service.RestaurantService;
import com.katjh.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/food")
@RequiredArgsConstructor
public class FoodController {

    private final FoodService foodService;
    private final UserService userService;
    private final RestaurantService restaurantService;

    @GetMapping("/search")
    public ResponseEntity<List<Food>> searchFood(@RequestParam String keyword,
                                                 @RequestHeader("Authorization") String token) throws Exception{

        User user = userService.findUserByJwtToken(token);
        List<Food> foods = foodService.searchFoods(keyword);
        return new ResponseEntity<>(foods, HttpStatus.OK);
    }

    @GetMapping("/restaurant/{restaurantId}")
    public ResponseEntity<List<Food>> getRestaurantFood(@PathVariable Long restaurantId,
                                                        @RequestParam(required = false) String food_category,
                                                        @RequestParam(required = false) boolean vegetarian,
                                                        @RequestParam(required = false) boolean seasonal,
                                                        @RequestParam(required = false) boolean nonVegetarian,
                                                        @RequestHeader("Authorization") String token) throws Exception{

        User user = userService.findUserByJwtToken(token);
        List<Food> foods = foodService.getRestaurantFoods(restaurantId, food_category, vegetarian, seasonal, nonVegetarian);
        return new ResponseEntity<>(foods, HttpStatus.OK);
    }
}
