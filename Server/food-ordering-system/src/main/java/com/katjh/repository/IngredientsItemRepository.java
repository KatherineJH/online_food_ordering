package com.katjh.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.katjh.model.IngredientItem;

public interface IngredientsItemRepository extends JpaRepository<IngredientItem, Long> {

    List<IngredientItem> findByRestaurantId(Long id);
}
