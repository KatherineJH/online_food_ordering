package com.katjh.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.katjh.model.RestaurantDocument;
import com.katjh.service.serviceAI.RestaurantElasticSearchService;
import com.katjh.service.serviceAI.RestaurantIndexer;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/search")
@RequiredArgsConstructor
public class ElasticSearchController {

    private final RestaurantElasticSearchService searchService;
    private final RestaurantIndexer restaurantIndexer;

    @GetMapping
    public ResponseEntity<List<RestaurantDocument>> search(@RequestParam String keyword) {
        return ResponseEntity.ok(searchService.search(keyword));
    }

    @PostMapping("/index/restaurants")
    public ResponseEntity<String> indexRestaurants() {
        restaurantIndexer.indexAllRestaurants();
        return ResponseEntity.ok("Indexing complete!");
    }

    @GetMapping("/autocomplete")
    public ResponseEntity<List<String>> autocomplete(@RequestParam String prefix) {
        return ResponseEntity.ok(searchService.autocomplete(prefix));
    }
}
