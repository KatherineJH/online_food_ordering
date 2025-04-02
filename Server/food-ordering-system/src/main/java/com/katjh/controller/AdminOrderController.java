package com.katjh.controller;

import com.katjh.model.Order;
import com.katjh.model.User;
import com.katjh.service.OrderService;
import com.katjh.service.RestaurantService;
import com.katjh.service.user.UserService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/order")
@RequiredArgsConstructor
public class AdminOrderController {

    private final OrderService orderService;
    private final UserService userService;
    private final RestaurantService restaurantService;

    @GetMapping("/restaurant/{restaurantId}")
    public ResponseEntity<List<Order>> getOrderHistory(@RequestHeader("Authorization") String token,
                                                       @PathVariable Long restaurantId,
                                                       @RequestParam(required = false)String order_status) throws Exception {
        User user = userService.findUserByJwtToken(token);
//        Restaurant restaurant = restaurantService.getRestaurantByUserId(user.getId());
        List<Order> orders = orderService.getRestaurantsOrder(restaurantId, order_status);
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @PutMapping("/{orderId}/{orderStatus}")
    public ResponseEntity<Order> updateOrderStatus(@PathVariable Long orderId,
                                                   @PathVariable String orderStatus,
                                                   @RequestHeader("Authorization") String token) throws Exception {
        User user = userService.findUserByJwtToken(token);
        Order updatedOrder = orderService.updateOrder(orderId, orderStatus);
        return new ResponseEntity<>(updatedOrder, HttpStatus.OK);
    }
}
