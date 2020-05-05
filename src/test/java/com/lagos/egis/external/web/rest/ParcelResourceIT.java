package com.lagos.egis.external.web.rest;

import com.lagos.egis.external.EgisexternalApp;
import com.lagos.egis.external.domain.Parcel;
import com.lagos.egis.external.repository.ParcelRepository;
import com.lagos.egis.external.repository.search.ParcelSearchRepository;
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
 * Integration tests for the {@link ParcelResource} REST controller.
 */
@SpringBootTest(classes = EgisexternalApp.class)
public class ParcelResourceIT {

    private static final String DEFAULT_LABEL = "AAAAAAAAAA";
    private static final String UPDATED_LABEL = "BBBBBBBBBB";

    private static final Double DEFAULT_AREA = 1D;
    private static final Double UPDATED_AREA = 2D;

    private static final String DEFAULT_REGISTRATION_OFFICE_DICTIONARY = "AAAAAAAAAA";
    private static final String UPDATED_REGISTRATION_OFFICE_DICTIONARY = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_SURVEY_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_SURVEY_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_ACCOMMODATION = "AAAAAAAAAA";
    private static final String UPDATED_ACCOMMODATION = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Double DEFAULT_PROPERTY_AREA = 1D;
    private static final Double UPDATED_PROPERTY_AREA = 2D;

    private static final String DEFAULT_PLAN_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_PLAN_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_PREMIUM_VALUE = "AAAAAAAAAA";
    private static final String UPDATED_PREMIUM_VALUE = "BBBBBBBBBB";

    private static final Integer DEFAULT_COORDINATE_N = 1;
    private static final Integer UPDATED_COORDINATE_N = 2;

    private static final Integer DEFAULT_COORDINATE_S = 1;
    private static final Integer UPDATED_COORDINATE_S = 2;

    private static final String DEFAULT_LAGOS_SHEET_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_LAGOS_SHEET_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_ALLOCATION = "AAAAAAAAAA";
    private static final String UPDATED_ALLOCATION = "BBBBBBBBBB";

    private static final Integer DEFAULT_LOCATION_1 = 1;
    private static final Integer UPDATED_LOCATION_1 = 2;

    private static final String DEFAULT_UNIT_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_UNIT_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_VALUATION = "AAAAAAAAAA";
    private static final String UPDATED_VALUATION = "BBBBBBBBBB";

    private static final String DEFAULT_COMMENTS = "AAAAAAAAAA";
    private static final String UPDATED_COMMENTS = "BBBBBBBBBB";

    private static final String DEFAULT_LEGAL_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_LEGAL_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private ParcelRepository parcelRepository;

    /**
     * This repository is mocked in the com.lagos.egis.external.repository.search test package.
     *
     * @see com.lagos.egis.external.repository.search.ParcelSearchRepositoryMockConfiguration
     */
    @Autowired
    private ParcelSearchRepository mockParcelSearchRepository;

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

    private MockMvc restParcelMockMvc;

