package com.lagos.egis.external.repository;
import com.lagos.egis.external.domain.DocumentRequest;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the DocumentRequest entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DocumentRequestRepository extends JpaRepository<DocumentRequest, Long> {

}
