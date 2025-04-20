package com.katjh.dto;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReviewResponseDto {
    private Long id;
    private String content;
    private int rating; // 1~5 점수
    private double percentage;
}
