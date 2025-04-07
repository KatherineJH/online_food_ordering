package com.katjh.service.serviceAI;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.katjh.model.Restaurant;
import com.katjh.model.Review;
import com.katjh.model.User;
import com.katjh.repository.RestaurantRepository;
import com.katjh.repository.ReviewRepository;
import com.katjh.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.client.RestTemplate;

import lombok.RequiredArgsConstructor;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class MLService {

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final RestaurantRepository restaurantRepository;


    private final RestTemplate restTemplate;

    private final String baseUrl = "http://127.0.0.1:5000";

    public String getPrediction(Map<String, Object> inputData) {
        return postRequest("/predict", inputData); // Flask에서 받은 JSON 그대로 반환
    }

//    public String getPrediction(Map<String, Object> inputData) {
//        String flaskResponse = postRequest("/predict", inputData);
//
//        ObjectMapper objectMapper = new ObjectMapper();
//        try {
//            JsonNode jsonNode = objectMapper.readTree(flaskResponse);
//            String label = jsonNode.get("prediction").asText();
//            double confidence = jsonNode.get("probability").asDouble();
//
//            String text = (String) inputData.get("review");
//            Long userId = Long.valueOf(inputData.get("userId").toString()); // ❗안전한 방식으로 수정 필요
//            Long restaurantId = Long.valueOf(inputData.get("restaurantId").toString());
//
//            User user = userRepository.findById(userId).orElseThrow();
//            Restaurant restaurant = restaurantRepository.findById(restaurantId).orElseThrow();
//
//            Review review = new Review();
//            review.setContent(text);
//            review.setRating(label);
//            review.setPercentage(confidence * 100);
//            review.setUser(user);
//            review.setRestaurant(restaurant);
//
//            reviewRepository.save(review);
//
//            // JSON string을 반환
//            return String.format("{\"prediction\":\"%s\",\"probability\":%.2f}", label, confidence);
//
//        } catch (Exception e) {
//            e.printStackTrace();
//            return "{\"error\":\"" + e.getMessage() + "\"}";
//        }
//    }



    public String getTopWords() {
        return getRequest("/top-words");
    }

    public String getWorstWords() {
        return getRequest("/worst-words");
    }

    public String getRestaurantRanking(Map<String, Object> inputData) {
        return postRequest("/rank-restaurants", inputData);
    }

    private String postRequest(String endpoint, Map<String, Object> data) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(data, headers);
        return restTemplate.postForObject(baseUrl + endpoint, entity, String.class);
    }

    private String getRequest(String endpoint) {
        return restTemplate.getForObject(baseUrl + endpoint, String.class);
    }
}
