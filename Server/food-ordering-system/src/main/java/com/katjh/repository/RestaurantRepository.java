package com.katjh.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.katjh.model.Restaurant;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {

    // Find restaurants by name or cuisine type
    // 대소문자 구분 없이 사용 with LOWER()와 CONCAT()
    @Query(
            "SELECT r FROM Restaurant r WHERE lower(r.name) LIKE lower(concat('%', :query, '%')) "
                    + "OR lower(r.cuisineType) LIKE lower(concat('%', :query, '%'))")
    List<Restaurant> findBySearchQuery(String query);

    Restaurant findByOwnerId(Long userId);
}
