package com.lagos.egis.external.repository;
import com.lagos.egis.external.domain.SubscriptionDocs;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the SubscriptionDocs entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SubscriptionDocsRepository extends JpaRepository<SubscriptionDocs, Long> {

}
