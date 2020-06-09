package com.lagos.egis.external.web.rest;

import com.lagos.egis.external.EgisexternalApp;
import com.lagos.egis.external.domain.YearSubscription;
import com.lagos.egis.external.repository.YearSubscriptionRepository;
import com.lagos.egis.external.repository.search.YearSubscriptionSearchRepository;
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
 * Integration tests for the {@link YearSubscriptionResource} REST controller.
 */
@SpringBootTest(classes = EgisexternalApp.class)
public class YearSubscriptionResourceIT {

    private static final Integer DEFAULT_YEAR = 1;
    private static final Integer UPDATED_YEAR = 2;

    private static final String DEFAULT_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_STATUS = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_REQUEST_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_REQUEST_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_PROCESSED_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_PROCESSED_DATE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private YearSubscriptionRepository yearSubscriptionRepository;

    @Mock
    private YearSubscriptionRepository yearSubscriptionRepositoryMock;

    /**
     * This repository is mocked in the com.lagos.egis.external.repository.search test package.
     *
     * @see com.lagos.egis.external.repository.search.YearSubscriptionSearchRepositoryMockConfiguration
     */
    @Autowired
    private YearSubscriptionSearchRepository mockYearSubscriptionSearchRepository;

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

    private MockMvc restYearSubscriptionMockMvc;

