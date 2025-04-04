package com.katjh.controller;

import com.katjh.service.serviceAI.MLService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/predict")
@RequiredArgsConstructor
public class PredictionController {

    private final MLService mlService;

    @PostMapping
    public String requestPrediction(@RequestBody Map<String, Object> inputData) {
        return mlService.getPrediction(inputData);
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