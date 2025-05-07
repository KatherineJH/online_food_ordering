package com.katjh.service.serviceAI;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ElasticsearchStartupRunner {

    private final RestaurantIndexer indexer;
    private final ElasticIndexCreator elasticIndexCreator;

    @PostConstruct
    public void init() {
        try {
            elasticIndexCreator.createIndexManually(); // ✅ 인덱스 없으면 생성
            indexer.indexAllRestaurants(); // ✅ 인덱싱
            System.out.println("✅ Elasticsearch 자동 색인 완료");
        } catch (Exception e) {
            System.out.println("⚠️ Elasticsearch 연결 실패 (무시됨): " + e.getMessage());
        }
    }

}
