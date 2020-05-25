package com.lagos.egis.external.web.rest;

import com.lagos.egis.external.EgisexternalApp;
import com.lagos.egis.external.domain.Transaction;
import com.lagos.egis.external.repository.TransactionRepository;
import com.lagos.egis.external.repository.search.TransactionSearchRepository;
import com.lagos.egis.external.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
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
 * Integration tests for the {@link TransactionResource} REST controller.
 */
@SpringBootTest(classes = EgisexternalApp.class)
public class TransactionResourceIT {

    private static final String DEFAULT_TRANSACTION_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_TRANSACTION_NUMBER = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_APPLICATION_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_APPLICATION_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_TRANSACTION_START_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_TRANSACTION_START_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_COMMENTS = "AAAAAAAAAA";
    private static final String UPDATED_COMMENTS = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_CREATE_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_CREATE_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_START_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_START_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_COMPLETE_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_COMPLETE_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final Integer DEFAULT_BATCH_ID = 1;
    private static final Integer UPDATED_BATCH_ID = 2;

    @Autowired
    private TransactionRepository transactionRepository;

    @Mock
    private TransactionRepository transactionRepositoryMock;

    /**
     * This repository is mocked in the com.lagos.egis.external.repository.search test package.
     *
     * @see com.lagos.egis.external.repository.search.TransactionSearchRepositoryMockConfiguration
     */
    @Autowired
    private TransactionSearchRepository mockTransactionSearchRepository;

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

    private MockMvc restTransactionMockMvc;

