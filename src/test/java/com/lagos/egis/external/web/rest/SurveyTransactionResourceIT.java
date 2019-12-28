package com.lagos.egis.external.web.rest;

import com.lagos.egis.external.EgisexternalApp;
import com.lagos.egis.external.domain.SurveyTransaction;
import com.lagos.egis.external.repository.SurveyTransactionRepository;
import com.lagos.egis.external.repository.search.SurveyTransactionSearchRepository;
import com.lagos.egis.external.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
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
 * Integration tests for the {@link SurveyTransactionResource} REST controller.
 */
@SpringBootTest(classes = EgisexternalApp.class)
public class SurveyTransactionResourceIT {

    private static final String DEFAULT_TRANS_CODE = "AAAAAAAAAA";
    private static final String UPDATED_TRANS_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_COMMENT = "AAAAAAAAAA";
    private static final String UPDATED_COMMENT = "BBBBBBBBBB";

    @Autowired
    private SurveyTransactionRepository surveyTransactionRepository;

    /**
     * This repository is mocked in the com.lagos.egis.external.repository.search test package.
     *
     * @see com.lagos.egis.external.repository.search.SurveyTransactionSearchRepositoryMockConfiguration
     */
    @Autowired
    private SurveyTransactionSearchRepository mockSurveyTransactionSearchRepository;

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

    private MockMvc restSurveyTransactionMockMvc;

