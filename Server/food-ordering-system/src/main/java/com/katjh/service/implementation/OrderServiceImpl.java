package com.katjh.service.implementation;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.katjh.model.*;
import com.katjh.repository.*;
import com.katjh.request.OrderRequest;
import com.katjh.service.CartService;
import com.katjh.service.OrderService;
import com.katjh.service.RestaurantService;
import com.katjh.service.user.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final AddressRepository addressRepository;
    private final UserRepository userRepository;
    private final RestaurantService restaurantService;
    private final CartService cartService;
    private final UserService userService;

    /**
     * Create a new order(최종 주문)
     *
     * @param order
     * @param user
     * @return
     * @throws Exception
     */
    @Override
    public Order createOrder(OrderRequest order, User user) throws Exception {

        Address shippingAddress = order.getDeliveryAddress();
        Address savedAddress = addressRepository.save(shippingAddress);

        if (!user.getAddresses().contains(savedAddress)) {
            user.getAddresses().add(savedAddress);
            userRepository.save(user);
        }

        Restaurant restaurant = restaurantService.findRestaurantById(order.getRestaurantId());

        Order createdOrder = new Order();

        createdOrder.setCustomer(user);
        createdOrder.setCreatedAt(new Date());
        createdOrder.setOrderStatus("PENDING");
        createdOrder.setDeliveryAddress(savedAddress);
        createdOrder.setRestaurant(restaurant);

        Cart cart = cartService.findCartByUserId(user.getId());

        List<OrderItem> orderItems = new ArrayList<>();

        // 주문 항목 리스트에 아이템을 추가
        for (CartItem cartItem : cart.getItem()) {
            OrderItem orderItem = new OrderItem();
            orderItem.setFood(cartItem.getFood());
            orderItem.setIngredients(cartItem.getIngredients());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setTotalPrice(cartItem.getTotalPrice());

            orderItem.setOrder(createdOrder); // 주문 항목에 주문을 연결
            orderItems.add(orderItem); // 리스트에 추가
        }

        // 총 가격 계산
        Long totalPrice = cartService.calculateCartTotals(cart);

        createdOrder.setItems(orderItems); // 주문 항목 설정
        createdOrder.setTotalPrice(totalPrice); // 총 가격 설정

        // 주문 저장
        Order savedOrder = orderRepository.save(createdOrder);

        // 레스토랑의 주문 리스트에 추가
        restaurant.getOrders().add(savedOrder);

        // 주문 항목들을 저장
        for (OrderItem orderItem : orderItems) {
            orderItem.setOrder(savedOrder); // 실제로 DB에 저장된 주문 객체를 설정
            orderItemRepository.save(orderItem); // 주문 항목 저장
        }

        return savedOrder; // 생성된 주문 반환
    }

    @Override
    public Order updateOrder(Long orderId, String orderStatus) throws Exception {
        Order order = findOrderById(orderId);
        if (orderStatus.equals("OUT_FOR_DELIVERY")
                || orderStatus.equals("DELIVERED")
                || orderStatus.equals("COMPLETED")
                || orderStatus.equals("PENDING")) {
            order.setOrderStatus(orderStatus);
            return orderRepository.save(order);
        }
        throw new Exception("Please provide a valid order status");
    }

    @Override
    public void cancelOrder(Long orderId) throws Exception {
        Order order = findOrderById(orderId);
        orderRepository.deleteById(orderId);
    }

    @Override
    public List<Order> getUserOrder(Long userId) throws Exception {
        return orderRepository.findByCustomerId(userId);
    }

    @Override
    public List<Order> getRestaurantsOrder(Long restaurantId, String orderStatus) throws Exception {
        List<Order> orders = orderRepository.findByRestaurantId(restaurantId);
        if (orderStatus != null) {
            orders =
                    orders.stream()
                            .filter(order -> order.getOrderStatus().equals(orderStatus))
                            .collect(Collectors.toList());
        }
        return orders;
    }

    @Override
    public Order findOrderById(Long orderId) throws Exception {

        Optional<Order> optionalOrder = orderRepository.findById(orderId);
        if (optionalOrder.isEmpty()) {
            throw new Exception("Order not found");
        }
        return optionalOrder.get();
    }
}
