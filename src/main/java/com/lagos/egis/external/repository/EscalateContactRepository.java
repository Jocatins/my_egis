package com.lagos.egis.external.repository;
import com.lagos.egis.external.domain.EscalateContact;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the EscalateContact entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EscalateContactRepository extends JpaRepository<EscalateContact, Long> {

}
