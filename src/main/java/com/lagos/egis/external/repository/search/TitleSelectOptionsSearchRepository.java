package com.lagos.egis.external.repository.search;
import com.lagos.egis.external.domain.TitleSelectOptions;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link TitleSelectOptions} entity.
 */
public interface TitleSelectOptionsSearchRepository extends ElasticsearchRepository<TitleSelectOptions, Long> {
}
