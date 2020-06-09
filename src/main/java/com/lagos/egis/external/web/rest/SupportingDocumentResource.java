package com.lagos.egis.external.web.rest;

import com.lagos.egis.external.domain.SupportingDocument;
import com.lagos.egis.external.repository.SupportingDocumentRepository;
import com.lagos.egis.external.repository.search.SupportingDocumentSearchRepository;
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
 * REST controller for managing {@link com.lagos.egis.external.domain.SupportingDocument}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class SupportingDocumentResource {

    private final Logger log = LoggerFactory.getLogger(SupportingDocumentResource.class);

    private static final String ENTITY_NAME = "supportingDocument";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SupportingDocumentRepository supportingDocumentRepository;

    private final SupportingDocumentSearchRepository supportingDocumentSearchRepository;

    public SupportingDocumentResource(SupportingDocumentRepository supportingDocumentRepository, SupportingDocumentSearchRepository supportingDocumentSearchRepository) {
        this.supportingDocumentRepository = supportingDocumentRepository;
        this.supportingDocumentSearchRepository = supportingDocumentSearchRepository;
    }

    /**
     * {@code POST  /supporting-documents} : Create a new supportingDocument.
     *
     * @param supportingDocument the supportingDocument to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new supportingDocument, or with status {@code 400 (Bad Request)} if the supportingDocument has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/supporting-documents")
    public ResponseEntity<SupportingDocument> createSupportingDocument(@RequestBody SupportingDocument supportingDocument) throws URISyntaxException {
        log.debug("REST request to save SupportingDocument : {}", supportingDocument);
        if (supportingDocument.getId() != null) {
            throw new BadRequestAlertException("A new supportingDocument cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SupportingDocument result = supportingDocumentRepository.save(supportingDocument);
        supportingDocumentSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/supporting-documents/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /supporting-documents} : Updates an existing supportingDocument.
     *
     * @param supportingDocument the supportingDocument to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated supportingDocument,
     * or with status {@code 400 (Bad Request)} if the supportingDocument is not valid,
     * or with status {@code 500 (Internal Server Error)} if the supportingDocument couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/supporting-documents")
    public ResponseEntity<SupportingDocument> updateSupportingDocument(@RequestBody SupportingDocument supportingDocument) throws URISyntaxException {
        log.debug("REST request to update SupportingDocument : {}", supportingDocument);
        if (supportingDocument.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SupportingDocument result = supportingDocumentRepository.save(supportingDocument);
        supportingDocumentSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, supportingDocument.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /supporting-documents} : get all the supportingDocuments.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of supportingDocuments in body.
     */
    @GetMapping("/supporting-documents")
    public List<SupportingDocument> getAllSupportingDocuments() {
        log.debug("REST request to get all SupportingDocuments");
        return supportingDocumentRepository.findAll();
    }

    /**
     * {@code GET  /supporting-documents/:id} : get the "id" supportingDocument.
     *
     * @param id the id of the supportingDocument to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the supportingDocument, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/supporting-documents/{id}")
    public ResponseEntity<SupportingDocument> getSupportingDocument(@PathVariable Long id) {
        log.debug("REST request to get SupportingDocument : {}", id);
        Optional<SupportingDocument> supportingDocument = supportingDocumentRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(supportingDocument);
    }

    /**
     * {@code DELETE  /supporting-documents/:id} : delete the "id" supportingDocument.
     *
     * @param id the id of the supportingDocument to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/supporting-documents/{id}")
    public ResponseEntity<Void> deleteSupportingDocument(@PathVariable Long id) {
        log.debug("REST request to delete SupportingDocument : {}", id);
        supportingDocumentRepository.deleteById(id);
        supportingDocumentSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/supporting-documents?query=:query} : search for the supportingDocument corresponding
     * to the query.
     *
     * @param query the query of the supportingDocument search.
     * @return the result of the search.
     */
    @GetMapping("/_search/supporting-documents")
    public List<SupportingDocument> searchSupportingDocuments(@RequestParam String query) {
        log.debug("REST request to search SupportingDocuments for query {}", query);
        return StreamSupport
            .stream(supportingDocumentSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
