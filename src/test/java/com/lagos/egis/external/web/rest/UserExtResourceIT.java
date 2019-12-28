package com.lagos.egis.external.web.rest;

import com.lagos.egis.external.EgisexternalApp;
import com.lagos.egis.external.domain.UserExt;
import com.lagos.egis.external.repository.UserExtRepository;
import com.lagos.egis.external.repository.search.UserExtSearchRepository;
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
 * Integration tests for the {@link UserExtResource} REST controller.
 */
@SpringBootTest(classes = EgisexternalApp.class)
public class UserExtResourceIT {

    private static final String DEFAULT_PAYER_ID = "AAAAAAAAAA";
    private static final String UPDATED_PAYER_ID = "BBBBBBBBBB";

    private static final String DEFAULT_PHONE_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_PHONE_NUMBER = "BBBBBBBBBB";

    @Autowired
    private UserExtRepository userExtRepository;

    /**
     * This repository is mocked in the com.lagos.egis.external.repository.search test package.
     *
     * @see com.lagos.egis.external.repository.search.UserExtSearchRepositoryMockConfiguration
     */
    @Autowired
    private UserExtSearchRepository mockUserExtSearchRepository;

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

    private MockMvc restUserExtMockMvc;

    private UserExt userExt;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final UserExtResource userExtResource = new UserExtResource(userExtRepository, mockUserExtSearchRepository);
        this.restUserExtMockMvc = MockMvcBuilders.standaloneSetup(userExtResource)
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
    public static UserExt createEntity(EntityManager em) {
        UserExt userExt = new UserExt()
            .payerId(DEFAULT_PAYER_ID)
            .phoneNumber(DEFAULT_PHONE_NUMBER);
        return userExt;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UserExt createUpdatedEntity(EntityManager em) {
        UserExt userExt = new UserExt()
            .payerId(UPDATED_PAYER_ID)
            .phoneNumber(UPDATED_PHONE_NUMBER);
        return userExt;
    }

    @BeforeEach
    public void initTest() {
        userExt = createEntity(em);
    }

    @Test
    @Transactional
    public void createUserExt() throws Exception {
        int databaseSizeBeforeCreate = userExtRepository.findAll().size();

        // Create the UserExt
        restUserExtMockMvc.perform(post("/api/user-exts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userExt)))
            .andExpect(status().isCreated());

        // Validate the UserExt in the database
        List<UserExt> userExtList = userExtRepository.findAll();
        assertThat(userExtList).hasSize(databaseSizeBeforeCreate + 1);
        UserExt testUserExt = userExtList.get(userExtList.size() - 1);
        assertThat(testUserExt.getPayerId()).isEqualTo(DEFAULT_PAYER_ID);
        assertThat(testUserExt.getPhoneNumber()).isEqualTo(DEFAULT_PHONE_NUMBER);

        // Validate the UserExt in Elasticsearch
        verify(mockUserExtSearchRepository, times(1)).save(testUserExt);
    }

    @Test
    @Transactional
    public void createUserExtWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = userExtRepository.findAll().size();

        // Create the UserExt with an existing ID
        userExt.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUserExtMockMvc.perform(post("/api/user-exts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userExt)))
            .andExpect(status().isBadRequest());

        // Validate the UserExt in the database
        List<UserExt> userExtList = userExtRepository.findAll();
        assertThat(userExtList).hasSize(databaseSizeBeforeCreate);

        // Validate the UserExt in Elasticsearch
        verify(mockUserExtSearchRepository, times(0)).save(userExt);
    }


    @Test
    @Transactional
    public void getAllUserExts() throws Exception {
        // Initialize the database
        userExtRepository.saveAndFlush(userExt);

        // Get all the userExtList
        restUserExtMockMvc.perform(get("/api/user-exts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(userExt.getId().intValue())))
            .andExpect(jsonPath("$.[*].payerId").value(hasItem(DEFAULT_PAYER_ID)))
            .andExpect(jsonPath("$.[*].phoneNumber").value(hasItem(DEFAULT_PHONE_NUMBER)));
    }
    
    @Test
    @Transactional
    public void getUserExt() throws Exception {
        // Initialize the database
        userExtRepository.saveAndFlush(userExt);

        // Get the userExt
        restUserExtMockMvc.perform(get("/api/user-exts/{id}", userExt.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(userExt.getId().intValue()))
            .andExpect(jsonPath("$.payerId").value(DEFAULT_PAYER_ID))
            .andExpect(jsonPath("$.phoneNumber").value(DEFAULT_PHONE_NUMBER));
    }

    @Test
    @Transactional
    public void getNonExistingUserExt() throws Exception {
        // Get the userExt
        restUserExtMockMvc.perform(get("/api/user-exts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUserExt() throws Exception {
        // Initialize the database
        userExtRepository.saveAndFlush(userExt);

        int databaseSizeBeforeUpdate = userExtRepository.findAll().size();

        // Update the userExt
        UserExt updatedUserExt = userExtRepository.findById(userExt.getId()).get();
        // Disconnect from session so that the updates on updatedUserExt are not directly saved in db
        em.detach(updatedUserExt);
        updatedUserExt
            .payerId(UPDATED_PAYER_ID)
            .phoneNumber(UPDATED_PHONE_NUMBER);

        restUserExtMockMvc.perform(put("/api/user-exts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedUserExt)))
            .andExpect(status().isOk());

        // Validate the UserExt in the database
        List<UserExt> userExtList = userExtRepository.findAll();
        assertThat(userExtList).hasSize(databaseSizeBeforeUpdate);
        UserExt testUserExt = userExtList.get(userExtList.size() - 1);
        assertThat(testUserExt.getPayerId()).isEqualTo(UPDATED_PAYER_ID);
        assertThat(testUserExt.getPhoneNumber()).isEqualTo(UPDATED_PHONE_NUMBER);

        // Validate the UserExt in Elasticsearch
        verify(mockUserExtSearchRepository, times(1)).save(testUserExt);
    }

    @Test
    @Transactional
    public void updateNonExistingUserExt() throws Exception {
        int databaseSizeBeforeUpdate = userExtRepository.findAll().size();

        // Create the UserExt

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUserExtMockMvc.perform(put("/api/user-exts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userExt)))
            .andExpect(status().isBadRequest());

        // Validate the UserExt in the database
        List<UserExt> userExtList = userExtRepository.findAll();
        assertThat(userExtList).hasSize(databaseSizeBeforeUpdate);

        // Validate the UserExt in Elasticsearch
        verify(mockUserExtSearchRepository, times(0)).save(userExt);
    }

    @Test
    @Transactional
    public void deleteUserExt() throws Exception {
        // Initialize the database
        userExtRepository.saveAndFlush(userExt);

        int databaseSizeBeforeDelete = userExtRepository.findAll().size();

        // Delete the userExt
        restUserExtMockMvc.perform(delete("/api/user-exts/{id}", userExt.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<UserExt> userExtList = userExtRepository.findAll();
        assertThat(userExtList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the UserExt in Elasticsearch
        verify(mockUserExtSearchRepository, times(1)).deleteById(userExt.getId());
    }

    @Test
    @Transactional
    public void searchUserExt() throws Exception {
        // Initialize the database
        userExtRepository.saveAndFlush(userExt);
        when(mockUserExtSearchRepository.search(queryStringQuery("id:" + userExt.getId())))
            .thenReturn(Collections.singletonList(userExt));
        // Search the userExt
        restUserExtMockMvc.perform(get("/api/_search/user-exts?query=id:" + userExt.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(userExt.getId().intValue())))
            .andExpect(jsonPath("$.[*].payerId").value(hasItem(DEFAULT_PAYER_ID)))
            .andExpect(jsonPath("$.[*].phoneNumber").value(hasItem(DEFAULT_PHONE_NUMBER)));
    }
}
