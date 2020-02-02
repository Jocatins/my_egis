package com.lagos.egis.external.repository;
import com.lagos.egis.external.domain.SupportingDocument;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;


/**
 * Spring Data  repository for the SupportingDocument entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SupportingDocumentRepository extends JpaRepository<SupportingDocument, Long> {

    @Transactional
    @Modifying
    @Query("delete from SupportingDocument e where e.id=:id")
    public void deleteBySuppDocId(@Param("id") long docId);
}
