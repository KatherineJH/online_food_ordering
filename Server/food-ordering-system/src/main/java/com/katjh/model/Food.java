package com.katjh.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Food {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private Long price;

    @ManyToOne
    private Category foodCategory; // single category can have multiple foods

    @Column(length = 1000)
    @ElementCollection
    private List<String> images;

    private boolean available;

    @ManyToOne
    private Restaurant restaurant; // single restaurant can have multiple foods

    private boolean isVegetarian;
    private boolean isSeasonal;

    @ManyToMany
    private List<IngredientItem> ingredients; // many foods can have many ingredients

    private Date creationDate;
}
