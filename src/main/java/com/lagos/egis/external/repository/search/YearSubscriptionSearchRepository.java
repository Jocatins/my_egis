package com.lagos.egis.external.repository.search;
import com.lagos.egis.external.domain.YearSubscription;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link YearSubscription} entity.
 */
public interface YearSubscriptionSearchRepository extends ElasticsearchRepository<YearSubscription, Long> {
}
