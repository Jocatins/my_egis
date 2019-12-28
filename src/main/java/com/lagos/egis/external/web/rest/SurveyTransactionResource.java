package com.lagos.egis.external.web.rest;

import com.lagos.egis.external.domain.SurveyTransaction;
import com.lagos.egis.external.repository.SurveyTransactionRepository;
import com.lagos.egis.external.repository.search.SurveyTransactionSearchRepository;
import com.lagos.egis.external.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
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
 * REST controller for managing {@link com.lagos.egis.external.domain.SurveyTransaction}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class SurveyTransactionResource {

    private final Logger log = LoggerFactory.getLogger(SurveyTransactionResource.class);

    private static final String ENTITY_NAME = "surveyTransaction";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SurveyTransactionRepository surveyTransactionRepository;

    private final SurveyTransactionSearchRepository surveyTransactionSearchRepository;

    public SurveyTransactionResource(SurveyTransactionRepository surveyTransactionRepository, SurveyTransactionSearchRepository surveyTransactionSearchRepository) {
        this.surveyTransactionRepository = surveyTransactionRepository;
        this.surveyTransactionSearchRepository = surveyTransactionSearchRepository;
    }

    /**
     * {@code POST  /survey-transactions} : Create a new surveyTransaction.
     *
     * @param surveyTransaction the surveyTransaction to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new surveyTransaction, or with status {@code 400 (Bad Request)} if the surveyTransaction has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/survey-transactions")
    public ResponseEntity<SurveyTransaction> createSurveyTransaction(@RequestBody SurveyTransaction surveyTransaction) throws URISyntaxException {
        log.debug("REST request to save SurveyTransaction : {}", surveyTransaction);
        if (surveyTransaction.getId() != null) {
            throw new BadRequestAlertException("A new surveyTransaction cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SurveyTransaction result = surveyTransactionRepository.save(surveyTransaction);
        surveyTransactionSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/survey-transactions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /survey-transactions} : Updates an existing surveyTransaction.
     *
     * @param surveyTransaction the surveyTransaction to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated surveyTransaction,
     * or with status {@code 400 (Bad Request)} if the surveyTransaction is not valid,
     * or with status {@code 500 (Internal Server Error)} if the surveyTransaction couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/survey-transactions")
    public ResponseEntity<SurveyTransaction> updateSurveyTransaction(@RequestBody SurveyTransaction surveyTransaction) throws URISyntaxException {
        log.debug("REST request to update SurveyTransaction : {}", surveyTransaction);
        if (surveyTransaction.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SurveyTransaction result = surveyTransactionRepository.save(surveyTransaction);
        surveyTransactionSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, surveyTransaction.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /survey-transactions} : get all the surveyTransactions.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of surveyTransactions in body.
     */
    @GetMapping("/survey-transactions")
    public ResponseEntity<List<SurveyTransaction>> getAllSurveyTransactions(Pageable pageable) {
        log.debug("REST request to get a page of SurveyTransactions");
        Page<SurveyTransaction> page = surveyTransactionRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /survey-transactions/:id} : get the "id" surveyTransaction.
     *
     * @param id the id of the surveyTransaction to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the surveyTransaction, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/survey-transactions/{id}")
    public ResponseEntity<SurveyTransaction> getSurveyTransaction(@PathVariable Long id) {
        log.debug("REST request to get SurveyTransaction : {}", id);
        Optional<SurveyTransaction> surveyTransaction = surveyTransactionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(surveyTransaction);
    }

    /**
     * {@code DELETE  /survey-transactions/:id} : delete the "id" surveyTransaction.
     *
     * @param id the id of the surveyTransaction to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/survey-transactions/{id}")
    public ResponseEntity<Void> deleteSurveyTransaction(@PathVariable Long id) {
        log.debug("REST request to delete SurveyTransaction : {}", id);
        surveyTransactionRepository.deleteById(id);
        surveyTransactionSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/survey-transactions?query=:query} : search for the surveyTransaction corresponding
     * to the query.
     *
     * @param query the query of the surveyTransaction search.
     * @param pageable the pagination information.
     * @return the result of the search.
     */
    @GetMapping("/_search/survey-transactions")
    public ResponseEntity<List<SurveyTransaction>> searchSurveyTransactions(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of SurveyTransactions for query {}", query);
        Page<SurveyTransaction> page = surveyTransactionSearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }
}