    private Transaction transaction;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TransactionResource transactionResource = new TransactionResource(transactionRepository, mockTransactionSearchRepository);
        this.restTransactionMockMvc = MockMvcBuilders.standaloneSetup(transactionResource)
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
    public static Transaction createEntity(EntityManager em) {
        Transaction transaction = new Transaction()
            .transactionNumber(DEFAULT_TRANSACTION_NUMBER)
            .applicationDate(DEFAULT_APPLICATION_DATE)
            .transactionStartDate(DEFAULT_TRANSACTION_START_DATE)
            .comments(DEFAULT_COMMENTS)
            .createDate(DEFAULT_CREATE_DATE)
            .startDate(DEFAULT_START_DATE)
            .completeDate(DEFAULT_COMPLETE_DATE)
            .batchId(DEFAULT_BATCH_ID);
        return transaction;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Transaction createUpdatedEntity(EntityManager em) {
        Transaction transaction = new Transaction()
            .transactionNumber(UPDATED_TRANSACTION_NUMBER)
            .applicationDate(UPDATED_APPLICATION_DATE)
            .transactionStartDate(UPDATED_TRANSACTION_START_DATE)
            .comments(UPDATED_COMMENTS)
            .createDate(UPDATED_CREATE_DATE)
            .startDate(UPDATED_START_DATE)
            .completeDate(UPDATED_COMPLETE_DATE)
            .batchId(UPDATED_BATCH_ID);
        return transaction;
    }

    @BeforeEach
    public void initTest() {
        transaction = createEntity(em);
    }

    @Test
    @Transactional
    public void createTransaction() throws Exception {
        int databaseSizeBeforeCreate = transactionRepository.findAll().size();

        // Create the Transaction
        restTransactionMockMvc.perform(post("/api/transactions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transaction)))
            .andExpect(status().isCreated());

        // Validate the Transaction in the database
        List<Transaction> transactionList = transactionRepository.findAll();
        assertThat(transactionList).hasSize(databaseSizeBeforeCreate + 1);
        Transaction testTransaction = transactionList.get(transactionList.size() - 1);
        assertThat(testTransaction.getTransactionNumber()).isEqualTo(DEFAULT_TRANSACTION_NUMBER);
        assertThat(testTransaction.getApplicationDate()).isEqualTo(DEFAULT_APPLICATION_DATE);
        assertThat(testTransaction.getTransactionStartDate()).isEqualTo(DEFAULT_TRANSACTION_START_DATE);
        assertThat(testTransaction.getComments()).isEqualTo(DEFAULT_COMMENTS);
        assertThat(testTransaction.getCreateDate()).isEqualTo(DEFAULT_CREATE_DATE);
        assertThat(testTransaction.getStartDate()).isEqualTo(DEFAULT_START_DATE);
        assertThat(testTransaction.getCompleteDate()).isEqualTo(DEFAULT_COMPLETE_DATE);
        assertThat(testTransaction.getBatchId()).isEqualTo(DEFAULT_BATCH_ID);

        // Validate the Transaction in Elasticsearch
        verify(mockTransactionSearchRepository, times(1)).save(testTransaction);
    }

    @Test
    @Transactional
    public void createTransactionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = transactionRepository.findAll().size();

        // Create the Transaction with an existing ID
        transaction.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTransactionMockMvc.perform(post("/api/transactions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transaction)))
            .andExpect(status().isBadRequest());

        // Validate the Transaction in the database
        List<Transaction> transactionList = transactionRepository.findAll();
        assertThat(transactionList).hasSize(databaseSizeBeforeCreate);

        // Validate the Transaction in Elasticsearch
        verify(mockTransactionSearchRepository, times(0)).save(transaction);
    }


    @Test
    @Transactional
    public void getAllTransactions() throws Exception {
        // Initialize the database
        transactionRepository.saveAndFlush(transaction);

        // Get all the transactionList
        restTransactionMockMvc.perform(get("/api/transactions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(transaction.getId().intValue())))
            .andExpect(jsonPath("$.[*].transactionNumber").value(hasItem(DEFAULT_TRANSACTION_NUMBER)))
            .andExpect(jsonPath("$.[*].applicationDate").value(hasItem(DEFAULT_APPLICATION_DATE.toString())))
            .andExpect(jsonPath("$.[*].transactionStartDate").value(hasItem(DEFAULT_TRANSACTION_START_DATE.toString())))
            .andExpect(jsonPath("$.[*].comments").value(hasItem(DEFAULT_COMMENTS)))
            .andExpect(jsonPath("$.[*].createDate").value(hasItem(DEFAULT_CREATE_DATE.toString())))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(DEFAULT_START_DATE.toString())))
            .andExpect(jsonPath("$.[*].completeDate").value(hasItem(DEFAULT_COMPLETE_DATE.toString())))
            .andExpect(jsonPath("$.[*].batchId").value(hasItem(DEFAULT_BATCH_ID)));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllTransactionsWithEagerRelationshipsIsEnabled() throws Exception {
        TransactionResource transactionResource = new TransactionResource(transactionRepositoryMock, mockTransactionSearchRepository);
        when(transactionRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restTransactionMockMvc = MockMvcBuilders.standaloneSetup(transactionResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restTransactionMockMvc.perform(get("/api/transactions?eagerload=true"))
        .andExpect(status().isOk());

        verify(transactionRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllTransactionsWithEagerRelationshipsIsNotEnabled() throws Exception {
        TransactionResource transactionResource = new TransactionResource(transactionRepositoryMock, mockTransactionSearchRepository);
            when(transactionRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restTransactionMockMvc = MockMvcBuilders.standaloneSetup(transactionResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restTransactionMockMvc.perform(get("/api/transactions?eagerload=true"))
        .andExpect(status().isOk());

            verify(transactionRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getTransaction() throws Exception {
        // Initialize the database
        transactionRepository.saveAndFlush(transaction);

        // Get the transaction
        restTransactionMockMvc.perform(get("/api/transactions/{id}", transaction.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(transaction.getId().intValue()))
            .andExpect(jsonPath("$.transactionNumber").value(DEFAULT_TRANSACTION_NUMBER))
            .andExpect(jsonPath("$.applicationDate").value(DEFAULT_APPLICATION_DATE.toString()))
            .andExpect(jsonPath("$.transactionStartDate").value(DEFAULT_TRANSACTION_START_DATE.toString()))
            .andExpect(jsonPath("$.comments").value(DEFAULT_COMMENTS))
            .andExpect(jsonPath("$.createDate").value(DEFAULT_CREATE_DATE.toString()))
            .andExpect(jsonPath("$.startDate").value(DEFAULT_START_DATE.toString()))
            .andExpect(jsonPath("$.completeDate").value(DEFAULT_COMPLETE_DATE.toString()))
            .andExpect(jsonPath("$.batchId").value(DEFAULT_BATCH_ID));
    }

    @Test
    @Transactional
    public void getNonExistingTransaction() throws Exception {
        // Get the transaction
        restTransactionMockMvc.perform(get("/api/transactions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTransaction() throws Exception {
        // Initialize the database
        transactionRepository.saveAndFlush(transaction);

        int databaseSizeBeforeUpdate = transactionRepository.findAll().size();

        // Update the transaction
        Transaction updatedTransaction = transactionRepository.findById(transaction.getId()).get();
        // Disconnect from session so that the updates on updatedTransaction are not directly saved in db
        em.detach(updatedTransaction);
        updatedTransaction
            .transactionNumber(UPDATED_TRANSACTION_NUMBER)
            .applicationDate(UPDATED_APPLICATION_DATE)
            .transactionStartDate(UPDATED_TRANSACTION_START_DATE)
            .comments(UPDATED_COMMENTS)
            .createDate(UPDATED_CREATE_DATE)
            .startDate(UPDATED_START_DATE)
            .completeDate(UPDATED_COMPLETE_DATE)
            .batchId(UPDATED_BATCH_ID);

        restTransactionMockMvc.perform(put("/api/transactions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTransaction)))
            .andExpect(status().isOk());

        // Validate the Transaction in the database
        List<Transaction> transactionList = transactionRepository.findAll();
        assertThat(transactionList).hasSize(databaseSizeBeforeUpdate);
        Transaction testTransaction = transactionList.get(transactionList.size() - 1);
        assertThat(testTransaction.getTransactionNumber()).isEqualTo(UPDATED_TRANSACTION_NUMBER);
        assertThat(testTransaction.getApplicationDate()).isEqualTo(UPDATED_APPLICATION_DATE);
        assertThat(testTransaction.getTransactionStartDate()).isEqualTo(UPDATED_TRANSACTION_START_DATE);
        assertThat(testTransaction.getComments()).isEqualTo(UPDATED_COMMENTS);
        assertThat(testTransaction.getCreateDate()).isEqualTo(UPDATED_CREATE_DATE);
        assertThat(testTransaction.getStartDate()).isEqualTo(UPDATED_START_DATE);
        assertThat(testTransaction.getCompleteDate()).isEqualTo(UPDATED_COMPLETE_DATE);
        assertThat(testTransaction.getBatchId()).isEqualTo(UPDATED_BATCH_ID);

        // Validate the Transaction in Elasticsearch
        verify(mockTransactionSearchRepository, times(1)).save(testTransaction);
    }

    @Test
    @Transactional
    public void updateNonExistingTransaction() throws Exception {
        int databaseSizeBeforeUpdate = transactionRepository.findAll().size();

        // Create the Transaction

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTransactionMockMvc.perform(put("/api/transactions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transaction)))
            .andExpect(status().isBadRequest());

        // Validate the Transaction in the database
        List<Transaction> transactionList = transactionRepository.findAll();
        assertThat(transactionList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Transaction in Elasticsearch
        verify(mockTransactionSearchRepository, times(0)).save(transaction);
    }

    @Test
    @Transactional
    public void deleteTransaction() throws Exception {
        // Initialize the database
        transactionRepository.saveAndFlush(transaction);

        int databaseSizeBeforeDelete = transactionRepository.findAll().size();

        // Delete the transaction
        restTransactionMockMvc.perform(delete("/api/transactions/{id}", transaction.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Transaction> transactionList = transactionRepository.findAll();
        assertThat(transactionList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Transaction in Elasticsearch
        verify(mockTransactionSearchRepository, times(1)).deleteById(transaction.getId());
    }

    @Test
    @Transactional
    public void searchTransaction() throws Exception {
        // Initialize the database
        transactionRepository.saveAndFlush(transaction);
        when(mockTransactionSearchRepository.search(queryStringQuery("id:" + transaction.getId())))
            .thenReturn(Collections.singletonList(transaction));
        // Search the transaction
        restTransactionMockMvc.perform(get("/api/_search/transactions?query=id:" + transaction.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(transaction.getId().intValue())))
            .andExpect(jsonPath("$.[*].transactionNumber").value(hasItem(DEFAULT_TRANSACTION_NUMBER)))
            .andExpect(jsonPath("$.[*].applicationDate").value(hasItem(DEFAULT_APPLICATION_DATE.toString())))
            .andExpect(jsonPath("$.[*].transactionStartDate").value(hasItem(DEFAULT_TRANSACTION_START_DATE.toString())))
            .andExpect(jsonPath("$.[*].comments").value(hasItem(DEFAULT_COMMENTS)))
            .andExpect(jsonPath("$.[*].createDate").value(hasItem(DEFAULT_CREATE_DATE.toString())))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(DEFAULT_START_DATE.toString())))
            .andExpect(jsonPath("$.[*].completeDate").value(hasItem(DEFAULT_COMPLETE_DATE.toString())))
            .andExpect(jsonPath("$.[*].batchId").value(hasItem(DEFAULT_BATCH_ID)));
    }
}
