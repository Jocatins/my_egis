package com.lagos.egis.external.repository.search;
import com.lagos.egis.external.domain.Party;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Party} entity.
 */
public interface PartySearchRepository extends ElasticsearchRepository<Party, Long> {
}
