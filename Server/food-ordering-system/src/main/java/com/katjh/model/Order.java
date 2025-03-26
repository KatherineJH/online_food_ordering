package com.katjh.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.katjh.dto.RestaurantDto;
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
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User customer; // single user can have multiple orders


    @JsonIgnore
    @ManyToOne
    private Restaurant restaurant; // single restaurant can have multiple orders

    private Long totalAmount;

    private String orderStatus;

    private Date createdAt;

    @ManyToOne
    private Address deliveryAddress; // single address can have multiple orders

    @OneToMany
    private List<OrderItem> items; // single order can have multiple items

//    private Payment payment;

    private int totalItem;

    private Long totalPrice;

}
