package com.katjh.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.katjh.model.Cart;
import com.katjh.model.CartItem;
import com.katjh.model.User;
import com.katjh.request.AddCartItemRequest;
import com.katjh.request.UpdateCartItemRequest;
import com.katjh.service.CartService;
import com.katjh.service.user.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;
    private final UserService userService;

    /**
     * Add "a" new item to the cart
     *
     * @param request
     * @param token
     * @return
     * @throws Exception
     */
    @PutMapping("/cart/add")
    public ResponseEntity<CartItem> addItemToCart(
            @RequestBody AddCartItemRequest request, @RequestHeader("Authorization") String token)
            throws Exception {
        CartItem cartItem = cartService.addItemToCart(request, token);
        return new ResponseEntity<>(cartItem, HttpStatus.OK);
    }

    @PutMapping("/cart-item/update")
    public ResponseEntity<CartItem> updateCartItemQuantity(
            @RequestBody UpdateCartItemRequest request,
            @RequestHeader("Authorization") String token)
            throws Exception {
        CartItem cartItem =
                cartService.updateCartItemQuantity(request.getCartItemId(), request.getQuantity());
        return new ResponseEntity<>(cartItem, HttpStatus.OK);
    }

    @DeleteMapping("/cart-item/{cartItemId}/remove")
    public ResponseEntity<Cart> removeCartItem(
            @PathVariable Long cartItemId, @RequestHeader("Authorization") String token)
            throws Exception {
        Cart cartItem = cartService.removeItemFromCart(cartItemId, token);
        return new ResponseEntity<>(cartItem, HttpStatus.OK);
    }

    @PutMapping("/cart/clear")
    public ResponseEntity<Cart> clearCart(@RequestHeader("Authorization") String token)
            throws Exception {
        User user = userService.findUserByJwtToken(token);
        Cart cart = cartService.clearCart(user.getId());
        return new ResponseEntity<>(cart, HttpStatus.OK);
    }

    @GetMapping("/cart")
    public ResponseEntity<Cart> findUserCart(@RequestHeader("Authorization") String token)
            throws Exception {
        User user = userService.findUserByJwtToken(token);
        Cart cart = cartService.findCartByUserId(user.getId());
        return new ResponseEntity<>(cart, HttpStatus.OK);
    }
}
