package com.lagos.egis.external.web.rest;

import com.lagos.egis.external.EgisexternalApp;
import com.lagos.egis.external.domain.Surveyor;
import com.lagos.egis.external.repository.SurveyorRepository;
import com.lagos.egis.external.repository.search.SurveyorSearchRepository;
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
 * Integration tests for the {@link SurveyorResource} REST controller.
 */
@SpringBootTest(classes = EgisexternalApp.class)
public class SurveyorResourceIT {

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_SURCON_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_SURCON_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_REGISTRATION_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_REGISTRATION_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_PHONE = "AAAAAAAAAA";
    private static final String UPDATED_PHONE = "BBBBBBBBBB";

    private static final String DEFAULT_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_STATUS = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_REQUEST_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_REQUEST_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_PROCESSED_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_PROCESSED_DATE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private SurveyorRepository surveyorRepository;

    /**
     * This repository is mocked in the com.lagos.egis.external.repository.search test package.
     *
     * @see com.lagos.egis.external.repository.search.SurveyorSearchRepositoryMockConfiguration
     */
    @Autowired
    private SurveyorSearchRepository mockSurveyorSearchRepository;

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

    private MockMvc restSurveyorMockMvc;

    private Surveyor surveyor;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SurveyorResource surveyorResource = new SurveyorResource(surveyorRepository, mockSurveyorSearchRepository);
        this.restSurveyorMockMvc = MockMvcBuilders.standaloneSetup(surveyorResource)
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
    public static Surveyor createEntity(EntityManager em) {
        Surveyor surveyor = new Surveyor()
            .email(DEFAULT_EMAIL)
            .surconNumber(DEFAULT_SURCON_NUMBER)
            .registrationNumber(DEFAULT_REGISTRATION_NUMBER)
            .phone(DEFAULT_PHONE)
            .status(DEFAULT_STATUS)
            .requestDate(DEFAULT_REQUEST_DATE)
            .processedDate(DEFAULT_PROCESSED_DATE);
        return surveyor;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Surveyor createUpdatedEntity(EntityManager em) {
        Surveyor surveyor = new Surveyor()
            .email(UPDATED_EMAIL)
            .surconNumber(UPDATED_SURCON_NUMBER)
            .registrationNumber(UPDATED_REGISTRATION_NUMBER)
            .phone(UPDATED_PHONE)
            .status(UPDATED_STATUS)
            .requestDate(UPDATED_REQUEST_DATE)
            .processedDate(UPDATED_PROCESSED_DATE);
        return surveyor;
    }

    @BeforeEach
    public void initTest() {
        surveyor = createEntity(em);
    }

    @Test
    @Transactional
    public void createSurveyor() throws Exception {
        int databaseSizeBeforeCreate = surveyorRepository.findAll().size();

        // Create the Surveyor
        restSurveyorMockMvc.perform(post("/api/surveyors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(surveyor)))
            .andExpect(status().isCreated());

        // Validate the Surveyor in the database
        List<Surveyor> surveyorList = surveyorRepository.findAll();
        assertThat(surveyorList).hasSize(databaseSizeBeforeCreate + 1);
        Surveyor testSurveyor = surveyorList.get(surveyorList.size() - 1);
        assertThat(testSurveyor.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testSurveyor.getSurconNumber()).isEqualTo(DEFAULT_SURCON_NUMBER);
        assertThat(testSurveyor.getRegistrationNumber()).isEqualTo(DEFAULT_REGISTRATION_NUMBER);
        assertThat(testSurveyor.getPhone()).isEqualTo(DEFAULT_PHONE);
        assertThat(testSurveyor.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testSurveyor.getRequestDate()).isEqualTo(DEFAULT_REQUEST_DATE);
        assertThat(testSurveyor.getProcessedDate()).isEqualTo(DEFAULT_PROCESSED_DATE);

        // Validate the Surveyor in Elasticsearch
        verify(mockSurveyorSearchRepository, times(1)).save(testSurveyor);
    }

    @Test
    @Transactional
    public void createSurveyorWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = surveyorRepository.findAll().size();

        // Create the Surveyor with an existing ID
        surveyor.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSurveyorMockMvc.perform(post("/api/surveyors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(surveyor)))
            .andExpect(status().isBadRequest());

        // Validate the Surveyor in the database
        List<Surveyor> surveyorList = surveyorRepository.findAll();
        assertThat(surveyorList).hasSize(databaseSizeBeforeCreate);

        // Validate the Surveyor in Elasticsearch
        verify(mockSurveyorSearchRepository, times(0)).save(surveyor);
    }


    @Test
    @Transactional
    public void getAllSurveyors() throws Exception {
        // Initialize the database
        surveyorRepository.saveAndFlush(surveyor);

        // Get all the surveyorList
        restSurveyorMockMvc.perform(get("/api/surveyors?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(surveyor.getId().intValue())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL)))
            .andExpect(jsonPath("$.[*].surconNumber").value(hasItem(DEFAULT_SURCON_NUMBER)))
            .andExpect(jsonPath("$.[*].registrationNumber").value(hasItem(DEFAULT_REGISTRATION_NUMBER)))
            .andExpect(jsonPath("$.[*].phone").value(hasItem(DEFAULT_PHONE)))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS)))
            .andExpect(jsonPath("$.[*].requestDate").value(hasItem(DEFAULT_REQUEST_DATE.toString())))
            .andExpect(jsonPath("$.[*].processedDate").value(hasItem(DEFAULT_PROCESSED_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getSurveyor() throws Exception {
        // Initialize the database
        surveyorRepository.saveAndFlush(surveyor);

        // Get the surveyor
        restSurveyorMockMvc.perform(get("/api/surveyors/{id}", surveyor.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(surveyor.getId().intValue()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL))
            .andExpect(jsonPath("$.surconNumber").value(DEFAULT_SURCON_NUMBER))
            .andExpect(jsonPath("$.registrationNumber").value(DEFAULT_REGISTRATION_NUMBER))
            .andExpect(jsonPath("$.phone").value(DEFAULT_PHONE))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS))
            .andExpect(jsonPath("$.requestDate").value(DEFAULT_REQUEST_DATE.toString()))
            .andExpect(jsonPath("$.processedDate").value(DEFAULT_PROCESSED_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSurveyor() throws Exception {
        // Get the surveyor
        restSurveyorMockMvc.perform(get("/api/surveyors/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSurveyor() throws Exception {
        // Initialize the database
        surveyorRepository.saveAndFlush(surveyor);

        int databaseSizeBeforeUpdate = surveyorRepository.findAll().size();

        // Update the surveyor
        Surveyor updatedSurveyor = surveyorRepository.findById(surveyor.getId()).get();
        // Disconnect from session so that the updates on updatedSurveyor are not directly saved in db
        em.detach(updatedSurveyor);
        updatedSurveyor
            .email(UPDATED_EMAIL)
            .surconNumber(UPDATED_SURCON_NUMBER)
            .registrationNumber(UPDATED_REGISTRATION_NUMBER)
            .phone(UPDATED_PHONE)
            .status(UPDATED_STATUS)
            .requestDate(UPDATED_REQUEST_DATE)
            .processedDate(UPDATED_PROCESSED_DATE);

        restSurveyorMockMvc.perform(put("/api/surveyors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSurveyor)))
            .andExpect(status().isOk());

        // Validate the Surveyor in the database
        List<Surveyor> surveyorList = surveyorRepository.findAll();
        assertThat(surveyorList).hasSize(databaseSizeBeforeUpdate);
        Surveyor testSurveyor = surveyorList.get(surveyorList.size() - 1);
        assertThat(testSurveyor.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testSurveyor.getSurconNumber()).isEqualTo(UPDATED_SURCON_NUMBER);
        assertThat(testSurveyor.getRegistrationNumber()).isEqualTo(UPDATED_REGISTRATION_NUMBER);
        assertThat(testSurveyor.getPhone()).isEqualTo(UPDATED_PHONE);
        assertThat(testSurveyor.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testSurveyor.getRequestDate()).isEqualTo(UPDATED_REQUEST_DATE);
        assertThat(testSurveyor.getProcessedDate()).isEqualTo(UPDATED_PROCESSED_DATE);

        // Validate the Surveyor in Elasticsearch
        verify(mockSurveyorSearchRepository, times(1)).save(testSurveyor);
    }

    @Test
    @Transactional
    public void updateNonExistingSurveyor() throws Exception {
        int databaseSizeBeforeUpdate = surveyorRepository.findAll().size();

        // Create the Surveyor

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSurveyorMockMvc.perform(put("/api/surveyors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(surveyor)))
            .andExpect(status().isBadRequest());

        // Validate the Surveyor in the database
        List<Surveyor> surveyorList = surveyorRepository.findAll();
        assertThat(surveyorList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Surveyor in Elasticsearch
        verify(mockSurveyorSearchRepository, times(0)).save(surveyor);
    }

    @Test
    @Transactional
    public void deleteSurveyor() throws Exception {
        // Initialize the database
        surveyorRepository.saveAndFlush(surveyor);

        int databaseSizeBeforeDelete = surveyorRepository.findAll().size();

        // Delete the surveyor
        restSurveyorMockMvc.perform(delete("/api/surveyors/{id}", surveyor.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Surveyor> surveyorList = surveyorRepository.findAll();
        assertThat(surveyorList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Surveyor in Elasticsearch
        verify(mockSurveyorSearchRepository, times(1)).deleteById(surveyor.getId());
    }

    @Test
    @Transactional
    public void searchSurveyor() throws Exception {
        // Initialize the database
        surveyorRepository.saveAndFlush(surveyor);
        when(mockSurveyorSearchRepository.search(queryStringQuery("id:" + surveyor.getId()), PageRequest.of(0, 20)))
            .thenReturn(new PageImpl<>(Collections.singletonList(surveyor), PageRequest.of(0, 1), 1));
        // Search the surveyor
        restSurveyorMockMvc.perform(get("/api/_search/surveyors?query=id:" + surveyor.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(surveyor.getId().intValue())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL)))
            .andExpect(jsonPath("$.[*].surconNumber").value(hasItem(DEFAULT_SURCON_NUMBER)))
            .andExpect(jsonPath("$.[*].registrationNumber").value(hasItem(DEFAULT_REGISTRATION_NUMBER)))
            .andExpect(jsonPath("$.[*].phone").value(hasItem(DEFAULT_PHONE)))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS)))
            .andExpect(jsonPath("$.[*].requestDate").value(hasItem(DEFAULT_REQUEST_DATE.toString())))
            .andExpect(jsonPath("$.[*].processedDate").value(hasItem(DEFAULT_PROCESSED_DATE.toString())));
    }
}
