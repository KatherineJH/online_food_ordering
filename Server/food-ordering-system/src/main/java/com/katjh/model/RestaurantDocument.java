package com.katjh.model;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.elasticsearch.annotations.Document;

import java.util.List;

@Document(indexName = "restaurants")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RestaurantDocument {

    @Id
    private Long id;

    private String name;
    private String cuisineType;
    private List<String> foodNames;
    private List<String> foodDescriptions;
    private List<String> ingredientNames;
    private List<String> foodCategories;
}
