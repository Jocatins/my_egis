package com.lagos.egis.external.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.lagos.egis.external.web.rest.TestUtil;

public class TitleSelectOptionsTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TitleSelectOptions.class);
        TitleSelectOptions titleSelectOptions1 = new TitleSelectOptions();
        titleSelectOptions1.setId(1L);
        TitleSelectOptions titleSelectOptions2 = new TitleSelectOptions();
        titleSelectOptions2.setId(titleSelectOptions1.getId());
        assertThat(titleSelectOptions1).isEqualTo(titleSelectOptions2);
        titleSelectOptions2.setId(2L);
        assertThat(titleSelectOptions1).isNotEqualTo(titleSelectOptions2);
        titleSelectOptions1.setId(null);
        assertThat(titleSelectOptions1).isNotEqualTo(titleSelectOptions2);
    }
}
