package com.katjh.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.katjh.dto.ReviewResponseDto;
import com.katjh.model.Cart;
import com.katjh.model.Order;
import com.katjh.model.User;
import com.katjh.request.OrderRequest;
import com.katjh.service.CartService;
import com.katjh.service.OrderService;
import com.katjh.service.user.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/order")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;
    private final UserService userService;
    private final CartService cartService;

    /**
     * Create a new order(최종 주문)
     *
     * @param token
     * @param orderRequest
     * @return
     * @throws Exception
     */
    @PostMapping("/create")
    public ResponseEntity<Order> createOrder(
            @RequestHeader("Authorization") String token, @RequestBody OrderRequest orderRequest)
            throws Exception {
        User user = userService.findUserByJwtToken(token);
        Order order = orderService.createOrder(orderRequest, user);
        Cart cart = cartService.clearCart(user.getId());
        return new ResponseEntity<>(order, HttpStatus.OK);
    }

    @GetMapping("/user/history")
    public ResponseEntity<List<Order>> getOrderHistory(@RequestHeader("Authorization") String token)
            throws Exception {

        User user = userService.findUserByJwtToken(token);
        List<Order> orders = orderService.getUserOrder(user.getId());
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    // 리뷰
    @GetMapping("/review/{id}")
    public ResponseEntity<ReviewResponseDto> getOrderReview(
            @RequestHeader("Authorization") String token, @PathVariable Long id) throws Exception {
        User user = userService.findUserByJwtToken(token);
        ReviewResponseDto reviewDto = orderService.getOrderReview(id, user);
        return new ResponseEntity<>(reviewDto, HttpStatus.OK);
    }
}
