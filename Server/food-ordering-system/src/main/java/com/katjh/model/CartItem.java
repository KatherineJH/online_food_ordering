package com.katjh.model;

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
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne @JsonIgnore private Cart cart; // single cart can have multiple items

    @ManyToOne private Food food; // single food can be in multiple carts

    private int quantity;
    private List<String> ingredients;
    private Long totalPrice;
}
