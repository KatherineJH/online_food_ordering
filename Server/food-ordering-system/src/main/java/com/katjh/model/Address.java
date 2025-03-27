package com.katjh.model;

import jakarta.persistence.*;

@Entity
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String addressName;

    private String streetAddress;

    private String city;

    private String state;

    private String postalCode;

    private String country;
}
