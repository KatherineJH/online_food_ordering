package com.katjh.service;

import com.katjh.model.Cart;
import com.katjh.model.CartItem;
import com.katjh.request.AddCartItemRequest;

public interface CartService {

    public CartItem addItemToCart(AddCartItemRequest request, String token) throws Exception;

    public CartItem updateCartItemQuantity(Long cartItemId, int quantity) throws Exception;

    public Cart removeItemFromCart(Long cartItemId, String token) throws Exception;

    public Long calculateCartTotals(Cart cart) throws Exception;

    public Cart findCartById(Long id) throws Exception;

    public Cart findCartByUserId(Long UserId) throws Exception;

    public Cart clearCart(Long UserId) throws Exception;
}
