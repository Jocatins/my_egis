package com.lagos.egis.external.web.rest;

import com.lagos.egis.external.domain.DocumentRequest;
import com.lagos.egis.external.repository.DocumentRequestRepository;
import com.lagos.egis.external.repository.search.DocumentRequestSearchRepository;
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
 * REST controller for managing {@link com.lagos.egis.external.domain.DocumentRequest}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class DocumentRequestResource {

    private final Logger log = LoggerFactory.getLogger(DocumentRequestResource.class);

    private static final String ENTITY_NAME = "documentRequest";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DocumentRequestRepository documentRequestRepository;

    private final DocumentRequestSearchRepository documentRequestSearchRepository;

    public DocumentRequestResource(DocumentRequestRepository documentRequestRepository, DocumentRequestSearchRepository documentRequestSearchRepository) {
        this.documentRequestRepository = documentRequestRepository;
        this.documentRequestSearchRepository = documentRequestSearchRepository;
    }

    /**
     * {@code POST  /document-requests} : Create a new documentRequest.
     *
     * @param documentRequest the documentRequest to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new documentRequest, or with status {@code 400 (Bad Request)} if the documentRequest has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/document-requests")
    public ResponseEntity<DocumentRequest> createDocumentRequest(@RequestBody DocumentRequest documentRequest) throws URISyntaxException {
        log.debug("REST request to save DocumentRequest : {}", documentRequest);
        if (documentRequest.getId() != null) {
            throw new BadRequestAlertException("A new documentRequest cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DocumentRequest result = documentRequestRepository.save(documentRequest);
        documentRequestSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/document-requests/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /document-requests} : Updates an existing documentRequest.
     *
     * @param documentRequest the documentRequest to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated documentRequest,
     * or with status {@code 400 (Bad Request)} if the documentRequest is not valid,
     * or with status {@code 500 (Internal Server Error)} if the documentRequest couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/document-requests")
    public ResponseEntity<DocumentRequest> updateDocumentRequest(@RequestBody DocumentRequest documentRequest) throws URISyntaxException {
        log.debug("REST request to update DocumentRequest : {}", documentRequest);
        if (documentRequest.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DocumentRequest result = documentRequestRepository.save(documentRequest);
        documentRequestSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, documentRequest.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /document-requests} : get all the documentRequests.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of documentRequests in body.
     */
    @GetMapping("/document-requests")
    public List<DocumentRequest> getAllDocumentRequests() {
        log.debug("REST request to get all DocumentRequests");
        return documentRequestRepository.findAll();
    }

    /**
     * {@code GET  /document-requests/:id} : get the "id" documentRequest.
     *
     * @param id the id of the documentRequest to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the documentRequest, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/document-requests/{id}")
    public ResponseEntity<DocumentRequest> getDocumentRequest(@PathVariable Long id) {
        log.debug("REST request to get DocumentRequest : {}", id);
        Optional<DocumentRequest> documentRequest = documentRequestRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(documentRequest);
    }

    /**
     * {@code DELETE  /document-requests/:id} : delete the "id" documentRequest.
     *
     * @param id the id of the documentRequest to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/document-requests/{id}")
    public ResponseEntity<Void> deleteDocumentRequest(@PathVariable Long id) {
        log.debug("REST request to delete DocumentRequest : {}", id);
        documentRequestRepository.deleteById(id);
        documentRequestSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/document-requests?query=:query} : search for the documentRequest corresponding
     * to the query.
     *
     * @param query the query of the documentRequest search.
     * @return the result of the search.
     */
    @GetMapping("/_search/document-requests")
    public List<DocumentRequest> searchDocumentRequests(@RequestParam String query) {
        log.debug("REST request to search DocumentRequests for query {}", query);
        return StreamSupport
            .stream(documentRequestSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
