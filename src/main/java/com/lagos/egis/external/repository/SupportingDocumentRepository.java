package com.lagos.egis.external.repository;
import com.lagos.egis.external.domain.SupportingDocument;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the SupportingDocument entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SupportingDocumentRepository extends JpaRepository<SupportingDocument, Long> {

}
