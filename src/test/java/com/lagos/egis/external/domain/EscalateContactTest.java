package com.lagos.egis.external.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.lagos.egis.external.web.rest.TestUtil;

public class EscalateContactTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EscalateContact.class);
        EscalateContact escalateContact1 = new EscalateContact();
        escalateContact1.setId(1L);
        EscalateContact escalateContact2 = new EscalateContact();
        escalateContact2.setId(escalateContact1.getId());
        assertThat(escalateContact1).isEqualTo(escalateContact2);
        escalateContact2.setId(2L);
        assertThat(escalateContact1).isNotEqualTo(escalateContact2);
        escalateContact1.setId(null);
        assertThat(escalateContact1).isNotEqualTo(escalateContact2);
    }
}
