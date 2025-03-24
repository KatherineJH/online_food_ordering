package com.katjh.model;

import jakarta.persistence.*;

@Entity
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
//    private String streetAddress;
//    private String city;
//    private String stateProvince;
//    private String postalCode;
//    private String country;
}
