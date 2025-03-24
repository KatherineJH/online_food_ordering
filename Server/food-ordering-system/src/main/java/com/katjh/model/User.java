package com.katjh.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.katjh.dto.RestaurantDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;

    private String email;

    private String password;


//    @Enumerated(EnumType.STRING) // copliot 제안받아 작성한 부분
    private USER_ROLE role = USER_ROLE.ROLE_CUSTOMER;

    // @JsonIgnore: Fetch 할때마다 orders List가 필요한 것이 아니므로.
    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "customer")
    private List<Order> orders = new ArrayList<>();

    // @ElementCollection: @OneToMany와 달리 별도의 엔티티로 관리되지 않고, 단순히 컬렉션으로 저장되기를 원할 때.
    // RestaurantDto와 같은 Embeddable 객체가 다른 테이블에 저장되는 것이 아니라, User(부모 엔티티)에 저장된다.
    @ElementCollection
    private List<RestaurantDto> favorites = new ArrayList<>();

    // one user can have multiple addresses
    // CascadeType.ALL: 해당 User가 삭제될 때, 연관된 Address 엔티티도 삭제된다.
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Address> addresses = new ArrayList<>();
}