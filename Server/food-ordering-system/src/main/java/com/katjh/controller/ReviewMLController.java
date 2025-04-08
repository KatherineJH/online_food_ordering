package com.katjh.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.katjh.model.Order;
import com.katjh.model.Restaurant;
import com.katjh.model.Review;
import com.katjh.model.User;
import com.katjh.repository.OrderRepository;
import com.katjh.repository.RestaurantRepository;
import com.katjh.repository.ReviewRepository;
import com.katjh.service.serviceAI.MLService;
import com.katjh.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/predict")
@RequiredArgsConstructor
public class ReviewMLController {

    private final MLService mlService;
    private final UserService userService;
    private final ReviewRepository reviewRepository;
    private final RestaurantRepository restaurantRepository;
    private final OrderRepository orderRepository;

//    @PostMapping
//    public String requestPrediction(@RequestBody Map<String, Object> inputData) {
//        return mlService.getPrediction(inputData);
//    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> requestPrediction(
            @RequestHeader("Authorization") String token,
            @RequestBody Map<String, Object> inputData) {

        try {
            User user = userService.findUserByJwtToken(token);

            Long restaurantId = Long.valueOf(inputData.get("restaurantId").toString());
            Long orderId = Long.valueOf(inputData.get("orderId").toString());

            Restaurant restaurant = restaurantRepository.findById(restaurantId)
                    .orElseThrow(() -> new RuntimeException("Restaurant not found"));
            Order order = orderRepository.findById(orderId)
                    .orElseThrow(() -> new RuntimeException("Order not found"));

            String response = mlService.getPrediction(inputData);

            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode responseJson = objectMapper.readTree(response);

            String predictedLabel = responseJson.get("prediction").asText();
            double confidence = responseJson.get("probability").asDouble();

            Review review = new Review();
            review.setContent(inputData.get("review").toString());
            review.setRating(predictedLabel);
            review.setPercentage(confidence * 100);
            review.setRestaurant(restaurant);
            review.setUser(user);
            review.setOrder(order); // <- 연결된 주문 저장

            reviewRepository.save(review);

            Map<String, Object> result = new HashMap<>();
            result.put("prediction", predictedLabel);
            result.put("confidence", confidence * 100);
            result.put("message", "Review saved successfully");

            return ResponseEntity.ok(result);

        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", "Prediction failed: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @GetMapping("/top-words")
    public String getTopWords() {
        return mlService.getTopWords();
    }

    @GetMapping("/worst-words")
    public String getWorstWords() {
        return mlService.getWorstWords();
    }

    @PostMapping("/rank-restaurants")
    public String rankRestaurants(@RequestBody Map<String, Object> inputData) {
        return mlService.getRestaurantRanking(inputData);
    }
}