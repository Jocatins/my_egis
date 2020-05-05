package com.lagos.egis.external.repository;
import com.lagos.egis.external.domain.Party;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;


/**
 * Spring Data  repository for the Party entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PartyRepository extends JpaRepository<Party, Long> {

    @Transactional
    @Modifying
    @Query("delete from Party e where e.id=:id")
    public void deleteByPartyId(@Param("id") long docId);

}
