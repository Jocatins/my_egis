package com.lagos.egis.external.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.lagos.egis.external.web.rest.TestUtil;

public class SurveyorTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Surveyor.class);
        Surveyor surveyor1 = new Surveyor();
        surveyor1.setId(1L);
        Surveyor surveyor2 = new Surveyor();
        surveyor2.setId(surveyor1.getId());
        assertThat(surveyor1).isEqualTo(surveyor2);
        surveyor2.setId(2L);
        assertThat(surveyor1).isNotEqualTo(surveyor2);
        surveyor1.setId(null);
        assertThat(surveyor1).isNotEqualTo(surveyor2);
    }
}
