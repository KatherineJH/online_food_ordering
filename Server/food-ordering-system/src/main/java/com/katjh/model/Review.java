package com.katjh.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String content;

    private String rating; // Positive or Negative

    private double percentage; // 100.0 is the best, 0.0 is the worst

    // single review can have only one restaurant, however, one restaurant can have multiple reviews
    @ManyToOne @JsonIgnore private Restaurant restaurant;

    // single review can have only one user, however, one user can have multiple reviews
    @ManyToOne @JsonIgnore private User user;

    // single review can have only one order, however, one order can have multiple reviews
    @JsonIgnore @ManyToOne private Order order;
}
