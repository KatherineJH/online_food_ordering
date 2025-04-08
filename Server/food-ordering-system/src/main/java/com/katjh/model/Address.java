package com.katjh.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "address_name")
    private String addressName;

    @Column(name = "street_address")
    private String streetAddress;

    private String city;

    private String state;

    @Column(name = "postal_code")
    private String postalCode;

    private String country;

    //    // 하나의 주소는 has 여러 개의 orders
    //    @OneToMany(mappedBy = "deliveryAddress", cascade = CascadeType.ALL, orphanRemoval = true)
    //    private List<Order> orders;
    //
    //    // 각 주소는 하나의 사용자와 연결
    //    @ManyToOne
    //    @JoinColumn(name = "user_id")
    //    private User user;
}
