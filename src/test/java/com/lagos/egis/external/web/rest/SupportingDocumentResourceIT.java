package com.lagos.egis.external.web.rest;

import com.lagos.egis.external.EgisexternalApp;
import com.lagos.egis.external.domain.SupportingDocument;
import com.lagos.egis.external.repository.SupportingDocumentRepository;
import com.lagos.egis.external.repository.search.SupportingDocumentSearchRepository;
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
import java.time.LocalDate;
import java.time.ZoneId;
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
 * Integration tests for the {@link SupportingDocumentResource} REST controller.
 */
@SpringBootTest(classes = EgisexternalApp.class)
public class SupportingDocumentResourceIT {

    private static final String DEFAULT_DOCUMENT_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_DOCUMENT_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_OWNERSHIP_AREA = "AAAAAAAAAA";
    private static final String UPDATED_OWNERSHIP_AREA = "BBBBBBBBBB";

    private static final Integer DEFAULT_PAGE_COUNT = 1;
    private static final Integer UPDATED_PAGE_COUNT = 2;

    private static final Integer DEFAULT_STATUS = 1;
    private static final Integer UPDATED_STATUS = 2;

    private static final String DEFAULT_PROVIDED = "AAAAAAAAAA";
    private static final String UPDATED_PROVIDED = "BBBBBBBBBB";

    private static final Integer DEFAULT_TYPE = 1;
    private static final Integer UPDATED_TYPE = 2;

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Integer DEFAULT_FILE_SIZE = 1;
    private static final Integer UPDATED_FILE_SIZE = 2;

    private static final String DEFAULT_CONTENT = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT = "BBBBBBBBBB";

    private static final String DEFAULT_CONTENT_URL = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT_URL = "BBBBBBBBBB";

    private static final String DEFAULT_IMAGE = "AAAAAAAAAA";
    private static final String UPDATED_IMAGE = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private SupportingDocumentRepository supportingDocumentRepository;

    /**
     * This repository is mocked in the com.lagos.egis.external.repository.search test package.
     *
     * @see com.lagos.egis.external.repository.search.SupportingDocumentSearchRepositoryMockConfiguration
     */
    @Autowired
    private SupportingDocumentSearchRepository mockSupportingDocumentSearchRepository;

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

    private MockMvc restSupportingDocumentMockMvc;

