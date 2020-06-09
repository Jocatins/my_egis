package com.lagos.egis.external.web.rest;

import com.lagos.egis.external.domain.YearSubscription;
import com.lagos.egis.external.repository.YearSubscriptionRepository;
import com.lagos.egis.external.repository.search.YearSubscriptionSearchRepository;
import com.lagos.egis.external.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional; 
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing {@link com.lagos.egis.external.domain.YearSubscription}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class YearSubscriptionResource {

    private final Logger log = LoggerFactory.getLogger(YearSubscriptionResource.class);

    private static final String ENTITY_NAME = "yearSubscription";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final YearSubscriptionRepository yearSubscriptionRepository;

    private final YearSubscriptionSearchRepository yearSubscriptionSearchRepository;

    public YearSubscriptionResource(YearSubscriptionRepository yearSubscriptionRepository, YearSubscriptionSearchRepository yearSubscriptionSearchRepository) {
        this.yearSubscriptionRepository = yearSubscriptionRepository;
        this.yearSubscriptionSearchRepository = yearSubscriptionSearchRepository;
    }

    /**
     * {@code POST  /year-subscriptions} : Create a new yearSubscription.
     *
     * @param yearSubscription the yearSubscription to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new yearSubscription, or with status {@code 400 (Bad Request)} if the yearSubscription has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/year-subscriptions")
    public ResponseEntity<YearSubscription> createYearSubscription(@RequestBody YearSubscription yearSubscription) throws URISyntaxException {
        log.debug("REST request to save YearSubscription : {}", yearSubscription);
        if (yearSubscription.getId() != null) {
            throw new BadRequestAlertException("A new yearSubscription cannot already have an ID", ENTITY_NAME, "idexists");
        }
        YearSubscription result = yearSubscriptionRepository.save(yearSubscription);
        yearSubscriptionSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/year-subscriptions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /year-subscriptions} : Updates an existing yearSubscription.
     *
     * @param yearSubscription the yearSubscription to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated yearSubscription,
     * or with status {@code 400 (Bad Request)} if the yearSubscription is not valid,
     * or with status {@code 500 (Internal Server Error)} if the yearSubscription couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/year-subscriptions")
    public ResponseEntity<YearSubscription> updateYearSubscription(@RequestBody YearSubscription yearSubscription) throws URISyntaxException {
        log.debug("REST request to update YearSubscription : {}", yearSubscription);
        if (yearSubscription.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        YearSubscription result = yearSubscriptionRepository.save(yearSubscription);
        yearSubscriptionSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, yearSubscription.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /year-subscriptions} : get all the yearSubscriptions.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of yearSubscriptions in body.
     */
    @GetMapping("/year-subscriptions")
    public List<YearSubscription> getAllYearSubscriptions(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all YearSubscriptions");
        return yearSubscriptionRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /year-subscriptions/:id} : get the "id" yearSubscription.
     *
     * @param id the id of the yearSubscription to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the yearSubscription, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/year-subscriptions/{id}")
    public ResponseEntity<YearSubscription> getYearSubscription(@PathVariable Long id) {
        log.debug("REST request to get YearSubscription : {}", id);
        Optional<YearSubscription> yearSubscription = yearSubscriptionRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(yearSubscription);
    }

    /**
     * {@code DELETE  /year-subscriptions/:id} : delete the "id" yearSubscription.
     *
     * @param id the id of the yearSubscription to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/year-subscriptions/{id}")
    public ResponseEntity<Void> deleteYearSubscription(@PathVariable Long id) {
        log.debug("REST request to delete YearSubscription : {}", id);
        yearSubscriptionRepository.deleteById(id);
        yearSubscriptionSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/year-subscriptions?query=:query} : search for the yearSubscription corresponding
     * to the query.
     *
     * @param query the query of the yearSubscription search.
     * @return the result of the search.
     */
    @GetMapping("/_search/year-subscriptions")
    public List<YearSubscription> searchYearSubscriptions(@RequestParam String query) {
        log.debug("REST request to search YearSubscriptions for query {}", query);
        return StreamSupport
            .stream(yearSubscriptionSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
