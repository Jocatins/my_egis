package com.lagos.egis.external.repository;
import java.util.List;

import com.lagos.egis.external.domain.Metadata;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Metadata entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MetadataRepository extends JpaRepository<Metadata, Long> {

    public List<Metadata> findByCode(String code);
}
