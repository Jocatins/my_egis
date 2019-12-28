package com.lagos.egis.external.repository.search;
import com.lagos.egis.external.domain.SupportingDocument;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link SupportingDocument} entity.
 */
public interface SupportingDocumentSearchRepository extends ElasticsearchRepository<SupportingDocument, Long> {
}
