package com.lagos.egis.external.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.lagos.egis.external.web.rest.TestUtil;

public class DocumentRequestTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DocumentRequest.class);
        DocumentRequest documentRequest1 = new DocumentRequest();
        documentRequest1.setId(1L);
        DocumentRequest documentRequest2 = new DocumentRequest();
        documentRequest2.setId(documentRequest1.getId());
        assertThat(documentRequest1).isEqualTo(documentRequest2);
        documentRequest2.setId(2L);
        assertThat(documentRequest1).isNotEqualTo(documentRequest2);
        documentRequest1.setId(null);
        assertThat(documentRequest1).isNotEqualTo(documentRequest2);
    }
}
