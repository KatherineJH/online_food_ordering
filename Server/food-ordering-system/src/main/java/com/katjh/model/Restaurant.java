package com.katjh.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Restaurant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne private User owner;

    private String name;
    private String description;
    private String cuisineType;

    @OneToOne(cascade = CascadeType.ALL)
    private Address address;

    @Embedded private ContactInformation contactInformation;

    private String openingHours;

    //    List<Review>를 new ArrayList<>()로 초기화함으로써 null 체크를 피하고, 빈 리스트로 시작
    @JsonIgnore
    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Order> orders = new ArrayList<>(); // single restaurant can have multiple orders

    @ElementCollection
    @Column(length = 1000)
    private List<String> images;

    private LocalDateTime registeredDate;

    private boolean open;

    @JsonIgnore
    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Food> foods = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Review> review = new ArrayList<>();
}
