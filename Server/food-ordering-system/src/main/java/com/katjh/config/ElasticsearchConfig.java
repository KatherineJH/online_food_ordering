package com.katjh.config;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.json.jackson.JacksonJsonpMapper;
import co.elastic.clients.transport.ElasticsearchTransport;
import co.elastic.clients.transport.rest_client.RestClientTransport;
import org.apache.http.HttpHost;
import org.elasticsearch.client.RestClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ElasticsearchConfig {

    @Value("${elastic.host}")
    private String elasticHost;

    @Bean
    public ElasticsearchClient elasticsearchClient() {
        // Elasticsearch REST 클라이언트 설정
        RestClient restClient = RestClient.builder(
                new HttpHost(elasticHost, 9200, "http")
        ).build();

        // Transport 및 클라이언트 생성
        ElasticsearchTransport transport = new RestClientTransport(
                restClient, new JacksonJsonpMapper()
        );

        return new ElasticsearchClient(transport);
    }
}
