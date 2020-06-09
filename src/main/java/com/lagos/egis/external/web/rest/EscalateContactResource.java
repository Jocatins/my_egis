package com.lagos.egis.external.web.rest;

import com.lagos.egis.external.domain.EscalateContact;
import com.lagos.egis.external.repository.EscalateContactRepository;
import com.lagos.egis.external.repository.search.EscalateContactSearchRepository;
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
 * REST controller for managing {@link com.lagos.egis.external.domain.EscalateContact}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class EscalateContactResource {

    private final Logger log = LoggerFactory.getLogger(EscalateContactResource.class);

    private static final String ENTITY_NAME = "escalateContact";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EscalateContactRepository escalateContactRepository;

    private final EscalateContactSearchRepository escalateContactSearchRepository;

    public EscalateContactResource(EscalateContactRepository escalateContactRepository, EscalateContactSearchRepository escalateContactSearchRepository) {
        this.escalateContactRepository = escalateContactRepository;
        this.escalateContactSearchRepository = escalateContactSearchRepository;
    }

    /**
     * {@code POST  /escalate-contacts} : Create a new escalateContact.
     *
     * @param escalateContact the escalateContact to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new escalateContact, or with status {@code 400 (Bad Request)} if the escalateContact has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/escalate-contacts")
    public ResponseEntity<EscalateContact> createEscalateContact(@RequestBody EscalateContact escalateContact) throws URISyntaxException {
        log.debug("REST request to save EscalateContact : {}", escalateContact);
        if (escalateContact.getId() != null) {
            throw new BadRequestAlertException("A new escalateContact cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EscalateContact result = escalateContactRepository.save(escalateContact);
        escalateContactSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/escalate-contacts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /escalate-contacts} : Updates an existing escalateContact.
     *
     * @param escalateContact the escalateContact to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated escalateContact,
     * or with status {@code 400 (Bad Request)} if the escalateContact is not valid,
     * or with status {@code 500 (Internal Server Error)} if the escalateContact couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/escalate-contacts")
    public ResponseEntity<EscalateContact> updateEscalateContact(@RequestBody EscalateContact escalateContact) throws URISyntaxException {
        log.debug("REST request to update EscalateContact : {}", escalateContact);
        if (escalateContact.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        EscalateContact result = escalateContactRepository.save(escalateContact);
        escalateContactSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, escalateContact.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /escalate-contacts} : get all the escalateContacts.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of escalateContacts in body.
     */
    @GetMapping("/escalate-contacts")
    public List<EscalateContact> getAllEscalateContacts() {
        log.debug("REST request to get all EscalateContacts");
        return escalateContactRepository.findAll();
    }

    /**
     * {@code GET  /escalate-contacts/:id} : get the "id" escalateContact.
     *
     * @param id the id of the escalateContact to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the escalateContact, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/escalate-contacts/{id}")
    public ResponseEntity<EscalateContact> getEscalateContact(@PathVariable Long id) {
        log.debug("REST request to get EscalateContact : {}", id);
        Optional<EscalateContact> escalateContact = escalateContactRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(escalateContact);
    }

    /**
     * {@code DELETE  /escalate-contacts/:id} : delete the "id" escalateContact.
     *
     * @param id the id of the escalateContact to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/escalate-contacts/{id}")
    public ResponseEntity<Void> deleteEscalateContact(@PathVariable Long id) {
        log.debug("REST request to delete EscalateContact : {}", id);
        escalateContactRepository.deleteById(id);
        escalateContactSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/escalate-contacts?query=:query} : search for the escalateContact corresponding
     * to the query.
     *
     * @param query the query of the escalateContact search.
     * @return the result of the search.
     */
    @GetMapping("/_search/escalate-contacts")
    public List<EscalateContact> searchEscalateContacts(@RequestParam String query) {
        log.debug("REST request to search EscalateContacts for query {}", query);
        return StreamSupport
            .stream(escalateContactSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
