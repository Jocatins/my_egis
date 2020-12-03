package com.lagos.egis.external.repository;
import com.lagos.egis.external.domain.TitleSelectOptions;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TitleSelectOptions entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TitleSelectOptionsRepository extends JpaRepository<TitleSelectOptions, Long> {

}