    private Parcel parcel;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ParcelResource parcelResource = new ParcelResource(parcelRepository, mockParcelSearchRepository);
        this.restParcelMockMvc = MockMvcBuilders.standaloneSetup(parcelResource)
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
    public static Parcel createEntity(EntityManager em) {
        Parcel parcel = new Parcel()
            .label(DEFAULT_LABEL)
            .area(DEFAULT_AREA)
            .registrationOfficeDictionary(DEFAULT_REGISTRATION_OFFICE_DICTIONARY)
            .surveyDate(DEFAULT_SURVEY_DATE)
            .accommodation(DEFAULT_ACCOMMODATION)
            .description(DEFAULT_DESCRIPTION)
            .propertyArea(DEFAULT_PROPERTY_AREA)
            .planNumber(DEFAULT_PLAN_NUMBER)
            .premiumValue(DEFAULT_PREMIUM_VALUE)
            .coordinateN(DEFAULT_COORDINATE_N)
            .coordinateS(DEFAULT_COORDINATE_S)
            .lagosSheetNumber(DEFAULT_LAGOS_SHEET_NUMBER)
            .allocation(DEFAULT_ALLOCATION)
            .location1(DEFAULT_LOCATION_1)
            .unitNumber(DEFAULT_UNIT_NUMBER)
            .name(DEFAULT_NAME)
            .valuation(DEFAULT_VALUATION)
            .comments(DEFAULT_COMMENTS)
            .legalDescription(DEFAULT_LEGAL_DESCRIPTION);
        return parcel;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Parcel createUpdatedEntity(EntityManager em) {
        Parcel parcel = new Parcel()
            .label(UPDATED_LABEL)
            .area(UPDATED_AREA)
            .registrationOfficeDictionary(UPDATED_REGISTRATION_OFFICE_DICTIONARY)
            .surveyDate(UPDATED_SURVEY_DATE)
            .accommodation(UPDATED_ACCOMMODATION)
            .description(UPDATED_DESCRIPTION)
            .propertyArea(UPDATED_PROPERTY_AREA)
            .planNumber(UPDATED_PLAN_NUMBER)
            .premiumValue(UPDATED_PREMIUM_VALUE)
            .coordinateN(UPDATED_COORDINATE_N)
            .coordinateS(UPDATED_COORDINATE_S)
            .lagosSheetNumber(UPDATED_LAGOS_SHEET_NUMBER)
            .allocation(UPDATED_ALLOCATION)
            .location1(UPDATED_LOCATION_1)
            .unitNumber(UPDATED_UNIT_NUMBER)
            .name(UPDATED_NAME)
            .valuation(UPDATED_VALUATION)
            .comments(UPDATED_COMMENTS)
            .legalDescription(UPDATED_LEGAL_DESCRIPTION);
        return parcel;
    }

    @BeforeEach
    public void initTest() {
        parcel = createEntity(em);
    }

    @Test
    @Transactional
    public void createParcel() throws Exception {
        int databaseSizeBeforeCreate = parcelRepository.findAll().size();

        // Create the Parcel
        restParcelMockMvc.perform(post("/api/parcels")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(parcel)))
            .andExpect(status().isCreated());

        // Validate the Parcel in the database
        List<Parcel> parcelList = parcelRepository.findAll();
        assertThat(parcelList).hasSize(databaseSizeBeforeCreate + 1);
        Parcel testParcel = parcelList.get(parcelList.size() - 1);
        assertThat(testParcel.getLabel()).isEqualTo(DEFAULT_LABEL);
        assertThat(testParcel.getArea()).isEqualTo(DEFAULT_AREA);
        assertThat(testParcel.getRegistrationOfficeDictionary()).isEqualTo(DEFAULT_REGISTRATION_OFFICE_DICTIONARY);
        assertThat(testParcel.getSurveyDate()).isEqualTo(DEFAULT_SURVEY_DATE);
        assertThat(testParcel.getAccommodation()).isEqualTo(DEFAULT_ACCOMMODATION);
        assertThat(testParcel.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testParcel.getPropertyArea()).isEqualTo(DEFAULT_PROPERTY_AREA);
        assertThat(testParcel.getPlanNumber()).isEqualTo(DEFAULT_PLAN_NUMBER);
        assertThat(testParcel.getPremiumValue()).isEqualTo(DEFAULT_PREMIUM_VALUE);
        assertThat(testParcel.getCoordinateN()).isEqualTo(DEFAULT_COORDINATE_N);
        assertThat(testParcel.getCoordinateS()).isEqualTo(DEFAULT_COORDINATE_S);
        assertThat(testParcel.getLagosSheetNumber()).isEqualTo(DEFAULT_LAGOS_SHEET_NUMBER);
        assertThat(testParcel.getAllocation()).isEqualTo(DEFAULT_ALLOCATION);
        assertThat(testParcel.getLocation1()).isEqualTo(DEFAULT_LOCATION_1);
        assertThat(testParcel.getUnitNumber()).isEqualTo(DEFAULT_UNIT_NUMBER);
        assertThat(testParcel.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testParcel.getValuation()).isEqualTo(DEFAULT_VALUATION);
        assertThat(testParcel.getComments()).isEqualTo(DEFAULT_COMMENTS);
        assertThat(testParcel.getLegalDescription()).isEqualTo(DEFAULT_LEGAL_DESCRIPTION);

        // Validate the Parcel in Elasticsearch
        verify(mockParcelSearchRepository, times(1)).save(testParcel);
    }

