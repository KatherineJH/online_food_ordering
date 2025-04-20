package com.katjh.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.katjh.dto.RestaurantDto;
import com.katjh.model.Restaurant;
import com.katjh.model.User;
import com.katjh.service.RestaurantService;
import com.katjh.service.user.UserService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/restaurant")
public class RestaurantController {

    private final RestaurantService restaurantService;
    private final UserService userService;

    @GetMapping("/search")
    public ResponseEntity<List<Restaurant>> searchRestaurant(
            @RequestHeader("Authorization") String token, @RequestParam String keyword)
            throws Exception {

        User user = userService.findUserByJwtToken(token);
        List<Restaurant> restaurants = restaurantService.searchRestaurant(keyword);
        return new ResponseEntity<>(restaurants, HttpStatus.OK);
    }

    // 방문자도 볼 수 있도록 변경
    //    public ResponseEntity<List<Restaurant>> getAllRestaurant(
    //            @RequestHeader("Authorization") String token) throws Exception {
    @GetMapping("/visitor")
    public ResponseEntity<List<Restaurant>> getAllRestaurant() {
        //        User user = userService.findUserByJwtToken(token);
        List<Restaurant> restaurants = restaurantService.getAllRestaurants();
        return new ResponseEntity<>(restaurants, HttpStatus.OK);
    }

    // 비회원도 조회 할 수 있도록 수정
    @GetMapping("/{id}")
    public ResponseEntity<Restaurant> findRestaurantById(
//            @RequestHeader("Authorization") String token,
            @PathVariable Long id) throws Exception {
//        User user = userService.findUserByJwtToken(token);
        Restaurant restaurant = restaurantService.findRestaurantById(id);
        return new ResponseEntity<>(restaurant, HttpStatus.OK);
    }

    // id here is the restaurant id
    @PutMapping("/{id}/add-favorite")
    public ResponseEntity<RestaurantDto> addToFavorites(
            @RequestHeader("Authorization") String token, @PathVariable Long id) throws Exception {

        User user = userService.findUserByJwtToken(token);

        RestaurantDto restaurant = restaurantService.addToFavorites(id, user);
        return new ResponseEntity<>(restaurant, HttpStatus.OK);
    }

    @GetMapping("/favorites")
    public ResponseEntity<List<RestaurantDto>> getFavoriteRestaurants(
            @RequestHeader("Authorization") String token) throws Exception {

        User user = userService.findUserByJwtToken(token);
        List<RestaurantDto> favorites = restaurantService.getFavoriteRestaurants(user);

        return new ResponseEntity<>(favorites, HttpStatus.OK);
    }
}
