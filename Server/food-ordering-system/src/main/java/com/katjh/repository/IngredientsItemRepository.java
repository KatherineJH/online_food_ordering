package com.katjh.repository;

import com.katjh.model.IngredientItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IngredientsItemRepository extends JpaRepository<IngredientItem, Long> {

    List<IngredientItem> findByRestaurantId(Long id);
}
