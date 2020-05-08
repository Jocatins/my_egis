package com.lagos.egis.external.web.rest;

import com.lagos.egis.external.domain.Metadata;
import com.lagos.egis.external.repository.MetadataRepository;
import com.lagos.egis.external.repository.search.MetadataSearchRepository;
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
 * REST controller for managing {@link com.lagos.egis.external.domain.Metadata}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class MetadataResource {

    private final Logger log = LoggerFactory.getLogger(MetadataResource.class);

    private static final String ENTITY_NAME = "metadata";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MetadataRepository metadataRepository;

    private final MetadataSearchRepository metadataSearchRepository;

    public MetadataResource(MetadataRepository metadataRepository, MetadataSearchRepository metadataSearchRepository) {
        this.metadataRepository = metadataRepository;
        this.metadataSearchRepository = metadataSearchRepository;
    }

    /**
     * {@code POST  /metadata} : Create a new metadata.
     *
     * @param metadata the metadata to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new metadata, or with status {@code 400 (Bad Request)} if the metadata has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/metadata")
    public ResponseEntity<Metadata> createMetadata(@RequestBody Metadata metadata) throws URISyntaxException {
        log.debug("REST request to save Metadata : {}", metadata);
        if (metadata.getId() != null) {
            throw new BadRequestAlertException("A new metadata cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Metadata result = metadataRepository.save(metadata);
        metadataSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/metadata/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /metadata} : Updates an existing metadata.
     *
     * @param metadata the metadata to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated metadata,
     * or with status {@code 400 (Bad Request)} if the metadata is not valid,
     * or with status {@code 500 (Internal Server Error)} if the metadata couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/metadata")
    public ResponseEntity<Metadata> updateMetadata(@RequestBody Metadata metadata) throws URISyntaxException {
        log.debug("REST request to update Metadata : {}", metadata);
        if (metadata.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Metadata result = metadataRepository.save(metadata);
        metadataSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, metadata.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /metadata} : get all the metadata.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of metadata in body.
     */
    @GetMapping("/metadata")
    public List<Metadata> getAllMetadata() {
        log.debug("REST request to get all Metadata");
        return metadataRepository.findAll();
    }

    /**
     * {@code GET  /metadata/:id} : get the "id" metadata.
     *
     * @param id the id of the metadata to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the metadata, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/metadata/{id}")
    public ResponseEntity<Metadata> getMetadata(@PathVariable Long id) {
        log.debug("REST request to get Metadata : {}", id);
        Optional<Metadata> metadata = metadataRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(metadata);
    }

        /**
     * {@code GET  /metadata/:id} : get the "id" metadata.
     *
     * @param id the id of the metadata to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the metadata, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/metadata/getByCode/{code}")
    public List<Metadata> getMetadataByCode(@PathVariable String code) {
        log.debug("REST request to get Metadata : {}", code);
        return metadataRepository.findByCode(code);
    }

    /**
     * {@code DELETE  /metadata/:id} : delete the "id" metadata.
     *
     * @param id the id of the metadata to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/metadata/{id}")
    public ResponseEntity<Void> deleteMetadata(@PathVariable Long id) {
        log.debug("REST request to delete Metadata : {}", id);
        metadataRepository.deleteById(id);
        metadataSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/metadata?query=:query} : search for the metadata corresponding
     * to the query.
     *
     * @param query the query of the metadata search.
     * @return the result of the search.
     */
    @GetMapping("/_search/metadata")
    public List<Metadata> searchMetadata(@RequestParam String query) {
        log.debug("REST request to search Metadata for query {}", query);
        return StreamSupport
            .stream(metadataSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
