package com.lagos.egis.external.web.rest;

import com.lagos.egis.external.EgisexternalApp;
import com.lagos.egis.external.domain.TransactionExt;
import com.lagos.egis.external.repository.TransactionExtRepository;
import com.lagos.egis.external.repository.search.TransactionExtSearchRepository;
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
 * Integration tests for the {@link TransactionExtResource} REST controller.
 */
@SpringBootTest(classes = EgisexternalApp.class)
public class TransactionExtResourceIT {

    private static final String DEFAULT_EXTENSION_KEY = "AAAAAAAAAA";
    private static final String UPDATED_EXTENSION_KEY = "BBBBBBBBBB";

    private static final String DEFAULT_EXTENSION_VALUE = "AAAAAAAAAA";
    private static final String UPDATED_EXTENSION_VALUE = "BBBBBBBBBB";

    @Autowired
    private TransactionExtRepository transactionExtRepository;

    /**
     * This repository is mocked in the com.lagos.egis.external.repository.search test package.
     *
     * @see com.lagos.egis.external.repository.search.TransactionExtSearchRepositoryMockConfiguration
     */
    @Autowired
    private TransactionExtSearchRepository mockTransactionExtSearchRepository;

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

    private MockMvc restTransactionExtMockMvc;

    private TransactionExt transactionExt;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TransactionExtResource transactionExtResource = new TransactionExtResource(transactionExtRepository, mockTransactionExtSearchRepository);
        this.restTransactionExtMockMvc = MockMvcBuilders.standaloneSetup(transactionExtResource)
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
    public static TransactionExt createEntity(EntityManager em) {
        TransactionExt transactionExt = new TransactionExt()
            .extensionKey(DEFAULT_EXTENSION_KEY)
            .extensionValue(DEFAULT_EXTENSION_VALUE);
        return transactionExt;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TransactionExt createUpdatedEntity(EntityManager em) {
        TransactionExt transactionExt = new TransactionExt()
            .extensionKey(UPDATED_EXTENSION_KEY)
            .extensionValue(UPDATED_EXTENSION_VALUE);
        return transactionExt;
    }

    @BeforeEach
    public void initTest() {
        transactionExt = createEntity(em);
    }

    @Test
    @Transactional
    public void createTransactionExt() throws Exception {
        int databaseSizeBeforeCreate = transactionExtRepository.findAll().size();

        // Create the TransactionExt
        restTransactionExtMockMvc.perform(post("/api/transaction-exts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transactionExt)))
            .andExpect(status().isCreated());

        // Validate the TransactionExt in the database
        List<TransactionExt> transactionExtList = transactionExtRepository.findAll();
        assertThat(transactionExtList).hasSize(databaseSizeBeforeCreate + 1);
        TransactionExt testTransactionExt = transactionExtList.get(transactionExtList.size() - 1);
        assertThat(testTransactionExt.getExtensionKey()).isEqualTo(DEFAULT_EXTENSION_KEY);
        assertThat(testTransactionExt.getExtensionValue()).isEqualTo(DEFAULT_EXTENSION_VALUE);

        // Validate the TransactionExt in Elasticsearch
        verify(mockTransactionExtSearchRepository, times(1)).save(testTransactionExt);
    }

    @Test
    @Transactional
    public void createTransactionExtWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = transactionExtRepository.findAll().size();

        // Create the TransactionExt with an existing ID
        transactionExt.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTransactionExtMockMvc.perform(post("/api/transaction-exts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transactionExt)))
            .andExpect(status().isBadRequest());

        // Validate the TransactionExt in the database
        List<TransactionExt> transactionExtList = transactionExtRepository.findAll();
        assertThat(transactionExtList).hasSize(databaseSizeBeforeCreate);

        // Validate the TransactionExt in Elasticsearch
        verify(mockTransactionExtSearchRepository, times(0)).save(transactionExt);
    }


    @Test
    @Transactional
    public void getAllTransactionExts() throws Exception {
        // Initialize the database
        transactionExtRepository.saveAndFlush(transactionExt);

        // Get all the transactionExtList
        restTransactionExtMockMvc.perform(get("/api/transaction-exts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(transactionExt.getId().intValue())))
            .andExpect(jsonPath("$.[*].extensionKey").value(hasItem(DEFAULT_EXTENSION_KEY)))
            .andExpect(jsonPath("$.[*].extensionValue").value(hasItem(DEFAULT_EXTENSION_VALUE)));
    }
    
    @Test
    @Transactional
    public void getTransactionExt() throws Exception {
        // Initialize the database
        transactionExtRepository.saveAndFlush(transactionExt);

        // Get the transactionExt
        restTransactionExtMockMvc.perform(get("/api/transaction-exts/{id}", transactionExt.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(transactionExt.getId().intValue()))
            .andExpect(jsonPath("$.extensionKey").value(DEFAULT_EXTENSION_KEY))
            .andExpect(jsonPath("$.extensionValue").value(DEFAULT_EXTENSION_VALUE));
    }

    @Test
    @Transactional
    public void getNonExistingTransactionExt() throws Exception {
        // Get the transactionExt
        restTransactionExtMockMvc.perform(get("/api/transaction-exts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTransactionExt() throws Exception {
        // Initialize the database
        transactionExtRepository.saveAndFlush(transactionExt);

        int databaseSizeBeforeUpdate = transactionExtRepository.findAll().size();

        // Update the transactionExt
        TransactionExt updatedTransactionExt = transactionExtRepository.findById(transactionExt.getId()).get();
        // Disconnect from session so that the updates on updatedTransactionExt are not directly saved in db
        em.detach(updatedTransactionExt);
        updatedTransactionExt
            .extensionKey(UPDATED_EXTENSION_KEY)
            .extensionValue(UPDATED_EXTENSION_VALUE);

        restTransactionExtMockMvc.perform(put("/api/transaction-exts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTransactionExt)))
            .andExpect(status().isOk());

        // Validate the TransactionExt in the database
        List<TransactionExt> transactionExtList = transactionExtRepository.findAll();
        assertThat(transactionExtList).hasSize(databaseSizeBeforeUpdate);
        TransactionExt testTransactionExt = transactionExtList.get(transactionExtList.size() - 1);
        assertThat(testTransactionExt.getExtensionKey()).isEqualTo(UPDATED_EXTENSION_KEY);
        assertThat(testTransactionExt.getExtensionValue()).isEqualTo(UPDATED_EXTENSION_VALUE);

        // Validate the TransactionExt in Elasticsearch
        verify(mockTransactionExtSearchRepository, times(1)).save(testTransactionExt);
    }

    @Test
    @Transactional
    public void updateNonExistingTransactionExt() throws Exception {
        int databaseSizeBeforeUpdate = transactionExtRepository.findAll().size();

        // Create the TransactionExt

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTransactionExtMockMvc.perform(put("/api/transaction-exts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transactionExt)))
            .andExpect(status().isBadRequest());

        // Validate the TransactionExt in the database
        List<TransactionExt> transactionExtList = transactionExtRepository.findAll();
        assertThat(transactionExtList).hasSize(databaseSizeBeforeUpdate);

        // Validate the TransactionExt in Elasticsearch
        verify(mockTransactionExtSearchRepository, times(0)).save(transactionExt);
    }

    @Test
    @Transactional
    public void deleteTransactionExt() throws Exception {
        // Initialize the database
        transactionExtRepository.saveAndFlush(transactionExt);

        int databaseSizeBeforeDelete = transactionExtRepository.findAll().size();

        // Delete the transactionExt
        restTransactionExtMockMvc.perform(delete("/api/transaction-exts/{id}", transactionExt.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TransactionExt> transactionExtList = transactionExtRepository.findAll();
        assertThat(transactionExtList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the TransactionExt in Elasticsearch
        verify(mockTransactionExtSearchRepository, times(1)).deleteById(transactionExt.getId());
    }

    @Test
    @Transactional
    public void searchTransactionExt() throws Exception {
        // Initialize the database
        transactionExtRepository.saveAndFlush(transactionExt);
        when(mockTransactionExtSearchRepository.search(queryStringQuery("id:" + transactionExt.getId())))
            .thenReturn(Collections.singletonList(transactionExt));
        // Search the transactionExt
        restTransactionExtMockMvc.perform(get("/api/_search/transaction-exts?query=id:" + transactionExt.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(transactionExt.getId().intValue())))
            .andExpect(jsonPath("$.[*].extensionKey").value(hasItem(DEFAULT_EXTENSION_KEY)))
            .andExpect(jsonPath("$.[*].extensionValue").value(hasItem(DEFAULT_EXTENSION_VALUE)));
    }
}
