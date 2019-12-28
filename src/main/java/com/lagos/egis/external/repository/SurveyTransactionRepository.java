package com.lagos.egis.external.repository;
import com.lagos.egis.external.domain.SurveyTransaction;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the SurveyTransaction entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SurveyTransactionRepository extends JpaRepository<SurveyTransaction, Long> {

}
