package com.lagos.egis.external.web.rest;

import com.lagos.egis.external.EgisexternalApp;
import com.lagos.egis.external.domain.Batch;
import com.lagos.egis.external.repository.BatchRepository;
import com.lagos.egis.external.repository.search.BatchSearchRepository;
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
 * Integration tests for the {@link BatchResource} REST controller.
 */
@SpringBootTest(classes = EgisexternalApp.class)
public class BatchResourceIT {

    private static final Integer DEFAULT_BATCH_NUMBER = 1;
    private static final Integer UPDATED_BATCH_NUMBER = 2;

    private static final Integer DEFAULT_BATCH_STATUS = 1;
    private static final Integer UPDATED_BATCH_STATUS = 2;

    private static final String DEFAULT_INVOICE_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_INVOICE_NUMBER = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_CREATE_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_CREATE_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_DELIVERY_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DELIVERY_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final Integer DEFAULT_OFFICE_ID = 1;
    private static final Integer UPDATED_OFFICE_ID = 2;

    @Autowired
    private BatchRepository batchRepository;

    @Mock
    private BatchRepository batchRepositoryMock;

    /**
     * This repository is mocked in the com.lagos.egis.external.repository.search test package.
     *
     * @see com.lagos.egis.external.repository.search.BatchSearchRepositoryMockConfiguration
     */
    @Autowired
    private BatchSearchRepository mockBatchSearchRepository;

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

    private MockMvc restBatchMockMvc;

    private Batch batch;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BatchResource batchResource = new BatchResource(batchRepository, mockBatchSearchRepository);
        this.restBatchMockMvc = MockMvcBuilders.standaloneSetup(batchResource)
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
    public static Batch createEntity(EntityManager em) {
        Batch batch = new Batch()
            .batchNumber(DEFAULT_BATCH_NUMBER)
            .batchStatus(DEFAULT_BATCH_STATUS)
            .invoiceNumber(DEFAULT_INVOICE_NUMBER)
            .createDate(DEFAULT_CREATE_DATE)
            .deliveryDate(DEFAULT_DELIVERY_DATE)
            .officeId(DEFAULT_OFFICE_ID);
        return batch;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Batch createUpdatedEntity(EntityManager em) {
        Batch batch = new Batch()
            .batchNumber(UPDATED_BATCH_NUMBER)
            .batchStatus(UPDATED_BATCH_STATUS)
            .invoiceNumber(UPDATED_INVOICE_NUMBER)
            .createDate(UPDATED_CREATE_DATE)
            .deliveryDate(UPDATED_DELIVERY_DATE)
            .officeId(UPDATED_OFFICE_ID);
        return batch;
    }

    @BeforeEach
    public void initTest() {
        batch = createEntity(em);
    }

    @Test
    @Transactional
    public void createBatch() throws Exception {
        int databaseSizeBeforeCreate = batchRepository.findAll().size();

        // Create the Batch
        restBatchMockMvc.perform(post("/api/batches")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(batch)))
            .andExpect(status().isCreated());

        // Validate the Batch in the database
        List<Batch> batchList = batchRepository.findAll();
        assertThat(batchList).hasSize(databaseSizeBeforeCreate + 1);
        Batch testBatch = batchList.get(batchList.size() - 1);
        assertThat(testBatch.getBatchNumber()).isEqualTo(DEFAULT_BATCH_NUMBER);
        assertThat(testBatch.getBatchStatus()).isEqualTo(DEFAULT_BATCH_STATUS);
        assertThat(testBatch.getInvoiceNumber()).isEqualTo(DEFAULT_INVOICE_NUMBER);
        assertThat(testBatch.getCreateDate()).isEqualTo(DEFAULT_CREATE_DATE);
        assertThat(testBatch.getDeliveryDate()).isEqualTo(DEFAULT_DELIVERY_DATE);
        assertThat(testBatch.getOfficeId()).isEqualTo(DEFAULT_OFFICE_ID);

        // Validate the Batch in Elasticsearch
        verify(mockBatchSearchRepository, times(1)).save(testBatch);
    }

