package com.katjh.service.implementation;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.katjh.dto.RestaurantDto;
import com.katjh.model.Address;
import com.katjh.model.Restaurant;
import com.katjh.model.User;
import com.katjh.repository.AddressRepository;
import com.katjh.repository.RestaurantRepository;
import com.katjh.repository.UserRepository;
import com.katjh.request.CreateRestaurantRequest;
import com.katjh.service.RestaurantService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RestaurantServiceImpl implements RestaurantService {

    private final UserRepository userRepository;

    private static final Logger logger = LoggerFactory.getLogger(RestaurantServiceImpl.class);

    private final AddressRepository addressRepository;
    private final RestaurantRepository restaurantRepository;

    @Override
    public Restaurant createRestaurant(CreateRestaurantRequest req, User user) {

        logger.info("Received Address: {}", req.getAddress());

        Restaurant restaurant = new Restaurant();
        restaurant.setOwner(user);

        Address address = addressRepository.save(req.getAddress());
        restaurant.setAddress(address);

        restaurant.setContactInformation(req.getContactInformation());
        restaurant.setCuisineType(req.getCuisineType());
        restaurant.setDescription(req.getDescription());
        restaurant.setImages(req.getImages());
        restaurant.setName(req.getName());
        restaurant.setOpeningHours(req.getOpeningHours());
        restaurant.setRegisteredDate(LocalDateTime.now());

        return restaurantRepository.save(restaurant);
    }

    @Override
    public Restaurant updateRestaurant(Long restaurantId, CreateRestaurantRequest updatedRestaurant)
            throws Exception {

        Restaurant restaurant = findRestaurantById(restaurantId);

        if (restaurant.getCuisineType() != null) {
            restaurant.setCuisineType(updatedRestaurant.getCuisineType());
        }
        if (restaurant.getDescription() != null) {
            restaurant.setDescription(updatedRestaurant.getDescription());
        }
        if (restaurant.getName() != null) {
            restaurant.setName(updatedRestaurant.getName());
        }

        return restaurantRepository.save(restaurant);
    }

    @Override
    public void deleteRestaurant(Long restaurantId) throws Exception {

        Restaurant restaurant = findRestaurantById(restaurantId);

        restaurantRepository.delete(restaurant);
    }

    @Override
    public List<Restaurant> getAllRestaurants() {
        return restaurantRepository.findAll();
    }

    @Override
    public List<Restaurant> searchRestaurant(String keyword) {
        return restaurantRepository.findBySearchQuery(keyword);
    }

    @Override
    public Restaurant findRestaurantById(Long id) throws Exception {
        Optional<Restaurant> opt = restaurantRepository.findById(id);
        if (opt.isEmpty()) {
            throw new Exception("Restaurant not found with id: " + id);
        }
        return opt.get();
    }

    @Override
    public Restaurant getRestaurantByUserId(Long userId) throws Exception {
        Restaurant restaurant = restaurantRepository.findByOwnerId(userId);
        if (restaurant == null) {
            throw new Exception("Restaurant not found with Owner id: " + userId);
        }
        return restaurant;
    }

    /**
     * Add restaurant to user's favorites
     *
     * @param restaurantId
     * @param user
     * @return
     * @throws Exception
     */
    @Override
    public RestaurantDto addToFavorites(Long restaurantId, User user) throws Exception {

        RestaurantDto dto = new RestaurantDto();
        // assign restaurant by restaurantId
        Restaurant restaurant = findRestaurantById(restaurantId);
        // set restaurant details to dto(식당 정보를 RestaurantDto에 세팅)
        dto.setDescription(restaurant.getDescription());
        dto.setImages(restaurant.getImages());
        dto.setTitle(restaurant.getName());
        dto.setId(restaurantId);

        boolean isFavorited = false;
        List<RestaurantDto> favorites = user.getFavorites();
        // loop all the user's favorite restaurants
        for (RestaurantDto favorite : favorites) {
            if (favorite.getId().equals(restaurantId)) {
                isFavorited = true; // 이미 즐겨찾기에 추가된 식당이면 true
                break; // break the loop
            }
        }
        // If the restaurant is already in the user's favorites, remove it
        if (isFavorited) {
            favorites.removeIf(favorite -> favorite.getId().equals(restaurantId));
        } // otherwise, add it to the user's favorites
        else {
            favorites.add(dto);
        }
        userRepository.save(user);
        return dto;
    }

    @Override
    public Restaurant updateRestaurantStatus(Long id) throws Exception {

        Restaurant restaurant = findRestaurantById(id);
        // restaurant이 열려있으면 close, 닫혀있으면 open
        restaurant.setOpen(!restaurant.isOpen());
        return restaurantRepository.save(restaurant);
    }
}
