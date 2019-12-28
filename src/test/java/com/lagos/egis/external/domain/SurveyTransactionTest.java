package com.lagos.egis.external.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.lagos.egis.external.web.rest.TestUtil;

public class SurveyTransactionTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SurveyTransaction.class);
        SurveyTransaction surveyTransaction1 = new SurveyTransaction();
        surveyTransaction1.setId(1L);
        SurveyTransaction surveyTransaction2 = new SurveyTransaction();
        surveyTransaction2.setId(surveyTransaction1.getId());
        assertThat(surveyTransaction1).isEqualTo(surveyTransaction2);
        surveyTransaction2.setId(2L);
        assertThat(surveyTransaction1).isNotEqualTo(surveyTransaction2);
        surveyTransaction1.setId(null);
        assertThat(surveyTransaction1).isNotEqualTo(surveyTransaction2);
    }
}
