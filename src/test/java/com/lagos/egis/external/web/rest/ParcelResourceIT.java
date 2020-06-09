package com.lagos.egis.external.web.rest;

import com.lagos.egis.external.EgisexternalApp;
import com.lagos.egis.external.domain.Parcel;
import com.lagos.egis.external.domain.Dictionary;
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

    private static final String DEFAULT_PROPERTY_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_PROPERTY_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_PARCEL_LINEAGE = "AAAAAAAAAA";
    private static final String UPDATED_PARCEL_LINEAGE = "BBBBBBBBBB";

    private static final String DEFAULT_SURVEY_PLAN_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_SURVEY_PLAN_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_PROPERTY_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_PROPERTY_DESCRIPTION = "BBBBBBBBBB";

    private static final Double DEFAULT_AREA = 1D;
    private static final Double UPDATED_AREA = 2D;

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_PLAN_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_PLAN_NUMBER = "BBBBBBBBBB";

    private static final Double DEFAULT_PREMIUM_VALUE = 1D;
    private static final Double UPDATED_PREMIUM_VALUE = 2D;

    private static final Integer DEFAULT_COORDINATE_N = 1;
    private static final Integer UPDATED_COORDINATE_N = 2;

    private static final Integer DEFAULT_COORDINATE_E = 1;
    private static final Integer UPDATED_COORDINATE_E = 2;

    private static final String DEFAULT_LAGOS_SHEET_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_LAGOS_SHEET_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_UNIT_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_UNIT_NUMBER = "BBBBBBBBBB";

    private static final Double DEFAULT_VALUATION_AMOUNT = 1D;
    private static final Double UPDATED_VALUATION_AMOUNT = 2D;

    private static final String DEFAULT_COMMENTS = "AAAAAAAAAA";
    private static final String UPDATED_COMMENTS = "BBBBBBBBBB";

    private static final String DEFAULT_STREET_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_STREET_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_STREET_NAME = "AAAAAAAAAA";
    private static final String UPDATED_STREET_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_BLOCK_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_BLOCK_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_PLOT_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_PLOT_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_WARD = "AAAAAAAAAA";
    private static final String UPDATED_WARD = "BBBBBBBBBB";

    private static final String DEFAULT_TOWN = "AAAAAAAAAA";
    private static final String UPDATED_TOWN = "BBBBBBBBBB";

    private static final Double DEFAULT_PROPERTY_AREA = 1D;
    private static final Double UPDATED_PROPERTY_AREA = 2D;

    private static final String DEFAULT_VILLAGE = "AAAAAAAAAA";
    private static final String UPDATED_VILLAGE = "BBBBBBBBBB";

    private static final String DEFAULT_UPIN = "AAAAAAAAAA";
    private static final String UPDATED_UPIN = "BBBBBBBBBB";

    private static final String DEFAULT_COMMENT = "AAAAAAAAAA";
    private static final String UPDATED_COMMENT = "BBBBBBBBBB";

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
            .propertyNumber(DEFAULT_PROPERTY_NUMBER)
            .parcelLineage(DEFAULT_PARCEL_LINEAGE)
            .surveyPlanNumber(DEFAULT_SURVEY_PLAN_NUMBER)
            .propertyDescription(DEFAULT_PROPERTY_DESCRIPTION)
            .area(DEFAULT_AREA)
            .description(DEFAULT_DESCRIPTION)
            .planNumber(DEFAULT_PLAN_NUMBER)
            .premiumValue(DEFAULT_PREMIUM_VALUE)
            .coordinateN(DEFAULT_COORDINATE_N)
            .coordinateE(DEFAULT_COORDINATE_E)
            .lagosSheetNumber(DEFAULT_LAGOS_SHEET_NUMBER)
            .unitNumber(DEFAULT_UNIT_NUMBER)
            .valuationAmount(DEFAULT_VALUATION_AMOUNT)
            .comments(DEFAULT_COMMENTS)
            .streetNumber(DEFAULT_STREET_NUMBER)
            .streetName(DEFAULT_STREET_NAME)
            .blockNumber(DEFAULT_BLOCK_NUMBER)
            .plotNumber(DEFAULT_PLOT_NUMBER)
            .ward(DEFAULT_WARD)
            .town(DEFAULT_TOWN)
            .propertyArea(DEFAULT_PROPERTY_AREA)
            .village(DEFAULT_VILLAGE)
            .upin(DEFAULT_UPIN)
            .comment(DEFAULT_COMMENT);
        // Add required entity
        Dictionary dictionary;
        if (TestUtil.findAll(em, Dictionary.class).isEmpty()) {
            dictionary = DictionaryResourceIT.createEntity(em);
            em.persist(dictionary);
            em.flush();
        } else {
            dictionary = TestUtil.findAll(em, Dictionary.class).get(0);
        }
        parcel.setMeasurementUnitType(dictionary);
        // Add required entity
        parcel.setPropertyType(dictionary);
        // Add required entity
        parcel.setLocalGovernmentArea(dictionary);
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
            .propertyNumber(UPDATED_PROPERTY_NUMBER)
            .parcelLineage(UPDATED_PARCEL_LINEAGE)
            .surveyPlanNumber(UPDATED_SURVEY_PLAN_NUMBER)
            .propertyDescription(UPDATED_PROPERTY_DESCRIPTION)
            .area(UPDATED_AREA)
            .description(UPDATED_DESCRIPTION)
            .planNumber(UPDATED_PLAN_NUMBER)
            .premiumValue(UPDATED_PREMIUM_VALUE)
            .coordinateN(UPDATED_COORDINATE_N)
            .coordinateE(UPDATED_COORDINATE_E)
            .lagosSheetNumber(UPDATED_LAGOS_SHEET_NUMBER)
            .unitNumber(UPDATED_UNIT_NUMBER)
            .valuationAmount(UPDATED_VALUATION_AMOUNT)
            .comments(UPDATED_COMMENTS)
            .streetNumber(UPDATED_STREET_NUMBER)
            .streetName(UPDATED_STREET_NAME)
            .blockNumber(UPDATED_BLOCK_NUMBER)
            .plotNumber(UPDATED_PLOT_NUMBER)
            .ward(UPDATED_WARD)
            .town(UPDATED_TOWN)
            .propertyArea(UPDATED_PROPERTY_AREA)
            .village(UPDATED_VILLAGE)
            .upin(UPDATED_UPIN)
            .comment(UPDATED_COMMENT);
        // Add required entity
        Dictionary dictionary;
        if (TestUtil.findAll(em, Dictionary.class).isEmpty()) {
            dictionary = DictionaryResourceIT.createUpdatedEntity(em);
            em.persist(dictionary);
            em.flush();
        } else {
            dictionary = TestUtil.findAll(em, Dictionary.class).get(0);
        }
        parcel.setMeasurementUnitType(dictionary);
        // Add required entity
        parcel.setPropertyType(dictionary);
        // Add required entity
        parcel.setLocalGovernmentArea(dictionary);
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
        assertThat(testParcel.getPropertyNumber()).isEqualTo(DEFAULT_PROPERTY_NUMBER);
        assertThat(testParcel.getParcelLineage()).isEqualTo(DEFAULT_PARCEL_LINEAGE);
        assertThat(testParcel.getSurveyPlanNumber()).isEqualTo(DEFAULT_SURVEY_PLAN_NUMBER);
        assertThat(testParcel.getPropertyDescription()).isEqualTo(DEFAULT_PROPERTY_DESCRIPTION);
        assertThat(testParcel.getArea()).isEqualTo(DEFAULT_AREA);
        assertThat(testParcel.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testParcel.getPlanNumber()).isEqualTo(DEFAULT_PLAN_NUMBER);
        assertThat(testParcel.getPremiumValue()).isEqualTo(DEFAULT_PREMIUM_VALUE);
        assertThat(testParcel.getCoordinateN()).isEqualTo(DEFAULT_COORDINATE_N);
        assertThat(testParcel.getCoordinateE()).isEqualTo(DEFAULT_COORDINATE_E);
        assertThat(testParcel.getLagosSheetNumber()).isEqualTo(DEFAULT_LAGOS_SHEET_NUMBER);
        assertThat(testParcel.getUnitNumber()).isEqualTo(DEFAULT_UNIT_NUMBER);
        assertThat(testParcel.getValuationAmount()).isEqualTo(DEFAULT_VALUATION_AMOUNT);
        assertThat(testParcel.getComments()).isEqualTo(DEFAULT_COMMENTS);
        assertThat(testParcel.getStreetNumber()).isEqualTo(DEFAULT_STREET_NUMBER);
        assertThat(testParcel.getStreetName()).isEqualTo(DEFAULT_STREET_NAME);
        assertThat(testParcel.getBlockNumber()).isEqualTo(DEFAULT_BLOCK_NUMBER);
        assertThat(testParcel.getPlotNumber()).isEqualTo(DEFAULT_PLOT_NUMBER);
        assertThat(testParcel.getWard()).isEqualTo(DEFAULT_WARD);
        assertThat(testParcel.getTown()).isEqualTo(DEFAULT_TOWN);
        assertThat(testParcel.getPropertyArea()).isEqualTo(DEFAULT_PROPERTY_AREA);
        assertThat(testParcel.getVillage()).isEqualTo(DEFAULT_VILLAGE);
        assertThat(testParcel.getUpin()).isEqualTo(DEFAULT_UPIN);
        assertThat(testParcel.getComment()).isEqualTo(DEFAULT_COMMENT);

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
    public void checkBlockNumberIsRequired() throws Exception {
        int databaseSizeBeforeTest = parcelRepository.findAll().size();
        // set the field null
        parcel.setBlockNumber(null);

        // Create the Parcel, which fails.

        restParcelMockMvc.perform(post("/api/parcels")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(parcel)))
            .andExpect(status().isBadRequest());

        List<Parcel> parcelList = parcelRepository.findAll();
        assertThat(parcelList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPlotNumberIsRequired() throws Exception {
        int databaseSizeBeforeTest = parcelRepository.findAll().size();
        // set the field null
        parcel.setPlotNumber(null);

        // Create the Parcel, which fails.

        restParcelMockMvc.perform(post("/api/parcels")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(parcel)))
            .andExpect(status().isBadRequest());

        List<Parcel> parcelList = parcelRepository.findAll();
        assertThat(parcelList).hasSize(databaseSizeBeforeTest);
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
            .andExpect(jsonPath("$.[*].propertyNumber").value(hasItem(DEFAULT_PROPERTY_NUMBER)))
            .andExpect(jsonPath("$.[*].parcelLineage").value(hasItem(DEFAULT_PARCEL_LINEAGE)))
            .andExpect(jsonPath("$.[*].surveyPlanNumber").value(hasItem(DEFAULT_SURVEY_PLAN_NUMBER)))
            .andExpect(jsonPath("$.[*].propertyDescription").value(hasItem(DEFAULT_PROPERTY_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].area").value(hasItem(DEFAULT_AREA.doubleValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].planNumber").value(hasItem(DEFAULT_PLAN_NUMBER)))
            .andExpect(jsonPath("$.[*].premiumValue").value(hasItem(DEFAULT_PREMIUM_VALUE.doubleValue())))
            .andExpect(jsonPath("$.[*].coordinateN").value(hasItem(DEFAULT_COORDINATE_N)))
            .andExpect(jsonPath("$.[*].coordinateE").value(hasItem(DEFAULT_COORDINATE_E)))
            .andExpect(jsonPath("$.[*].lagosSheetNumber").value(hasItem(DEFAULT_LAGOS_SHEET_NUMBER)))
            .andExpect(jsonPath("$.[*].unitNumber").value(hasItem(DEFAULT_UNIT_NUMBER)))
            .andExpect(jsonPath("$.[*].valuationAmount").value(hasItem(DEFAULT_VALUATION_AMOUNT.doubleValue())))
            .andExpect(jsonPath("$.[*].comments").value(hasItem(DEFAULT_COMMENTS)))
            .andExpect(jsonPath("$.[*].streetNumber").value(hasItem(DEFAULT_STREET_NUMBER)))
            .andExpect(jsonPath("$.[*].streetName").value(hasItem(DEFAULT_STREET_NAME)))
            .andExpect(jsonPath("$.[*].blockNumber").value(hasItem(DEFAULT_BLOCK_NUMBER)))
            .andExpect(jsonPath("$.[*].plotNumber").value(hasItem(DEFAULT_PLOT_NUMBER)))
            .andExpect(jsonPath("$.[*].ward").value(hasItem(DEFAULT_WARD)))
            .andExpect(jsonPath("$.[*].town").value(hasItem(DEFAULT_TOWN)))
            .andExpect(jsonPath("$.[*].propertyArea").value(hasItem(DEFAULT_PROPERTY_AREA.doubleValue())))
            .andExpect(jsonPath("$.[*].village").value(hasItem(DEFAULT_VILLAGE)))
            .andExpect(jsonPath("$.[*].upin").value(hasItem(DEFAULT_UPIN)))
            .andExpect(jsonPath("$.[*].comment").value(hasItem(DEFAULT_COMMENT)));
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
            .andExpect(jsonPath("$.propertyNumber").value(DEFAULT_PROPERTY_NUMBER))
            .andExpect(jsonPath("$.parcelLineage").value(DEFAULT_PARCEL_LINEAGE))
            .andExpect(jsonPath("$.surveyPlanNumber").value(DEFAULT_SURVEY_PLAN_NUMBER))
            .andExpect(jsonPath("$.propertyDescription").value(DEFAULT_PROPERTY_DESCRIPTION))
            .andExpect(jsonPath("$.area").value(DEFAULT_AREA.doubleValue()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION))
            .andExpect(jsonPath("$.planNumber").value(DEFAULT_PLAN_NUMBER))
            .andExpect(jsonPath("$.premiumValue").value(DEFAULT_PREMIUM_VALUE.doubleValue()))
            .andExpect(jsonPath("$.coordinateN").value(DEFAULT_COORDINATE_N))
            .andExpect(jsonPath("$.coordinateE").value(DEFAULT_COORDINATE_E))
            .andExpect(jsonPath("$.lagosSheetNumber").value(DEFAULT_LAGOS_SHEET_NUMBER))
            .andExpect(jsonPath("$.unitNumber").value(DEFAULT_UNIT_NUMBER))
            .andExpect(jsonPath("$.valuationAmount").value(DEFAULT_VALUATION_AMOUNT.doubleValue()))
            .andExpect(jsonPath("$.comments").value(DEFAULT_COMMENTS))
            .andExpect(jsonPath("$.streetNumber").value(DEFAULT_STREET_NUMBER))
            .andExpect(jsonPath("$.streetName").value(DEFAULT_STREET_NAME))
            .andExpect(jsonPath("$.blockNumber").value(DEFAULT_BLOCK_NUMBER))
            .andExpect(jsonPath("$.plotNumber").value(DEFAULT_PLOT_NUMBER))
            .andExpect(jsonPath("$.ward").value(DEFAULT_WARD))
            .andExpect(jsonPath("$.town").value(DEFAULT_TOWN))
            .andExpect(jsonPath("$.propertyArea").value(DEFAULT_PROPERTY_AREA.doubleValue()))
            .andExpect(jsonPath("$.village").value(DEFAULT_VILLAGE))
            .andExpect(jsonPath("$.upin").value(DEFAULT_UPIN))
            .andExpect(jsonPath("$.comment").value(DEFAULT_COMMENT));
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
            .propertyNumber(UPDATED_PROPERTY_NUMBER)
            .parcelLineage(UPDATED_PARCEL_LINEAGE)
            .surveyPlanNumber(UPDATED_SURVEY_PLAN_NUMBER)
            .propertyDescription(UPDATED_PROPERTY_DESCRIPTION)
            .area(UPDATED_AREA)
            .description(UPDATED_DESCRIPTION)
            .planNumber(UPDATED_PLAN_NUMBER)
            .premiumValue(UPDATED_PREMIUM_VALUE)
            .coordinateN(UPDATED_COORDINATE_N)
            .coordinateE(UPDATED_COORDINATE_E)
            .lagosSheetNumber(UPDATED_LAGOS_SHEET_NUMBER)
            .unitNumber(UPDATED_UNIT_NUMBER)
            .valuationAmount(UPDATED_VALUATION_AMOUNT)
            .comments(UPDATED_COMMENTS)
            .streetNumber(UPDATED_STREET_NUMBER)
            .streetName(UPDATED_STREET_NAME)
            .blockNumber(UPDATED_BLOCK_NUMBER)
            .plotNumber(UPDATED_PLOT_NUMBER)
            .ward(UPDATED_WARD)
            .town(UPDATED_TOWN)
            .propertyArea(UPDATED_PROPERTY_AREA)
            .village(UPDATED_VILLAGE)
            .upin(UPDATED_UPIN)
            .comment(UPDATED_COMMENT);

        restParcelMockMvc.perform(put("/api/parcels")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedParcel)))
            .andExpect(status().isOk());

        // Validate the Parcel in the database
        List<Parcel> parcelList = parcelRepository.findAll();
        assertThat(parcelList).hasSize(databaseSizeBeforeUpdate);
        Parcel testParcel = parcelList.get(parcelList.size() - 1);
        assertThat(testParcel.getPropertyNumber()).isEqualTo(UPDATED_PROPERTY_NUMBER);
        assertThat(testParcel.getParcelLineage()).isEqualTo(UPDATED_PARCEL_LINEAGE);
        assertThat(testParcel.getSurveyPlanNumber()).isEqualTo(UPDATED_SURVEY_PLAN_NUMBER);
        assertThat(testParcel.getPropertyDescription()).isEqualTo(UPDATED_PROPERTY_DESCRIPTION);
        assertThat(testParcel.getArea()).isEqualTo(UPDATED_AREA);
        assertThat(testParcel.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testParcel.getPlanNumber()).isEqualTo(UPDATED_PLAN_NUMBER);
        assertThat(testParcel.getPremiumValue()).isEqualTo(UPDATED_PREMIUM_VALUE);
        assertThat(testParcel.getCoordinateN()).isEqualTo(UPDATED_COORDINATE_N);
        assertThat(testParcel.getCoordinateE()).isEqualTo(UPDATED_COORDINATE_E);
        assertThat(testParcel.getLagosSheetNumber()).isEqualTo(UPDATED_LAGOS_SHEET_NUMBER);
        assertThat(testParcel.getUnitNumber()).isEqualTo(UPDATED_UNIT_NUMBER);
        assertThat(testParcel.getValuationAmount()).isEqualTo(UPDATED_VALUATION_AMOUNT);
        assertThat(testParcel.getComments()).isEqualTo(UPDATED_COMMENTS);
        assertThat(testParcel.getStreetNumber()).isEqualTo(UPDATED_STREET_NUMBER);
        assertThat(testParcel.getStreetName()).isEqualTo(UPDATED_STREET_NAME);
        assertThat(testParcel.getBlockNumber()).isEqualTo(UPDATED_BLOCK_NUMBER);
        assertThat(testParcel.getPlotNumber()).isEqualTo(UPDATED_PLOT_NUMBER);
        assertThat(testParcel.getWard()).isEqualTo(UPDATED_WARD);
        assertThat(testParcel.getTown()).isEqualTo(UPDATED_TOWN);
        assertThat(testParcel.getPropertyArea()).isEqualTo(UPDATED_PROPERTY_AREA);
        assertThat(testParcel.getVillage()).isEqualTo(UPDATED_VILLAGE);
        assertThat(testParcel.getUpin()).isEqualTo(UPDATED_UPIN);
        assertThat(testParcel.getComment()).isEqualTo(UPDATED_COMMENT);

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
            .andExpect(jsonPath("$.[*].propertyNumber").value(hasItem(DEFAULT_PROPERTY_NUMBER)))
            .andExpect(jsonPath("$.[*].parcelLineage").value(hasItem(DEFAULT_PARCEL_LINEAGE)))
            .andExpect(jsonPath("$.[*].surveyPlanNumber").value(hasItem(DEFAULT_SURVEY_PLAN_NUMBER)))
            .andExpect(jsonPath("$.[*].propertyDescription").value(hasItem(DEFAULT_PROPERTY_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].area").value(hasItem(DEFAULT_AREA.doubleValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].planNumber").value(hasItem(DEFAULT_PLAN_NUMBER)))
            .andExpect(jsonPath("$.[*].premiumValue").value(hasItem(DEFAULT_PREMIUM_VALUE.doubleValue())))
            .andExpect(jsonPath("$.[*].coordinateN").value(hasItem(DEFAULT_COORDINATE_N)))
            .andExpect(jsonPath("$.[*].coordinateE").value(hasItem(DEFAULT_COORDINATE_E)))
            .andExpect(jsonPath("$.[*].lagosSheetNumber").value(hasItem(DEFAULT_LAGOS_SHEET_NUMBER)))
            .andExpect(jsonPath("$.[*].unitNumber").value(hasItem(DEFAULT_UNIT_NUMBER)))
            .andExpect(jsonPath("$.[*].valuationAmount").value(hasItem(DEFAULT_VALUATION_AMOUNT.doubleValue())))
            .andExpect(jsonPath("$.[*].comments").value(hasItem(DEFAULT_COMMENTS)))
            .andExpect(jsonPath("$.[*].streetNumber").value(hasItem(DEFAULT_STREET_NUMBER)))
            .andExpect(jsonPath("$.[*].streetName").value(hasItem(DEFAULT_STREET_NAME)))
            .andExpect(jsonPath("$.[*].blockNumber").value(hasItem(DEFAULT_BLOCK_NUMBER)))
            .andExpect(jsonPath("$.[*].plotNumber").value(hasItem(DEFAULT_PLOT_NUMBER)))
            .andExpect(jsonPath("$.[*].ward").value(hasItem(DEFAULT_WARD)))
            .andExpect(jsonPath("$.[*].town").value(hasItem(DEFAULT_TOWN)))
            .andExpect(jsonPath("$.[*].propertyArea").value(hasItem(DEFAULT_PROPERTY_AREA.doubleValue())))
            .andExpect(jsonPath("$.[*].village").value(hasItem(DEFAULT_VILLAGE)))
            .andExpect(jsonPath("$.[*].upin").value(hasItem(DEFAULT_UPIN)))
            .andExpect(jsonPath("$.[*].comment").value(hasItem(DEFAULT_COMMENT)));
    }
}
