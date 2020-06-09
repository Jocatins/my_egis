package com.lagos.egis.external.repository.search;
import com.lagos.egis.external.domain.SubscriptionDocs;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link SubscriptionDocs} entity.
 */
public interface SubscriptionDocsSearchRepository extends ElasticsearchRepository<SubscriptionDocs, Long> {
}
