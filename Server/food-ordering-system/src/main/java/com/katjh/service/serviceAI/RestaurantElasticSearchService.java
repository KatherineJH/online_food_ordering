package com.katjh.service.serviceAI;

import java.io.IOException;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.stereotype.Service;

import com.katjh.model.RestaurantDocument;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch.core.SearchResponse;
import co.elastic.clients.elasticsearch.core.search.Hit;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RestaurantElasticSearchService {

    private final ElasticsearchClient client;

    public List<RestaurantDocument> search(String keyword) {
        try {
            SearchResponse<RestaurantDocument> response =
                    client.search(
                            s ->
                                    s.index("restaurants")
                                            .query(
                                                    q ->
                                                            q.multiMatch(
                                                                    m ->
                                                                            m.query(keyword) // 검색어
                                                                                    .fields(
                                                                                            "name",
                                                                                            "cuisineType",
                                                                                            "foodNames",
                                                                                            "foodDescriptions",
                                                                                            "ingredientNames",
                                                                                            "foodCategories")
                                                                                    .fuzziness(
                                                                                            "AUTO") // set fuzziness to AUTO
                                                                    )),
                            RestaurantDocument.class);

            return response.hits().hits().stream().map(Hit::source).collect(Collectors.toList());

        } catch (IOException e) {
            throw new RuntimeException("Elasticsearch 검색 중 오류 발생", e);
        }
    }

    public List<String> autocomplete(String prefix) {
        try {
            SearchResponse<RestaurantDocument> response =
                    client.search(
                            s ->
                                    s.index("restaurants")
                                            .size(50) // 더 많은 결과를 받기 위해 size 확대
                                            .query(
                                                    q ->
                                                            q.multiMatch(
                                                                    m ->
                                                                            m.query(
                                                                                            prefix
                                                                                                    .toLowerCase())
                                                                                    .fields(
                                                                                            "name",
                                                                                            "foodNames",
                                                                                            "cuisineType"))),
                            RestaurantDocument.class);

            return response.hits().hits().stream()
                    .flatMap(
                            hit -> {
                                RestaurantDocument doc = hit.source();
                                Stream<String> nameStream =
                                        doc.getName() != null
                                                ? Stream.of(doc.getName())
                                                : Stream.empty();
                                Stream<String> cuisineStream =
                                        doc.getCuisineType() != null
                                                ? Stream.of(doc.getCuisineType())
                                                : Stream.empty();
                                Stream<String> foodNamesStream =
                                        doc.getFoodNames() != null
                                                ? doc.getFoodNames().stream()
                                                        .filter(Objects::nonNull)
                                                : Stream.empty();

                                return Stream.concat(
                                        Stream.concat(nameStream, cuisineStream), foodNamesStream);
                            })
                    .map(String::toLowerCase)
                    .filter(text -> text.contains(prefix.toLowerCase()))
                    .distinct()
                    .limit(10)
                    .toList();

        } catch (IOException e) {
            throw new RuntimeException("자동완성 실패", e);
        }
    }
}
