package com.lagos.egis.external.repository;
import com.lagos.egis.external.domain.Party;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Party entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PartyRepository extends JpaRepository<Party, Long> {

}
