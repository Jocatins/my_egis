package com.lagos.egis.external.repository.search;
import com.lagos.egis.external.domain.Parcel;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Parcel} entity.
 */
public interface ParcelSearchRepository extends ElasticsearchRepository<Parcel, Long> {
}
