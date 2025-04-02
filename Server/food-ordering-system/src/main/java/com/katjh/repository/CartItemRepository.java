package com.katjh.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.katjh.model.CartItem;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {}
