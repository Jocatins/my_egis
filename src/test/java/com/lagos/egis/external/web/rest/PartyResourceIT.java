package com.lagos.egis.external.web.rest;

import com.lagos.egis.external.EgisexternalApp;
import com.lagos.egis.external.domain.Party;
import com.lagos.egis.external.domain.Dictionary;
import com.lagos.egis.external.repository.PartyRepository;
import com.lagos.egis.external.repository.search.PartySearchRepository;
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
 * Integration tests for the {@link PartyResource} REST controller.
 */
@SpringBootTest(classes = EgisexternalApp.class)
public class PartyResourceIT {

    private static final String DEFAULT_PRIMARY_PARTY = "AAAAAAAAAA";
    private static final String UPDATED_PRIMARY_PARTY = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL_ADDRESS = "BBBBBBBBBB";

    private static final String DEFAULT_PHONE_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_PHONE_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_PAYER_ID = "AAAAAAAAAA";
    private static final String UPDATED_PAYER_ID = "BBBBBBBBBB";

    private static final String DEFAULT_TAX_PAYER_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_TAX_PAYER_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_PAYE_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_PAYE_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_COMMENTS = "AAAAAAAAAA";
    private static final String UPDATED_COMMENTS = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_PERSON_ID_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_PERSON_ID_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_PERSON_ID_EXPIRATION_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_PERSON_ID_EXPIRATION_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_RC_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_RC_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_ORGANIZATION = "AAAAAAAAAA";
    private static final String UPDATED_ORGANIZATION = "BBBBBBBBBB";

    private static final String DEFAULT_BIRTH_PLACE = "AAAAAAAAAA";
    private static final String UPDATED_BIRTH_PLACE = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_BIRTH_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_BIRTH_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_FIRST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_FIRST_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_MIDDLE_NAME = "AAAAAAAAAA";
    private static final String UPDATED_MIDDLE_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_LAST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_LAST_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_OCCUPATION = "AAAAAAAAAA";
    private static final String UPDATED_OCCUPATION = "BBBBBBBBBB";

    private static final String DEFAULT_UNIT_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_UNIT_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_BLOCK_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_BLOCK_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_PLOT_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_PLOT_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_STREET_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_STREET_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_STREET_NAME = "AAAAAAAAAA";
    private static final String UPDATED_STREET_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_BUILDING_NAME = "AAAAAAAAAA";
    private static final String UPDATED_BUILDING_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_BUILDING_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_BUILDING_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_POSTAL_CODE = "AAAAAAAAAA";
    private static final String UPDATED_POSTAL_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_CITY = "AAAAAAAAAA";
    private static final String UPDATED_CITY = "BBBBBBBBBB";

    private static final String DEFAULT_VILLAGE = "AAAAAAAAAA";
    private static final String UPDATED_VILLAGE = "BBBBBBBBBB";

    private static final String DEFAULT_LONG_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_LONG_ADDRESS = "BBBBBBBBBB";

    private static final String DEFAULT_TOWN = "AAAAAAAAAA";
    private static final String UPDATED_TOWN = "BBBBBBBBBB";

    private static final String DEFAULT_WARD = "AAAAAAAAAA";
    private static final String UPDATED_WARD = "BBBBBBBBBB";

    private static final String DEFAULT_NEXT_OF_KIN_PHONE = "AAAAAAAAAA";
    private static final String UPDATED_NEXT_OF_KIN_PHONE = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_I_D_DOCUMENT_ISSUED_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_I_D_DOCUMENT_ISSUED_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_I_D_DOCUMENT_EXPIRATION_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_I_D_DOCUMENT_EXPIRATION_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_I_D_DOCUMENT_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_I_D_DOCUMENT_NUMBER = "BBBBBBBBBB";

    @Autowired
    private PartyRepository partyRepository;

    /**
     * This repository is mocked in the com.lagos.egis.external.repository.search test package.
     *
     * @see com.lagos.egis.external.repository.search.PartySearchRepositoryMockConfiguration
     */
    @Autowired
    private PartySearchRepository mockPartySearchRepository;

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

    private MockMvc restPartyMockMvc;

