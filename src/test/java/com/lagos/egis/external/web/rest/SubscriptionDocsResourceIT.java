package com.lagos.egis.external.web.rest;

import com.lagos.egis.external.EgisexternalApp;
import com.lagos.egis.external.domain.SubscriptionDocs;
import com.lagos.egis.external.repository.SubscriptionDocsRepository;
import com.lagos.egis.external.repository.search.SubscriptionDocsSearchRepository;
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
import org.springframework.util.Base64Utils;
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
 * Integration tests for the {@link SubscriptionDocsResource} REST controller.
 */
@SpringBootTest(classes = EgisexternalApp.class)
public class SubscriptionDocsResourceIT {

    private static final String DEFAULT_CONTENT = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT = "BBBBBBBBBB";

    private static final String DEFAULT_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_TYPE = "BBBBBBBBBB";

    private static final String DEFAULT_FILENAME = "AAAAAAAAAA";
    private static final String UPDATED_FILENAME = "BBBBBBBBBB";

    @Autowired
    private SubscriptionDocsRepository subscriptionDocsRepository;

    /**
     * This repository is mocked in the com.lagos.egis.external.repository.search test package.
     *
     * @see com.lagos.egis.external.repository.search.SubscriptionDocsSearchRepositoryMockConfiguration
     */
    @Autowired
    private SubscriptionDocsSearchRepository mockSubscriptionDocsSearchRepository;

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

    private MockMvc restSubscriptionDocsMockMvc;

