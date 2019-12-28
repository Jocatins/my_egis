package com.lagos.egis.external.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link PartySearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class PartySearchRepositoryMockConfiguration {

    @MockBean
    private PartySearchRepository mockPartySearchRepository;

}