    private Party party;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PartyResource partyResource = new PartyResource(partyRepository, mockPartySearchRepository);
        this.restPartyMockMvc = MockMvcBuilders.standaloneSetup(partyResource)
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
    public static Party createEntity(EntityManager em) {
        Party party = new Party()
            .primaryParty(DEFAULT_PRIMARY_PARTY)
            .emailAddress(DEFAULT_EMAIL_ADDRESS)
            .phoneNumber(DEFAULT_PHONE_NUMBER)
            .payerId(DEFAULT_PAYER_ID)
            .taxPayerNumber(DEFAULT_TAX_PAYER_NUMBER)
            .payeNumber(DEFAULT_PAYE_NUMBER)
            .comments(DEFAULT_COMMENTS)
            .personIdDate(DEFAULT_PERSON_ID_DATE)
            .personIdExpirationDate(DEFAULT_PERSON_ID_EXPIRATION_DATE)
            .rcNumber(DEFAULT_RC_NUMBER)
            .organization(DEFAULT_ORGANIZATION)
            .birthPlace(DEFAULT_BIRTH_PLACE)
            .birthDate(DEFAULT_BIRTH_DATE)
            .firstName(DEFAULT_FIRST_NAME)
            .middleName(DEFAULT_MIDDLE_NAME)
            .lastName(DEFAULT_LAST_NAME)
            .occupation(DEFAULT_OCCUPATION)
            .unitNumber(DEFAULT_UNIT_NUMBER)
            .blockNumber(DEFAULT_BLOCK_NUMBER)
            .plotNumber(DEFAULT_PLOT_NUMBER)
            .streetNumber(DEFAULT_STREET_NUMBER)
            .streetName(DEFAULT_STREET_NAME)
            .buildingName(DEFAULT_BUILDING_NAME)
            .buildingNumber(DEFAULT_BUILDING_NUMBER)
            .postalCode(DEFAULT_POSTAL_CODE)
            .city(DEFAULT_CITY)
            .village(DEFAULT_VILLAGE)
            .longAddress(DEFAULT_LONG_ADDRESS)
            .town(DEFAULT_TOWN)
            .ward(DEFAULT_WARD)
            .nextOfKinPhone(DEFAULT_NEXT_OF_KIN_PHONE)
            .iDDocumentIssuedDate(DEFAULT_I_D_DOCUMENT_ISSUED_DATE)
            .iDDocumentExpirationDate(DEFAULT_I_D_DOCUMENT_EXPIRATION_DATE)
            .iDDocumentNumber(DEFAULT_I_D_DOCUMENT_NUMBER);
        // Add required entity
        Dictionary dictionary;
        if (TestUtil.findAll(em, Dictionary.class).isEmpty()) {
            dictionary = DictionaryResourceIT.createEntity(em);
            em.persist(dictionary);
            em.flush();
        } else {
            dictionary = TestUtil.findAll(em, Dictionary.class).get(0);
        }
        party.setPartyType(dictionary);
        // Add required entity
        party.setPartyRoleType(dictionary);
        // Add required entity
        party.setEmailType(dictionary);
        // Add required entity
        party.setPhoneCategory(dictionary);
        // Add required entity
        party.setCountry(dictionary);
        return party;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Party createUpdatedEntity(EntityManager em) {
        Party party = new Party()
            .primaryParty(UPDATED_PRIMARY_PARTY)
            .emailAddress(UPDATED_EMAIL_ADDRESS)
            .phoneNumber(UPDATED_PHONE_NUMBER)
            .payerId(UPDATED_PAYER_ID)
            .taxPayerNumber(UPDATED_TAX_PAYER_NUMBER)
            .payeNumber(UPDATED_PAYE_NUMBER)
            .comments(UPDATED_COMMENTS)
            .personIdDate(UPDATED_PERSON_ID_DATE)
            .personIdExpirationDate(UPDATED_PERSON_ID_EXPIRATION_DATE)
            .rcNumber(UPDATED_RC_NUMBER)
            .organization(UPDATED_ORGANIZATION)
            .birthPlace(UPDATED_BIRTH_PLACE)
            .birthDate(UPDATED_BIRTH_DATE)
            .firstName(UPDATED_FIRST_NAME)
            .middleName(UPDATED_MIDDLE_NAME)
            .lastName(UPDATED_LAST_NAME)
            .occupation(UPDATED_OCCUPATION)
            .unitNumber(UPDATED_UNIT_NUMBER)
            .blockNumber(UPDATED_BLOCK_NUMBER)
            .plotNumber(UPDATED_PLOT_NUMBER)
            .streetNumber(UPDATED_STREET_NUMBER)
            .streetName(UPDATED_STREET_NAME)
            .buildingName(UPDATED_BUILDING_NAME)
            .buildingNumber(UPDATED_BUILDING_NUMBER)
            .postalCode(UPDATED_POSTAL_CODE)
            .city(UPDATED_CITY)
            .village(UPDATED_VILLAGE)
            .longAddress(UPDATED_LONG_ADDRESS)
            .town(UPDATED_TOWN)
            .ward(UPDATED_WARD)
            .nextOfKinPhone(UPDATED_NEXT_OF_KIN_PHONE)
            .iDDocumentIssuedDate(UPDATED_I_D_DOCUMENT_ISSUED_DATE)
            .iDDocumentExpirationDate(UPDATED_I_D_DOCUMENT_EXPIRATION_DATE)
            .iDDocumentNumber(UPDATED_I_D_DOCUMENT_NUMBER);
        // Add required entity
        Dictionary dictionary;
        if (TestUtil.findAll(em, Dictionary.class).isEmpty()) {
            dictionary = DictionaryResourceIT.createUpdatedEntity(em);
            em.persist(dictionary);
            em.flush();
        } else {
            dictionary = TestUtil.findAll(em, Dictionary.class).get(0);
        }
        party.setPartyType(dictionary);
        // Add required entity
        party.setPartyRoleType(dictionary);
        // Add required entity
        party.setEmailType(dictionary);
        // Add required entity
        party.setPhoneCategory(dictionary);
        // Add required entity
        party.setCountry(dictionary);
        return party;
    }

    @BeforeEach
    public void initTest() {
        party = createEntity(em);
    }

    @Test
    @Transactional
    public void createParty() throws Exception {
        int databaseSizeBeforeCreate = partyRepository.findAll().size();

        // Create the Party
        restPartyMockMvc.perform(post("/api/parties")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(party)))
            .andExpect(status().isCreated());

        // Validate the Party in the database
        List<Party> partyList = partyRepository.findAll();
        assertThat(partyList).hasSize(databaseSizeBeforeCreate + 1);
        Party testParty = partyList.get(partyList.size() - 1);
        assertThat(testParty.getPrimaryParty()).isEqualTo(DEFAULT_PRIMARY_PARTY);
        assertThat(testParty.getEmailAddress()).isEqualTo(DEFAULT_EMAIL_ADDRESS);
        assertThat(testParty.getPhoneNumber()).isEqualTo(DEFAULT_PHONE_NUMBER);
        assertThat(testParty.getPayerId()).isEqualTo(DEFAULT_PAYER_ID);
        assertThat(testParty.getTaxPayerNumber()).isEqualTo(DEFAULT_TAX_PAYER_NUMBER);
        assertThat(testParty.getPayeNumber()).isEqualTo(DEFAULT_PAYE_NUMBER);
        assertThat(testParty.getComments()).isEqualTo(DEFAULT_COMMENTS);
        assertThat(testParty.getPersonIdDate()).isEqualTo(DEFAULT_PERSON_ID_DATE);
        assertThat(testParty.getPersonIdExpirationDate()).isEqualTo(DEFAULT_PERSON_ID_EXPIRATION_DATE);
        assertThat(testParty.getRcNumber()).isEqualTo(DEFAULT_RC_NUMBER);
        assertThat(testParty.getOrganization()).isEqualTo(DEFAULT_ORGANIZATION);
        assertThat(testParty.getBirthPlace()).isEqualTo(DEFAULT_BIRTH_PLACE);
        assertThat(testParty.getBirthDate()).isEqualTo(DEFAULT_BIRTH_DATE);
        assertThat(testParty.getFirstName()).isEqualTo(DEFAULT_FIRST_NAME);
        assertThat(testParty.getMiddleName()).isEqualTo(DEFAULT_MIDDLE_NAME);
        assertThat(testParty.getLastName()).isEqualTo(DEFAULT_LAST_NAME);
        assertThat(testParty.getOccupation()).isEqualTo(DEFAULT_OCCUPATION);
        assertThat(testParty.getUnitNumber()).isEqualTo(DEFAULT_UNIT_NUMBER);
        assertThat(testParty.getBlockNumber()).isEqualTo(DEFAULT_BLOCK_NUMBER);
        assertThat(testParty.getPlotNumber()).isEqualTo(DEFAULT_PLOT_NUMBER);
        assertThat(testParty.getStreetNumber()).isEqualTo(DEFAULT_STREET_NUMBER);
        assertThat(testParty.getStreetName()).isEqualTo(DEFAULT_STREET_NAME);
        assertThat(testParty.getBuildingName()).isEqualTo(DEFAULT_BUILDING_NAME);
        assertThat(testParty.getBuildingNumber()).isEqualTo(DEFAULT_BUILDING_NUMBER);
        assertThat(testParty.getPostalCode()).isEqualTo(DEFAULT_POSTAL_CODE);
        assertThat(testParty.getCity()).isEqualTo(DEFAULT_CITY);
        assertThat(testParty.getVillage()).isEqualTo(DEFAULT_VILLAGE);
        assertThat(testParty.getLongAddress()).isEqualTo(DEFAULT_LONG_ADDRESS);
        assertThat(testParty.getTown()).isEqualTo(DEFAULT_TOWN);
        assertThat(testParty.getWard()).isEqualTo(DEFAULT_WARD);
        assertThat(testParty.getNextOfKinPhone()).isEqualTo(DEFAULT_NEXT_OF_KIN_PHONE);
        assertThat(testParty.getiDDocumentIssuedDate()).isEqualTo(DEFAULT_I_D_DOCUMENT_ISSUED_DATE);
        assertThat(testParty.getiDDocumentExpirationDate()).isEqualTo(DEFAULT_I_D_DOCUMENT_EXPIRATION_DATE);
        assertThat(testParty.getiDDocumentNumber()).isEqualTo(DEFAULT_I_D_DOCUMENT_NUMBER);

        // Validate the Party in Elasticsearch
        verify(mockPartySearchRepository, times(1)).save(testParty);
    }

