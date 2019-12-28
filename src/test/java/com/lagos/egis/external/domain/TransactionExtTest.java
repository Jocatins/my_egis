package com.lagos.egis.external.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.lagos.egis.external.web.rest.TestUtil;

public class TransactionExtTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TransactionExt.class);
        TransactionExt transactionExt1 = new TransactionExt();
        transactionExt1.setId(1L);
        TransactionExt transactionExt2 = new TransactionExt();
        transactionExt2.setId(transactionExt1.getId());
        assertThat(transactionExt1).isEqualTo(transactionExt2);
        transactionExt2.setId(2L);
        assertThat(transactionExt1).isNotEqualTo(transactionExt2);
        transactionExt1.setId(null);
        assertThat(transactionExt1).isNotEqualTo(transactionExt2);
    }
}
