package com.katjh.dto;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;

import java.util.List;

@Data
@Embeddable // RestaurantDto to be embedded as a part of 다른 엔티티(Mapped 대신에). 내장할 수 있게 해줌
public class RestaurantDto { // DTO는 테이블 아니고 Entity도 아니고, 그냥 데이터 전달 객체. 다른 Entity의 일부로 내장 될 것임.

    private String title;

    @Column(length = 1000)
    private List<String> images;

    private String description;
    private Long id;

}