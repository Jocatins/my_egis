package com.lagos.egis.external.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.lagos.egis.external.web.rest.TestUtil;

public class MetadataTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Metadata.class);
        Metadata metadata1 = new Metadata();
        metadata1.setId(1L);
        Metadata metadata2 = new Metadata();
        metadata2.setId(metadata1.getId());
        assertThat(metadata1).isEqualTo(metadata2);
        metadata2.setId(2L);
        assertThat(metadata1).isNotEqualTo(metadata2);
        metadata1.setId(null);
        assertThat(metadata1).isNotEqualTo(metadata2);
    }
}
