package com.lagos.egis.external.repository.search;
import com.lagos.egis.external.domain.Dictionary;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Dictionary} entity.
 */
public interface DictionarySearchRepository extends ElasticsearchRepository<Dictionary, Long> {
}
