package com.katjh.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.katjh.model.Cart;

public interface CartRepository extends JpaRepository<Cart, Long> {

    public Cart findByCustomerId(Long userId);
}
