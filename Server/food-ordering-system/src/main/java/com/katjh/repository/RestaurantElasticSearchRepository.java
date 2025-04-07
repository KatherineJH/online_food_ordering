package com.katjh.repository;

import com.katjh.model.RestaurantDocument;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface RestaurantElasticSearchRepository extends ElasticsearchRepository<RestaurantDocument, Long> {
}
