package com.lagos.egis.external.web.rest;

import com.lagos.egis.external.EgisexternalApp;
import com.lagos.egis.external.domain.Escalation;
import com.lagos.egis.external.repository.EscalationRepository;
import com.lagos.egis.external.repository.search.EscalationSearchRepository;
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
 * Integration tests for the {@link EscalationResource} REST controller.
 */
@SpringBootTest(classes = EgisexternalApp.class)
public class EscalationResourceIT {

    private static final LocalDate DEFAULT_ESCALATE_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_ESCALATE_DATE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private EscalationRepository escalationRepository;

    /**
     * This repository is mocked in the com.lagos.egis.external.repository.search test package.
     *
     * @see com.lagos.egis.external.repository.search.EscalationSearchRepositoryMockConfiguration
     */
    @Autowired
    private EscalationSearchRepository mockEscalationSearchRepository;

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

    private MockMvc restEscalationMockMvc;

    private Escalation escalation;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EscalationResource escalationResource = new EscalationResource(escalationRepository, mockEscalationSearchRepository);
        this.restEscalationMockMvc = MockMvcBuilders.standaloneSetup(escalationResource)
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
    public static Escalation createEntity(EntityManager em) {
        Escalation escalation = new Escalation()
            .escalateDate(DEFAULT_ESCALATE_DATE);
        return escalation;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Escalation createUpdatedEntity(EntityManager em) {
        Escalation escalation = new Escalation()
            .escalateDate(UPDATED_ESCALATE_DATE);
        return escalation;
    }

    @BeforeEach
    public void initTest() {
        escalation = createEntity(em);
    }

    @Test
    @Transactional
    public void createEscalation() throws Exception {
        int databaseSizeBeforeCreate = escalationRepository.findAll().size();

        // Create the Escalation
        restEscalationMockMvc.perform(post("/api/escalations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(escalation)))
            .andExpect(status().isCreated());

        // Validate the Escalation in the database
        List<Escalation> escalationList = escalationRepository.findAll();
        assertThat(escalationList).hasSize(databaseSizeBeforeCreate + 1);
        Escalation testEscalation = escalationList.get(escalationList.size() - 1);
        assertThat(testEscalation.getEscalateDate()).isEqualTo(DEFAULT_ESCALATE_DATE);

        // Validate the Escalation in Elasticsearch
        verify(mockEscalationSearchRepository, times(1)).save(testEscalation);
    }

    @Test
    @Transactional
    public void createEscalationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = escalationRepository.findAll().size();

        // Create the Escalation with an existing ID
        escalation.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEscalationMockMvc.perform(post("/api/escalations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(escalation)))
            .andExpect(status().isBadRequest());

        // Validate the Escalation in the database
        List<Escalation> escalationList = escalationRepository.findAll();
        assertThat(escalationList).hasSize(databaseSizeBeforeCreate);

        // Validate the Escalation in Elasticsearch
        verify(mockEscalationSearchRepository, times(0)).save(escalation);
    }


    @Test
    @Transactional
    public void getAllEscalations() throws Exception {
        // Initialize the database
        escalationRepository.saveAndFlush(escalation);

        // Get all the escalationList
        restEscalationMockMvc.perform(get("/api/escalations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(escalation.getId().intValue())))
            .andExpect(jsonPath("$.[*].escalateDate").value(hasItem(DEFAULT_ESCALATE_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getEscalation() throws Exception {
        // Initialize the database
        escalationRepository.saveAndFlush(escalation);

        // Get the escalation
        restEscalationMockMvc.perform(get("/api/escalations/{id}", escalation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(escalation.getId().intValue()))
            .andExpect(jsonPath("$.escalateDate").value(DEFAULT_ESCALATE_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEscalation() throws Exception {
        // Get the escalation
        restEscalationMockMvc.perform(get("/api/escalations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEscalation() throws Exception {
        // Initialize the database
        escalationRepository.saveAndFlush(escalation);

        int databaseSizeBeforeUpdate = escalationRepository.findAll().size();

        // Update the escalation
        Escalation updatedEscalation = escalationRepository.findById(escalation.getId()).get();
        // Disconnect from session so that the updates on updatedEscalation are not directly saved in db
        em.detach(updatedEscalation);
        updatedEscalation
            .escalateDate(UPDATED_ESCALATE_DATE);

        restEscalationMockMvc.perform(put("/api/escalations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEscalation)))
            .andExpect(status().isOk());

        // Validate the Escalation in the database
        List<Escalation> escalationList = escalationRepository.findAll();
        assertThat(escalationList).hasSize(databaseSizeBeforeUpdate);
        Escalation testEscalation = escalationList.get(escalationList.size() - 1);
        assertThat(testEscalation.getEscalateDate()).isEqualTo(UPDATED_ESCALATE_DATE);

        // Validate the Escalation in Elasticsearch
        verify(mockEscalationSearchRepository, times(1)).save(testEscalation);
    }

    @Test
    @Transactional
    public void updateNonExistingEscalation() throws Exception {
        int databaseSizeBeforeUpdate = escalationRepository.findAll().size();

        // Create the Escalation

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEscalationMockMvc.perform(put("/api/escalations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(escalation)))
            .andExpect(status().isBadRequest());

        // Validate the Escalation in the database
        List<Escalation> escalationList = escalationRepository.findAll();
        assertThat(escalationList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Escalation in Elasticsearch
        verify(mockEscalationSearchRepository, times(0)).save(escalation);
    }

    @Test
    @Transactional
    public void deleteEscalation() throws Exception {
        // Initialize the database
        escalationRepository.saveAndFlush(escalation);

        int databaseSizeBeforeDelete = escalationRepository.findAll().size();

        // Delete the escalation
        restEscalationMockMvc.perform(delete("/api/escalations/{id}", escalation.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Escalation> escalationList = escalationRepository.findAll();
        assertThat(escalationList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Escalation in Elasticsearch
        verify(mockEscalationSearchRepository, times(1)).deleteById(escalation.getId());
    }

    @Test
    @Transactional
    public void searchEscalation() throws Exception {
        // Initialize the database
        escalationRepository.saveAndFlush(escalation);
        when(mockEscalationSearchRepository.search(queryStringQuery("id:" + escalation.getId())))
            .thenReturn(Collections.singletonList(escalation));
        // Search the escalation
        restEscalationMockMvc.perform(get("/api/_search/escalations?query=id:" + escalation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(escalation.getId().intValue())))
            .andExpect(jsonPath("$.[*].escalateDate").value(hasItem(DEFAULT_ESCALATE_DATE.toString())));
    }
}
