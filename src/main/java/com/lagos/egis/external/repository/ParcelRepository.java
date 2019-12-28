package com.lagos.egis.external.repository;
import com.lagos.egis.external.domain.Parcel;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Parcel entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ParcelRepository extends JpaRepository<Parcel, Long> {

}
