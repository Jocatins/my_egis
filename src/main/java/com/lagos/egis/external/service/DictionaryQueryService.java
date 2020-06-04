package com.lagos.egis.external.service;

import java.util.List;

import javax.persistence.criteria.JoinType;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.github.jhipster.service.QueryService;

import com.lagos.egis.external.domain.Dictionary;
import com.lagos.egis.external.domain.*; // for static metamodels
import com.lagos.egis.external.repository.DictionaryRepository;
import com.lagos.egis.external.repository.search.DictionarySearchRepository;
import com.lagos.egis.external.service.dto.DictionaryCriteria;

/**
 * Service for executing complex queries for {@link Dictionary} entities in the database.
 * The main input is a {@link DictionaryCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link Dictionary} or a {@link Page} of {@link Dictionary} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class DictionaryQueryService extends QueryService<Dictionary> {

    private final Logger log = LoggerFactory.getLogger(DictionaryQueryService.class);

    private final DictionaryRepository dictionaryRepository;

    private final DictionarySearchRepository dictionarySearchRepository;

    public DictionaryQueryService(DictionaryRepository dictionaryRepository, DictionarySearchRepository dictionarySearchRepository) {
        this.dictionaryRepository = dictionaryRepository;
        this.dictionarySearchRepository = dictionarySearchRepository;
    }

    /**
     * Return a {@link List} of {@link Dictionary} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<Dictionary> findByCriteria(DictionaryCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<Dictionary> specification = createSpecification(criteria);
        return dictionaryRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link Dictionary} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<Dictionary> findByCriteria(DictionaryCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<Dictionary> specification = createSpecification(criteria);
        return dictionaryRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(DictionaryCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<Dictionary> specification = createSpecification(criteria);
        return dictionaryRepository.count(specification);
    }

    /**
     * Function to convert {@link DictionaryCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<Dictionary> createSpecification(DictionaryCriteria criteria) {
        Specification<Dictionary> specification = Specification.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), Dictionary_.id));
            }
            if (criteria.getCode() != null) {
                specification = specification.and(buildStringSpecification(criteria.getCode(), Dictionary_.code));
            }
            if (criteria.getLabel() != null) {
                specification = specification.and(buildStringSpecification(criteria.getLabel(), Dictionary_.label));
            }
            if (criteria.getDescr() != null) {
                specification = specification.and(buildStringSpecification(criteria.getDescr(), Dictionary_.descr));
            }
            if (criteria.getCategory() != null) {
                specification = specification.and(buildStringSpecification(criteria.getCategory(), Dictionary_.category));
            }
        }
        return specification;
    }
}
