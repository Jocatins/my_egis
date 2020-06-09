package com.lagos.egis.external.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link EscalationSearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class EscalationSearchRepositoryMockConfiguration {

    @MockBean
    private EscalationSearchRepository mockEscalationSearchRepository;

}
