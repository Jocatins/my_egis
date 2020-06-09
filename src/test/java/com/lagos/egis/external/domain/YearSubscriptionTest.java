package com.lagos.egis.external.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.lagos.egis.external.web.rest.TestUtil;

public class YearSubscriptionTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(YearSubscription.class);
        YearSubscription yearSubscription1 = new YearSubscription();
        yearSubscription1.setId(1L);
        YearSubscription yearSubscription2 = new YearSubscription();
        yearSubscription2.setId(yearSubscription1.getId());
        assertThat(yearSubscription1).isEqualTo(yearSubscription2);
        yearSubscription2.setId(2L);
        assertThat(yearSubscription1).isNotEqualTo(yearSubscription2);
        yearSubscription1.setId(null);
        assertThat(yearSubscription1).isNotEqualTo(yearSubscription2);
    }
}
