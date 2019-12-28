package com.lagos.egis.external.repository.search;
import com.lagos.egis.external.domain.TransactionExt;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link TransactionExt} entity.
 */
public interface TransactionExtSearchRepository extends ElasticsearchRepository<TransactionExt, Long> {
}
