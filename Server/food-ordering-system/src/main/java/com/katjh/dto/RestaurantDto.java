package com.katjh.dto;

import java.util.List;

import com.katjh.model.Restaurant;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;

@Data
@Embeddable
public class RestaurantDto {
    private Long id;
    private String name;
    private Boolean open;

    @Column(length = 1000)
    private List<String> images;

    private String description;

    public static RestaurantDto from(Restaurant restaurant) {
        RestaurantDto dto = new RestaurantDto();
        dto.setId(restaurant.getId());
        dto.setName(restaurant.getName());
        dto.setOpen(restaurant.isOpen());
        dto.setImages(restaurant.getImages());
        dto.setDescription(restaurant.getDescription());
        return dto;
    }
}
