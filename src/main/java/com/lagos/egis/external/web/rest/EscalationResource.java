package com.lagos.egis.external.web.rest;

import com.lagos.egis.external.domain.Escalation;
import com.lagos.egis.external.repository.EscalationRepository;
import com.lagos.egis.external.repository.search.EscalationSearchRepository;
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
 * REST controller for managing {@link com.lagos.egis.external.domain.Escalation}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class EscalationResource {

    private final Logger log = LoggerFactory.getLogger(EscalationResource.class);

    private static final String ENTITY_NAME = "escalation";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EscalationRepository escalationRepository;

    private final EscalationSearchRepository escalationSearchRepository;

    public EscalationResource(EscalationRepository escalationRepository, EscalationSearchRepository escalationSearchRepository) {
        this.escalationRepository = escalationRepository;
        this.escalationSearchRepository = escalationSearchRepository;
    }

    /**
     * {@code POST  /escalations} : Create a new escalation.
     *
     * @param escalation the escalation to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new escalation, or with status {@code 400 (Bad Request)} if the escalation has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/escalations")
    public ResponseEntity<Escalation> createEscalation(@RequestBody Escalation escalation) throws URISyntaxException {
        log.debug("REST request to save Escalation : {}", escalation);
        if (escalation.getId() != null) {
            throw new BadRequestAlertException("A new escalation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Escalation result = escalationRepository.save(escalation);
        escalationSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/escalations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /escalations} : Updates an existing escalation.
     *
     * @param escalation the escalation to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated escalation,
     * or with status {@code 400 (Bad Request)} if the escalation is not valid,
     * or with status {@code 500 (Internal Server Error)} if the escalation couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/escalations")
    public ResponseEntity<Escalation> updateEscalation(@RequestBody Escalation escalation) throws URISyntaxException {
        log.debug("REST request to update Escalation : {}", escalation);
        if (escalation.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Escalation result = escalationRepository.save(escalation);
        escalationSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, escalation.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /escalations} : get all the escalations.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of escalations in body.
     */
    @GetMapping("/escalations")
    public List<Escalation> getAllEscalations() {
        log.debug("REST request to get all Escalations");
        return escalationRepository.findAll();
    }

    /**
     * {@code GET  /escalations/:id} : get the "id" escalation.
     *
     * @param id the id of the escalation to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the escalation, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/escalations/{id}")
    public ResponseEntity<Escalation> getEscalation(@PathVariable Long id) {
        log.debug("REST request to get Escalation : {}", id);
        Optional<Escalation> escalation = escalationRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(escalation);
    }

    /**
     * {@code DELETE  /escalations/:id} : delete the "id" escalation.
     *
     * @param id the id of the escalation to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/escalations/{id}")
    public ResponseEntity<Void> deleteEscalation(@PathVariable Long id) {
        log.debug("REST request to delete Escalation : {}", id);
        escalationRepository.deleteById(id);
        escalationSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/escalations?query=:query} : search for the escalation corresponding
     * to the query.
     *
     * @param query the query of the escalation search.
     * @return the result of the search.
     */
    @GetMapping("/_search/escalations")
    public List<Escalation> searchEscalations(@RequestParam String query) {
        log.debug("REST request to search Escalations for query {}", query);
        return StreamSupport
            .stream(escalationSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
