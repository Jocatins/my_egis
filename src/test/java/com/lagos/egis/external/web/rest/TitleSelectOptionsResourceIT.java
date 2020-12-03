package com.lagos.egis.external.web.rest;

import com.lagos.egis.external.EgisexternalApp;
import com.lagos.egis.external.domain.TitleSelectOptions;
import com.lagos.egis.external.repository.TitleSelectOptionsRepository;
import com.lagos.egis.external.repository.search.TitleSelectOptionsSearchRepository;
import com.lagos.egis.external.web.rest.errors.ExceptionTranslator;

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
 * Integration tests for the {@link TitleSelectOptionsResource} REST controller.
 */
@SpringBootTest(classes = EgisexternalApp.class)
public class TitleSelectOptionsResourceIT {

    private static final String DEFAULT_TRANSACTION_ID = "AAAAAAAAAA";
    private static final String UPDATED_TRANSACTION_ID = "BBBBBBBBBB";

    private static final String DEFAULT_QUERY_FIELD = "AAAAAAAAAA";
    private static final String UPDATED_QUERY_FIELD = "BBBBBBBBBB";

    private static final String DEFAULT_QUERY_VALUE = "AAAAAAAAAA";
    private static final String UPDATED_QUERY_VALUE = "BBBBBBBBBB";

    @Autowired
    private TitleSelectOptionsRepository titleSelectOptionsRepository;

    /**
     * This repository is mocked in the com.lagos.egis.external.repository.search test package.
     *
     * @see com.lagos.egis.external.repository.search.TitleSelectOptionsSearchRepositoryMockConfiguration
     */
    @Autowired
    private TitleSelectOptionsSearchRepository mockTitleSelectOptionsSearchRepository;

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

    private MockMvc restTitleSelectOptionsMockMvc;

    private TitleSelectOptions titleSelectOptions;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TitleSelectOptionsResource titleSelectOptionsResource = new TitleSelectOptionsResource(titleSelectOptionsRepository, mockTitleSelectOptionsSearchRepository);
        this.restTitleSelectOptionsMockMvc = MockMvcBuilders.standaloneSetup(titleSelectOptionsResource)
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
    public static TitleSelectOptions createEntity(EntityManager em) {
        TitleSelectOptions titleSelectOptions = new TitleSelectOptions()
            .transactionId(DEFAULT_TRANSACTION_ID)
            .queryField(DEFAULT_QUERY_FIELD)
            .queryValue(DEFAULT_QUERY_VALUE);
        return titleSelectOptions;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TitleSelectOptions createUpdatedEntity(EntityManager em) {
        TitleSelectOptions titleSelectOptions = new TitleSelectOptions()
            .transactionId(UPDATED_TRANSACTION_ID)
            .queryField(UPDATED_QUERY_FIELD)
            .queryValue(UPDATED_QUERY_VALUE);
        return titleSelectOptions;
    }

    @BeforeEach
    public void initTest() {
        titleSelectOptions = createEntity(em);
    }

    @Test
    @Transactional
    public void createTitleSelectOptions() throws Exception {
        int databaseSizeBeforeCreate = titleSelectOptionsRepository.findAll().size();

        // Create the TitleSelectOptions
        restTitleSelectOptionsMockMvc.perform(post("/api/title-select-options")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(titleSelectOptions)))
            .andExpect(status().isCreated());

        // Validate the TitleSelectOptions in the database
        List<TitleSelectOptions> titleSelectOptionsList = titleSelectOptionsRepository.findAll();
        assertThat(titleSelectOptionsList).hasSize(databaseSizeBeforeCreate + 1);
        TitleSelectOptions testTitleSelectOptions = titleSelectOptionsList.get(titleSelectOptionsList.size() - 1);
        assertThat(testTitleSelectOptions.getTransactionId()).isEqualTo(DEFAULT_TRANSACTION_ID);
        assertThat(testTitleSelectOptions.getQueryField()).isEqualTo(DEFAULT_QUERY_FIELD);
        assertThat(testTitleSelectOptions.getQueryValue()).isEqualTo(DEFAULT_QUERY_VALUE);

        // Validate the TitleSelectOptions in Elasticsearch
        verify(mockTitleSelectOptionsSearchRepository, times(1)).save(testTitleSelectOptions);
    }

    @Test
    @Transactional
    public void createTitleSelectOptionsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = titleSelectOptionsRepository.findAll().size();

