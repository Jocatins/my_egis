package com.lagos.egis.external.repository;
import com.lagos.egis.external.domain.YearSubscription;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the YearSubscription entity.
 */
@Repository
public interface YearSubscriptionRepository extends JpaRepository<YearSubscription, Long> {

    @Query(value = "select distinct yearSubscription from YearSubscription yearSubscription left join fetch yearSubscription.surveyors left join fetch yearSubscription.subscriptionDocs",
        countQuery = "select count(distinct yearSubscription) from YearSubscription yearSubscription")
    Page<YearSubscription> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct yearSubscription from YearSubscription yearSubscription left join fetch yearSubscription.surveyors left join fetch yearSubscription.subscriptionDocs")
    List<YearSubscription> findAllWithEagerRelationships();

    @Query("select yearSubscription from YearSubscription yearSubscription left join fetch yearSubscription.surveyors left join fetch yearSubscription.subscriptionDocs where yearSubscription.id =:id")
    Optional<YearSubscription> findOneWithEagerRelationships(@Param("id") Long id);

}
