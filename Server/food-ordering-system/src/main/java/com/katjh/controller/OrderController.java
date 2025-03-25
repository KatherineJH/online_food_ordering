package com.katjh.controller;

import com.katjh.model.Order;
import com.katjh.model.User;
import com.katjh.request.OrderRequest;
import com.katjh.service.OrderService;
import com.katjh.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/order")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;
    private final UserService userService;

    /**
     * Create a new order(최종 주문)
     * @param token
     * @param orderRequest
     * @return
     * @throws Exception
     */
    @PostMapping("/create")
    public ResponseEntity<Order> createOrder(@RequestHeader("Authorization") String token,
                                             @RequestBody OrderRequest orderRequest) throws Exception {
        User user = userService.findUserByJwtToken(token);
        Order order = orderService.createOrder(orderRequest, user);
        return new ResponseEntity<>(order, HttpStatus.OK);
    }

    @GetMapping("/user/history")
    public ResponseEntity<List<Order>> getOrderHistory(@RequestHeader("Authorization") String token) throws Exception {

        User user = userService.findUserByJwtToken(token);
        List<Order> orders = orderService.getUserOrder(user.getId());
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }
}
