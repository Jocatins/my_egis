package com.lagos.egis.external.repository.search;
import com.lagos.egis.external.domain.DocumentRequest;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link DocumentRequest} entity.
 */
public interface DocumentRequestSearchRepository extends ElasticsearchRepository<DocumentRequest, Long> {
}
