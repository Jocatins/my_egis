package com.lagos.egis.external.web.rest;

import com.lagos.egis.external.domain.Dictionary;
import com.lagos.egis.external.service.DictionaryService;
import com.lagos.egis.external.web.rest.errors.BadRequestAlertException;
import com.lagos.egis.external.service.dto.DictionaryCriteria;
import com.lagos.egis.external.service.DictionaryQueryService;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing {@link com.lagos.egis.external.domain.Dictionary}.
 */
@RestController
@RequestMapping("/api")
public class DictionaryResource {

    private final Logger log = LoggerFactory.getLogger(DictionaryResource.class);

    private static final String ENTITY_NAME = "dictionary";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DictionaryService dictionaryService;

    private final DictionaryQueryService dictionaryQueryService;

    public DictionaryResource(DictionaryService dictionaryService, DictionaryQueryService dictionaryQueryService) {
        this.dictionaryService = dictionaryService;
        this.dictionaryQueryService = dictionaryQueryService;
    }

    /**
     * {@code POST  /dictionaries} : Create a new dictionary.
     *
     * @param dictionary the dictionary to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new dictionary, or with status {@code 400 (Bad Request)} if the dictionary has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/dictionaries")
    public ResponseEntity<Dictionary> createDictionary(@RequestBody Dictionary dictionary) throws URISyntaxException {
        log.debug("REST request to save Dictionary : {}", dictionary);
        if (dictionary.getId() != null) {
            throw new BadRequestAlertException("A new dictionary cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Dictionary result = dictionaryService.save(dictionary);
        return ResponseEntity.created(new URI("/api/dictionaries/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /dictionaries} : Updates an existing dictionary.
     *
     * @param dictionary the dictionary to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated dictionary,
     * or with status {@code 400 (Bad Request)} if the dictionary is not valid,
     * or with status {@code 500 (Internal Server Error)} if the dictionary couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/dictionaries")
    public ResponseEntity<Dictionary> updateDictionary(@RequestBody Dictionary dictionary) throws URISyntaxException {
        log.debug("REST request to update Dictionary : {}", dictionary);
        if (dictionary.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Dictionary result = dictionaryService.save(dictionary);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, dictionary.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /dictionaries} : get all the dictionaries.
     *

     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of dictionaries in body.
     */
    @GetMapping("/dictionaries")
    public ResponseEntity<List<Dictionary>> getAllDictionaries(DictionaryCriteria criteria) {
        log.debug("REST request to get Dictionaries by criteria: {}", criteria);
        List<Dictionary> entityList = dictionaryQueryService.findByCriteria(criteria);
        return ResponseEntity.ok().body(entityList);
    }

    /**
    * {@code GET  /dictionaries/count} : count all the dictionaries.
    *
    * @param criteria the criteria which the requested entities should match.
    * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
    */
    @GetMapping("/dictionaries/count")
    public ResponseEntity<Long> countDictionaries(DictionaryCriteria criteria) {
        log.debug("REST request to count Dictionaries by criteria: {}", criteria);
        return ResponseEntity.ok().body(dictionaryQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /dictionaries/:id} : get the "id" dictionary.
     *
     * @param id the id of the dictionary to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the dictionary, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/dictionaries/{id}")
    public ResponseEntity<Dictionary> getDictionary(@PathVariable Long id) {
        log.debug("REST request to get Dictionary : {}", id);
        Optional<Dictionary> dictionary = dictionaryService.findOne(id);
        return ResponseUtil.wrapOrNotFound(dictionary);
    }

    /**
     * {@code DELETE  /dictionaries/:id} : delete the "id" dictionary.
     *
     * @param id the id of the dictionary to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/dictionaries/{id}")
    public ResponseEntity<Void> deleteDictionary(@PathVariable Long id) {
        log.debug("REST request to delete Dictionary : {}", id);
        dictionaryService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/dictionaries?query=:query} : search for the dictionary corresponding
     * to the query.
     *
     * @param query the query of the dictionary search.
     * @return the result of the search.
     */
    @GetMapping("/_search/dictionaries")
    public List<Dictionary> searchDictionaries(@RequestParam String query) {
        log.debug("REST request to search Dictionaries for query {}", query);
        return dictionaryService.search(query);
    }
}
