package com.lagos.egis.external.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.lagos.egis.external.web.rest.TestUtil;

public class EscalationTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Escalation.class);
        Escalation escalation1 = new Escalation();
        escalation1.setId(1L);
        Escalation escalation2 = new Escalation();
        escalation2.setId(escalation1.getId());
        assertThat(escalation1).isEqualTo(escalation2);
        escalation2.setId(2L);
        assertThat(escalation1).isNotEqualTo(escalation2);
        escalation1.setId(null);
        assertThat(escalation1).isNotEqualTo(escalation2);
    }
}
