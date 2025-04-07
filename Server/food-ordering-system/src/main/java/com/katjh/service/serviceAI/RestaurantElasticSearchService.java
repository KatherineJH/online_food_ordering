package com.katjh.service.serviceAI;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch.core.SearchResponse;
import co.elastic.clients.elasticsearch.core.search.Hit;
import com.katjh.model.RestaurantDocument;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RestaurantElasticSearchService {

    private final ElasticsearchClient client;

    public List<RestaurantDocument> search(String keyword) {
        try {
            SearchResponse<RestaurantDocument> response = client.search(s -> s
                            .index("restaurants")
                            .query(q -> q
                                    .multiMatch(m -> m
                                            .query(keyword) // ✅ 검색어를 넣어야 합니다!
                                            .fields("name", "cuisineType", "foodNames", "foodDescriptions", "ingredientNames", "foodCategories")
                                            .fuzziness("AUTO") // ✅ 오타 자동 대응
                                    )
                            ),
                    RestaurantDocument.class
            );

            return response.hits().hits().stream()
                    .map(Hit::source)
                    .collect(Collectors.toList());

        } catch (IOException e) {
            throw new RuntimeException("Elasticsearch 검색 중 오류 발생", e);
        }
    }
}
