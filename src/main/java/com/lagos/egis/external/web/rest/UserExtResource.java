package com.lagos.egis.external.web.rest;

import com.lagos.egis.external.domain.UserExt;
import com.lagos.egis.external.repository.UserExtRepository;
import com.lagos.egis.external.repository.search.UserExtSearchRepository;
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
 * REST controller for managing {@link com.lagos.egis.external.domain.UserExt}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class UserExtResource {

    private final Logger log = LoggerFactory.getLogger(UserExtResource.class);

    private static final String ENTITY_NAME = "userExt";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final UserExtRepository userExtRepository;

    private final UserExtSearchRepository userExtSearchRepository;

    public UserExtResource(UserExtRepository userExtRepository, UserExtSearchRepository userExtSearchRepository) {
        this.userExtRepository = userExtRepository;
        this.userExtSearchRepository = userExtSearchRepository;
    }

    /**
     * {@code POST  /user-exts} : Create a new userExt.
     *
     * @param userExt the userExt to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new userExt, or with status {@code 400 (Bad Request)} if the userExt has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/user-exts")
    public ResponseEntity<UserExt> createUserExt(@RequestBody UserExt userExt) throws URISyntaxException {
        log.debug("REST request to save UserExt : {}", userExt);
        if (userExt.getId() != null) {
            throw new BadRequestAlertException("A new userExt cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UserExt result = userExtRepository.save(userExt);
        userExtSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/user-exts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /user-exts} : Updates an existing userExt.
     *
     * @param userExt the userExt to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated userExt,
     * or with status {@code 400 (Bad Request)} if the userExt is not valid,
     * or with status {@code 500 (Internal Server Error)} if the userExt couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/user-exts")
    public ResponseEntity<UserExt> updateUserExt(@RequestBody UserExt userExt) throws URISyntaxException {
        log.debug("REST request to update UserExt : {}", userExt);
        if (userExt.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        UserExt result = userExtRepository.save(userExt);
        userExtSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, userExt.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /user-exts} : get all the userExts.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of userExts in body.
     */
    @GetMapping("/user-exts")
    public List<UserExt> getAllUserExts() {
        log.debug("REST request to get all UserExts");
        return userExtRepository.findAll();
    }

    /**
     * {@code GET  /user-exts/:id} : get the "id" userExt.
     *
     * @param id the id of the userExt to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the userExt, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/user-exts/{id}")
    public ResponseEntity<UserExt> getUserExt(@PathVariable Long id) {
        log.debug("REST request to get UserExt : {}", id);
        Optional<UserExt> userExt = userExtRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(userExt);
    }

    /**
     * {@code DELETE  /user-exts/:id} : delete the "id" userExt.
     *
     * @param id the id of the userExt to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/user-exts/{id}")
    public ResponseEntity<Void> deleteUserExt(@PathVariable Long id) {
        log.debug("REST request to delete UserExt : {}", id);
        userExtRepository.deleteById(id);
        userExtSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/user-exts?query=:query} : search for the userExt corresponding
     * to the query.
     *
     * @param query the query of the userExt search.
     * @return the result of the search.
     */
    @GetMapping("/_search/user-exts")
    public List<UserExt> searchUserExts(@RequestParam String query) {
        log.debug("REST request to search UserExts for query {}", query);
        return StreamSupport
            .stream(userExtSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
