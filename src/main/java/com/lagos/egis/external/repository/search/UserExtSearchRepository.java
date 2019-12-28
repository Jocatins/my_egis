package com.lagos.egis.external.repository.search;
import com.lagos.egis.external.domain.UserExt;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link UserExt} entity.
 */
public interface UserExtSearchRepository extends ElasticsearchRepository<UserExt, Long> {
}