    @Test
    @Transactional
    public void createBatchWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = batchRepository.findAll().size();

        // Create the Batch with an existing ID
        batch.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBatchMockMvc.perform(post("/api/batches")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(batch)))
            .andExpect(status().isBadRequest());

        // Validate the Batch in the database
        List<Batch> batchList = batchRepository.findAll();
        assertThat(batchList).hasSize(databaseSizeBeforeCreate);

        // Validate the Batch in Elasticsearch
        verify(mockBatchSearchRepository, times(0)).save(batch);
    }


    @Test
    @Transactional
    public void getAllBatches() throws Exception {
        // Initialize the database
        batchRepository.saveAndFlush(batch);

        // Get all the batchList
        restBatchMockMvc.perform(get("/api/batches?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(batch.getId().intValue())))
            .andExpect(jsonPath("$.[*].batchNumber").value(hasItem(DEFAULT_BATCH_NUMBER)))
            .andExpect(jsonPath("$.[*].batchStatus").value(hasItem(DEFAULT_BATCH_STATUS)))
            .andExpect(jsonPath("$.[*].invoiceNumber").value(hasItem(DEFAULT_INVOICE_NUMBER)))
            .andExpect(jsonPath("$.[*].createDate").value(hasItem(DEFAULT_CREATE_DATE.toString())))
            .andExpect(jsonPath("$.[*].deliveryDate").value(hasItem(DEFAULT_DELIVERY_DATE.toString())))
            .andExpect(jsonPath("$.[*].officeId").value(hasItem(DEFAULT_OFFICE_ID)));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllBatchesWithEagerRelationshipsIsEnabled() throws Exception {
        BatchResource batchResource = new BatchResource(batchRepositoryMock, mockBatchSearchRepository);
        when(batchRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restBatchMockMvc = MockMvcBuilders.standaloneSetup(batchResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restBatchMockMvc.perform(get("/api/batches?eagerload=true"))
        .andExpect(status().isOk());

        verify(batchRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllBatchesWithEagerRelationshipsIsNotEnabled() throws Exception {
        BatchResource batchResource = new BatchResource(batchRepositoryMock, mockBatchSearchRepository);
            when(batchRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restBatchMockMvc = MockMvcBuilders.standaloneSetup(batchResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restBatchMockMvc.perform(get("/api/batches?eagerload=true"))
        .andExpect(status().isOk());

            verify(batchRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getBatch() throws Exception {
        // Initialize the database
        batchRepository.saveAndFlush(batch);

        // Get the batch
        restBatchMockMvc.perform(get("/api/batches/{id}", batch.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(batch.getId().intValue()))
            .andExpect(jsonPath("$.batchNumber").value(DEFAULT_BATCH_NUMBER))
            .andExpect(jsonPath("$.batchStatus").value(DEFAULT_BATCH_STATUS))
            .andExpect(jsonPath("$.invoiceNumber").value(DEFAULT_INVOICE_NUMBER))
            .andExpect(jsonPath("$.createDate").value(DEFAULT_CREATE_DATE.toString()))
            .andExpect(jsonPath("$.deliveryDate").value(DEFAULT_DELIVERY_DATE.toString()))
            .andExpect(jsonPath("$.officeId").value(DEFAULT_OFFICE_ID));
    }

    @Test
    @Transactional
    public void getNonExistingBatch() throws Exception {
        // Get the batch
        restBatchMockMvc.perform(get("/api/batches/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBatch() throws Exception {
        // Initialize the database
        batchRepository.saveAndFlush(batch);

        int databaseSizeBeforeUpdate = batchRepository.findAll().size();

        // Update the batch
        Batch updatedBatch = batchRepository.findById(batch.getId()).get();
        // Disconnect from session so that the updates on updatedBatch are not directly saved in db
        em.detach(updatedBatch);
        updatedBatch
            .batchNumber(UPDATED_BATCH_NUMBER)
            .batchStatus(UPDATED_BATCH_STATUS)
            .invoiceNumber(UPDATED_INVOICE_NUMBER)
            .createDate(UPDATED_CREATE_DATE)
            .deliveryDate(UPDATED_DELIVERY_DATE)
            .officeId(UPDATED_OFFICE_ID);

        restBatchMockMvc.perform(put("/api/batches")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedBatch)))
            .andExpect(status().isOk());

        // Validate the Batch in the database
        List<Batch> batchList = batchRepository.findAll();
        assertThat(batchList).hasSize(databaseSizeBeforeUpdate);
        Batch testBatch = batchList.get(batchList.size() - 1);
        assertThat(testBatch.getBatchNumber()).isEqualTo(UPDATED_BATCH_NUMBER);
        assertThat(testBatch.getBatchStatus()).isEqualTo(UPDATED_BATCH_STATUS);
        assertThat(testBatch.getInvoiceNumber()).isEqualTo(UPDATED_INVOICE_NUMBER);
        assertThat(testBatch.getCreateDate()).isEqualTo(UPDATED_CREATE_DATE);
        assertThat(testBatch.getDeliveryDate()).isEqualTo(UPDATED_DELIVERY_DATE);
        assertThat(testBatch.getOfficeId()).isEqualTo(UPDATED_OFFICE_ID);

        // Validate the Batch in Elasticsearch
        verify(mockBatchSearchRepository, times(1)).save(testBatch);
    }

    @Test
    @Transactional
    public void updateNonExistingBatch() throws Exception {
        int databaseSizeBeforeUpdate = batchRepository.findAll().size();

        // Create the Batch

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBatchMockMvc.perform(put("/api/batches")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(batch)))
            .andExpect(status().isBadRequest());

        // Validate the Batch in the database
        List<Batch> batchList = batchRepository.findAll();
        assertThat(batchList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Batch in Elasticsearch
        verify(mockBatchSearchRepository, times(0)).save(batch);
    }

    @Test
    @Transactional
    public void deleteBatch() throws Exception {
        // Initialize the database
        batchRepository.saveAndFlush(batch);

        int databaseSizeBeforeDelete = batchRepository.findAll().size();

        // Delete the batch
        restBatchMockMvc.perform(delete("/api/batches/{id}", batch.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Batch> batchList = batchRepository.findAll();
        assertThat(batchList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Batch in Elasticsearch
        verify(mockBatchSearchRepository, times(1)).deleteById(batch.getId());
    }

    @Test
    @Transactional
    public void searchBatch() throws Exception {
        // Initialize the database
        batchRepository.saveAndFlush(batch);
        when(mockBatchSearchRepository.search(queryStringQuery("id:" + batch.getId())))
            .thenReturn(Collections.singletonList(batch));
        // Search the batch
        restBatchMockMvc.perform(get("/api/_search/batches?query=id:" + batch.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(batch.getId().intValue())))
            .andExpect(jsonPath("$.[*].batchNumber").value(hasItem(DEFAULT_BATCH_NUMBER)))
            .andExpect(jsonPath("$.[*].batchStatus").value(hasItem(DEFAULT_BATCH_STATUS)))
            .andExpect(jsonPath("$.[*].invoiceNumber").value(hasItem(DEFAULT_INVOICE_NUMBER)))
            .andExpect(jsonPath("$.[*].createDate").value(hasItem(DEFAULT_CREATE_DATE.toString())))
            .andExpect(jsonPath("$.[*].deliveryDate").value(hasItem(DEFAULT_DELIVERY_DATE.toString())))
            .andExpect(jsonPath("$.[*].officeId").value(hasItem(DEFAULT_OFFICE_ID)));
    }
}
