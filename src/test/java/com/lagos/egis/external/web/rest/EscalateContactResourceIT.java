package com.lagos.egis.external.web.rest;

import com.lagos.egis.external.EgisexternalApp;
import com.lagos.egis.external.domain.EscalateContact;
import com.lagos.egis.external.repository.EscalateContactRepository;
import com.lagos.egis.external.repository.search.EscalateContactSearchRepository;
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
 * Integration tests for the {@link EscalateContactResource} REST controller.
 */
@SpringBootTest(classes = EgisexternalApp.class)
public class EscalateContactResourceIT {

    private static final String DEFAULT_CONTACT = "AAAAAAAAAA";
    private static final String UPDATED_CONTACT = "BBBBBBBBBB";

    @Autowired
    private EscalateContactRepository escalateContactRepository;

    /**
     * This repository is mocked in the com.lagos.egis.external.repository.search test package.
     *
     * @see com.lagos.egis.external.repository.search.EscalateContactSearchRepositoryMockConfiguration
     */
    @Autowired
    private EscalateContactSearchRepository mockEscalateContactSearchRepository;

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

    private MockMvc restEscalateContactMockMvc;

    private EscalateContact escalateContact;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EscalateContactResource escalateContactResource = new EscalateContactResource(escalateContactRepository, mockEscalateContactSearchRepository);
        this.restEscalateContactMockMvc = MockMvcBuilders.standaloneSetup(escalateContactResource)
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
    public static EscalateContact createEntity(EntityManager em) {
        EscalateContact escalateContact = new EscalateContact()
            .contact(DEFAULT_CONTACT);
        return escalateContact;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EscalateContact createUpdatedEntity(EntityManager em) {
        EscalateContact escalateContact = new EscalateContact()
            .contact(UPDATED_CONTACT);
        return escalateContact;
    }

    @BeforeEach
    public void initTest() {
        escalateContact = createEntity(em);
    }

    @Test
    @Transactional
    public void createEscalateContact() throws Exception {
        int databaseSizeBeforeCreate = escalateContactRepository.findAll().size();

        // Create the EscalateContact
        restEscalateContactMockMvc.perform(post("/api/escalate-contacts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(escalateContact)))
            .andExpect(status().isCreated());

        // Validate the EscalateContact in the database
        List<EscalateContact> escalateContactList = escalateContactRepository.findAll();
        assertThat(escalateContactList).hasSize(databaseSizeBeforeCreate + 1);
        EscalateContact testEscalateContact = escalateContactList.get(escalateContactList.size() - 1);
        assertThat(testEscalateContact.getContact()).isEqualTo(DEFAULT_CONTACT);

        // Validate the EscalateContact in Elasticsearch
        verify(mockEscalateContactSearchRepository, times(1)).save(testEscalateContact);
    }

    @Test
    @Transactional
    public void createEscalateContactWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = escalateContactRepository.findAll().size();

        // Create the EscalateContact with an existing ID
        escalateContact.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEscalateContactMockMvc.perform(post("/api/escalate-contacts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(escalateContact)))
            .andExpect(status().isBadRequest());

        // Validate the EscalateContact in the database
        List<EscalateContact> escalateContactList = escalateContactRepository.findAll();
        assertThat(escalateContactList).hasSize(databaseSizeBeforeCreate);

        // Validate the EscalateContact in Elasticsearch
        verify(mockEscalateContactSearchRepository, times(0)).save(escalateContact);
    }


    @Test
    @Transactional
    public void getAllEscalateContacts() throws Exception {
        // Initialize the database
        escalateContactRepository.saveAndFlush(escalateContact);

        // Get all the escalateContactList
        restEscalateContactMockMvc.perform(get("/api/escalate-contacts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(escalateContact.getId().intValue())))
            .andExpect(jsonPath("$.[*].contact").value(hasItem(DEFAULT_CONTACT)));
    }
    
    @Test
    @Transactional
    public void getEscalateContact() throws Exception {
        // Initialize the database
        escalateContactRepository.saveAndFlush(escalateContact);

        // Get the escalateContact
        restEscalateContactMockMvc.perform(get("/api/escalate-contacts/{id}", escalateContact.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(escalateContact.getId().intValue()))
            .andExpect(jsonPath("$.contact").value(DEFAULT_CONTACT));
    }

    @Test
    @Transactional
    public void getNonExistingEscalateContact() throws Exception {
        // Get the escalateContact
        restEscalateContactMockMvc.perform(get("/api/escalate-contacts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEscalateContact() throws Exception {
        // Initialize the database
        escalateContactRepository.saveAndFlush(escalateContact);

        int databaseSizeBeforeUpdate = escalateContactRepository.findAll().size();

        // Update the escalateContact
        EscalateContact updatedEscalateContact = escalateContactRepository.findById(escalateContact.getId()).get();
        // Disconnect from session so that the updates on updatedEscalateContact are not directly saved in db
        em.detach(updatedEscalateContact);
        updatedEscalateContact
            .contact(UPDATED_CONTACT);

        restEscalateContactMockMvc.perform(put("/api/escalate-contacts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEscalateContact)))
            .andExpect(status().isOk());

        // Validate the EscalateContact in the database
        List<EscalateContact> escalateContactList = escalateContactRepository.findAll();
        assertThat(escalateContactList).hasSize(databaseSizeBeforeUpdate);
        EscalateContact testEscalateContact = escalateContactList.get(escalateContactList.size() - 1);
        assertThat(testEscalateContact.getContact()).isEqualTo(UPDATED_CONTACT);

        // Validate the EscalateContact in Elasticsearch
        verify(mockEscalateContactSearchRepository, times(1)).save(testEscalateContact);
    }

    @Test
    @Transactional
    public void updateNonExistingEscalateContact() throws Exception {
        int databaseSizeBeforeUpdate = escalateContactRepository.findAll().size();

        // Create the EscalateContact

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEscalateContactMockMvc.perform(put("/api/escalate-contacts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(escalateContact)))
            .andExpect(status().isBadRequest());

        // Validate the EscalateContact in the database
        List<EscalateContact> escalateContactList = escalateContactRepository.findAll();
        assertThat(escalateContactList).hasSize(databaseSizeBeforeUpdate);

        // Validate the EscalateContact in Elasticsearch
        verify(mockEscalateContactSearchRepository, times(0)).save(escalateContact);
    }

    @Test
    @Transactional
    public void deleteEscalateContact() throws Exception {
        // Initialize the database
        escalateContactRepository.saveAndFlush(escalateContact);

        int databaseSizeBeforeDelete = escalateContactRepository.findAll().size();

        // Delete the escalateContact
        restEscalateContactMockMvc.perform(delete("/api/escalate-contacts/{id}", escalateContact.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<EscalateContact> escalateContactList = escalateContactRepository.findAll();
        assertThat(escalateContactList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the EscalateContact in Elasticsearch
        verify(mockEscalateContactSearchRepository, times(1)).deleteById(escalateContact.getId());
    }

    @Test
    @Transactional
    public void searchEscalateContact() throws Exception {
        // Initialize the database
        escalateContactRepository.saveAndFlush(escalateContact);
        when(mockEscalateContactSearchRepository.search(queryStringQuery("id:" + escalateContact.getId())))
            .thenReturn(Collections.singletonList(escalateContact));
        // Search the escalateContact
        restEscalateContactMockMvc.perform(get("/api/_search/escalate-contacts?query=id:" + escalateContact.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(escalateContact.getId().intValue())))
            .andExpect(jsonPath("$.[*].contact").value(hasItem(DEFAULT_CONTACT)));
    }
}
