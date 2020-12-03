package com.lagos.egis.external.web.rest;

import com.lagos.egis.external.domain.TitleSelectOptions;
import com.lagos.egis.external.repository.TitleSelectOptionsRepository;
import com.lagos.egis.external.repository.search.TitleSelectOptionsSearchRepository;
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
 * REST controller for managing {@link com.lagos.egis.external.domain.TitleSelectOptions}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class TitleSelectOptionsResource {

    private final Logger log = LoggerFactory.getLogger(TitleSelectOptionsResource.class);

    private static final String ENTITY_NAME = "titleSelectOptions";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TitleSelectOptionsRepository titleSelectOptionsRepository;

    private final TitleSelectOptionsSearchRepository titleSelectOptionsSearchRepository;

    public TitleSelectOptionsResource(TitleSelectOptionsRepository titleSelectOptionsRepository, TitleSelectOptionsSearchRepository titleSelectOptionsSearchRepository) {
        this.titleSelectOptionsRepository = titleSelectOptionsRepository;
        this.titleSelectOptionsSearchRepository = titleSelectOptionsSearchRepository;
    }

    /**
     * {@code POST  /title-select-options} : Create a new titleSelectOptions.
     *
     * @param titleSelectOptions the titleSelectOptions to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new titleSelectOptions, or with status {@code 400 (Bad Request)} if the titleSelectOptions has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/title-select-options")
    public ResponseEntity<TitleSelectOptions> createTitleSelectOptions(@RequestBody TitleSelectOptions titleSelectOptions) throws URISyntaxException {
        log.debug("REST request to save TitleSelectOptions : {}", titleSelectOptions);
        if (titleSelectOptions.getId() != null) {
            throw new BadRequestAlertException("A new titleSelectOptions cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TitleSelectOptions result = titleSelectOptionsRepository.save(titleSelectOptions);
        titleSelectOptionsSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/title-select-options/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /title-select-options} : Updates an existing titleSelectOptions.
     *
     * @param titleSelectOptions the titleSelectOptions to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated titleSelectOptions,
     * or with status {@code 400 (Bad Request)} if the titleSelectOptions is not valid,
     * or with status {@code 500 (Internal Server Error)} if the titleSelectOptions couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/title-select-options")
    public ResponseEntity<TitleSelectOptions> updateTitleSelectOptions(@RequestBody TitleSelectOptions titleSelectOptions) throws URISyntaxException {
        log.debug("REST request to update TitleSelectOptions : {}", titleSelectOptions);
        if (titleSelectOptions.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TitleSelectOptions result = titleSelectOptionsRepository.save(titleSelectOptions);
        titleSelectOptionsSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, titleSelectOptions.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /title-select-options} : get all the titleSelectOptions.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of titleSelectOptions in body.
     */
    @GetMapping("/title-select-options")
    public List<TitleSelectOptions> getAllTitleSelectOptions() {
        log.debug("REST request to get all TitleSelectOptions");
        return titleSelectOptionsRepository.findAll();
    }

    /**
     * {@code GET  /title-select-options/:id} : get the "id" titleSelectOptions.
     *
     * @param id the id of the titleSelectOptions to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the titleSelectOptions, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/title-select-options/{id}")
    public ResponseEntity<TitleSelectOptions> getTitleSelectOptions(@PathVariable Long id) {
        log.debug("REST request to get TitleSelectOptions : {}", id);
        Optional<TitleSelectOptions> titleSelectOptions = titleSelectOptionsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(titleSelectOptions);
    }

    /**
     * {@code DELETE  /title-select-options/:id} : delete the "id" titleSelectOptions.
     *
     * @param id the id of the titleSelectOptions to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/title-select-options/{id}")
    public ResponseEntity<Void> deleteTitleSelectOptions(@PathVariable Long id) {
        log.debug("REST request to delete TitleSelectOptions : {}", id);
        titleSelectOptionsRepository.deleteById(id);
        titleSelectOptionsSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/title-select-options?query=:query} : search for the titleSelectOptions corresponding
     * to the query.
     *
     * @param query the query of the titleSelectOptions search.
     * @return the result of the search.
     */
    @GetMapping("/_search/title-select-options")
    public List<TitleSelectOptions> searchTitleSelectOptions(@RequestParam String query) {
        log.debug("REST request to search TitleSelectOptions for query {}", query);
        return StreamSupport
            .stream(titleSelectOptionsSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
