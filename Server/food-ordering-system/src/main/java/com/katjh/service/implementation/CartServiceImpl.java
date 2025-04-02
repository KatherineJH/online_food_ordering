package com.katjh.service.implementation;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.katjh.model.Cart;
import com.katjh.model.CartItem;
import com.katjh.model.Food;
import com.katjh.model.User;
import com.katjh.repository.CartItemRepository;
import com.katjh.repository.CartRepository;
import com.katjh.repository.FoodRepository;
import com.katjh.request.AddCartItemRequest;
import com.katjh.service.CartService;
import com.katjh.service.FoodService;
import com.katjh.service.user.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final FoodRepository foodRepository;

    private final UserService userService;
    private final FoodService foodService;

    /**
     * Add "a" new item to the cart
     *
     * @param request
     * @param token
     * @return
     * @throws Exception
     */
    @Override
    public CartItem addItemToCart(AddCartItemRequest request, String token) throws Exception {
        //        // token이 아닌 Long userId로 받아서 사용해도 controller에서 token을 받아서 사용하기 때문에 userId를 바로 받아서
        // 사용해도 된다.
        //        Food food = foodService.findFoodById(request.getFoodId());
        //        Cart cart = cartRepository.findByCustomerId(userId);
        User user = userService.findUserByJwtToken(token);
        Food food = foodService.findFoodById(request.getFoodId());
        Cart cart = cartRepository.findByCustomerId(user.getId());

        for (CartItem cartItem : cart.getItem()) {
            if (cartItem.getFood().equals(food)) {
                int newQuantity = cartItem.getQuantity() + request.getQuantity();
                return updateCartItemQuantity(cartItem.getId(), newQuantity);
            }
        }
        // Else: if the food is not in the cart, create a new cart item
        CartItem newCartItem = new CartItem();
        newCartItem.setFood(food);
        newCartItem.setCart(cart);
        newCartItem.setQuantity(request.getQuantity());
        newCartItem.setIngredients(request.getIngredients());
        newCartItem.setTotalPrice(request.getQuantity() * food.getPrice());

        CartItem savedCartItem = cartItemRepository.save(newCartItem);
        cart.getItem().add(savedCartItem);

        return savedCartItem;
    }

    @Override
    public CartItem updateCartItemQuantity(Long cartItemId, int quantity) throws Exception {
        // find the cart item by cartItemId belongs to the user
        Optional<CartItem> cartItemOptional = cartItemRepository.findById(cartItemId);
        if (cartItemOptional.isEmpty()) {
            throw new Exception("cart item not found");
        }
        CartItem item = cartItemOptional.get();
        item.setQuantity(quantity);

        item.setTotalPrice(item.getFood().getPrice() * quantity);
        return cartItemRepository.save(item);
    }

    @Override
    public Cart removeItemFromCart(Long cartItemId, String token) throws Exception {

        User user = userService.findUserByJwtToken(token);
        Cart cart = cartRepository.findByCustomerId(user.getId());

        /**
         * Optional: A container object which may or may not contain a non-null value.
         * NullPointerException 방지 목적. 값이 존재할 수도 있고, 없을 수도 있는 경우에 유용.
         */
        Optional<CartItem> cartItemOptional = cartItemRepository.findById(cartItemId);
        if (cartItemOptional.isEmpty()) {
            throw new Exception("cart item not found");
        }

        CartItem item = cartItemOptional.get();

        cart.getItem().remove(item);

        return cartRepository.save(cart);
    }

    @Override
    public Long calculateCartTotals(Cart cart) throws Exception {
        long total = 0L;
        for (CartItem cartItem : cart.getItem()) {
            total += cartItem.getFood().getPrice() * cartItem.getQuantity();
        }

        return total;
    }

    @Override
    public Cart findCartById(Long id) throws Exception {
        Optional<Cart> optionalCart = cartRepository.findById(id);
        if (optionalCart.isEmpty()) {
            throw new Exception("cart not found with id: " + id);
        }
        return optionalCart.get();
    }

    @Override
    public Cart findCartByUserId(Long userId) throws Exception {
        Cart cart = cartRepository.findByCustomerId(userId);
        cart.setTotal(calculateCartTotals(cart));
        return cart;
    }

    @Override
    public Cart clearCart(Long userId) throws Exception {
        Cart cart = findCartByUserId(userId);
        cart.getItem().clear();
        return cartRepository.save(cart);
    }
}
