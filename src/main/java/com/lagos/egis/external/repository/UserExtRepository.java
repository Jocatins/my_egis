package com.lagos.egis.external.repository;
import com.lagos.egis.external.domain.UserExt;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the UserExt entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserExtRepository extends JpaRepository<UserExt, Long> {

}
