package com.lagos.egis.external.web.rest;

import com.lagos.egis.external.domain.TransactionExt;
import com.lagos.egis.external.repository.TransactionExtRepository;
import com.lagos.egis.external.repository.search.TransactionExtSearchRepository;
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
 * REST controller for managing {@link com.lagos.egis.external.domain.TransactionExt}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class TransactionExtResource {

    private final Logger log = LoggerFactory.getLogger(TransactionExtResource.class);

    private static final String ENTITY_NAME = "transactionExt";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TransactionExtRepository transactionExtRepository;

    private final TransactionExtSearchRepository transactionExtSearchRepository;

    public TransactionExtResource(TransactionExtRepository transactionExtRepository, TransactionExtSearchRepository transactionExtSearchRepository) {
        this.transactionExtRepository = transactionExtRepository;
        this.transactionExtSearchRepository = transactionExtSearchRepository;
    }

    /**
     * {@code POST  /transaction-exts} : Create a new transactionExt.
     *
     * @param transactionExt the transactionExt to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new transactionExt, or with status {@code 400 (Bad Request)} if the transactionExt has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/transaction-exts")
    public ResponseEntity<TransactionExt> createTransactionExt(@RequestBody TransactionExt transactionExt) throws URISyntaxException {
        log.debug("REST request to save TransactionExt : {}", transactionExt);
        if (transactionExt.getId() != null) {
            throw new BadRequestAlertException("A new transactionExt cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TransactionExt result = transactionExtRepository.save(transactionExt);
        transactionExtSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/transaction-exts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /transaction-exts} : Updates an existing transactionExt.
     *
     * @param transactionExt the transactionExt to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated transactionExt,
     * or with status {@code 400 (Bad Request)} if the transactionExt is not valid,
     * or with status {@code 500 (Internal Server Error)} if the transactionExt couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/transaction-exts")
    public ResponseEntity<TransactionExt> updateTransactionExt(@RequestBody TransactionExt transactionExt) throws URISyntaxException {
        log.debug("REST request to update TransactionExt : {}", transactionExt);
        if (transactionExt.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TransactionExt result = transactionExtRepository.save(transactionExt);
        transactionExtSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, transactionExt.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /transaction-exts} : get all the transactionExts.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of transactionExts in body.
     */
    @GetMapping("/transaction-exts")
    public List<TransactionExt> getAllTransactionExts() {
        log.debug("REST request to get all TransactionExts");
        return transactionExtRepository.findAll();
    }

    /**
     * {@code GET  /transaction-exts/:id} : get the "id" transactionExt.
     *
     * @param id the id of the transactionExt to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the transactionExt, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/transaction-exts/{id}")
    public ResponseEntity<TransactionExt> getTransactionExt(@PathVariable Long id) {
        log.debug("REST request to get TransactionExt : {}", id);
        Optional<TransactionExt> transactionExt = transactionExtRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(transactionExt);
    }

    /**
     * {@code DELETE  /transaction-exts/:id} : delete the "id" transactionExt.
     *
     * @param id the id of the transactionExt to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/transaction-exts/{id}")
    public ResponseEntity<Void> deleteTransactionExt(@PathVariable Long id) {
        log.debug("REST request to delete TransactionExt : {}", id);
        transactionExtRepository.deleteById(id);
        transactionExtSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/transaction-exts?query=:query} : search for the transactionExt corresponding
     * to the query.
     *
     * @param query the query of the transactionExt search.
     * @return the result of the search.
     */
    @GetMapping("/_search/transaction-exts")
    public List<TransactionExt> searchTransactionExts(@RequestParam String query) {
        log.debug("REST request to search TransactionExts for query {}", query);
        return StreamSupport
            .stream(transactionExtSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
