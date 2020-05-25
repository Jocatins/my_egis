package com.lagos.egis.external.web.rest;

import com.lagos.egis.external.domain.Parcel;
import com.lagos.egis.external.repository.ParcelRepository;
import com.lagos.egis.external.repository.search.ParcelSearchRepository;
import com.lagos.egis.external.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional; 
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing {@link com.lagos.egis.external.domain.Parcel}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ParcelResource {

    private final Logger log = LoggerFactory.getLogger(ParcelResource.class);

    private static final String ENTITY_NAME = "parcel";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ParcelRepository parcelRepository;

    private final ParcelSearchRepository parcelSearchRepository;

    public ParcelResource(ParcelRepository parcelRepository, ParcelSearchRepository parcelSearchRepository) {
        this.parcelRepository = parcelRepository;
        this.parcelSearchRepository = parcelSearchRepository;
    }

    /**
     * {@code POST  /parcels} : Create a new parcel.
     *
     * @param parcel the parcel to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new parcel, or with status {@code 400 (Bad Request)} if the parcel has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/parcels")
    public ResponseEntity<Parcel> createParcel(@Valid @RequestBody Parcel parcel) throws URISyntaxException {
        log.debug("REST request to save Parcel : {}", parcel);
        if (parcel.getId() != null) {
            throw new BadRequestAlertException("A new parcel cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Parcel result = parcelRepository.save(parcel);
        parcelSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/parcels/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /parcels} : Updates an existing parcel.
     *
     * @param parcel the parcel to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated parcel,
     * or with status {@code 400 (Bad Request)} if the parcel is not valid,
     * or with status {@code 500 (Internal Server Error)} if the parcel couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/parcels")
    public ResponseEntity<Parcel> updateParcel(@Valid @RequestBody Parcel parcel) throws URISyntaxException {
        log.debug("REST request to update Parcel : {}", parcel);
        if (parcel.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Parcel result = parcelRepository.save(parcel);
        parcelSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, parcel.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /parcels} : get all the parcels.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of parcels in body.
     */
    @GetMapping("/parcels")
    public List<Parcel> getAllParcels() {
        log.debug("REST request to get all Parcels");
        return parcelRepository.findAll();
    }

    /**
     * {@code GET  /parcels/:id} : get the "id" parcel.
     *
     * @param id the id of the parcel to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the parcel, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/parcels/{id}")
    public ResponseEntity<Parcel> getParcel(@PathVariable Long id) {
        log.debug("REST request to get Parcel : {}", id);
        Optional<Parcel> parcel = parcelRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(parcel);
    }

    /**
     * {@code DELETE  /parcels/:id} : delete the "id" parcel.
     *
     * @param id the id of the parcel to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/parcels/{id}")
    public ResponseEntity<Void> deleteParcel(@PathVariable Long id) {
        log.debug("REST request to delete Parcel : {}", id);
        parcelRepository.deleteById(id);
        parcelSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/parcels?query=:query} : search for the parcel corresponding
     * to the query.
     *
     * @param query the query of the parcel search.
     * @return the result of the search.
     */
    @GetMapping("/_search/parcels")
    public List<Parcel> searchParcels(@RequestParam String query) {
        log.debug("REST request to search Parcels for query {}", query);
        return StreamSupport
            .stream(parcelSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
