package com.katjh.controller;

import com.katjh.dto.RestaurantDto;
import com.katjh.model.Restaurant;
import com.katjh.model.User;
import com.katjh.request.CreateRestaurantRequest;
import com.katjh.service.RestaurantService;
import com.katjh.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/restaurants")
public class RestaurantController {

    private final RestaurantService restaurantService;
    private final UserService userService;

    @GetMapping("/search")
    public ResponseEntity<List<Restaurant>> searchRestaurant(
            @RequestHeader("Authorization") String token,
            @RequestParam String keyword) throws Exception{

        User user = userService.findUserByJwtToken(token);
        List<Restaurant> restaurants = restaurantService.searchRestaurant(keyword);
        return new ResponseEntity<>(restaurants, HttpStatus.OK);
    }

    @GetMapping()
    public ResponseEntity<List<Restaurant>> getAllRestaurant(
            @RequestHeader("Authorization") String token) throws Exception{

        User user = userService.findUserByJwtToken(token);
        List<Restaurant> restaurants = restaurantService.getAllRestaurants();
        return new ResponseEntity<>(restaurants, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Restaurant> findRestaurantById(
            @RequestHeader("Authorization") String token,
            @PathVariable Long id) throws Exception{

        User user = userService.findUserByJwtToken(token);
        Restaurant restaurant = restaurantService.findRestaurantById(id);
        return new ResponseEntity<>(restaurant, HttpStatus.CREATED);
    }

    // id here is the restaurant id
    @PutMapping("/{id}/add-favorite")
    public ResponseEntity<RestaurantDto> addToFavorites(
            @RequestHeader("Authorization") String token,
            @PathVariable Long id) throws Exception{

        User user = userService.findUserByJwtToken(token);

        RestaurantDto restaurant = restaurantService.addToFavorites(id, user);
        return new ResponseEntity<>(restaurant, HttpStatus.OK);
    }
}
