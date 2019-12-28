package com.lagos.egis.external.repository.search;
import com.lagos.egis.external.domain.SurveyTransaction;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link SurveyTransaction} entity.
 */
public interface SurveyTransactionSearchRepository extends ElasticsearchRepository<SurveyTransaction, Long> {
}
