package com.lagos.egis.external.web.rest;

import com.lagos.egis.external.EgisexternalApp;
import com.lagos.egis.external.domain.DocumentRequest;
import com.lagos.egis.external.repository.DocumentRequestRepository;
import com.lagos.egis.external.repository.search.DocumentRequestSearchRepository;
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
 * Integration tests for the {@link DocumentRequestResource} REST controller.
 */
@SpringBootTest(classes = EgisexternalApp.class)
public class DocumentRequestResourceIT {

    private static final String DEFAULT_TRANSACTION_ID = "AAAAAAAAAA";
    private static final String UPDATED_TRANSACTION_ID = "BBBBBBBBBB";

    private static final String DEFAULT_DOCUMENT_ID = "AAAAAAAAAA";
    private static final String UPDATED_DOCUMENT_ID = "BBBBBBBBBB";

    private static final String DEFAULT_DOCUMENT_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_DOCUMENT_TYPE = "BBBBBBBBBB";

    private static final String DEFAULT_DOCUMENT_SUB_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_DOCUMENT_SUB_TYPE = "BBBBBBBBBB";

    private static final String DEFAULT_DOCUMENT_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_DOCUMENT_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_SURVEY_PLAN_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_SURVEY_PLAN_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_PROPERTY_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_PROPERTY_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_TITLE_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_TITLE_NUMBER = "BBBBBBBBBB";

    @Autowired
    private DocumentRequestRepository documentRequestRepository;

    /**
     * This repository is mocked in the com.lagos.egis.external.repository.search test package.
     *
     * @see com.lagos.egis.external.repository.search.DocumentRequestSearchRepositoryMockConfiguration
     */
    @Autowired
    private DocumentRequestSearchRepository mockDocumentRequestSearchRepository;

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

    private MockMvc restDocumentRequestMockMvc;

    private DocumentRequest documentRequest;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DocumentRequestResource documentRequestResource = new DocumentRequestResource(documentRequestRepository, mockDocumentRequestSearchRepository);
        this.restDocumentRequestMockMvc = MockMvcBuilders.standaloneSetup(documentRequestResource)
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
    public static DocumentRequest createEntity(EntityManager em) {
        DocumentRequest documentRequest = new DocumentRequest()
            .transactionId(DEFAULT_TRANSACTION_ID)
            .documentId(DEFAULT_DOCUMENT_ID)
            .documentType(DEFAULT_DOCUMENT_TYPE)
            .documentSubType(DEFAULT_DOCUMENT_SUB_TYPE)
            .documentNumber(DEFAULT_DOCUMENT_NUMBER)
            .surveyPlanNumber(DEFAULT_SURVEY_PLAN_NUMBER)
            .propertyDescription(DEFAULT_PROPERTY_DESCRIPTION)
            .titleNumber(DEFAULT_TITLE_NUMBER);
        return documentRequest;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DocumentRequest createUpdatedEntity(EntityManager em) {
        DocumentRequest documentRequest = new DocumentRequest()
            .transactionId(UPDATED_TRANSACTION_ID)
            .documentId(UPDATED_DOCUMENT_ID)
            .documentType(UPDATED_DOCUMENT_TYPE)
            .documentSubType(UPDATED_DOCUMENT_SUB_TYPE)
            .documentNumber(UPDATED_DOCUMENT_NUMBER)
            .surveyPlanNumber(UPDATED_SURVEY_PLAN_NUMBER)
            .propertyDescription(UPDATED_PROPERTY_DESCRIPTION)
            .titleNumber(UPDATED_TITLE_NUMBER);
        return documentRequest;
    }

    @BeforeEach
    public void initTest() {
        documentRequest = createEntity(em);
    }

    @Test
    @Transactional
    public void createDocumentRequest() throws Exception {
        int databaseSizeBeforeCreate = documentRequestRepository.findAll().size();

        // Create the DocumentRequest
        restDocumentRequestMockMvc.perform(post("/api/document-requests")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(documentRequest)))
            .andExpect(status().isCreated());

        // Validate the DocumentRequest in the database
        List<DocumentRequest> documentRequestList = documentRequestRepository.findAll();
        assertThat(documentRequestList).hasSize(databaseSizeBeforeCreate + 1);
        DocumentRequest testDocumentRequest = documentRequestList.get(documentRequestList.size() - 1);
        assertThat(testDocumentRequest.getTransactionId()).isEqualTo(DEFAULT_TRANSACTION_ID);
        assertThat(testDocumentRequest.getDocumentId()).isEqualTo(DEFAULT_DOCUMENT_ID);
        assertThat(testDocumentRequest.getDocumentType()).isEqualTo(DEFAULT_DOCUMENT_TYPE);
        assertThat(testDocumentRequest.getDocumentSubType()).isEqualTo(DEFAULT_DOCUMENT_SUB_TYPE);
        assertThat(testDocumentRequest.getDocumentNumber()).isEqualTo(DEFAULT_DOCUMENT_NUMBER);
        assertThat(testDocumentRequest.getSurveyPlanNumber()).isEqualTo(DEFAULT_SURVEY_PLAN_NUMBER);
        assertThat(testDocumentRequest.getPropertyDescription()).isEqualTo(DEFAULT_PROPERTY_DESCRIPTION);
        assertThat(testDocumentRequest.getTitleNumber()).isEqualTo(DEFAULT_TITLE_NUMBER);

        // Validate the DocumentRequest in Elasticsearch
        verify(mockDocumentRequestSearchRepository, times(1)).save(testDocumentRequest);
    }