    private SupportingDocument supportingDocument;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SupportingDocumentResource supportingDocumentResource = new SupportingDocumentResource(supportingDocumentRepository, mockSupportingDocumentSearchRepository);
        this.restSupportingDocumentMockMvc = MockMvcBuilders.standaloneSetup(supportingDocumentResource)
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
    public static SupportingDocument createEntity(EntityManager em) {
        SupportingDocument supportingDocument = new SupportingDocument()
            .documentNumber(DEFAULT_DOCUMENT_NUMBER)
            .ownershipArea(DEFAULT_OWNERSHIP_AREA)
            .pageCount(DEFAULT_PAGE_COUNT)
            .status(DEFAULT_STATUS)
            .provided(DEFAULT_PROVIDED)
            .type(DEFAULT_TYPE)
            .name(DEFAULT_NAME)
            .fileSize(DEFAULT_FILE_SIZE)
            .content(DEFAULT_CONTENT)
            .contentUrl(DEFAULT_CONTENT_URL)
            .image(DEFAULT_IMAGE)
            .date(DEFAULT_DATE);
        return supportingDocument;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SupportingDocument createUpdatedEntity(EntityManager em) {
        SupportingDocument supportingDocument = new SupportingDocument()
            .documentNumber(UPDATED_DOCUMENT_NUMBER)
            .ownershipArea(UPDATED_OWNERSHIP_AREA)
            .pageCount(UPDATED_PAGE_COUNT)
            .status(UPDATED_STATUS)
            .provided(UPDATED_PROVIDED)
            .type(UPDATED_TYPE)
            .name(UPDATED_NAME)
            .fileSize(UPDATED_FILE_SIZE)
            .content(UPDATED_CONTENT)
            .contentUrl(UPDATED_CONTENT_URL)
            .image(UPDATED_IMAGE)
            .date(UPDATED_DATE);
        return supportingDocument;
    }

    @BeforeEach
    public void initTest() {
        supportingDocument = createEntity(em);
    }

    @Test
    @Transactional
    public void createSupportingDocument() throws Exception {
        int databaseSizeBeforeCreate = supportingDocumentRepository.findAll().size();

        // Create the SupportingDocument
        restSupportingDocumentMockMvc.perform(post("/api/supporting-documents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(supportingDocument)))
            .andExpect(status().isCreated());

        // Validate the SupportingDocument in the database
        List<SupportingDocument> supportingDocumentList = supportingDocumentRepository.findAll();
        assertThat(supportingDocumentList).hasSize(databaseSizeBeforeCreate + 1);
        SupportingDocument testSupportingDocument = supportingDocumentList.get(supportingDocumentList.size() - 1);
        assertThat(testSupportingDocument.getDocumentNumber()).isEqualTo(DEFAULT_DOCUMENT_NUMBER);
        assertThat(testSupportingDocument.getOwnershipArea()).isEqualTo(DEFAULT_OWNERSHIP_AREA);
        assertThat(testSupportingDocument.getPageCount()).isEqualTo(DEFAULT_PAGE_COUNT);
        assertThat(testSupportingDocument.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testSupportingDocument.getProvided()).isEqualTo(DEFAULT_PROVIDED);
        assertThat(testSupportingDocument.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testSupportingDocument.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testSupportingDocument.getFileSize()).isEqualTo(DEFAULT_FILE_SIZE);
        assertThat(testSupportingDocument.getContent()).isEqualTo(DEFAULT_CONTENT);
        assertThat(testSupportingDocument.getContentUrl()).isEqualTo(DEFAULT_CONTENT_URL);
        assertThat(testSupportingDocument.getImage()).isEqualTo(DEFAULT_IMAGE);
        assertThat(testSupportingDocument.getDate()).isEqualTo(DEFAULT_DATE);

        // Validate the SupportingDocument in Elasticsearch
        verify(mockSupportingDocumentSearchRepository, times(1)).save(testSupportingDocument);
    }

    @Test
    @Transactional
    public void createSupportingDocumentWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = supportingDocumentRepository.findAll().size();

        // Create the SupportingDocument with an existing ID
        supportingDocument.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSupportingDocumentMockMvc.perform(post("/api/supporting-documents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(supportingDocument)))
            .andExpect(status().isBadRequest());

        // Validate the SupportingDocument in the database
        List<SupportingDocument> supportingDocumentList = supportingDocumentRepository.findAll();
        assertThat(supportingDocumentList).hasSize(databaseSizeBeforeCreate);

        // Validate the SupportingDocument in Elasticsearch
        verify(mockSupportingDocumentSearchRepository, times(0)).save(supportingDocument);
    }


    @Test
    @Transactional
    public void getAllSupportingDocuments() throws Exception {
        // Initialize the database
        supportingDocumentRepository.saveAndFlush(supportingDocument);

        // Get all the supportingDocumentList
        restSupportingDocumentMockMvc.perform(get("/api/supporting-documents?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(supportingDocument.getId().intValue())))
            .andExpect(jsonPath("$.[*].documentNumber").value(hasItem(DEFAULT_DOCUMENT_NUMBER)))
            .andExpect(jsonPath("$.[*].ownershipArea").value(hasItem(DEFAULT_OWNERSHIP_AREA)))
            .andExpect(jsonPath("$.[*].pageCount").value(hasItem(DEFAULT_PAGE_COUNT)))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS)))
            .andExpect(jsonPath("$.[*].provided").value(hasItem(DEFAULT_PROVIDED)))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE)))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].fileSize").value(hasItem(DEFAULT_FILE_SIZE)))
            .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT)))
            .andExpect(jsonPath("$.[*].contentUrl").value(hasItem(DEFAULT_CONTENT_URL)))
            .andExpect(jsonPath("$.[*].image").value(hasItem(DEFAULT_IMAGE)))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getSupportingDocument() throws Exception {
        // Initialize the database
        supportingDocumentRepository.saveAndFlush(supportingDocument);

        // Get the supportingDocument
        restSupportingDocumentMockMvc.perform(get("/api/supporting-documents/{id}", supportingDocument.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(supportingDocument.getId().intValue()))
            .andExpect(jsonPath("$.documentNumber").value(DEFAULT_DOCUMENT_NUMBER))
            .andExpect(jsonPath("$.ownershipArea").value(DEFAULT_OWNERSHIP_AREA))
            .andExpect(jsonPath("$.pageCount").value(DEFAULT_PAGE_COUNT))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS))
            .andExpect(jsonPath("$.provided").value(DEFAULT_PROVIDED))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.fileSize").value(DEFAULT_FILE_SIZE))
            .andExpect(jsonPath("$.content").value(DEFAULT_CONTENT))
            .andExpect(jsonPath("$.contentUrl").value(DEFAULT_CONTENT_URL))
            .andExpect(jsonPath("$.image").value(DEFAULT_IMAGE))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSupportingDocument() throws Exception {
        // Get the supportingDocument
        restSupportingDocumentMockMvc.perform(get("/api/supporting-documents/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSupportingDocument() throws Exception {
        // Initialize the database
        supportingDocumentRepository.saveAndFlush(supportingDocument);

        int databaseSizeBeforeUpdate = supportingDocumentRepository.findAll().size();

        // Update the supportingDocument
        SupportingDocument updatedSupportingDocument = supportingDocumentRepository.findById(supportingDocument.getId()).get();
        // Disconnect from session so that the updates on updatedSupportingDocument are not directly saved in db
        em.detach(updatedSupportingDocument);
        updatedSupportingDocument
            .documentNumber(UPDATED_DOCUMENT_NUMBER)
            .ownershipArea(UPDATED_OWNERSHIP_AREA)
            .pageCount(UPDATED_PAGE_COUNT)
            .status(UPDATED_STATUS)
            .provided(UPDATED_PROVIDED)
            .type(UPDATED_TYPE)
            .name(UPDATED_NAME)
            .fileSize(UPDATED_FILE_SIZE)
            .content(UPDATED_CONTENT)
            .contentUrl(UPDATED_CONTENT_URL)
            .image(UPDATED_IMAGE)
            .date(UPDATED_DATE);

        restSupportingDocumentMockMvc.perform(put("/api/supporting-documents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSupportingDocument)))
            .andExpect(status().isOk());

        // Validate the SupportingDocument in the database
        List<SupportingDocument> supportingDocumentList = supportingDocumentRepository.findAll();
        assertThat(supportingDocumentList).hasSize(databaseSizeBeforeUpdate);
        SupportingDocument testSupportingDocument = supportingDocumentList.get(supportingDocumentList.size() - 1);
        assertThat(testSupportingDocument.getDocumentNumber()).isEqualTo(UPDATED_DOCUMENT_NUMBER);
        assertThat(testSupportingDocument.getOwnershipArea()).isEqualTo(UPDATED_OWNERSHIP_AREA);
        assertThat(testSupportingDocument.getPageCount()).isEqualTo(UPDATED_PAGE_COUNT);
        assertThat(testSupportingDocument.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testSupportingDocument.getProvided()).isEqualTo(UPDATED_PROVIDED);
        assertThat(testSupportingDocument.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testSupportingDocument.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testSupportingDocument.getFileSize()).isEqualTo(UPDATED_FILE_SIZE);
        assertThat(testSupportingDocument.getContent()).isEqualTo(UPDATED_CONTENT);
        assertThat(testSupportingDocument.getContentUrl()).isEqualTo(UPDATED_CONTENT_URL);
        assertThat(testSupportingDocument.getImage()).isEqualTo(UPDATED_IMAGE);
        assertThat(testSupportingDocument.getDate()).isEqualTo(UPDATED_DATE);

        // Validate the SupportingDocument in Elasticsearch
        verify(mockSupportingDocumentSearchRepository, times(1)).save(testSupportingDocument);
    }

    @Test
    @Transactional
    public void updateNonExistingSupportingDocument() throws Exception {
        int databaseSizeBeforeUpdate = supportingDocumentRepository.findAll().size();

        // Create the SupportingDocument

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSupportingDocumentMockMvc.perform(put("/api/supporting-documents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(supportingDocument)))
            .andExpect(status().isBadRequest());

        // Validate the SupportingDocument in the database
        List<SupportingDocument> supportingDocumentList = supportingDocumentRepository.findAll();
        assertThat(supportingDocumentList).hasSize(databaseSizeBeforeUpdate);

        // Validate the SupportingDocument in Elasticsearch
        verify(mockSupportingDocumentSearchRepository, times(0)).save(supportingDocument);
    }

    @Test
    @Transactional
    public void deleteSupportingDocument() throws Exception {
        // Initialize the database
        supportingDocumentRepository.saveAndFlush(supportingDocument);

        int databaseSizeBeforeDelete = supportingDocumentRepository.findAll().size();

        // Delete the supportingDocument
        restSupportingDocumentMockMvc.perform(delete("/api/supporting-documents/{id}", supportingDocument.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<SupportingDocument> supportingDocumentList = supportingDocumentRepository.findAll();
        assertThat(supportingDocumentList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the SupportingDocument in Elasticsearch
        verify(mockSupportingDocumentSearchRepository, times(1)).deleteById(supportingDocument.getId());
    }

    @Test
    @Transactional
    public void searchSupportingDocument() throws Exception {
        // Initialize the database
        supportingDocumentRepository.saveAndFlush(supportingDocument);
        when(mockSupportingDocumentSearchRepository.search(queryStringQuery("id:" + supportingDocument.getId())))
            .thenReturn(Collections.singletonList(supportingDocument));
        // Search the supportingDocument
        restSupportingDocumentMockMvc.perform(get("/api/_search/supporting-documents?query=id:" + supportingDocument.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(supportingDocument.getId().intValue())))
            .andExpect(jsonPath("$.[*].documentNumber").value(hasItem(DEFAULT_DOCUMENT_NUMBER)))
            .andExpect(jsonPath("$.[*].ownershipArea").value(hasItem(DEFAULT_OWNERSHIP_AREA)))
            .andExpect(jsonPath("$.[*].pageCount").value(hasItem(DEFAULT_PAGE_COUNT)))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS)))
            .andExpect(jsonPath("$.[*].provided").value(hasItem(DEFAULT_PROVIDED)))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE)))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].fileSize").value(hasItem(DEFAULT_FILE_SIZE)))
            .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT)))
            .andExpect(jsonPath("$.[*].contentUrl").value(hasItem(DEFAULT_CONTENT_URL)))
            .andExpect(jsonPath("$.[*].image").value(hasItem(DEFAULT_IMAGE)))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())));
    }
}
