package com.lagos.egis.external.repository;
import com.lagos.egis.external.domain.TransactionExt;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TransactionExt entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TransactionExtRepository extends JpaRepository<TransactionExt, Long> {

}
