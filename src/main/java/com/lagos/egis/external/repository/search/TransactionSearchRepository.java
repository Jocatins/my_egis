package com.lagos.egis.external.repository.search;
import com.lagos.egis.external.domain.Transaction;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Transaction} entity.
 */
public interface TransactionSearchRepository extends ElasticsearchRepository<Transaction, Long> {
}
