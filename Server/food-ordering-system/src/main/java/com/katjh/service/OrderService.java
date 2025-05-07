package com.katjh.service;

import java.util.List;

import com.katjh.dto.ReviewResponseDto;
import com.katjh.model.Order;
import com.katjh.model.User;
import com.katjh.request.OrderRequest;

public interface OrderService {

    public Order createOrder(OrderRequest order, User user) throws Exception;

    public Order updateOrder(Long orderId, String orderStatus) throws Exception;

    public void cancelOrder(Long orderId) throws Exception;

    public List<Order> getUserOrder(Long userId) throws Exception;

    public List<Order> getRestaurantsOrder(Long restaurantId, String orderStatus) throws Exception;

    public Order findOrderById(Long orderId) throws Exception;

    ReviewResponseDto getOrderReview(Long reviewId, User user) throws Exception;
}