    @Test
    @Transactional
    public void createDocumentRequestWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = documentRequestRepository.findAll().size();

        // Create the DocumentRequest with an existing ID
        documentRequest.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDocumentRequestMockMvc.perform(post("/api/document-requests")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(documentRequest)))
            .andExpect(status().isBadRequest());

        // Validate the DocumentRequest in the database
        List<DocumentRequest> documentRequestList = documentRequestRepository.findAll();
        assertThat(documentRequestList).hasSize(databaseSizeBeforeCreate);

        // Validate the DocumentRequest in Elasticsearch
        verify(mockDocumentRequestSearchRepository, times(0)).save(documentRequest);
    }


    @Test
    @Transactional
    public void getAllDocumentRequests() throws Exception {
        // Initialize the database
        documentRequestRepository.saveAndFlush(documentRequest);

        // Get all the documentRequestList
        restDocumentRequestMockMvc.perform(get("/api/document-requests?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(documentRequest.getId().intValue())))
            .andExpect(jsonPath("$.[*].transactionId").value(hasItem(DEFAULT_TRANSACTION_ID)))
            .andExpect(jsonPath("$.[*].documentId").value(hasItem(DEFAULT_DOCUMENT_ID)))
            .andExpect(jsonPath("$.[*].documentType").value(hasItem(DEFAULT_DOCUMENT_TYPE)))
            .andExpect(jsonPath("$.[*].documentSubType").value(hasItem(DEFAULT_DOCUMENT_SUB_TYPE)))
            .andExpect(jsonPath("$.[*].documentNumber").value(hasItem(DEFAULT_DOCUMENT_NUMBER)))
            .andExpect(jsonPath("$.[*].surveyPlanNumber").value(hasItem(DEFAULT_SURVEY_PLAN_NUMBER)))
            .andExpect(jsonPath("$.[*].propertyDescription").value(hasItem(DEFAULT_PROPERTY_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].titleNumber").value(hasItem(DEFAULT_TITLE_NUMBER)));
    }
    
    @Test
    @Transactional
    public void getDocumentRequest() throws Exception {
        // Initialize the database
        documentRequestRepository.saveAndFlush(documentRequest);

        // Get the documentRequest
        restDocumentRequestMockMvc.perform(get("/api/document-requests/{id}", documentRequest.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(documentRequest.getId().intValue()))
            .andExpect(jsonPath("$.transactionId").value(DEFAULT_TRANSACTION_ID))
            .andExpect(jsonPath("$.documentId").value(DEFAULT_DOCUMENT_ID))
            .andExpect(jsonPath("$.documentType").value(DEFAULT_DOCUMENT_TYPE))
            .andExpect(jsonPath("$.documentSubType").value(DEFAULT_DOCUMENT_SUB_TYPE))
            .andExpect(jsonPath("$.documentNumber").value(DEFAULT_DOCUMENT_NUMBER))
            .andExpect(jsonPath("$.surveyPlanNumber").value(DEFAULT_SURVEY_PLAN_NUMBER))
            .andExpect(jsonPath("$.propertyDescription").value(DEFAULT_PROPERTY_DESCRIPTION))
            .andExpect(jsonPath("$.titleNumber").value(DEFAULT_TITLE_NUMBER));
    }

    @Test
    @Transactional
    public void getNonExistingDocumentRequest() throws Exception {
        // Get the documentRequest
        restDocumentRequestMockMvc.perform(get("/api/document-requests/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDocumentRequest() throws Exception {
        // Initialize the database
        documentRequestRepository.saveAndFlush(documentRequest);

        int databaseSizeBeforeUpdate = documentRequestRepository.findAll().size();

        // Update the documentRequest
        DocumentRequest updatedDocumentRequest = documentRequestRepository.findById(documentRequest.getId()).get();
        // Disconnect from session so that the updates on updatedDocumentRequest are not directly saved in db
        em.detach(updatedDocumentRequest);
        updatedDocumentRequest
            .transactionId(UPDATED_TRANSACTION_ID)
            .documentId(UPDATED_DOCUMENT_ID)
            .documentType(UPDATED_DOCUMENT_TYPE)
            .documentSubType(UPDATED_DOCUMENT_SUB_TYPE)
            .documentNumber(UPDATED_DOCUMENT_NUMBER)
            .surveyPlanNumber(UPDATED_SURVEY_PLAN_NUMBER)
            .propertyDescription(UPDATED_PROPERTY_DESCRIPTION)
            .titleNumber(UPDATED_TITLE_NUMBER);

        restDocumentRequestMockMvc.perform(put("/api/document-requests")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDocumentRequest)))
            .andExpect(status().isOk());

        // Validate the DocumentRequest in the database
        List<DocumentRequest> documentRequestList = documentRequestRepository.findAll();
        assertThat(documentRequestList).hasSize(databaseSizeBeforeUpdate);
        DocumentRequest testDocumentRequest = documentRequestList.get(documentRequestList.size() - 1);
        assertThat(testDocumentRequest.getTransactionId()).isEqualTo(UPDATED_TRANSACTION_ID);
        assertThat(testDocumentRequest.getDocumentId()).isEqualTo(UPDATED_DOCUMENT_ID);
        assertThat(testDocumentRequest.getDocumentType()).isEqualTo(UPDATED_DOCUMENT_TYPE);
        assertThat(testDocumentRequest.getDocumentSubType()).isEqualTo(UPDATED_DOCUMENT_SUB_TYPE);
        assertThat(testDocumentRequest.getDocumentNumber()).isEqualTo(UPDATED_DOCUMENT_NUMBER);
        assertThat(testDocumentRequest.getSurveyPlanNumber()).isEqualTo(UPDATED_SURVEY_PLAN_NUMBER);
        assertThat(testDocumentRequest.getPropertyDescription()).isEqualTo(UPDATED_PROPERTY_DESCRIPTION);
        assertThat(testDocumentRequest.getTitleNumber()).isEqualTo(UPDATED_TITLE_NUMBER);

        // Validate the DocumentRequest in Elasticsearch
        verify(mockDocumentRequestSearchRepository, times(1)).save(testDocumentRequest);
    }

    @Test
    @Transactional
    public void updateNonExistingDocumentRequest() throws Exception {
        int databaseSizeBeforeUpdate = documentRequestRepository.findAll().size();

        // Create the DocumentRequest

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDocumentRequestMockMvc.perform(put("/api/document-requests")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(documentRequest)))
            .andExpect(status().isBadRequest());

        // Validate the DocumentRequest in the database
        List<DocumentRequest> documentRequestList = documentRequestRepository.findAll();
        assertThat(documentRequestList).hasSize(databaseSizeBeforeUpdate);

        // Validate the DocumentRequest in Elasticsearch
        verify(mockDocumentRequestSearchRepository, times(0)).save(documentRequest);
    }

    @Test
    @Transactional
    public void deleteDocumentRequest() throws Exception {
        // Initialize the database
        documentRequestRepository.saveAndFlush(documentRequest);

        int databaseSizeBeforeDelete = documentRequestRepository.findAll().size();

        // Delete the documentRequest
        restDocumentRequestMockMvc.perform(delete("/api/document-requests/{id}", documentRequest.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<DocumentRequest> documentRequestList = documentRequestRepository.findAll();
        assertThat(documentRequestList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the DocumentRequest in Elasticsearch
        verify(mockDocumentRequestSearchRepository, times(1)).deleteById(documentRequest.getId());
    }

    @Test
    @Transactional
    public void searchDocumentRequest() throws Exception {
        // Initialize the database
        documentRequestRepository.saveAndFlush(documentRequest);
        when(mockDocumentRequestSearchRepository.search(queryStringQuery("id:" + documentRequest.getId())))
            .thenReturn(Collections.singletonList(documentRequest));
        // Search the documentRequest
        restDocumentRequestMockMvc.perform(get("/api/_search/document-requests?query=id:" + documentRequest.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(documentRequest.getId().intValue())))
            .andExpect(jsonPath("$.[*].transactionId").value(hasItem(DEFAULT_TRANSACTION_ID)))
            .andExpect(jsonPath("$.[*].documentId").value(hasItem(DEFAULT_DOCUMENT_ID)))
            .andExpect(jsonPath("$.[*].documentType").value(hasItem(DEFAULT_DOCUMENT_TYPE)))
            .andExpect(jsonPath("$.[*].documentSubType").value(hasItem(DEFAULT_DOCUMENT_SUB_TYPE)))
            .andExpect(jsonPath("$.[*].documentNumber").value(hasItem(DEFAULT_DOCUMENT_NUMBER)))
            .andExpect(jsonPath("$.[*].surveyPlanNumber").value(hasItem(DEFAULT_SURVEY_PLAN_NUMBER)))
            .andExpect(jsonPath("$.[*].propertyDescription").value(hasItem(DEFAULT_PROPERTY_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].titleNumber").value(hasItem(DEFAULT_TITLE_NUMBER)));
    }
}
