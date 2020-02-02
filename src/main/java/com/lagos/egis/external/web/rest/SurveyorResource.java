package com.lagos.egis.external.web.rest;

import com.lagos.egis.external.domain.Surveyor;
import com.lagos.egis.external.repository.SurveyorRepository;
import com.lagos.egis.external.repository.search.SurveyorSearchRepository;
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
 * REST controller for managing {@link com.lagos.egis.external.domain.Surveyor}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class SurveyorResource {

    private final Logger log = LoggerFactory.getLogger(SurveyorResource.class);

    private static final String ENTITY_NAME = "surveyor";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SurveyorRepository surveyorRepository;

    private final SurveyorSearchRepository surveyorSearchRepository;

    public SurveyorResource(SurveyorRepository surveyorRepository, SurveyorSearchRepository surveyorSearchRepository) {
        this.surveyorRepository = surveyorRepository;
        this.surveyorSearchRepository = surveyorSearchRepository;
    }

    /**
     * {@code POST  /surveyors} : Create a new surveyor.
     *
     * @param surveyor the surveyor to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new surveyor, or with status {@code 400 (Bad Request)} if the surveyor has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/surveyors")
    public ResponseEntity<Surveyor> createSurveyor(@RequestBody Surveyor surveyor) throws URISyntaxException {
        log.debug("REST request to save Surveyor : {}", surveyor);
        if (surveyor.getId() != null) {
            throw new BadRequestAlertException("A new surveyor cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Surveyor result = surveyorRepository.save(surveyor);
        surveyorSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/surveyors/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /surveyors} : Updates an existing surveyor.
     *
     * @param surveyor the surveyor to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated surveyor,
     * or with status {@code 400 (Bad Request)} if the surveyor is not valid,
     * or with status {@code 500 (Internal Server Error)} if the surveyor couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/surveyors")
    public ResponseEntity<Surveyor> updateSurveyor(@RequestBody Surveyor surveyor) throws URISyntaxException {
        log.debug("REST request to update Surveyor : {}", surveyor);
        if (surveyor.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Surveyor result = surveyorRepository.save(surveyor);
        surveyorSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, surveyor.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /surveyors} : get all the surveyors.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of surveyors in body.
     */
    @GetMapping("/surveyors")
    public ResponseEntity<List<Surveyor>> getAllSurveyors(Pageable pageable) {
        log.debug("REST request to get a page of Surveyors");
        Page<Surveyor> page = surveyorRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /surveyors/:id} : get the "id" surveyor.
     *
     * @param id the id of the surveyor to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the surveyor, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/surveyors/{id}")
    public ResponseEntity<Surveyor> getSurveyor(@PathVariable Long id) {
        log.debug("REST request to get Surveyor : {}", id);
        Optional<Surveyor> surveyor = surveyorRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(surveyor);
    }

    /**
     * {@code DELETE  /surveyors/:id} : delete the "id" surveyor.
     *
     * @param id the id of the surveyor to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/surveyors/{id}")
    public ResponseEntity<Void> deleteSurveyor(@PathVariable Long id) {
        log.debug("REST request to delete Surveyor : {}", id);
        surveyorRepository.deleteById(id);
        surveyorSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/surveyors?query=:query} : search for the surveyor corresponding
     * to the query.
     *
     * @param query the query of the surveyor search.
     * @param pageable the pagination information.
     * @return the result of the search.
     */
    @GetMapping("/_search/surveyors")
    public ResponseEntity<List<Surveyor>> searchSurveyors(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Surveyors for query {}", query);
        Page<Surveyor> page = surveyorSearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }
}
