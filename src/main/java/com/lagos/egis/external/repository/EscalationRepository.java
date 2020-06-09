package com.lagos.egis.external.repository;
import com.lagos.egis.external.domain.Escalation;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Escalation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EscalationRepository extends JpaRepository<Escalation, Long> {

}
