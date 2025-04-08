package com.katjh.model;

import java.util.List;

import org.springframework.data.elasticsearch.annotations.CompletionField;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.core.suggest.Completion;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(indexName = "restaurants")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RestaurantDocument {

    @Id private Long id;

    private String name;
    private String cuisineType;
    private List<String> foodNames;
    private List<String> foodDescriptions;
    private List<String> ingredientNames;
    private List<String> foodCategories;

    @CompletionField private Completion suggest;
}
