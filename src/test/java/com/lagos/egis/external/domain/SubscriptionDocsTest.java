package com.lagos.egis.external.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.lagos.egis.external.web.rest.TestUtil;

public class SubscriptionDocsTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SubscriptionDocs.class);
        SubscriptionDocs subscriptionDocs1 = new SubscriptionDocs();
        subscriptionDocs1.setId(1L);
        SubscriptionDocs subscriptionDocs2 = new SubscriptionDocs();
        subscriptionDocs2.setId(subscriptionDocs1.getId());
        assertThat(subscriptionDocs1).isEqualTo(subscriptionDocs2);
        subscriptionDocs2.setId(2L);
        assertThat(subscriptionDocs1).isNotEqualTo(subscriptionDocs2);
        subscriptionDocs1.setId(null);
        assertThat(subscriptionDocs1).isNotEqualTo(subscriptionDocs2);
    }
}
