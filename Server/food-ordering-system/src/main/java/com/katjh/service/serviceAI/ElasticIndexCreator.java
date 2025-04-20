package com.katjh.service.serviceAI;

import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ElasticIndexCreator {

    private final RestTemplate restTemplate = new RestTemplate();

    public void createIndexManually() {
        String url = "http://localhost:9200/restaurants";

        // 인덱스 존재 여부 확인
        try {
            ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
            if (response.getStatusCode().is2xxSuccessful()) {
                System.out.println("✅ restaurants 인덱스가 이미 존재합니다.");
                return;
            }
        } catch (Exception e) {
            // 인덱스가 없으면 404 예외 발생 → 인덱스 생성 진행
            System.out.println("ℹ️ restaurants 인덱스가 존재하지 않아서 생성을 시도합니다.");
        }

        String payload = """
        {
          "settings": {
            "analysis": {
              "tokenizer": {
                "edge_ngram_tokenizer": {
                  "type": "edge_ngram",
                  "min_gram": 1,
                  "max_gram": 30,
                  "token_chars": ["letter", "digit"]
                }
              },
              "analyzer": {
                "autocomplete_analyzer": {
                  "type": "custom",
                  "tokenizer": "edge_ngram_tokenizer",
                  "filter": ["lowercase"]
                }
              }
            }
          },
          "mappings": {
            "properties": {
              "name": {
                "type": "text",
                "analyzer": "autocomplete_analyzer",
                "search_analyzer": "standard"
              },
              "foodNames": {
                "type": "text",
                "analyzer": "autocomplete_analyzer",
                "search_analyzer": "standard"
              },
              "cuisineType": {
                "type": "text",
                "analyzer": "autocomplete_analyzer",
                "search_analyzer": "standard"
              },
              "suggest": {
                "type": "completion",
                "analyzer": "autocomplete_analyzer",
                "search_analyzer": "standard"
              }
            }
          }
        }
        """;

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> request = new HttpEntity<>(payload, headers);

        restTemplate.put(url, request);
        System.out.println("✅ restaurants 인덱스를 성공적으로 생성했습니다.");
    }
}
