package com.lagos.egis.external.repository;
import com.lagos.egis.external.domain.Surveyor;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Surveyor entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SurveyorRepository extends JpaRepository<Surveyor, Long> {

}