        // Create the TitleSelectOptions with an existing ID
        titleSelectOptions.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTitleSelectOptionsMockMvc.perform(post("/api/title-select-options")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(titleSelectOptions)))
            .andExpect(status().isBadRequest());

        // Validate the TitleSelectOptions in the database
        List<TitleSelectOptions> titleSelectOptionsList = titleSelectOptionsRepository.findAll();
        assertThat(titleSelectOptionsList).hasSize(databaseSizeBeforeCreate);

        // Validate the TitleSelectOptions in Elasticsearch
        verify(mockTitleSelectOptionsSearchRepository, times(0)).save(titleSelectOptions);
    }


    @Test
    @Transactional
    public void getAllTitleSelectOptions() throws Exception {
        // Initialize the database
        titleSelectOptionsRepository.saveAndFlush(titleSelectOptions);

        // Get all the titleSelectOptionsList
        restTitleSelectOptionsMockMvc.perform(get("/api/title-select-options?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(titleSelectOptions.getId().intValue())))
            .andExpect(jsonPath("$.[*].transactionId").value(hasItem(DEFAULT_TRANSACTION_ID)))
            .andExpect(jsonPath("$.[*].queryField").value(hasItem(DEFAULT_QUERY_FIELD)))
            .andExpect(jsonPath("$.[*].queryValue").value(hasItem(DEFAULT_QUERY_VALUE)));
    }
    
    @Test
    @Transactional
    public void getTitleSelectOptions() throws Exception {
        // Initialize the database
        titleSelectOptionsRepository.saveAndFlush(titleSelectOptions);

        // Get the titleSelectOptions
        restTitleSelectOptionsMockMvc.perform(get("/api/title-select-options/{id}", titleSelectOptions.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(titleSelectOptions.getId().intValue()))
            .andExpect(jsonPath("$.transactionId").value(DEFAULT_TRANSACTION_ID))
            .andExpect(jsonPath("$.queryField").value(DEFAULT_QUERY_FIELD))
            .andExpect(jsonPath("$.queryValue").value(DEFAULT_QUERY_VALUE));
    }

    @Test
    @Transactional
    public void getNonExistingTitleSelectOptions() throws Exception {
        // Get the titleSelectOptions
        restTitleSelectOptionsMockMvc.perform(get("/api/title-select-options/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTitleSelectOptions() throws Exception {
        // Initialize the database
        titleSelectOptionsRepository.saveAndFlush(titleSelectOptions);

        int databaseSizeBeforeUpdate = titleSelectOptionsRepository.findAll().size();

        // Update the titleSelectOptions
        TitleSelectOptions updatedTitleSelectOptions = titleSelectOptionsRepository.findById(titleSelectOptions.getId()).get();
        // Disconnect from session so that the updates on updatedTitleSelectOptions are not directly saved in db
        em.detach(updatedTitleSelectOptions);
        updatedTitleSelectOptions
            .transactionId(UPDATED_TRANSACTION_ID)
            .queryField(UPDATED_QUERY_FIELD)
            .queryValue(UPDATED_QUERY_VALUE);

        restTitleSelectOptionsMockMvc.perform(put("/api/title-select-options")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTitleSelectOptions)))
            .andExpect(status().isOk());

        // Validate the TitleSelectOptions in the database
        List<TitleSelectOptions> titleSelectOptionsList = titleSelectOptionsRepository.findAll();
        assertThat(titleSelectOptionsList).hasSize(databaseSizeBeforeUpdate);
        TitleSelectOptions testTitleSelectOptions = titleSelectOptionsList.get(titleSelectOptionsList.size() - 1);
        assertThat(testTitleSelectOptions.getTransactionId()).isEqualTo(UPDATED_TRANSACTION_ID);
        assertThat(testTitleSelectOptions.getQueryField()).isEqualTo(UPDATED_QUERY_FIELD);
        assertThat(testTitleSelectOptions.getQueryValue()).isEqualTo(UPDATED_QUERY_VALUE);

        // Validate the TitleSelectOptions in Elasticsearch
        verify(mockTitleSelectOptionsSearchRepository, times(1)).save(testTitleSelectOptions);
    }

    @Test
    @Transactional
    public void updateNonExistingTitleSelectOptions() throws Exception {
        int databaseSizeBeforeUpdate = titleSelectOptionsRepository.findAll().size();

        // Create the TitleSelectOptions

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTitleSelectOptionsMockMvc.perform(put("/api/title-select-options")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(titleSelectOptions)))
            .andExpect(status().isBadRequest());

        // Validate the TitleSelectOptions in the database
        List<TitleSelectOptions> titleSelectOptionsList = titleSelectOptionsRepository.findAll();
        assertThat(titleSelectOptionsList).hasSize(databaseSizeBeforeUpdate);

        // Validate the TitleSelectOptions in Elasticsearch
        verify(mockTitleSelectOptionsSearchRepository, times(0)).save(titleSelectOptions);
    }

    @Test
    @Transactional
    public void deleteTitleSelectOptions() throws Exception {
        // Initialize the database
        titleSelectOptionsRepository.saveAndFlush(titleSelectOptions);

        int databaseSizeBeforeDelete = titleSelectOptionsRepository.findAll().size();

        // Delete the titleSelectOptions
        restTitleSelectOptionsMockMvc.perform(delete("/api/title-select-options/{id}", titleSelectOptions.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TitleSelectOptions> titleSelectOptionsList = titleSelectOptionsRepository.findAll();
        assertThat(titleSelectOptionsList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the TitleSelectOptions in Elasticsearch
        verify(mockTitleSelectOptionsSearchRepository, times(1)).deleteById(titleSelectOptions.getId());
    }

    @Test
    @Transactional
    public void searchTitleSelectOptions() throws Exception {
        // Initialize the database
        titleSelectOptionsRepository.saveAndFlush(titleSelectOptions);
        when(mockTitleSelectOptionsSearchRepository.search(queryStringQuery("id:" + titleSelectOptions.getId())))
            .thenReturn(Collections.singletonList(titleSelectOptions));
        // Search the titleSelectOptions
        restTitleSelectOptionsMockMvc.perform(get("/api/_search/title-select-options?query=id:" + titleSelectOptions.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(titleSelectOptions.getId().intValue())))
            .andExpect(jsonPath("$.[*].transactionId").value(hasItem(DEFAULT_TRANSACTION_ID)))
            .andExpect(jsonPath("$.[*].queryField").value(hasItem(DEFAULT_QUERY_FIELD)))
            .andExpect(jsonPath("$.[*].queryValue").value(hasItem(DEFAULT_QUERY_VALUE)));
    }
}
