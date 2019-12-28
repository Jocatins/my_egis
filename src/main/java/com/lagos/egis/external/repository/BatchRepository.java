package com.lagos.egis.external.repository;
import com.lagos.egis.external.domain.Batch;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Batch entity.
 */
@Repository
public interface BatchRepository extends JpaRepository<Batch, Long> {

    @Query("select batch from Batch batch where batch.user.login = ?#{principal.username}")
    List<Batch> findByUserIsCurrentUser();

    @Query(value = "select distinct batch from Batch batch left join fetch batch.transactions left join fetch batch.parties",
        countQuery = "select count(distinct batch) from Batch batch")
    Page<Batch> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct batch from Batch batch left join fetch batch.transactions left join fetch batch.parties")
    List<Batch> findAllWithEagerRelationships();

    @Query("select batch from Batch batch left join fetch batch.transactions left join fetch batch.parties where batch.id =:id")
    Optional<Batch> findOneWithEagerRelationships(@Param("id") Long id);

}
