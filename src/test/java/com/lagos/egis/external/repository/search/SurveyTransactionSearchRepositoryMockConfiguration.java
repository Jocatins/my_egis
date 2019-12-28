package com.lagos.egis.external.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link SurveyTransactionSearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class SurveyTransactionSearchRepositoryMockConfiguration {

    @MockBean
    private SurveyTransactionSearchRepository mockSurveyTransactionSearchRepository;

}
