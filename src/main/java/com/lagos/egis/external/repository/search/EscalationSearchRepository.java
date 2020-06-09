package com.lagos.egis.external.repository.search;
import com.lagos.egis.external.domain.Escalation;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Escalation} entity.
 */
public interface EscalationSearchRepository extends ElasticsearchRepository<Escalation, Long> {
}
