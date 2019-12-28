package com.lagos.egis.external.repository.search;
import com.lagos.egis.external.domain.Surveyor;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Surveyor} entity.
 */
public interface SurveyorSearchRepository extends ElasticsearchRepository<Surveyor, Long> {
}
