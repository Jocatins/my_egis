package com.lagos.egis.external.repository.search;
import com.lagos.egis.external.domain.Metadata;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Metadata} entity.
 */
public interface MetadataSearchRepository extends ElasticsearchRepository<Metadata, Long> {
}