    private YearSubscription yearSubscription;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final YearSubscriptionResource yearSubscriptionResource = new YearSubscriptionResource(yearSubscriptionRepository, mockYearSubscriptionSearchRepository);
        this.restYearSubscriptionMockMvc = MockMvcBuilders.standaloneSetup(yearSubscriptionResource)
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
    public static YearSubscription createEntity(EntityManager em) {
        YearSubscription yearSubscription = new YearSubscription()
            .year(DEFAULT_YEAR)
            .status(DEFAULT_STATUS)
            .requestDate(DEFAULT_REQUEST_DATE)
            .processedDate(DEFAULT_PROCESSED_DATE);
        return yearSubscription;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static YearSubscription createUpdatedEntity(EntityManager em) {
        YearSubscription yearSubscription = new YearSubscription()
            .year(UPDATED_YEAR)
            .status(UPDATED_STATUS)
            .requestDate(UPDATED_REQUEST_DATE)
            .processedDate(UPDATED_PROCESSED_DATE);
        return yearSubscription;
    }

    @BeforeEach
    public void initTest() {
        yearSubscription = createEntity(em);
    }

    @Test
    @Transactional
    public void createYearSubscription() throws Exception {
        int databaseSizeBeforeCreate = yearSubscriptionRepository.findAll().size();

        // Create the YearSubscription
        restYearSubscriptionMockMvc.perform(post("/api/year-subscriptions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(yearSubscription)))
            .andExpect(status().isCreated());

        // Validate the YearSubscription in the database
        List<YearSubscription> yearSubscriptionList = yearSubscriptionRepository.findAll();
        assertThat(yearSubscriptionList).hasSize(databaseSizeBeforeCreate + 1);
        YearSubscription testYearSubscription = yearSubscriptionList.get(yearSubscriptionList.size() - 1);
        assertThat(testYearSubscription.getYear()).isEqualTo(DEFAULT_YEAR);
        assertThat(testYearSubscription.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testYearSubscription.getRequestDate()).isEqualTo(DEFAULT_REQUEST_DATE);
        assertThat(testYearSubscription.getProcessedDate()).isEqualTo(DEFAULT_PROCESSED_DATE);

        // Validate the YearSubscription in Elasticsearch
        verify(mockYearSubscriptionSearchRepository, times(1)).save(testYearSubscription);
    }

    @Test
    @Transactional
    public void createYearSubscriptionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = yearSubscriptionRepository.findAll().size();

        // Create the YearSubscription with an existing ID
        yearSubscription.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restYearSubscriptionMockMvc.perform(post("/api/year-subscriptions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(yearSubscription)))
            .andExpect(status().isBadRequest());

        // Validate the YearSubscription in the database
        List<YearSubscription> yearSubscriptionList = yearSubscriptionRepository.findAll();
        assertThat(yearSubscriptionList).hasSize(databaseSizeBeforeCreate);

        // Validate the YearSubscription in Elasticsearch
        verify(mockYearSubscriptionSearchRepository, times(0)).save(yearSubscription);
    }


    @Test
    @Transactional
    public void getAllYearSubscriptions() throws Exception {
        // Initialize the database
        yearSubscriptionRepository.saveAndFlush(yearSubscription);

        // Get all the yearSubscriptionList
        restYearSubscriptionMockMvc.perform(get("/api/year-subscriptions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(yearSubscription.getId().intValue())))
            .andExpect(jsonPath("$.[*].year").value(hasItem(DEFAULT_YEAR)))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS)))
            .andExpect(jsonPath("$.[*].requestDate").value(hasItem(DEFAULT_REQUEST_DATE.toString())))
            .andExpect(jsonPath("$.[*].processedDate").value(hasItem(DEFAULT_PROCESSED_DATE.toString())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllYearSubscriptionsWithEagerRelationshipsIsEnabled() throws Exception {
        YearSubscriptionResource yearSubscriptionResource = new YearSubscriptionResource(yearSubscriptionRepositoryMock, mockYearSubscriptionSearchRepository);
        when(yearSubscriptionRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restYearSubscriptionMockMvc = MockMvcBuilders.standaloneSetup(yearSubscriptionResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restYearSubscriptionMockMvc.perform(get("/api/year-subscriptions?eagerload=true"))
        .andExpect(status().isOk());

        verify(yearSubscriptionRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllYearSubscriptionsWithEagerRelationshipsIsNotEnabled() throws Exception {
        YearSubscriptionResource yearSubscriptionResource = new YearSubscriptionResource(yearSubscriptionRepositoryMock, mockYearSubscriptionSearchRepository);
            when(yearSubscriptionRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restYearSubscriptionMockMvc = MockMvcBuilders.standaloneSetup(yearSubscriptionResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restYearSubscriptionMockMvc.perform(get("/api/year-subscriptions?eagerload=true"))
        .andExpect(status().isOk());

            verify(yearSubscriptionRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getYearSubscription() throws Exception {
        // Initialize the database
        yearSubscriptionRepository.saveAndFlush(yearSubscription);

        // Get the yearSubscription
        restYearSubscriptionMockMvc.perform(get("/api/year-subscriptions/{id}", yearSubscription.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(yearSubscription.getId().intValue()))
            .andExpect(jsonPath("$.year").value(DEFAULT_YEAR))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS))
            .andExpect(jsonPath("$.requestDate").value(DEFAULT_REQUEST_DATE.toString()))
            .andExpect(jsonPath("$.processedDate").value(DEFAULT_PROCESSED_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingYearSubscription() throws Exception {
        // Get the yearSubscription
        restYearSubscriptionMockMvc.perform(get("/api/year-subscriptions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateYearSubscription() throws Exception {
        // Initialize the database
        yearSubscriptionRepository.saveAndFlush(yearSubscription);

        int databaseSizeBeforeUpdate = yearSubscriptionRepository.findAll().size();

        // Update the yearSubscription
        YearSubscription updatedYearSubscription = yearSubscriptionRepository.findById(yearSubscription.getId()).get();
        // Disconnect from session so that the updates on updatedYearSubscription are not directly saved in db
        em.detach(updatedYearSubscription);
        updatedYearSubscription
            .year(UPDATED_YEAR)
            .status(UPDATED_STATUS)
            .requestDate(UPDATED_REQUEST_DATE)
            .processedDate(UPDATED_PROCESSED_DATE);

        restYearSubscriptionMockMvc.perform(put("/api/year-subscriptions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedYearSubscription)))
            .andExpect(status().isOk());

        // Validate the YearSubscription in the database
        List<YearSubscription> yearSubscriptionList = yearSubscriptionRepository.findAll();
        assertThat(yearSubscriptionList).hasSize(databaseSizeBeforeUpdate);
        YearSubscription testYearSubscription = yearSubscriptionList.get(yearSubscriptionList.size() - 1);
        assertThat(testYearSubscription.getYear()).isEqualTo(UPDATED_YEAR);
        assertThat(testYearSubscription.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testYearSubscription.getRequestDate()).isEqualTo(UPDATED_REQUEST_DATE);
        assertThat(testYearSubscription.getProcessedDate()).isEqualTo(UPDATED_PROCESSED_DATE);

        // Validate the YearSubscription in Elasticsearch
        verify(mockYearSubscriptionSearchRepository, times(1)).save(testYearSubscription);
    }

    @Test
    @Transactional
    public void updateNonExistingYearSubscription() throws Exception {
        int databaseSizeBeforeUpdate = yearSubscriptionRepository.findAll().size();

        // Create the YearSubscription

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restYearSubscriptionMockMvc.perform(put("/api/year-subscriptions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(yearSubscription)))
            .andExpect(status().isBadRequest());

        // Validate the YearSubscription in the database
        List<YearSubscription> yearSubscriptionList = yearSubscriptionRepository.findAll();
        assertThat(yearSubscriptionList).hasSize(databaseSizeBeforeUpdate);

        // Validate the YearSubscription in Elasticsearch
        verify(mockYearSubscriptionSearchRepository, times(0)).save(yearSubscription);
    }

    @Test
    @Transactional
    public void deleteYearSubscription() throws Exception {
        // Initialize the database
        yearSubscriptionRepository.saveAndFlush(yearSubscription);

        int databaseSizeBeforeDelete = yearSubscriptionRepository.findAll().size();

        // Delete the yearSubscription
        restYearSubscriptionMockMvc.perform(delete("/api/year-subscriptions/{id}", yearSubscription.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<YearSubscription> yearSubscriptionList = yearSubscriptionRepository.findAll();
        assertThat(yearSubscriptionList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the YearSubscription in Elasticsearch
        verify(mockYearSubscriptionSearchRepository, times(1)).deleteById(yearSubscription.getId());
    }

    @Test
    @Transactional
    public void searchYearSubscription() throws Exception {
        // Initialize the database
        yearSubscriptionRepository.saveAndFlush(yearSubscription);
        when(mockYearSubscriptionSearchRepository.search(queryStringQuery("id:" + yearSubscription.getId())))
            .thenReturn(Collections.singletonList(yearSubscription));
        // Search the yearSubscription
        restYearSubscriptionMockMvc.perform(get("/api/_search/year-subscriptions?query=id:" + yearSubscription.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(yearSubscription.getId().intValue())))
            .andExpect(jsonPath("$.[*].year").value(hasItem(DEFAULT_YEAR)))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS)))
            .andExpect(jsonPath("$.[*].requestDate").value(hasItem(DEFAULT_REQUEST_DATE.toString())))
            .andExpect(jsonPath("$.[*].processedDate").value(hasItem(DEFAULT_PROCESSED_DATE.toString())));
    }
}
