package com.lagos.egis.external.repository.search;
import com.lagos.egis.external.domain.Batch;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Batch} entity.
 */
public interface BatchSearchRepository extends ElasticsearchRepository<Batch, Long> {
}
