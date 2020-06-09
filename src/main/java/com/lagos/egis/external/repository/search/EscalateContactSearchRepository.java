package com.lagos.egis.external.repository.search;
import com.lagos.egis.external.domain.EscalateContact;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link EscalateContact} entity.
 */
public interface EscalateContactSearchRepository extends ElasticsearchRepository<EscalateContact, Long> {
}