    @Test
    @Transactional
    public void createPartyWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = partyRepository.findAll().size();

        // Create the Party with an existing ID
        party.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPartyMockMvc.perform(post("/api/parties")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(party)))
            .andExpect(status().isBadRequest());

        // Validate the Party in the database
        List<Party> partyList = partyRepository.findAll();
        assertThat(partyList).hasSize(databaseSizeBeforeCreate);

        // Validate the Party in Elasticsearch
        verify(mockPartySearchRepository, times(0)).save(party);
    }


    @Test
    @Transactional
    public void checkEmailAddressIsRequired() throws Exception {
        int databaseSizeBeforeTest = partyRepository.findAll().size();
        // set the field null
        party.setEmailAddress(null);

        // Create the Party, which fails.

        restPartyMockMvc.perform(post("/api/parties")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(party)))
            .andExpect(status().isBadRequest());

        List<Party> partyList = partyRepository.findAll();
        assertThat(partyList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPhoneNumberIsRequired() throws Exception {
        int databaseSizeBeforeTest = partyRepository.findAll().size();
        // set the field null
        party.setPhoneNumber(null);

        // Create the Party, which fails.

        restPartyMockMvc.perform(post("/api/parties")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(party)))
            .andExpect(status().isBadRequest());

        List<Party> partyList = partyRepository.findAll();
        assertThat(partyList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllParties() throws Exception {
        // Initialize the database
        partyRepository.saveAndFlush(party);

        // Get all the partyList
        restPartyMockMvc.perform(get("/api/parties?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(party.getId().intValue())))
            .andExpect(jsonPath("$.[*].primaryParty").value(hasItem(DEFAULT_PRIMARY_PARTY)))
            .andExpect(jsonPath("$.[*].emailAddress").value(hasItem(DEFAULT_EMAIL_ADDRESS)))
            .andExpect(jsonPath("$.[*].phoneNumber").value(hasItem(DEFAULT_PHONE_NUMBER)))
            .andExpect(jsonPath("$.[*].payerId").value(hasItem(DEFAULT_PAYER_ID)))
            .andExpect(jsonPath("$.[*].taxPayerNumber").value(hasItem(DEFAULT_TAX_PAYER_NUMBER)))
            .andExpect(jsonPath("$.[*].payeNumber").value(hasItem(DEFAULT_PAYE_NUMBER)))
            .andExpect(jsonPath("$.[*].comments").value(hasItem(DEFAULT_COMMENTS)))
            .andExpect(jsonPath("$.[*].personIdDate").value(hasItem(DEFAULT_PERSON_ID_DATE.toString())))
            .andExpect(jsonPath("$.[*].personIdExpirationDate").value(hasItem(DEFAULT_PERSON_ID_EXPIRATION_DATE.toString())))
            .andExpect(jsonPath("$.[*].rcNumber").value(hasItem(DEFAULT_RC_NUMBER)))
            .andExpect(jsonPath("$.[*].organization").value(hasItem(DEFAULT_ORGANIZATION)))
            .andExpect(jsonPath("$.[*].birthPlace").value(hasItem(DEFAULT_BIRTH_PLACE)))
            .andExpect(jsonPath("$.[*].birthDate").value(hasItem(DEFAULT_BIRTH_DATE.toString())))
            .andExpect(jsonPath("$.[*].firstName").value(hasItem(DEFAULT_FIRST_NAME)))
            .andExpect(jsonPath("$.[*].middleName").value(hasItem(DEFAULT_MIDDLE_NAME)))
            .andExpect(jsonPath("$.[*].lastName").value(hasItem(DEFAULT_LAST_NAME)))
            .andExpect(jsonPath("$.[*].occupation").value(hasItem(DEFAULT_OCCUPATION)))
            .andExpect(jsonPath("$.[*].unitNumber").value(hasItem(DEFAULT_UNIT_NUMBER)))
            .andExpect(jsonPath("$.[*].blockNumber").value(hasItem(DEFAULT_BLOCK_NUMBER)))
            .andExpect(jsonPath("$.[*].plotNumber").value(hasItem(DEFAULT_PLOT_NUMBER)))
            .andExpect(jsonPath("$.[*].streetNumber").value(hasItem(DEFAULT_STREET_NUMBER)))
            .andExpect(jsonPath("$.[*].streetName").value(hasItem(DEFAULT_STREET_NAME)))
            .andExpect(jsonPath("$.[*].buildingName").value(hasItem(DEFAULT_BUILDING_NAME)))
            .andExpect(jsonPath("$.[*].buildingNumber").value(hasItem(DEFAULT_BUILDING_NUMBER)))
            .andExpect(jsonPath("$.[*].postalCode").value(hasItem(DEFAULT_POSTAL_CODE)))
            .andExpect(jsonPath("$.[*].city").value(hasItem(DEFAULT_CITY)))
            .andExpect(jsonPath("$.[*].village").value(hasItem(DEFAULT_VILLAGE)))
            .andExpect(jsonPath("$.[*].longAddress").value(hasItem(DEFAULT_LONG_ADDRESS)))
            .andExpect(jsonPath("$.[*].town").value(hasItem(DEFAULT_TOWN)))
            .andExpect(jsonPath("$.[*].ward").value(hasItem(DEFAULT_WARD)))
            .andExpect(jsonPath("$.[*].nextOfKinPhone").value(hasItem(DEFAULT_NEXT_OF_KIN_PHONE)))
            .andExpect(jsonPath("$.[*].iDDocumentIssuedDate").value(hasItem(DEFAULT_I_D_DOCUMENT_ISSUED_DATE.toString())))
            .andExpect(jsonPath("$.[*].iDDocumentExpirationDate").value(hasItem(DEFAULT_I_D_DOCUMENT_EXPIRATION_DATE.toString())))
            .andExpect(jsonPath("$.[*].iDDocumentNumber").value(hasItem(DEFAULT_I_D_DOCUMENT_NUMBER)));
    }
    
    @Test
    @Transactional
    public void getParty() throws Exception {
        // Initialize the database
        partyRepository.saveAndFlush(party);

        // Get the party
        restPartyMockMvc.perform(get("/api/parties/{id}", party.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(party.getId().intValue()))
            .andExpect(jsonPath("$.primaryParty").value(DEFAULT_PRIMARY_PARTY))
            .andExpect(jsonPath("$.emailAddress").value(DEFAULT_EMAIL_ADDRESS))
            .andExpect(jsonPath("$.phoneNumber").value(DEFAULT_PHONE_NUMBER))
            .andExpect(jsonPath("$.payerId").value(DEFAULT_PAYER_ID))
            .andExpect(jsonPath("$.taxPayerNumber").value(DEFAULT_TAX_PAYER_NUMBER))
            .andExpect(jsonPath("$.payeNumber").value(DEFAULT_PAYE_NUMBER))
            .andExpect(jsonPath("$.comments").value(DEFAULT_COMMENTS))
            .andExpect(jsonPath("$.personIdDate").value(DEFAULT_PERSON_ID_DATE.toString()))
            .andExpect(jsonPath("$.personIdExpirationDate").value(DEFAULT_PERSON_ID_EXPIRATION_DATE.toString()))
            .andExpect(jsonPath("$.rcNumber").value(DEFAULT_RC_NUMBER))
            .andExpect(jsonPath("$.organization").value(DEFAULT_ORGANIZATION))
            .andExpect(jsonPath("$.birthPlace").value(DEFAULT_BIRTH_PLACE))
            .andExpect(jsonPath("$.birthDate").value(DEFAULT_BIRTH_DATE.toString()))
            .andExpect(jsonPath("$.firstName").value(DEFAULT_FIRST_NAME))
            .andExpect(jsonPath("$.middleName").value(DEFAULT_MIDDLE_NAME))
            .andExpect(jsonPath("$.lastName").value(DEFAULT_LAST_NAME))
            .andExpect(jsonPath("$.occupation").value(DEFAULT_OCCUPATION))
            .andExpect(jsonPath("$.unitNumber").value(DEFAULT_UNIT_NUMBER))
            .andExpect(jsonPath("$.blockNumber").value(DEFAULT_BLOCK_NUMBER))
            .andExpect(jsonPath("$.plotNumber").value(DEFAULT_PLOT_NUMBER))
            .andExpect(jsonPath("$.streetNumber").value(DEFAULT_STREET_NUMBER))
            .andExpect(jsonPath("$.streetName").value(DEFAULT_STREET_NAME))
            .andExpect(jsonPath("$.buildingName").value(DEFAULT_BUILDING_NAME))
            .andExpect(jsonPath("$.buildingNumber").value(DEFAULT_BUILDING_NUMBER))
            .andExpect(jsonPath("$.postalCode").value(DEFAULT_POSTAL_CODE))
            .andExpect(jsonPath("$.city").value(DEFAULT_CITY))
            .andExpect(jsonPath("$.village").value(DEFAULT_VILLAGE))
            .andExpect(jsonPath("$.longAddress").value(DEFAULT_LONG_ADDRESS))
            .andExpect(jsonPath("$.town").value(DEFAULT_TOWN))
            .andExpect(jsonPath("$.ward").value(DEFAULT_WARD))
            .andExpect(jsonPath("$.nextOfKinPhone").value(DEFAULT_NEXT_OF_KIN_PHONE))
            .andExpect(jsonPath("$.iDDocumentIssuedDate").value(DEFAULT_I_D_DOCUMENT_ISSUED_DATE.toString()))
            .andExpect(jsonPath("$.iDDocumentExpirationDate").value(DEFAULT_I_D_DOCUMENT_EXPIRATION_DATE.toString()))
            .andExpect(jsonPath("$.iDDocumentNumber").value(DEFAULT_I_D_DOCUMENT_NUMBER));
    }

    @Test
    @Transactional
    public void getNonExistingParty() throws Exception {
        // Get the party
        restPartyMockMvc.perform(get("/api/parties/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateParty() throws Exception {
        // Initialize the database
        partyRepository.saveAndFlush(party);

        int databaseSizeBeforeUpdate = partyRepository.findAll().size();

        // Update the party
        Party updatedParty = partyRepository.findById(party.getId()).get();
        // Disconnect from session so that the updates on updatedParty are not directly saved in db
        em.detach(updatedParty);
        updatedParty
            .primaryParty(UPDATED_PRIMARY_PARTY)
            .emailAddress(UPDATED_EMAIL_ADDRESS)
            .phoneNumber(UPDATED_PHONE_NUMBER)
            .payerId(UPDATED_PAYER_ID)
            .taxPayerNumber(UPDATED_TAX_PAYER_NUMBER)
            .payeNumber(UPDATED_PAYE_NUMBER)
            .comments(UPDATED_COMMENTS)
            .personIdDate(UPDATED_PERSON_ID_DATE)
            .personIdExpirationDate(UPDATED_PERSON_ID_EXPIRATION_DATE)
            .rcNumber(UPDATED_RC_NUMBER)
            .organization(UPDATED_ORGANIZATION)
            .birthPlace(UPDATED_BIRTH_PLACE)
            .birthDate(UPDATED_BIRTH_DATE)
            .firstName(UPDATED_FIRST_NAME)
            .middleName(UPDATED_MIDDLE_NAME)
            .lastName(UPDATED_LAST_NAME)
            .occupation(UPDATED_OCCUPATION)
            .unitNumber(UPDATED_UNIT_NUMBER)
            .blockNumber(UPDATED_BLOCK_NUMBER)
            .plotNumber(UPDATED_PLOT_NUMBER)
            .streetNumber(UPDATED_STREET_NUMBER)
            .streetName(UPDATED_STREET_NAME)
            .buildingName(UPDATED_BUILDING_NAME)
            .buildingNumber(UPDATED_BUILDING_NUMBER)
            .postalCode(UPDATED_POSTAL_CODE)
            .city(UPDATED_CITY)
            .village(UPDATED_VILLAGE)
            .longAddress(UPDATED_LONG_ADDRESS)
            .town(UPDATED_TOWN)
            .ward(UPDATED_WARD)
            .nextOfKinPhone(UPDATED_NEXT_OF_KIN_PHONE)
            .iDDocumentIssuedDate(UPDATED_I_D_DOCUMENT_ISSUED_DATE)
            .iDDocumentExpirationDate(UPDATED_I_D_DOCUMENT_EXPIRATION_DATE)
            .iDDocumentNumber(UPDATED_I_D_DOCUMENT_NUMBER);

        restPartyMockMvc.perform(put("/api/parties")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedParty)))
            .andExpect(status().isOk());

        // Validate the Party in the database
        List<Party> partyList = partyRepository.findAll();
        assertThat(partyList).hasSize(databaseSizeBeforeUpdate);
        Party testParty = partyList.get(partyList.size() - 1);
        assertThat(testParty.getPrimaryParty()).isEqualTo(UPDATED_PRIMARY_PARTY);
        assertThat(testParty.getEmailAddress()).isEqualTo(UPDATED_EMAIL_ADDRESS);
        assertThat(testParty.getPhoneNumber()).isEqualTo(UPDATED_PHONE_NUMBER);
        assertThat(testParty.getPayerId()).isEqualTo(UPDATED_PAYER_ID);
        assertThat(testParty.getTaxPayerNumber()).isEqualTo(UPDATED_TAX_PAYER_NUMBER);
        assertThat(testParty.getPayeNumber()).isEqualTo(UPDATED_PAYE_NUMBER);
        assertThat(testParty.getComments()).isEqualTo(UPDATED_COMMENTS);
        assertThat(testParty.getPersonIdDate()).isEqualTo(UPDATED_PERSON_ID_DATE);
        assertThat(testParty.getPersonIdExpirationDate()).isEqualTo(UPDATED_PERSON_ID_EXPIRATION_DATE);
        assertThat(testParty.getRcNumber()).isEqualTo(UPDATED_RC_NUMBER);
        assertThat(testParty.getOrganization()).isEqualTo(UPDATED_ORGANIZATION);
        assertThat(testParty.getBirthPlace()).isEqualTo(UPDATED_BIRTH_PLACE);
        assertThat(testParty.getBirthDate()).isEqualTo(UPDATED_BIRTH_DATE);
        assertThat(testParty.getFirstName()).isEqualTo(UPDATED_FIRST_NAME);
        assertThat(testParty.getMiddleName()).isEqualTo(UPDATED_MIDDLE_NAME);
        assertThat(testParty.getLastName()).isEqualTo(UPDATED_LAST_NAME);
        assertThat(testParty.getOccupation()).isEqualTo(UPDATED_OCCUPATION);
        assertThat(testParty.getUnitNumber()).isEqualTo(UPDATED_UNIT_NUMBER);
        assertThat(testParty.getBlockNumber()).isEqualTo(UPDATED_BLOCK_NUMBER);
        assertThat(testParty.getPlotNumber()).isEqualTo(UPDATED_PLOT_NUMBER);
        assertThat(testParty.getStreetNumber()).isEqualTo(UPDATED_STREET_NUMBER);
        assertThat(testParty.getStreetName()).isEqualTo(UPDATED_STREET_NAME);
        assertThat(testParty.getBuildingName()).isEqualTo(UPDATED_BUILDING_NAME);
        assertThat(testParty.getBuildingNumber()).isEqualTo(UPDATED_BUILDING_NUMBER);
        assertThat(testParty.getPostalCode()).isEqualTo(UPDATED_POSTAL_CODE);
        assertThat(testParty.getCity()).isEqualTo(UPDATED_CITY);
        assertThat(testParty.getVillage()).isEqualTo(UPDATED_VILLAGE);
        assertThat(testParty.getLongAddress()).isEqualTo(UPDATED_LONG_ADDRESS);
        assertThat(testParty.getTown()).isEqualTo(UPDATED_TOWN);
        assertThat(testParty.getWard()).isEqualTo(UPDATED_WARD);
        assertThat(testParty.getNextOfKinPhone()).isEqualTo(UPDATED_NEXT_OF_KIN_PHONE);
        assertThat(testParty.getiDDocumentIssuedDate()).isEqualTo(UPDATED_I_D_DOCUMENT_ISSUED_DATE);
        assertThat(testParty.getiDDocumentExpirationDate()).isEqualTo(UPDATED_I_D_DOCUMENT_EXPIRATION_DATE);
        assertThat(testParty.getiDDocumentNumber()).isEqualTo(UPDATED_I_D_DOCUMENT_NUMBER);

        // Validate the Party in Elasticsearch
        verify(mockPartySearchRepository, times(1)).save(testParty);
    }

    @Test
    @Transactional
    public void updateNonExistingParty() throws Exception {
        int databaseSizeBeforeUpdate = partyRepository.findAll().size();

        // Create the Party

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPartyMockMvc.perform(put("/api/parties")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(party)))
            .andExpect(status().isBadRequest());

        // Validate the Party in the database
        List<Party> partyList = partyRepository.findAll();
        assertThat(partyList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Party in Elasticsearch
        verify(mockPartySearchRepository, times(0)).save(party);
    }

    @Test
    @Transactional
    public void deleteParty() throws Exception {
        // Initialize the database
        partyRepository.saveAndFlush(party);

        int databaseSizeBeforeDelete = partyRepository.findAll().size();

        // Delete the party
        restPartyMockMvc.perform(delete("/api/parties/{id}", party.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Party> partyList = partyRepository.findAll();
        assertThat(partyList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Party in Elasticsearch
        verify(mockPartySearchRepository, times(1)).deleteById(party.getId());
    }

    @Test
    @Transactional
    public void searchParty() throws Exception {
        // Initialize the database
        partyRepository.saveAndFlush(party);
        when(mockPartySearchRepository.search(queryStringQuery("id:" + party.getId())))
            .thenReturn(Collections.singletonList(party));
        // Search the party
        restPartyMockMvc.perform(get("/api/_search/parties?query=id:" + party.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(party.getId().intValue())))
            .andExpect(jsonPath("$.[*].primaryParty").value(hasItem(DEFAULT_PRIMARY_PARTY)))
            .andExpect(jsonPath("$.[*].emailAddress").value(hasItem(DEFAULT_EMAIL_ADDRESS)))
            .andExpect(jsonPath("$.[*].phoneNumber").value(hasItem(DEFAULT_PHONE_NUMBER)))
            .andExpect(jsonPath("$.[*].payerId").value(hasItem(DEFAULT_PAYER_ID)))
            .andExpect(jsonPath("$.[*].taxPayerNumber").value(hasItem(DEFAULT_TAX_PAYER_NUMBER)))
            .andExpect(jsonPath("$.[*].payeNumber").value(hasItem(DEFAULT_PAYE_NUMBER)))
            .andExpect(jsonPath("$.[*].comments").value(hasItem(DEFAULT_COMMENTS)))
            .andExpect(jsonPath("$.[*].personIdDate").value(hasItem(DEFAULT_PERSON_ID_DATE.toString())))
            .andExpect(jsonPath("$.[*].personIdExpirationDate").value(hasItem(DEFAULT_PERSON_ID_EXPIRATION_DATE.toString())))
            .andExpect(jsonPath("$.[*].rcNumber").value(hasItem(DEFAULT_RC_NUMBER)))
            .andExpect(jsonPath("$.[*].organization").value(hasItem(DEFAULT_ORGANIZATION)))
            .andExpect(jsonPath("$.[*].birthPlace").value(hasItem(DEFAULT_BIRTH_PLACE)))
            .andExpect(jsonPath("$.[*].birthDate").value(hasItem(DEFAULT_BIRTH_DATE.toString())))
            .andExpect(jsonPath("$.[*].firstName").value(hasItem(DEFAULT_FIRST_NAME)))
            .andExpect(jsonPath("$.[*].middleName").value(hasItem(DEFAULT_MIDDLE_NAME)))
            .andExpect(jsonPath("$.[*].lastName").value(hasItem(DEFAULT_LAST_NAME)))
            .andExpect(jsonPath("$.[*].occupation").value(hasItem(DEFAULT_OCCUPATION)))
            .andExpect(jsonPath("$.[*].unitNumber").value(hasItem(DEFAULT_UNIT_NUMBER)))
            .andExpect(jsonPath("$.[*].blockNumber").value(hasItem(DEFAULT_BLOCK_NUMBER)))
            .andExpect(jsonPath("$.[*].plotNumber").value(hasItem(DEFAULT_PLOT_NUMBER)))
            .andExpect(jsonPath("$.[*].streetNumber").value(hasItem(DEFAULT_STREET_NUMBER)))
            .andExpect(jsonPath("$.[*].streetName").value(hasItem(DEFAULT_STREET_NAME)))
            .andExpect(jsonPath("$.[*].buildingName").value(hasItem(DEFAULT_BUILDING_NAME)))
            .andExpect(jsonPath("$.[*].buildingNumber").value(hasItem(DEFAULT_BUILDING_NUMBER)))
            .andExpect(jsonPath("$.[*].postalCode").value(hasItem(DEFAULT_POSTAL_CODE)))
            .andExpect(jsonPath("$.[*].city").value(hasItem(DEFAULT_CITY)))
            .andExpect(jsonPath("$.[*].village").value(hasItem(DEFAULT_VILLAGE)))
            .andExpect(jsonPath("$.[*].longAddress").value(hasItem(DEFAULT_LONG_ADDRESS)))
            .andExpect(jsonPath("$.[*].town").value(hasItem(DEFAULT_TOWN)))
            .andExpect(jsonPath("$.[*].ward").value(hasItem(DEFAULT_WARD)))
            .andExpect(jsonPath("$.[*].nextOfKinPhone").value(hasItem(DEFAULT_NEXT_OF_KIN_PHONE)))
            .andExpect(jsonPath("$.[*].iDDocumentIssuedDate").value(hasItem(DEFAULT_I_D_DOCUMENT_ISSUED_DATE.toString())))
            .andExpect(jsonPath("$.[*].iDDocumentExpirationDate").value(hasItem(DEFAULT_I_D_DOCUMENT_EXPIRATION_DATE.toString())))
            .andExpect(jsonPath("$.[*].iDDocumentNumber").value(hasItem(DEFAULT_I_D_DOCUMENT_NUMBER)));
    }
}
