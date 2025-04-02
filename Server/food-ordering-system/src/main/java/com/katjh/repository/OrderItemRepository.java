package com.katjh.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.katjh.model.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {}