    private SubscriptionDocs subscriptionDocs;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SubscriptionDocsResource subscriptionDocsResource = new SubscriptionDocsResource(subscriptionDocsRepository, mockSubscriptionDocsSearchRepository);
        this.restSubscriptionDocsMockMvc = MockMvcBuilders.standaloneSetup(subscriptionDocsResource)
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
    public static SubscriptionDocs createEntity(EntityManager em) {
        SubscriptionDocs subscriptionDocs = new SubscriptionDocs()
            .content(DEFAULT_CONTENT)
            .type(DEFAULT_TYPE)
            .filename(DEFAULT_FILENAME);
        return subscriptionDocs;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SubscriptionDocs createUpdatedEntity(EntityManager em) {
        SubscriptionDocs subscriptionDocs = new SubscriptionDocs()
            .content(UPDATED_CONTENT)
            .type(UPDATED_TYPE)
            .filename(UPDATED_FILENAME);
        return subscriptionDocs;
    }

    @BeforeEach
    public void initTest() {
        subscriptionDocs = createEntity(em);
    }

    @Test
    @Transactional
    public void createSubscriptionDocs() throws Exception {
        int databaseSizeBeforeCreate = subscriptionDocsRepository.findAll().size();

        // Create the SubscriptionDocs
        restSubscriptionDocsMockMvc.perform(post("/api/subscription-docs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subscriptionDocs)))
            .andExpect(status().isCreated());

        // Validate the SubscriptionDocs in the database
        List<SubscriptionDocs> subscriptionDocsList = subscriptionDocsRepository.findAll();
        assertThat(subscriptionDocsList).hasSize(databaseSizeBeforeCreate + 1);
        SubscriptionDocs testSubscriptionDocs = subscriptionDocsList.get(subscriptionDocsList.size() - 1);
        assertThat(testSubscriptionDocs.getContent()).isEqualTo(DEFAULT_CONTENT);
        assertThat(testSubscriptionDocs.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testSubscriptionDocs.getFilename()).isEqualTo(DEFAULT_FILENAME);

        // Validate the SubscriptionDocs in Elasticsearch
        verify(mockSubscriptionDocsSearchRepository, times(1)).save(testSubscriptionDocs);
    }

    @Test
    @Transactional
    public void createSubscriptionDocsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = subscriptionDocsRepository.findAll().size();

        // Create the SubscriptionDocs with an existing ID
        subscriptionDocs.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSubscriptionDocsMockMvc.perform(post("/api/subscription-docs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subscriptionDocs)))
            .andExpect(status().isBadRequest());

        // Validate the SubscriptionDocs in the database
        List<SubscriptionDocs> subscriptionDocsList = subscriptionDocsRepository.findAll();
        assertThat(subscriptionDocsList).hasSize(databaseSizeBeforeCreate);

        // Validate the SubscriptionDocs in Elasticsearch
        verify(mockSubscriptionDocsSearchRepository, times(0)).save(subscriptionDocs);
    }


    @Test
    @Transactional
    public void getAllSubscriptionDocs() throws Exception {
        // Initialize the database
        subscriptionDocsRepository.saveAndFlush(subscriptionDocs);

        // Get all the subscriptionDocsList
        restSubscriptionDocsMockMvc.perform(get("/api/subscription-docs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(subscriptionDocs.getId().intValue())))
            .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT.toString())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE)))
            .andExpect(jsonPath("$.[*].filename").value(hasItem(DEFAULT_FILENAME)));
    }
    
    @Test
    @Transactional
    public void getSubscriptionDocs() throws Exception {
        // Initialize the database
        subscriptionDocsRepository.saveAndFlush(subscriptionDocs);

        // Get the subscriptionDocs
        restSubscriptionDocsMockMvc.perform(get("/api/subscription-docs/{id}", subscriptionDocs.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(subscriptionDocs.getId().intValue()))
            .andExpect(jsonPath("$.content").value(DEFAULT_CONTENT.toString()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE))
            .andExpect(jsonPath("$.filename").value(DEFAULT_FILENAME));
    }

    @Test
    @Transactional
    public void getNonExistingSubscriptionDocs() throws Exception {
        // Get the subscriptionDocs
        restSubscriptionDocsMockMvc.perform(get("/api/subscription-docs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSubscriptionDocs() throws Exception {
        // Initialize the database
        subscriptionDocsRepository.saveAndFlush(subscriptionDocs);

        int databaseSizeBeforeUpdate = subscriptionDocsRepository.findAll().size();

        // Update the subscriptionDocs
        SubscriptionDocs updatedSubscriptionDocs = subscriptionDocsRepository.findById(subscriptionDocs.getId()).get();
        // Disconnect from session so that the updates on updatedSubscriptionDocs are not directly saved in db
        em.detach(updatedSubscriptionDocs);
        updatedSubscriptionDocs
            .content(UPDATED_CONTENT)
            .type(UPDATED_TYPE)
            .filename(UPDATED_FILENAME);

        restSubscriptionDocsMockMvc.perform(put("/api/subscription-docs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSubscriptionDocs)))
            .andExpect(status().isOk());

        // Validate the SubscriptionDocs in the database
        List<SubscriptionDocs> subscriptionDocsList = subscriptionDocsRepository.findAll();
        assertThat(subscriptionDocsList).hasSize(databaseSizeBeforeUpdate);
        SubscriptionDocs testSubscriptionDocs = subscriptionDocsList.get(subscriptionDocsList.size() - 1);
        assertThat(testSubscriptionDocs.getContent()).isEqualTo(UPDATED_CONTENT);
        assertThat(testSubscriptionDocs.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testSubscriptionDocs.getFilename()).isEqualTo(UPDATED_FILENAME);

        // Validate the SubscriptionDocs in Elasticsearch
        verify(mockSubscriptionDocsSearchRepository, times(1)).save(testSubscriptionDocs);
    }

    @Test
    @Transactional
    public void updateNonExistingSubscriptionDocs() throws Exception {
        int databaseSizeBeforeUpdate = subscriptionDocsRepository.findAll().size();

        // Create the SubscriptionDocs

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSubscriptionDocsMockMvc.perform(put("/api/subscription-docs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subscriptionDocs)))
            .andExpect(status().isBadRequest());

        // Validate the SubscriptionDocs in the database
        List<SubscriptionDocs> subscriptionDocsList = subscriptionDocsRepository.findAll();
        assertThat(subscriptionDocsList).hasSize(databaseSizeBeforeUpdate);

        // Validate the SubscriptionDocs in Elasticsearch
        verify(mockSubscriptionDocsSearchRepository, times(0)).save(subscriptionDocs);
    }

    @Test
    @Transactional
    public void deleteSubscriptionDocs() throws Exception {
        // Initialize the database
        subscriptionDocsRepository.saveAndFlush(subscriptionDocs);

        int databaseSizeBeforeDelete = subscriptionDocsRepository.findAll().size();

        // Delete the subscriptionDocs
        restSubscriptionDocsMockMvc.perform(delete("/api/subscription-docs/{id}", subscriptionDocs.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<SubscriptionDocs> subscriptionDocsList = subscriptionDocsRepository.findAll();
        assertThat(subscriptionDocsList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the SubscriptionDocs in Elasticsearch
        verify(mockSubscriptionDocsSearchRepository, times(1)).deleteById(subscriptionDocs.getId());
    }

    @Test
    @Transactional
    public void searchSubscriptionDocs() throws Exception {
        // Initialize the database
        subscriptionDocsRepository.saveAndFlush(subscriptionDocs);
        when(mockSubscriptionDocsSearchRepository.search(queryStringQuery("id:" + subscriptionDocs.getId())))
            .thenReturn(Collections.singletonList(subscriptionDocs));
        // Search the subscriptionDocs
        restSubscriptionDocsMockMvc.perform(get("/api/_search/subscription-docs?query=id:" + subscriptionDocs.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(subscriptionDocs.getId().intValue())))
            .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT.toString())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE)))
            .andExpect(jsonPath("$.[*].filename").value(hasItem(DEFAULT_FILENAME)));
    }
}