    private SurveyTransaction surveyTransaction;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SurveyTransactionResource surveyTransactionResource = new SurveyTransactionResource(surveyTransactionRepository, mockSurveyTransactionSearchRepository);
        this.restSurveyTransactionMockMvc = MockMvcBuilders.standaloneSetup(surveyTransactionResource)
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
    public static SurveyTransaction createEntity(EntityManager em) {
        SurveyTransaction surveyTransaction = new SurveyTransaction()
            .transCode(DEFAULT_TRANS_CODE)
            .comment(DEFAULT_COMMENT);
        return surveyTransaction;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SurveyTransaction createUpdatedEntity(EntityManager em) {
        SurveyTransaction surveyTransaction = new SurveyTransaction()
            .transCode(UPDATED_TRANS_CODE)
            .comment(UPDATED_COMMENT);
        return surveyTransaction;
    }

    @BeforeEach
    public void initTest() {
        surveyTransaction = createEntity(em);
    }

    @Test
    @Transactional
    public void createSurveyTransaction() throws Exception {
        int databaseSizeBeforeCreate = surveyTransactionRepository.findAll().size();

        // Create the SurveyTransaction
        restSurveyTransactionMockMvc.perform(post("/api/survey-transactions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(surveyTransaction)))
            .andExpect(status().isCreated());

        // Validate the SurveyTransaction in the database
        List<SurveyTransaction> surveyTransactionList = surveyTransactionRepository.findAll();
        assertThat(surveyTransactionList).hasSize(databaseSizeBeforeCreate + 1);
        SurveyTransaction testSurveyTransaction = surveyTransactionList.get(surveyTransactionList.size() - 1);
        assertThat(testSurveyTransaction.getTransCode()).isEqualTo(DEFAULT_TRANS_CODE);
        assertThat(testSurveyTransaction.getComment()).isEqualTo(DEFAULT_COMMENT);

        // Validate the SurveyTransaction in Elasticsearch
        verify(mockSurveyTransactionSearchRepository, times(1)).save(testSurveyTransaction);
    }

    @Test
    @Transactional
    public void createSurveyTransactionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = surveyTransactionRepository.findAll().size();

        // Create the SurveyTransaction with an existing ID
        surveyTransaction.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSurveyTransactionMockMvc.perform(post("/api/survey-transactions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(surveyTransaction)))
            .andExpect(status().isBadRequest());

        // Validate the SurveyTransaction in the database
        List<SurveyTransaction> surveyTransactionList = surveyTransactionRepository.findAll();
        assertThat(surveyTransactionList).hasSize(databaseSizeBeforeCreate);

        // Validate the SurveyTransaction in Elasticsearch
        verify(mockSurveyTransactionSearchRepository, times(0)).save(surveyTransaction);
    }


    @Test
    @Transactional
    public void getAllSurveyTransactions() throws Exception {
        // Initialize the database
        surveyTransactionRepository.saveAndFlush(surveyTransaction);

        // Get all the surveyTransactionList
        restSurveyTransactionMockMvc.perform(get("/api/survey-transactions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(surveyTransaction.getId().intValue())))
            .andExpect(jsonPath("$.[*].transCode").value(hasItem(DEFAULT_TRANS_CODE)))
            .andExpect(jsonPath("$.[*].comment").value(hasItem(DEFAULT_COMMENT)));
    }
    
    @Test
    @Transactional
    public void getSurveyTransaction() throws Exception {
        // Initialize the database
        surveyTransactionRepository.saveAndFlush(surveyTransaction);

        // Get the surveyTransaction
        restSurveyTransactionMockMvc.perform(get("/api/survey-transactions/{id}", surveyTransaction.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(surveyTransaction.getId().intValue()))
            .andExpect(jsonPath("$.transCode").value(DEFAULT_TRANS_CODE))
            .andExpect(jsonPath("$.comment").value(DEFAULT_COMMENT));
    }

    @Test
    @Transactional
    public void getNonExistingSurveyTransaction() throws Exception {
        // Get the surveyTransaction
        restSurveyTransactionMockMvc.perform(get("/api/survey-transactions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSurveyTransaction() throws Exception {
        // Initialize the database
        surveyTransactionRepository.saveAndFlush(surveyTransaction);

        int databaseSizeBeforeUpdate = surveyTransactionRepository.findAll().size();

        // Update the surveyTransaction
        SurveyTransaction updatedSurveyTransaction = surveyTransactionRepository.findById(surveyTransaction.getId()).get();
        // Disconnect from session so that the updates on updatedSurveyTransaction are not directly saved in db
        em.detach(updatedSurveyTransaction);
        updatedSurveyTransaction
            .transCode(UPDATED_TRANS_CODE)
            .comment(UPDATED_COMMENT);

        restSurveyTransactionMockMvc.perform(put("/api/survey-transactions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSurveyTransaction)))
            .andExpect(status().isOk());

        // Validate the SurveyTransaction in the database
        List<SurveyTransaction> surveyTransactionList = surveyTransactionRepository.findAll();
        assertThat(surveyTransactionList).hasSize(databaseSizeBeforeUpdate);
        SurveyTransaction testSurveyTransaction = surveyTransactionList.get(surveyTransactionList.size() - 1);
        assertThat(testSurveyTransaction.getTransCode()).isEqualTo(UPDATED_TRANS_CODE);
        assertThat(testSurveyTransaction.getComment()).isEqualTo(UPDATED_COMMENT);

        // Validate the SurveyTransaction in Elasticsearch
        verify(mockSurveyTransactionSearchRepository, times(1)).save(testSurveyTransaction);
    }

    @Test
    @Transactional
    public void updateNonExistingSurveyTransaction() throws Exception {
        int databaseSizeBeforeUpdate = surveyTransactionRepository.findAll().size();

        // Create the SurveyTransaction

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSurveyTransactionMockMvc.perform(put("/api/survey-transactions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(surveyTransaction)))
            .andExpect(status().isBadRequest());

        // Validate the SurveyTransaction in the database
        List<SurveyTransaction> surveyTransactionList = surveyTransactionRepository.findAll();
        assertThat(surveyTransactionList).hasSize(databaseSizeBeforeUpdate);

        // Validate the SurveyTransaction in Elasticsearch
        verify(mockSurveyTransactionSearchRepository, times(0)).save(surveyTransaction);
    }

    @Test
    @Transactional
    public void deleteSurveyTransaction() throws Exception {
        // Initialize the database
        surveyTransactionRepository.saveAndFlush(surveyTransaction);

        int databaseSizeBeforeDelete = surveyTransactionRepository.findAll().size();

        // Delete the surveyTransaction
        restSurveyTransactionMockMvc.perform(delete("/api/survey-transactions/{id}", surveyTransaction.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<SurveyTransaction> surveyTransactionList = surveyTransactionRepository.findAll();
        assertThat(surveyTransactionList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the SurveyTransaction in Elasticsearch
        verify(mockSurveyTransactionSearchRepository, times(1)).deleteById(surveyTransaction.getId());
    }

    @Test
    @Transactional
    public void searchSurveyTransaction() throws Exception {
        // Initialize the database
        surveyTransactionRepository.saveAndFlush(surveyTransaction);
        when(mockSurveyTransactionSearchRepository.search(queryStringQuery("id:" + surveyTransaction.getId()), PageRequest.of(0, 20)))
            .thenReturn(new PageImpl<>(Collections.singletonList(surveyTransaction), PageRequest.of(0, 1), 1));
        // Search the surveyTransaction
        restSurveyTransactionMockMvc.perform(get("/api/_search/survey-transactions?query=id:" + surveyTransaction.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(surveyTransaction.getId().intValue())))
            .andExpect(jsonPath("$.[*].transCode").value(hasItem(DEFAULT_TRANS_CODE)))
            .andExpect(jsonPath("$.[*].comment").value(hasItem(DEFAULT_COMMENT)));
    }
}
