package com.lagos.egis.external.repository;
import com.lagos.egis.external.domain.Transaction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Transaction entity.
 */
@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    @Query(value = "select distinct transaction from Transaction transaction left join fetch transaction.parties left join fetch transaction.parcels left join fetch transaction.docs",
        countQuery = "select count(distinct transaction) from Transaction transaction")
    Page<Transaction> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct transaction from Transaction transaction left join fetch transaction.parties left join fetch transaction.parcels left join fetch transaction.docs")
    List<Transaction> findAllWithEagerRelationships();

    @Query("select transaction from Transaction transaction left join fetch transaction.parties left join fetch transaction.parcels left join fetch transaction.docs where transaction.id =:id")
    Optional<Transaction> findOneWithEagerRelationships(@Param("id") Long id);

}
