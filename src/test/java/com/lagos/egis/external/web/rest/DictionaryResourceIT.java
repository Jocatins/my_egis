package com.lagos.egis.external.web.rest;

import com.lagos.egis.external.EgisexternalApp;
import com.lagos.egis.external.domain.Dictionary;
import com.lagos.egis.external.repository.DictionaryRepository;
import com.lagos.egis.external.repository.search.DictionarySearchRepository;
import com.lagos.egis.external.service.DictionaryService;
import com.lagos.egis.external.web.rest.errors.ExceptionTranslator;
import com.lagos.egis.external.service.dto.DictionaryCriteria;
import com.lagos.egis.external.service.DictionaryQueryService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.Collections;
import java.util.List;

import static com.lagos.egis.external.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link DictionaryResource} REST controller.
 */
@SpringBootTest(classes = EgisexternalApp.class)
public class DictionaryResourceIT {

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_LABEL = "AAAAAAAAAA";
    private static final String UPDATED_LABEL = "BBBBBBBBBB";

    private static final String DEFAULT_DESCR = "AAAAAAAAAA";
    private static final String UPDATED_DESCR = "BBBBBBBBBB";

    private static final String DEFAULT_CATEGORY = "AAAAAAAAAA";
    private static final String UPDATED_CATEGORY = "BBBBBBBBBB";

    @Autowired
    private DictionaryRepository dictionaryRepository;

    @Autowired
    private DictionaryService dictionaryService;

    /**
     * This repository is mocked in the com.lagos.egis.external.repository.search test package.
     *
     * @see com.lagos.egis.external.repository.search.DictionarySearchRepositoryMockConfiguration
     */
    @Autowired
    private DictionarySearchRepository mockDictionarySearchRepository;

    @Autowired
    private DictionaryQueryService dictionaryQueryService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restDictionaryMockMvc;

