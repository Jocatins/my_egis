package com.lagos.egis.external.service;

import com.lagos.egis.external.domain.Dictionary;
import com.lagos.egis.external.repository.DictionaryRepository;
import com.lagos.egis.external.repository.search.DictionarySearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing {@link Dictionary}.
 */
@Service
@Transactional
public class DictionaryService {

    private final Logger log = LoggerFactory.getLogger(DictionaryService.class);

    private final DictionaryRepository dictionaryRepository;

    private final DictionarySearchRepository dictionarySearchRepository;

    public DictionaryService(DictionaryRepository dictionaryRepository, DictionarySearchRepository dictionarySearchRepository) {
        this.dictionaryRepository = dictionaryRepository;
        this.dictionarySearchRepository = dictionarySearchRepository;
    }

    /**
     * Save a dictionary.
     *
     * @param dictionary the entity to save.
     * @return the persisted entity.
     */
    public Dictionary save(Dictionary dictionary) {
        log.debug("Request to save Dictionary : {}", dictionary);
        Dictionary result = dictionaryRepository.save(dictionary);
        dictionarySearchRepository.save(result);
        return result;
    }

    /**
     * Get all the dictionaries.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<Dictionary> findAll() {
        log.debug("Request to get all Dictionaries");
        return dictionaryRepository.findAll();
    }


    /**
     * Get one dictionary by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Dictionary> findOne(Long id) {
        log.debug("Request to get Dictionary : {}", id);
        return dictionaryRepository.findById(id);
    }

    /**
     * Delete the dictionary by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Dictionary : {}", id);
        dictionaryRepository.deleteById(id);
        dictionarySearchRepository.deleteById(id);
    }

    /**
     * Search for the dictionary corresponding to the query.
     *
     * @param query the query of the search.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<Dictionary> search(String query) {
        log.debug("Request to search Dictionaries for query {}", query);
        return StreamSupport
            .stream(dictionarySearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
