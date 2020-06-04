package com.lagos.egis.external.web.rest.ext;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import io.github.jhipster.web.util.HeaderUtil;

import java.net.*;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

import java.util.Base64;
import java.util.List;

import com.lagos.egis.external.domain.Batch;
import com.lagos.egis.external.repository.BatchRepository;
import com.lagos.egis.external.repository.search.BatchSearchRepository;
/**
 * REST controller for managing {@link Address}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class BatchExtResource {
    private final Logger log = LoggerFactory.getLogger(BatchExtResource.class);

    private static final String ENTITY_NAME = "batch";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final BatchRepository batchRepository;

    private final BatchSearchRepository batchSearchRepository;


    public BatchExtResource(BatchRepository batchRepository, BatchSearchRepository batchSearchRepository) {
        this.batchRepository = batchRepository;
        this.batchSearchRepository = batchSearchRepository;
    }


    /**
     * {@code GET  /batches} : get all the batches.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of batches in body.
     */
    @GetMapping("/ext/batches/usersBatches")
    public List<Batch> getAllBatches(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Batches");
        return batchRepository.findByUserIsCurrentUser();
    }

    /**
     * {@code PUT  /batches} : Updates an existing batch.
     *
     * @param batch the batch to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated batch,
     * or with status {@code 400 (Bad Request)} if the batch is not valid,
     * or with status {@code 500 (Internal Server Error)} if the batch couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/batches/pushBatch")
    public ResponseEntity<Batch> updateBatch(@RequestBody Long batchId) throws URISyntaxException {
        log.debug("REST request to update Batch : {}", batchId);
        // if (batch.getId() == null) {
        //     throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        // }

        Batch batch = batchSearchRepository.findById(batchId).get();

        Batch result = batchRepository.save(batch);
        batchSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, batch.getId().toString()))
            .body(result);


    }

}