    private Dictionary dictionary;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DictionaryResource dictionaryResource = new DictionaryResource(dictionaryService, dictionaryQueryService);
        this.restDictionaryMockMvc = MockMvcBuilders.standaloneSetup(dictionaryResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Dictionary createEntity(EntityManager em) {
        Dictionary dictionary = new Dictionary()
            .code(DEFAULT_CODE)
            .label(DEFAULT_LABEL)
            .descr(DEFAULT_DESCR)
            .category(DEFAULT_CATEGORY);
        return dictionary;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Dictionary createUpdatedEntity(EntityManager em) {
        Dictionary dictionary = new Dictionary()
            .code(UPDATED_CODE)
            .label(UPDATED_LABEL)
            .descr(UPDATED_DESCR)
            .category(UPDATED_CATEGORY);
        return dictionary;
    }

    @BeforeEach
    public void initTest() {
        dictionary = createEntity(em);
    }

    @Test
    @Transactional
    public void createDictionary() throws Exception {
        int databaseSizeBeforeCreate = dictionaryRepository.findAll().size();

        // Create the Dictionary
        restDictionaryMockMvc.perform(post("/api/dictionaries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dictionary)))
            .andExpect(status().isCreated());

        // Validate the Dictionary in the database
        List<Dictionary> dictionaryList = dictionaryRepository.findAll();
        assertThat(dictionaryList).hasSize(databaseSizeBeforeCreate + 1);
        Dictionary testDictionary = dictionaryList.get(dictionaryList.size() - 1);
        assertThat(testDictionary.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testDictionary.getLabel()).isEqualTo(DEFAULT_LABEL);
        assertThat(testDictionary.getDescr()).isEqualTo(DEFAULT_DESCR);
        assertThat(testDictionary.getCategory()).isEqualTo(DEFAULT_CATEGORY);

        // Validate the Dictionary in Elasticsearch
        verify(mockDictionarySearchRepository, times(1)).save(testDictionary);
    }

    @Test
    @Transactional
    public void createDictionaryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = dictionaryRepository.findAll().size();

        // Create the Dictionary with an existing ID
        dictionary.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDictionaryMockMvc.perform(post("/api/dictionaries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dictionary)))
            .andExpect(status().isBadRequest());

        // Validate the Dictionary in the database
        List<Dictionary> dictionaryList = dictionaryRepository.findAll();
        assertThat(dictionaryList).hasSize(databaseSizeBeforeCreate);

        // Validate the Dictionary in Elasticsearch
        verify(mockDictionarySearchRepository, times(0)).save(dictionary);
    }


    @Test
    @Transactional
    public void getAllDictionaries() throws Exception {
        // Initialize the database
        dictionaryRepository.saveAndFlush(dictionary);

        // Get all the dictionaryList
        restDictionaryMockMvc.perform(get("/api/dictionaries?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(dictionary.getId().intValue())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE)))
            .andExpect(jsonPath("$.[*].label").value(hasItem(DEFAULT_LABEL)))
            .andExpect(jsonPath("$.[*].descr").value(hasItem(DEFAULT_DESCR)))
            .andExpect(jsonPath("$.[*].category").value(hasItem(DEFAULT_CATEGORY)));
    }
    
    @Test
    @Transactional
    public void getDictionary() throws Exception {
        // Initialize the database
        dictionaryRepository.saveAndFlush(dictionary);

        // Get the dictionary
        restDictionaryMockMvc.perform(get("/api/dictionaries/{id}", dictionary.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(dictionary.getId().intValue()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE))
            .andExpect(jsonPath("$.label").value(DEFAULT_LABEL))
            .andExpect(jsonPath("$.descr").value(DEFAULT_DESCR))
            .andExpect(jsonPath("$.category").value(DEFAULT_CATEGORY));
    }


    @Test
    @Transactional
    public void getDictionariesByIdFiltering() throws Exception {
        // Initialize the database
        dictionaryRepository.saveAndFlush(dictionary);

        Long id = dictionary.getId();

        defaultDictionaryShouldBeFound("id.equals=" + id);
        defaultDictionaryShouldNotBeFound("id.notEquals=" + id);

        defaultDictionaryShouldBeFound("id.greaterThanOrEqual=" + id);
        defaultDictionaryShouldNotBeFound("id.greaterThan=" + id);

        defaultDictionaryShouldBeFound("id.lessThanOrEqual=" + id);
        defaultDictionaryShouldNotBeFound("id.lessThan=" + id);
    }


    @Test
    @Transactional
    public void getAllDictionariesByCodeIsEqualToSomething() throws Exception {
        // Initialize the database
        dictionaryRepository.saveAndFlush(dictionary);

        // Get all the dictionaryList where code equals to DEFAULT_CODE
        defaultDictionaryShouldBeFound("code.equals=" + DEFAULT_CODE);

        // Get all the dictionaryList where code equals to UPDATED_CODE
        defaultDictionaryShouldNotBeFound("code.equals=" + UPDATED_CODE);
    }

    @Test
    @Transactional
    public void getAllDictionariesByCodeIsNotEqualToSomething() throws Exception {
        // Initialize the database
        dictionaryRepository.saveAndFlush(dictionary);

        // Get all the dictionaryList where code not equals to DEFAULT_CODE
        defaultDictionaryShouldNotBeFound("code.notEquals=" + DEFAULT_CODE);

        // Get all the dictionaryList where code not equals to UPDATED_CODE
        defaultDictionaryShouldBeFound("code.notEquals=" + UPDATED_CODE);
    }

    @Test
    @Transactional
    public void getAllDictionariesByCodeIsInShouldWork() throws Exception {
        // Initialize the database
        dictionaryRepository.saveAndFlush(dictionary);

        // Get all the dictionaryList where code in DEFAULT_CODE or UPDATED_CODE
        defaultDictionaryShouldBeFound("code.in=" + DEFAULT_CODE + "," + UPDATED_CODE);

        // Get all the dictionaryList where code equals to UPDATED_CODE
        defaultDictionaryShouldNotBeFound("code.in=" + UPDATED_CODE);
    }

    @Test
    @Transactional
    public void getAllDictionariesByCodeIsNullOrNotNull() throws Exception {
        // Initialize the database
        dictionaryRepository.saveAndFlush(dictionary);

        // Get all the dictionaryList where code is not null
        defaultDictionaryShouldBeFound("code.specified=true");

        // Get all the dictionaryList where code is null
        defaultDictionaryShouldNotBeFound("code.specified=false");
    }
                @Test
    @Transactional
    public void getAllDictionariesByCodeContainsSomething() throws Exception {
        // Initialize the database
        dictionaryRepository.saveAndFlush(dictionary);

        // Get all the dictionaryList where code contains DEFAULT_CODE
        defaultDictionaryShouldBeFound("code.contains=" + DEFAULT_CODE);

        // Get all the dictionaryList where code contains UPDATED_CODE
        defaultDictionaryShouldNotBeFound("code.contains=" + UPDATED_CODE);
    }

    @Test
    @Transactional
    public void getAllDictionariesByCodeNotContainsSomething() throws Exception {
        // Initialize the database
        dictionaryRepository.saveAndFlush(dictionary);

        // Get all the dictionaryList where code does not contain DEFAULT_CODE
        defaultDictionaryShouldNotBeFound("code.doesNotContain=" + DEFAULT_CODE);

        // Get all the dictionaryList where code does not contain UPDATED_CODE
        defaultDictionaryShouldBeFound("code.doesNotContain=" + UPDATED_CODE);
    }


    @Test
    @Transactional
    public void getAllDictionariesByLabelIsEqualToSomething() throws Exception {
        // Initialize the database
        dictionaryRepository.saveAndFlush(dictionary);

        // Get all the dictionaryList where label equals to DEFAULT_LABEL
        defaultDictionaryShouldBeFound("label.equals=" + DEFAULT_LABEL);

        // Get all the dictionaryList where label equals to UPDATED_LABEL
        defaultDictionaryShouldNotBeFound("label.equals=" + UPDATED_LABEL);
    }

    @Test
    @Transactional
    public void getAllDictionariesByLabelIsNotEqualToSomething() throws Exception {
        // Initialize the database
        dictionaryRepository.saveAndFlush(dictionary);

        // Get all the dictionaryList where label not equals to DEFAULT_LABEL
        defaultDictionaryShouldNotBeFound("label.notEquals=" + DEFAULT_LABEL);

        // Get all the dictionaryList where label not equals to UPDATED_LABEL
        defaultDictionaryShouldBeFound("label.notEquals=" + UPDATED_LABEL);
    }

    @Test
    @Transactional
    public void getAllDictionariesByLabelIsInShouldWork() throws Exception {
        // Initialize the database
        dictionaryRepository.saveAndFlush(dictionary);

        // Get all the dictionaryList where label in DEFAULT_LABEL or UPDATED_LABEL
        defaultDictionaryShouldBeFound("label.in=" + DEFAULT_LABEL + "," + UPDATED_LABEL);

        // Get all the dictionaryList where label equals to UPDATED_LABEL
        defaultDictionaryShouldNotBeFound("label.in=" + UPDATED_LABEL);
    }

    @Test
    @Transactional
    public void getAllDictionariesByLabelIsNullOrNotNull() throws Exception {
        // Initialize the database
        dictionaryRepository.saveAndFlush(dictionary);

        // Get all the dictionaryList where label is not null
        defaultDictionaryShouldBeFound("label.specified=true");

        // Get all the dictionaryList where label is null
        defaultDictionaryShouldNotBeFound("label.specified=false");
    }
                @Test
    @Transactional
    public void getAllDictionariesByLabelContainsSomething() throws Exception {
        // Initialize the database
        dictionaryRepository.saveAndFlush(dictionary);

        // Get all the dictionaryList where label contains DEFAULT_LABEL
        defaultDictionaryShouldBeFound("label.contains=" + DEFAULT_LABEL);

        // Get all the dictionaryList where label contains UPDATED_LABEL
        defaultDictionaryShouldNotBeFound("label.contains=" + UPDATED_LABEL);
    }

    @Test
    @Transactional
    public void getAllDictionariesByLabelNotContainsSomething() throws Exception {
        // Initialize the database
        dictionaryRepository.saveAndFlush(dictionary);

        // Get all the dictionaryList where label does not contain DEFAULT_LABEL
        defaultDictionaryShouldNotBeFound("label.doesNotContain=" + DEFAULT_LABEL);

        // Get all the dictionaryList where label does not contain UPDATED_LABEL
        defaultDictionaryShouldBeFound("label.doesNotContain=" + UPDATED_LABEL);
    }


    @Test
    @Transactional
    public void getAllDictionariesByDescrIsEqualToSomething() throws Exception {
        // Initialize the database
        dictionaryRepository.saveAndFlush(dictionary);

        // Get all the dictionaryList where descr equals to DEFAULT_DESCR
        defaultDictionaryShouldBeFound("descr.equals=" + DEFAULT_DESCR);

        // Get all the dictionaryList where descr equals to UPDATED_DESCR
        defaultDictionaryShouldNotBeFound("descr.equals=" + UPDATED_DESCR);
    }

    @Test
    @Transactional
    public void getAllDictionariesByDescrIsNotEqualToSomething() throws Exception {
        // Initialize the database
        dictionaryRepository.saveAndFlush(dictionary);

        // Get all the dictionaryList where descr not equals to DEFAULT_DESCR
        defaultDictionaryShouldNotBeFound("descr.notEquals=" + DEFAULT_DESCR);

        // Get all the dictionaryList where descr not equals to UPDATED_DESCR
        defaultDictionaryShouldBeFound("descr.notEquals=" + UPDATED_DESCR);
    }

    @Test
    @Transactional
    public void getAllDictionariesByDescrIsInShouldWork() throws Exception {
        // Initialize the database
        dictionaryRepository.saveAndFlush(dictionary);

        // Get all the dictionaryList where descr in DEFAULT_DESCR or UPDATED_DESCR
        defaultDictionaryShouldBeFound("descr.in=" + DEFAULT_DESCR + "," + UPDATED_DESCR);

        // Get all the dictionaryList where descr equals to UPDATED_DESCR
        defaultDictionaryShouldNotBeFound("descr.in=" + UPDATED_DESCR);
    }

    @Test
    @Transactional
    public void getAllDictionariesByDescrIsNullOrNotNull() throws Exception {
        // Initialize the database
        dictionaryRepository.saveAndFlush(dictionary);

        // Get all the dictionaryList where descr is not null
        defaultDictionaryShouldBeFound("descr.specified=true");

        // Get all the dictionaryList where descr is null
        defaultDictionaryShouldNotBeFound("descr.specified=false");
    }
                @Test
    @Transactional
    public void getAllDictionariesByDescrContainsSomething() throws Exception {
        // Initialize the database
        dictionaryRepository.saveAndFlush(dictionary);

        // Get all the dictionaryList where descr contains DEFAULT_DESCR
        defaultDictionaryShouldBeFound("descr.contains=" + DEFAULT_DESCR);

        // Get all the dictionaryList where descr contains UPDATED_DESCR
        defaultDictionaryShouldNotBeFound("descr.contains=" + UPDATED_DESCR);
    }

    @Test
    @Transactional
    public void getAllDictionariesByDescrNotContainsSomething() throws Exception {
        // Initialize the database
        dictionaryRepository.saveAndFlush(dictionary);

        // Get all the dictionaryList where descr does not contain DEFAULT_DESCR
        defaultDictionaryShouldNotBeFound("descr.doesNotContain=" + DEFAULT_DESCR);

        // Get all the dictionaryList where descr does not contain UPDATED_DESCR
        defaultDictionaryShouldBeFound("descr.doesNotContain=" + UPDATED_DESCR);
    }


    @Test
    @Transactional
    public void getAllDictionariesByCategoryIsEqualToSomething() throws Exception {
        // Initialize the database
        dictionaryRepository.saveAndFlush(dictionary);

        // Get all the dictionaryList where category equals to DEFAULT_CATEGORY
        defaultDictionaryShouldBeFound("category.equals=" + DEFAULT_CATEGORY);

        // Get all the dictionaryList where category equals to UPDATED_CATEGORY
        defaultDictionaryShouldNotBeFound("category.equals=" + UPDATED_CATEGORY);
    }

    @Test
    @Transactional
    public void getAllDictionariesByCategoryIsNotEqualToSomething() throws Exception {
        // Initialize the database
        dictionaryRepository.saveAndFlush(dictionary);

        // Get all the dictionaryList where category not equals to DEFAULT_CATEGORY
        defaultDictionaryShouldNotBeFound("category.notEquals=" + DEFAULT_CATEGORY);

        // Get all the dictionaryList where category not equals to UPDATED_CATEGORY
        defaultDictionaryShouldBeFound("category.notEquals=" + UPDATED_CATEGORY);
    }

    @Test
    @Transactional
    public void getAllDictionariesByCategoryIsInShouldWork() throws Exception {
        // Initialize the database
        dictionaryRepository.saveAndFlush(dictionary);

        // Get all the dictionaryList where category in DEFAULT_CATEGORY or UPDATED_CATEGORY
        defaultDictionaryShouldBeFound("category.in=" + DEFAULT_CATEGORY + "," + UPDATED_CATEGORY);

        // Get all the dictionaryList where category equals to UPDATED_CATEGORY
        defaultDictionaryShouldNotBeFound("category.in=" + UPDATED_CATEGORY);
    }

    @Test
    @Transactional
    public void getAllDictionariesByCategoryIsNullOrNotNull() throws Exception {
        // Initialize the database
        dictionaryRepository.saveAndFlush(dictionary);

        // Get all the dictionaryList where category is not null
        defaultDictionaryShouldBeFound("category.specified=true");

        // Get all the dictionaryList where category is null
        defaultDictionaryShouldNotBeFound("category.specified=false");
    }
                @Test
    @Transactional
    public void getAllDictionariesByCategoryContainsSomething() throws Exception {
        // Initialize the database
        dictionaryRepository.saveAndFlush(dictionary);

        // Get all the dictionaryList where category contains DEFAULT_CATEGORY
        defaultDictionaryShouldBeFound("category.contains=" + DEFAULT_CATEGORY);

        // Get all the dictionaryList where category contains UPDATED_CATEGORY
        defaultDictionaryShouldNotBeFound("category.contains=" + UPDATED_CATEGORY);
    }

    @Test
    @Transactional
    public void getAllDictionariesByCategoryNotContainsSomething() throws Exception {
        // Initialize the database
        dictionaryRepository.saveAndFlush(dictionary);

        // Get all the dictionaryList where category does not contain DEFAULT_CATEGORY
        defaultDictionaryShouldNotBeFound("category.doesNotContain=" + DEFAULT_CATEGORY);

        // Get all the dictionaryList where category does not contain UPDATED_CATEGORY
        defaultDictionaryShouldBeFound("category.doesNotContain=" + UPDATED_CATEGORY);
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultDictionaryShouldBeFound(String filter) throws Exception {
        restDictionaryMockMvc.perform(get("/api/dictionaries?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(dictionary.getId().intValue())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE)))
            .andExpect(jsonPath("$.[*].label").value(hasItem(DEFAULT_LABEL)))
            .andExpect(jsonPath("$.[*].descr").value(hasItem(DEFAULT_DESCR)))
            .andExpect(jsonPath("$.[*].category").value(hasItem(DEFAULT_CATEGORY)));

        // Check, that the count call also returns 1
        restDictionaryMockMvc.perform(get("/api/dictionaries/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultDictionaryShouldNotBeFound(String filter) throws Exception {
        restDictionaryMockMvc.perform(get("/api/dictionaries?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restDictionaryMockMvc.perform(get("/api/dictionaries/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().string("0"));
    }


    @Test
    @Transactional
    public void getNonExistingDictionary() throws Exception {
        // Get the dictionary
        restDictionaryMockMvc.perform(get("/api/dictionaries/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDictionary() throws Exception {
        // Initialize the database
        dictionaryService.save(dictionary);
        // As the test used the service layer, reset the Elasticsearch mock repository
        reset(mockDictionarySearchRepository);

        int databaseSizeBeforeUpdate = dictionaryRepository.findAll().size();

        // Update the dictionary
        Dictionary updatedDictionary = dictionaryRepository.findById(dictionary.getId()).get();
        // Disconnect from session so that the updates on updatedDictionary are not directly saved in db
        em.detach(updatedDictionary);
        updatedDictionary
            .code(UPDATED_CODE)
            .label(UPDATED_LABEL)
            .descr(UPDATED_DESCR)
            .category(UPDATED_CATEGORY);

        restDictionaryMockMvc.perform(put("/api/dictionaries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDictionary)))
            .andExpect(status().isOk());

        // Validate the Dictionary in the database
        List<Dictionary> dictionaryList = dictionaryRepository.findAll();
        assertThat(dictionaryList).hasSize(databaseSizeBeforeUpdate);
        Dictionary testDictionary = dictionaryList.get(dictionaryList.size() - 1);
        assertThat(testDictionary.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testDictionary.getLabel()).isEqualTo(UPDATED_LABEL);
        assertThat(testDictionary.getDescr()).isEqualTo(UPDATED_DESCR);
        assertThat(testDictionary.getCategory()).isEqualTo(UPDATED_CATEGORY);

        // Validate the Dictionary in Elasticsearch
        verify(mockDictionarySearchRepository, times(1)).save(testDictionary);
    }

    @Test
    @Transactional
    public void updateNonExistingDictionary() throws Exception {
        int databaseSizeBeforeUpdate = dictionaryRepository.findAll().size();

        // Create the Dictionary

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDictionaryMockMvc.perform(put("/api/dictionaries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dictionary)))
            .andExpect(status().isBadRequest());

        // Validate the Dictionary in the database
        List<Dictionary> dictionaryList = dictionaryRepository.findAll();
        assertThat(dictionaryList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Dictionary in Elasticsearch
        verify(mockDictionarySearchRepository, times(0)).save(dictionary);
    }

    @Test
    @Transactional
    public void deleteDictionary() throws Exception {
        // Initialize the database
        dictionaryService.save(dictionary);

        int databaseSizeBeforeDelete = dictionaryRepository.findAll().size();

        // Delete the dictionary
        restDictionaryMockMvc.perform(delete("/api/dictionaries/{id}", dictionary.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Dictionary> dictionaryList = dictionaryRepository.findAll();
        assertThat(dictionaryList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Dictionary in Elasticsearch
        verify(mockDictionarySearchRepository, times(1)).deleteById(dictionary.getId());
    }

    @Test
    @Transactional
    public void searchDictionary() throws Exception {
        // Initialize the database
        dictionaryService.save(dictionary);
        when(mockDictionarySearchRepository.search(queryStringQuery("id:" + dictionary.getId())))
            .thenReturn(Collections.singletonList(dictionary));
        // Search the dictionary
        restDictionaryMockMvc.perform(get("/api/_search/dictionaries?query=id:" + dictionary.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(dictionary.getId().intValue())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE)))
            .andExpect(jsonPath("$.[*].label").value(hasItem(DEFAULT_LABEL)))
            .andExpect(jsonPath("$.[*].descr").value(hasItem(DEFAULT_DESCR)))
            .andExpect(jsonPath("$.[*].category").value(hasItem(DEFAULT_CATEGORY)));
    }
}
