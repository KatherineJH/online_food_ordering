package com.katjh.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.katjh.model.Food;
import com.katjh.model.Restaurant;
import com.katjh.model.User;
import com.katjh.request.CreateFoodRequest;
import com.katjh.response.MessageResponse;
import com.katjh.service.FoodService;
import com.katjh.service.RestaurantService;
import com.katjh.service.user.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin/food")
@RequiredArgsConstructor
public class AdminFoodController {

    private final FoodService foodService;
    private final UserService userService;
    private final RestaurantService restaurantService;

    @PostMapping
    public ResponseEntity<Food> createFood(
            @RequestBody CreateFoodRequest req, @RequestHeader("Authorization") String token)
            throws Exception {
        User user = userService.findUserByJwtToken(token);
        //        Restaurant restaurant =
        // restaurantService.findRestaurantById(req.getRestaurantId());
        Restaurant restaurant = restaurantService.getRestaurantByUserId(user.getId());
        Food food = foodService.createFood(req, req.getCategory(), restaurant);
        return new ResponseEntity<>(food, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<MessageResponse> deleteFood(
            @PathVariable Long id, @RequestHeader("Authorization") String token) throws Exception {
        User user = userService.findUserByJwtToken(token);
        foodService.deleteFood(id);
        MessageResponse res = new MessageResponse();
        res.setMessage("Food deleted successfully");
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Food> updateFoodAvailabilityStatus(
            @PathVariable Long id, @RequestHeader("Authorization") String token) throws Exception {
        User user = userService.findUserByJwtToken(token);
        Food food = foodService.updateAvailableStatus(id);
        return new ResponseEntity<>(food, HttpStatus.CREATED);
    }
}