    @Test
    @Transactional
    public void createParcelWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = parcelRepository.findAll().size();

        // Create the Parcel with an existing ID
        parcel.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restParcelMockMvc.perform(post("/api/parcels")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(parcel)))
            .andExpect(status().isBadRequest());

        // Validate the Parcel in the database
        List<Parcel> parcelList = parcelRepository.findAll();
        assertThat(parcelList).hasSize(databaseSizeBeforeCreate);

        // Validate the Parcel in Elasticsearch
        verify(mockParcelSearchRepository, times(0)).save(parcel);
    }


    @Test
    @Transactional
    public void getAllParcels() throws Exception {
        // Initialize the database
        parcelRepository.saveAndFlush(parcel);

        // Get all the parcelList
        restParcelMockMvc.perform(get("/api/parcels?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(parcel.getId().intValue())))
            .andExpect(jsonPath("$.[*].label").value(hasItem(DEFAULT_LABEL)))
            .andExpect(jsonPath("$.[*].area").value(hasItem(DEFAULT_AREA.doubleValue())))
            .andExpect(jsonPath("$.[*].registrationOfficeDictionary").value(hasItem(DEFAULT_REGISTRATION_OFFICE_DICTIONARY)))
            .andExpect(jsonPath("$.[*].surveyDate").value(hasItem(DEFAULT_SURVEY_DATE.toString())))
            .andExpect(jsonPath("$.[*].accommodation").value(hasItem(DEFAULT_ACCOMMODATION)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].propertyArea").value(hasItem(DEFAULT_PROPERTY_AREA.doubleValue())))
            .andExpect(jsonPath("$.[*].planNumber").value(hasItem(DEFAULT_PLAN_NUMBER)))
            .andExpect(jsonPath("$.[*].premiumValue").value(hasItem(DEFAULT_PREMIUM_VALUE)))
            .andExpect(jsonPath("$.[*].coordinateN").value(hasItem(DEFAULT_COORDINATE_N)))
            .andExpect(jsonPath("$.[*].coordinateS").value(hasItem(DEFAULT_COORDINATE_S)))
            .andExpect(jsonPath("$.[*].lagosSheetNumber").value(hasItem(DEFAULT_LAGOS_SHEET_NUMBER)))
            .andExpect(jsonPath("$.[*].allocation").value(hasItem(DEFAULT_ALLOCATION)))
            .andExpect(jsonPath("$.[*].location1").value(hasItem(DEFAULT_LOCATION_1)))
            .andExpect(jsonPath("$.[*].unitNumber").value(hasItem(DEFAULT_UNIT_NUMBER)))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].valuation").value(hasItem(DEFAULT_VALUATION)))
            .andExpect(jsonPath("$.[*].comments").value(hasItem(DEFAULT_COMMENTS)))
            .andExpect(jsonPath("$.[*].legalDescription").value(hasItem(DEFAULT_LEGAL_DESCRIPTION)));
    }
    
    @Test
    @Transactional
    public void getParcel() throws Exception {
        // Initialize the database
        parcelRepository.saveAndFlush(parcel);

        // Get the parcel
        restParcelMockMvc.perform(get("/api/parcels/{id}", parcel.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(parcel.getId().intValue()))
            .andExpect(jsonPath("$.label").value(DEFAULT_LABEL))
            .andExpect(jsonPath("$.area").value(DEFAULT_AREA.doubleValue()))
            .andExpect(jsonPath("$.registrationOfficeDictionary").value(DEFAULT_REGISTRATION_OFFICE_DICTIONARY))
            .andExpect(jsonPath("$.surveyDate").value(DEFAULT_SURVEY_DATE.toString()))
            .andExpect(jsonPath("$.accommodation").value(DEFAULT_ACCOMMODATION))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION))
            .andExpect(jsonPath("$.propertyArea").value(DEFAULT_PROPERTY_AREA.doubleValue()))
            .andExpect(jsonPath("$.planNumber").value(DEFAULT_PLAN_NUMBER))
            .andExpect(jsonPath("$.premiumValue").value(DEFAULT_PREMIUM_VALUE))
            .andExpect(jsonPath("$.coordinateN").value(DEFAULT_COORDINATE_N))
            .andExpect(jsonPath("$.coordinateS").value(DEFAULT_COORDINATE_S))
            .andExpect(jsonPath("$.lagosSheetNumber").value(DEFAULT_LAGOS_SHEET_NUMBER))
            .andExpect(jsonPath("$.allocation").value(DEFAULT_ALLOCATION))
            .andExpect(jsonPath("$.location1").value(DEFAULT_LOCATION_1))
            .andExpect(jsonPath("$.unitNumber").value(DEFAULT_UNIT_NUMBER))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.valuation").value(DEFAULT_VALUATION))
            .andExpect(jsonPath("$.comments").value(DEFAULT_COMMENTS))
            .andExpect(jsonPath("$.legalDescription").value(DEFAULT_LEGAL_DESCRIPTION));
    }

    @Test
    @Transactional
    public void getNonExistingParcel() throws Exception {
        // Get the parcel
        restParcelMockMvc.perform(get("/api/parcels/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateParcel() throws Exception {
        // Initialize the database
        parcelRepository.saveAndFlush(parcel);

        int databaseSizeBeforeUpdate = parcelRepository.findAll().size();

        // Update the parcel
        Parcel updatedParcel = parcelRepository.findById(parcel.getId()).get();
        // Disconnect from session so that the updates on updatedParcel are not directly saved in db
        em.detach(updatedParcel);
        updatedParcel
            .label(UPDATED_LABEL)
            .area(UPDATED_AREA)
            .registrationOfficeDictionary(UPDATED_REGISTRATION_OFFICE_DICTIONARY)
            .surveyDate(UPDATED_SURVEY_DATE)
            .accommodation(UPDATED_ACCOMMODATION)
            .description(UPDATED_DESCRIPTION)
            .propertyArea(UPDATED_PROPERTY_AREA)
            .planNumber(UPDATED_PLAN_NUMBER)
            .premiumValue(UPDATED_PREMIUM_VALUE)
            .coordinateN(UPDATED_COORDINATE_N)
            .coordinateS(UPDATED_COORDINATE_S)
            .lagosSheetNumber(UPDATED_LAGOS_SHEET_NUMBER)
            .allocation(UPDATED_ALLOCATION)
            .location1(UPDATED_LOCATION_1)
            .unitNumber(UPDATED_UNIT_NUMBER)
            .name(UPDATED_NAME)
            .valuation(UPDATED_VALUATION)
            .comments(UPDATED_COMMENTS)
            .legalDescription(UPDATED_LEGAL_DESCRIPTION);

        restParcelMockMvc.perform(put("/api/parcels")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedParcel)))
            .andExpect(status().isOk());

        // Validate the Parcel in the database
        List<Parcel> parcelList = parcelRepository.findAll();
        assertThat(parcelList).hasSize(databaseSizeBeforeUpdate);
        Parcel testParcel = parcelList.get(parcelList.size() - 1);
        assertThat(testParcel.getLabel()).isEqualTo(UPDATED_LABEL);
        assertThat(testParcel.getArea()).isEqualTo(UPDATED_AREA);
        assertThat(testParcel.getRegistrationOfficeDictionary()).isEqualTo(UPDATED_REGISTRATION_OFFICE_DICTIONARY);
        assertThat(testParcel.getSurveyDate()).isEqualTo(UPDATED_SURVEY_DATE);
        assertThat(testParcel.getAccommodation()).isEqualTo(UPDATED_ACCOMMODATION);
        assertThat(testParcel.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testParcel.getPropertyArea()).isEqualTo(UPDATED_PROPERTY_AREA);
        assertThat(testParcel.getPlanNumber()).isEqualTo(UPDATED_PLAN_NUMBER);
        assertThat(testParcel.getPremiumValue()).isEqualTo(UPDATED_PREMIUM_VALUE);
        assertThat(testParcel.getCoordinateN()).isEqualTo(UPDATED_COORDINATE_N);
        assertThat(testParcel.getCoordinateS()).isEqualTo(UPDATED_COORDINATE_S);
        assertThat(testParcel.getLagosSheetNumber()).isEqualTo(UPDATED_LAGOS_SHEET_NUMBER);
        assertThat(testParcel.getAllocation()).isEqualTo(UPDATED_ALLOCATION);
        assertThat(testParcel.getLocation1()).isEqualTo(UPDATED_LOCATION_1);
        assertThat(testParcel.getUnitNumber()).isEqualTo(UPDATED_UNIT_NUMBER);
        assertThat(testParcel.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testParcel.getValuation()).isEqualTo(UPDATED_VALUATION);
        assertThat(testParcel.getComments()).isEqualTo(UPDATED_COMMENTS);
        assertThat(testParcel.getLegalDescription()).isEqualTo(UPDATED_LEGAL_DESCRIPTION);

        // Validate the Parcel in Elasticsearch
        verify(mockParcelSearchRepository, times(1)).save(testParcel);
    }

    @Test
    @Transactional
    public void updateNonExistingParcel() throws Exception {
        int databaseSizeBeforeUpdate = parcelRepository.findAll().size();

        // Create the Parcel

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restParcelMockMvc.perform(put("/api/parcels")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(parcel)))
            .andExpect(status().isBadRequest());

        // Validate the Parcel in the database
        List<Parcel> parcelList = parcelRepository.findAll();
        assertThat(parcelList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Parcel in Elasticsearch
        verify(mockParcelSearchRepository, times(0)).save(parcel);
    }

    @Test
    @Transactional
    public void deleteParcel() throws Exception {
        // Initialize the database
        parcelRepository.saveAndFlush(parcel);

        int databaseSizeBeforeDelete = parcelRepository.findAll().size();

        // Delete the parcel
        restParcelMockMvc.perform(delete("/api/parcels/{id}", parcel.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Parcel> parcelList = parcelRepository.findAll();
        assertThat(parcelList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Parcel in Elasticsearch
        verify(mockParcelSearchRepository, times(1)).deleteById(parcel.getId());
    }

    @Test
    @Transactional
    public void searchParcel() throws Exception {
        // Initialize the database
        parcelRepository.saveAndFlush(parcel);
        when(mockParcelSearchRepository.search(queryStringQuery("id:" + parcel.getId())))
            .thenReturn(Collections.singletonList(parcel));
        // Search the parcel
        restParcelMockMvc.perform(get("/api/_search/parcels?query=id:" + parcel.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(parcel.getId().intValue())))
            .andExpect(jsonPath("$.[*].label").value(hasItem(DEFAULT_LABEL)))
            .andExpect(jsonPath("$.[*].area").value(hasItem(DEFAULT_AREA.doubleValue())))
            .andExpect(jsonPath("$.[*].registrationOfficeDictionary").value(hasItem(DEFAULT_REGISTRATION_OFFICE_DICTIONARY)))
            .andExpect(jsonPath("$.[*].surveyDate").value(hasItem(DEFAULT_SURVEY_DATE.toString())))
            .andExpect(jsonPath("$.[*].accommodation").value(hasItem(DEFAULT_ACCOMMODATION)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].propertyArea").value(hasItem(DEFAULT_PROPERTY_AREA.doubleValue())))
            .andExpect(jsonPath("$.[*].planNumber").value(hasItem(DEFAULT_PLAN_NUMBER)))
            .andExpect(jsonPath("$.[*].premiumValue").value(hasItem(DEFAULT_PREMIUM_VALUE)))
            .andExpect(jsonPath("$.[*].coordinateN").value(hasItem(DEFAULT_COORDINATE_N)))
            .andExpect(jsonPath("$.[*].coordinateS").value(hasItem(DEFAULT_COORDINATE_S)))
            .andExpect(jsonPath("$.[*].lagosSheetNumber").value(hasItem(DEFAULT_LAGOS_SHEET_NUMBER)))
            .andExpect(jsonPath("$.[*].allocation").value(hasItem(DEFAULT_ALLOCATION)))
            .andExpect(jsonPath("$.[*].location1").value(hasItem(DEFAULT_LOCATION_1)))
            .andExpect(jsonPath("$.[*].unitNumber").value(hasItem(DEFAULT_UNIT_NUMBER)))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].valuation").value(hasItem(DEFAULT_VALUATION)))
            .andExpect(jsonPath("$.[*].comments").value(hasItem(DEFAULT_COMMENTS)))
            .andExpect(jsonPath("$.[*].legalDescription").value(hasItem(DEFAULT_LEGAL_DESCRIPTION)));
    }
}
