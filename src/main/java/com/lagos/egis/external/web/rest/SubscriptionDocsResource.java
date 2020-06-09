package com.lagos.egis.external.web.rest;

import com.lagos.egis.external.domain.SubscriptionDocs;
import com.lagos.egis.external.repository.SubscriptionDocsRepository;
import com.lagos.egis.external.repository.search.SubscriptionDocsSearchRepository;
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
 * REST controller for managing {@link com.lagos.egis.external.domain.SubscriptionDocs}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class SubscriptionDocsResource {

    private final Logger log = LoggerFactory.getLogger(SubscriptionDocsResource.class);

    private static final String ENTITY_NAME = "subscriptionDocs";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SubscriptionDocsRepository subscriptionDocsRepository;

    private final SubscriptionDocsSearchRepository subscriptionDocsSearchRepository;

    public SubscriptionDocsResource(SubscriptionDocsRepository subscriptionDocsRepository, SubscriptionDocsSearchRepository subscriptionDocsSearchRepository) {
        this.subscriptionDocsRepository = subscriptionDocsRepository;
        this.subscriptionDocsSearchRepository = subscriptionDocsSearchRepository;
    }

    /**
     * {@code POST  /subscription-docs} : Create a new subscriptionDocs.
     *
     * @param subscriptionDocs the subscriptionDocs to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new subscriptionDocs, or with status {@code 400 (Bad Request)} if the subscriptionDocs has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/subscription-docs")
    public ResponseEntity<SubscriptionDocs> createSubscriptionDocs(@RequestBody SubscriptionDocs subscriptionDocs) throws URISyntaxException {
        log.debug("REST request to save SubscriptionDocs : {}", subscriptionDocs);
        if (subscriptionDocs.getId() != null) {
            throw new BadRequestAlertException("A new subscriptionDocs cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SubscriptionDocs result = subscriptionDocsRepository.save(subscriptionDocs);
        subscriptionDocsSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/subscription-docs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /subscription-docs} : Updates an existing subscriptionDocs.
     *
     * @param subscriptionDocs the subscriptionDocs to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated subscriptionDocs,
     * or with status {@code 400 (Bad Request)} if the subscriptionDocs is not valid,
     * or with status {@code 500 (Internal Server Error)} if the subscriptionDocs couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/subscription-docs")
    public ResponseEntity<SubscriptionDocs> updateSubscriptionDocs(@RequestBody SubscriptionDocs subscriptionDocs) throws URISyntaxException {
        log.debug("REST request to update SubscriptionDocs : {}", subscriptionDocs);
        if (subscriptionDocs.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SubscriptionDocs result = subscriptionDocsRepository.save(subscriptionDocs);
        subscriptionDocsSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, subscriptionDocs.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /subscription-docs} : get all the subscriptionDocs.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of subscriptionDocs in body.
     */
    @GetMapping("/subscription-docs")
    public List<SubscriptionDocs> getAllSubscriptionDocs() {
        log.debug("REST request to get all SubscriptionDocs");
        return subscriptionDocsRepository.findAll();
    }

    /**
     * {@code GET  /subscription-docs/:id} : get the "id" subscriptionDocs.
     *
     * @param id the id of the subscriptionDocs to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the subscriptionDocs, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/subscription-docs/{id}")
    public ResponseEntity<SubscriptionDocs> getSubscriptionDocs(@PathVariable Long id) {
        log.debug("REST request to get SubscriptionDocs : {}", id);
        Optional<SubscriptionDocs> subscriptionDocs = subscriptionDocsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(subscriptionDocs);
    }

    /**
     * {@code DELETE  /subscription-docs/:id} : delete the "id" subscriptionDocs.
     *
     * @param id the id of the subscriptionDocs to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/subscription-docs/{id}")
    public ResponseEntity<Void> deleteSubscriptionDocs(@PathVariable Long id) {
        log.debug("REST request to delete SubscriptionDocs : {}", id);
        subscriptionDocsRepository.deleteById(id);
        subscriptionDocsSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/subscription-docs?query=:query} : search for the subscriptionDocs corresponding
     * to the query.
     *
     * @param query the query of the subscriptionDocs search.
     * @return the result of the search.
     */
    @GetMapping("/_search/subscription-docs")
    public List<SubscriptionDocs> searchSubscriptionDocs(@RequestParam String query) {
        log.debug("REST request to search SubscriptionDocs for query {}", query);
        return StreamSupport
            .stream(subscriptionDocsSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
