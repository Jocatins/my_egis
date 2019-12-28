package com.lagos.egis.external.web.rest;

import com.lagos.egis.external.EgisexternalApp;
import com.lagos.egis.external.domain.Party;
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

    private static final Integer DEFAULT_PARTY_TYPE = 1;
    private static final Integer UPDATED_PARTY_TYPE = 2;

    private static final Integer DEFAULT_PARTY_ROLE_TYPE = 1;
    private static final Integer UPDATED_PARTY_ROLE_TYPE = 2;

    private static final Integer DEFAULT_PARTY_SUB_ROLE_TYPE = 1;
    private static final Integer UPDATED_PARTY_SUB_ROLE_TYPE = 2;

    private static final Integer DEFAULT_DELIVERY_TYPE = 1;
    private static final Integer UPDATED_DELIVERY_TYPE = 2;

    private static final String DEFAULT_PARTY_NAME = "AAAAAAAAAA";
    private static final String UPDATED_PARTY_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_SHARE_NOMINATOR = "AAAAAAAAAA";
    private static final String UPDATED_SHARE_NOMINATOR = "BBBBBBBBBB";

    private static final String DEFAULT_SHARE_DENOMINATOR = "AAAAAAAAAA";
    private static final String UPDATED_SHARE_DENOMINATOR = "BBBBBBBBBB";

    private static final String DEFAULT_TAX_EXEMPT = "AAAAAAAAAA";
    private static final String UPDATED_TAX_EXEMPT = "BBBBBBBBBB";

    private static final String DEFAULT_PRIMARY_PARTY = "AAAAAAAAAA";
    private static final String UPDATED_PRIMARY_PARTY = "BBBBBBBBBB";

    private static final String DEFAULT_OTHER_NAME = "AAAAAAAAAA";
    private static final String UPDATED_OTHER_NAME = "BBBBBBBBBB";

    private static final Integer DEFAULT_PERSON_ID_TYPE = 1;
    private static final Integer UPDATED_PERSON_ID_TYPE = 2;

    private static final Integer DEFAULT_PERSON_TYPE = 1;
    private static final Integer UPDATED_PERSON_TYPE = 2;

    private static final String DEFAULT_FAX = "AAAAAAAAAA";
    private static final String UPDATED_FAX = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final Integer DEFAULT_EMAIL_TYPE = 1;
    private static final Integer UPDATED_EMAIL_TYPE = 2;

    private static final String DEFAULT_PHONE_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_PHONE_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_PAYER_ID = "AAAAAAAAAA";
    private static final String UPDATED_PAYER_ID = "BBBBBBBBBB";

    private static final String DEFAULT_TAX_PAYER_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_TAX_PAYER_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_COMMENTS = "AAAAAAAAAA";
    private static final String UPDATED_COMMENTS = "BBBBBBBBBB";

    private static final Integer DEFAULT_PERSON_ID_ISSUED_BY = 1;
    private static final Integer UPDATED_PERSON_ID_ISSUED_BY = 2;

    private static final LocalDate DEFAULT_PERSON_ID_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_PERSON_ID_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_PERSON_ID_EXPIRATION_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_PERSON_ID_EXPIRATION_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_RC_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_RC_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_ORGANIZATION = "AAAAAAAAAA";
    private static final String UPDATED_ORGANIZATION = "BBBBBBBBBB";

    private static final String DEFAULT_BUSINESS_NATURE = "AAAAAAAAAA";
    private static final String UPDATED_BUSINESS_NATURE = "BBBBBBBBBB";

    private static final String DEFAULT_BIRTH_PLACE = "AAAAAAAAAA";
    private static final String UPDATED_BIRTH_PLACE = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_BIRTH_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_BIRTH_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final Integer DEFAULT_PERSON_TITLE = 1;
    private static final Integer UPDATED_PERSON_TITLE = 2;

    private static final Integer DEFAULT_GENDER = 1;
    private static final Integer UPDATED_GENDER = 2;

    private static final String DEFAULT_FIRST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_FIRST_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_MIDDLE_NAME = "AAAAAAAAAA";
    private static final String UPDATED_MIDDLE_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_LAST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_LAST_NAME = "BBBBBBBBBB";

    private static final Integer DEFAULT_CIVIL_STATE = 1;
    private static final Integer UPDATED_CIVIL_STATE = 2;

    private static final Integer DEFAULT_DRIVER_LICENSE_REGION = 1;
    private static final Integer UPDATED_DRIVER_LICENSE_REGION = 2;

    private static final String DEFAULT_DRIVER_LICENCE = "AAAAAAAAAA";
    private static final String UPDATED_DRIVER_LICENCE = "BBBBBBBBBB";

    private static final Integer DEFAULT_REPRESENTATIVE_ID = 1;
    private static final Integer UPDATED_REPRESENTATIVE_ID = 2;

    private static final String DEFAULT_PROFESSION_REG_NO = "AAAAAAAAAA";
    private static final String UPDATED_PROFESSION_REG_NO = "BBBBBBBBBB";

    private static final String DEFAULT_OCCUPATION = "AAAAAAAAAA";
    private static final String UPDATED_OCCUPATION = "BBBBBBBBBB";

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
            .partyType(DEFAULT_PARTY_TYPE)
            .partyRoleType(DEFAULT_PARTY_ROLE_TYPE)
            .partySubRoleType(DEFAULT_PARTY_SUB_ROLE_TYPE)
            .deliveryType(DEFAULT_DELIVERY_TYPE)
            .partyName(DEFAULT_PARTY_NAME)
            .shareNominator(DEFAULT_SHARE_NOMINATOR)
            .shareDenominator(DEFAULT_SHARE_DENOMINATOR)
            .taxExempt(DEFAULT_TAX_EXEMPT)
            .primaryParty(DEFAULT_PRIMARY_PARTY)
            .otherName(DEFAULT_OTHER_NAME)
            .personIdType(DEFAULT_PERSON_ID_TYPE)
            .personType(DEFAULT_PERSON_TYPE)
            .fax(DEFAULT_FAX)
            .email(DEFAULT_EMAIL)
            .emailType(DEFAULT_EMAIL_TYPE)
            .phoneNumber(DEFAULT_PHONE_NUMBER)
            .payerId(DEFAULT_PAYER_ID)
            .taxPayerNumber(DEFAULT_TAX_PAYER_NUMBER)
            .comments(DEFAULT_COMMENTS)
            .personIdIssuedBy(DEFAULT_PERSON_ID_ISSUED_BY)
            .personIdDate(DEFAULT_PERSON_ID_DATE)
            .personIdExpirationDate(DEFAULT_PERSON_ID_EXPIRATION_DATE)
            .rcNumber(DEFAULT_RC_NUMBER)
            .organization(DEFAULT_ORGANIZATION)
            .businessNature(DEFAULT_BUSINESS_NATURE)
            .birthPlace(DEFAULT_BIRTH_PLACE)
            .birthDate(DEFAULT_BIRTH_DATE)
            .personTitle(DEFAULT_PERSON_TITLE)
            .gender(DEFAULT_GENDER)
            .firstName(DEFAULT_FIRST_NAME)
            .middleName(DEFAULT_MIDDLE_NAME)
            .lastName(DEFAULT_LAST_NAME)
            .civilState(DEFAULT_CIVIL_STATE)
            .driverLicenseRegion(DEFAULT_DRIVER_LICENSE_REGION)
            .driverLicence(DEFAULT_DRIVER_LICENCE)
            .representativeId(DEFAULT_REPRESENTATIVE_ID)
            .professionRegNo(DEFAULT_PROFESSION_REG_NO)
            .occupation(DEFAULT_OCCUPATION);
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
            .partyType(UPDATED_PARTY_TYPE)
            .partyRoleType(UPDATED_PARTY_ROLE_TYPE)
            .partySubRoleType(UPDATED_PARTY_SUB_ROLE_TYPE)
            .deliveryType(UPDATED_DELIVERY_TYPE)
            .partyName(UPDATED_PARTY_NAME)
            .shareNominator(UPDATED_SHARE_NOMINATOR)
            .shareDenominator(UPDATED_SHARE_DENOMINATOR)
            .taxExempt(UPDATED_TAX_EXEMPT)
            .primaryParty(UPDATED_PRIMARY_PARTY)
            .otherName(UPDATED_OTHER_NAME)
            .personIdType(UPDATED_PERSON_ID_TYPE)
            .personType(UPDATED_PERSON_TYPE)
            .fax(UPDATED_FAX)
            .email(UPDATED_EMAIL)
            .emailType(UPDATED_EMAIL_TYPE)
            .phoneNumber(UPDATED_PHONE_NUMBER)
            .payerId(UPDATED_PAYER_ID)
            .taxPayerNumber(UPDATED_TAX_PAYER_NUMBER)
            .comments(UPDATED_COMMENTS)
            .personIdIssuedBy(UPDATED_PERSON_ID_ISSUED_BY)
            .personIdDate(UPDATED_PERSON_ID_DATE)
            .personIdExpirationDate(UPDATED_PERSON_ID_EXPIRATION_DATE)
            .rcNumber(UPDATED_RC_NUMBER)
            .organization(UPDATED_ORGANIZATION)
            .businessNature(UPDATED_BUSINESS_NATURE)
            .birthPlace(UPDATED_BIRTH_PLACE)
            .birthDate(UPDATED_BIRTH_DATE)
            .personTitle(UPDATED_PERSON_TITLE)
            .gender(UPDATED_GENDER)
            .firstName(UPDATED_FIRST_NAME)
            .middleName(UPDATED_MIDDLE_NAME)
            .lastName(UPDATED_LAST_NAME)
            .civilState(UPDATED_CIVIL_STATE)
            .driverLicenseRegion(UPDATED_DRIVER_LICENSE_REGION)
            .driverLicence(UPDATED_DRIVER_LICENCE)
            .representativeId(UPDATED_REPRESENTATIVE_ID)
            .professionRegNo(UPDATED_PROFESSION_REG_NO)
            .occupation(UPDATED_OCCUPATION);
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
        assertThat(testParty.getPartyType()).isEqualTo(DEFAULT_PARTY_TYPE);
        assertThat(testParty.getPartyRoleType()).isEqualTo(DEFAULT_PARTY_ROLE_TYPE);
        assertThat(testParty.getPartySubRoleType()).isEqualTo(DEFAULT_PARTY_SUB_ROLE_TYPE);
        assertThat(testParty.getDeliveryType()).isEqualTo(DEFAULT_DELIVERY_TYPE);
        assertThat(testParty.getPartyName()).isEqualTo(DEFAULT_PARTY_NAME);
        assertThat(testParty.getShareNominator()).isEqualTo(DEFAULT_SHARE_NOMINATOR);
        assertThat(testParty.getShareDenominator()).isEqualTo(DEFAULT_SHARE_DENOMINATOR);
        assertThat(testParty.getTaxExempt()).isEqualTo(DEFAULT_TAX_EXEMPT);
        assertThat(testParty.getPrimaryParty()).isEqualTo(DEFAULT_PRIMARY_PARTY);
        assertThat(testParty.getOtherName()).isEqualTo(DEFAULT_OTHER_NAME);
        assertThat(testParty.getPersonIdType()).isEqualTo(DEFAULT_PERSON_ID_TYPE);
        assertThat(testParty.getPersonType()).isEqualTo(DEFAULT_PERSON_TYPE);
        assertThat(testParty.getFax()).isEqualTo(DEFAULT_FAX);
        assertThat(testParty.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testParty.getEmailType()).isEqualTo(DEFAULT_EMAIL_TYPE);
        assertThat(testParty.getPhoneNumber()).isEqualTo(DEFAULT_PHONE_NUMBER);
        assertThat(testParty.getPayerId()).isEqualTo(DEFAULT_PAYER_ID);
        assertThat(testParty.getTaxPayerNumber()).isEqualTo(DEFAULT_TAX_PAYER_NUMBER);
        assertThat(testParty.getComments()).isEqualTo(DEFAULT_COMMENTS);
        assertThat(testParty.getPersonIdIssuedBy()).isEqualTo(DEFAULT_PERSON_ID_ISSUED_BY);
        assertThat(testParty.getPersonIdDate()).isEqualTo(DEFAULT_PERSON_ID_DATE);
        assertThat(testParty.getPersonIdExpirationDate()).isEqualTo(DEFAULT_PERSON_ID_EXPIRATION_DATE);
        assertThat(testParty.getRcNumber()).isEqualTo(DEFAULT_RC_NUMBER);
        assertThat(testParty.getOrganization()).isEqualTo(DEFAULT_ORGANIZATION);
        assertThat(testParty.getBusinessNature()).isEqualTo(DEFAULT_BUSINESS_NATURE);
        assertThat(testParty.getBirthPlace()).isEqualTo(DEFAULT_BIRTH_PLACE);
        assertThat(testParty.getBirthDate()).isEqualTo(DEFAULT_BIRTH_DATE);
        assertThat(testParty.getPersonTitle()).isEqualTo(DEFAULT_PERSON_TITLE);
        assertThat(testParty.getGender()).isEqualTo(DEFAULT_GENDER);
        assertThat(testParty.getFirstName()).isEqualTo(DEFAULT_FIRST_NAME);
        assertThat(testParty.getMiddleName()).isEqualTo(DEFAULT_MIDDLE_NAME);
        assertThat(testParty.getLastName()).isEqualTo(DEFAULT_LAST_NAME);
        assertThat(testParty.getCivilState()).isEqualTo(DEFAULT_CIVIL_STATE);
        assertThat(testParty.getDriverLicenseRegion()).isEqualTo(DEFAULT_DRIVER_LICENSE_REGION);
        assertThat(testParty.getDriverLicence()).isEqualTo(DEFAULT_DRIVER_LICENCE);
        assertThat(testParty.getRepresentativeId()).isEqualTo(DEFAULT_REPRESENTATIVE_ID);
        assertThat(testParty.getProfessionRegNo()).isEqualTo(DEFAULT_PROFESSION_REG_NO);
        assertThat(testParty.getOccupation()).isEqualTo(DEFAULT_OCCUPATION);

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
    public void checkPartyTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = partyRepository.findAll().size();
        // set the field null
        party.setPartyType(null);

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
    public void checkPartyRoleTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = partyRepository.findAll().size();
        // set the field null
        party.setPartyRoleType(null);

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
            .andExpect(jsonPath("$.[*].partyType").value(hasItem(DEFAULT_PARTY_TYPE)))
            .andExpect(jsonPath("$.[*].partyRoleType").value(hasItem(DEFAULT_PARTY_ROLE_TYPE)))
            .andExpect(jsonPath("$.[*].partySubRoleType").value(hasItem(DEFAULT_PARTY_SUB_ROLE_TYPE)))
            .andExpect(jsonPath("$.[*].deliveryType").value(hasItem(DEFAULT_DELIVERY_TYPE)))
            .andExpect(jsonPath("$.[*].partyName").value(hasItem(DEFAULT_PARTY_NAME)))
            .andExpect(jsonPath("$.[*].shareNominator").value(hasItem(DEFAULT_SHARE_NOMINATOR)))
            .andExpect(jsonPath("$.[*].shareDenominator").value(hasItem(DEFAULT_SHARE_DENOMINATOR)))
            .andExpect(jsonPath("$.[*].taxExempt").value(hasItem(DEFAULT_TAX_EXEMPT)))
            .andExpect(jsonPath("$.[*].primaryParty").value(hasItem(DEFAULT_PRIMARY_PARTY)))
            .andExpect(jsonPath("$.[*].otherName").value(hasItem(DEFAULT_OTHER_NAME)))
            .andExpect(jsonPath("$.[*].personIdType").value(hasItem(DEFAULT_PERSON_ID_TYPE)))
            .andExpect(jsonPath("$.[*].personType").value(hasItem(DEFAULT_PERSON_TYPE)))
            .andExpect(jsonPath("$.[*].fax").value(hasItem(DEFAULT_FAX)))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL)))
            .andExpect(jsonPath("$.[*].emailType").value(hasItem(DEFAULT_EMAIL_TYPE)))
            .andExpect(jsonPath("$.[*].phoneNumber").value(hasItem(DEFAULT_PHONE_NUMBER)))
            .andExpect(jsonPath("$.[*].payerId").value(hasItem(DEFAULT_PAYER_ID)))
            .andExpect(jsonPath("$.[*].taxPayerNumber").value(hasItem(DEFAULT_TAX_PAYER_NUMBER)))
            .andExpect(jsonPath("$.[*].comments").value(hasItem(DEFAULT_COMMENTS)))
            .andExpect(jsonPath("$.[*].personIdIssuedBy").value(hasItem(DEFAULT_PERSON_ID_ISSUED_BY)))
            .andExpect(jsonPath("$.[*].personIdDate").value(hasItem(DEFAULT_PERSON_ID_DATE.toString())))
            .andExpect(jsonPath("$.[*].personIdExpirationDate").value(hasItem(DEFAULT_PERSON_ID_EXPIRATION_DATE.toString())))
            .andExpect(jsonPath("$.[*].rcNumber").value(hasItem(DEFAULT_RC_NUMBER)))
            .andExpect(jsonPath("$.[*].organization").value(hasItem(DEFAULT_ORGANIZATION)))
            .andExpect(jsonPath("$.[*].businessNature").value(hasItem(DEFAULT_BUSINESS_NATURE)))
            .andExpect(jsonPath("$.[*].birthPlace").value(hasItem(DEFAULT_BIRTH_PLACE)))
            .andExpect(jsonPath("$.[*].birthDate").value(hasItem(DEFAULT_BIRTH_DATE.toString())))
            .andExpect(jsonPath("$.[*].personTitle").value(hasItem(DEFAULT_PERSON_TITLE)))
            .andExpect(jsonPath("$.[*].gender").value(hasItem(DEFAULT_GENDER)))
            .andExpect(jsonPath("$.[*].firstName").value(hasItem(DEFAULT_FIRST_NAME)))
            .andExpect(jsonPath("$.[*].middleName").value(hasItem(DEFAULT_MIDDLE_NAME)))
            .andExpect(jsonPath("$.[*].lastName").value(hasItem(DEFAULT_LAST_NAME)))
            .andExpect(jsonPath("$.[*].civilState").value(hasItem(DEFAULT_CIVIL_STATE)))
            .andExpect(jsonPath("$.[*].driverLicenseRegion").value(hasItem(DEFAULT_DRIVER_LICENSE_REGION)))
            .andExpect(jsonPath("$.[*].driverLicence").value(hasItem(DEFAULT_DRIVER_LICENCE)))
            .andExpect(jsonPath("$.[*].representativeId").value(hasItem(DEFAULT_REPRESENTATIVE_ID)))
            .andExpect(jsonPath("$.[*].professionRegNo").value(hasItem(DEFAULT_PROFESSION_REG_NO)))
            .andExpect(jsonPath("$.[*].occupation").value(hasItem(DEFAULT_OCCUPATION)));
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
            .andExpect(jsonPath("$.partyType").value(DEFAULT_PARTY_TYPE))
            .andExpect(jsonPath("$.partyRoleType").value(DEFAULT_PARTY_ROLE_TYPE))
            .andExpect(jsonPath("$.partySubRoleType").value(DEFAULT_PARTY_SUB_ROLE_TYPE))
            .andExpect(jsonPath("$.deliveryType").value(DEFAULT_DELIVERY_TYPE))
            .andExpect(jsonPath("$.partyName").value(DEFAULT_PARTY_NAME))
            .andExpect(jsonPath("$.shareNominator").value(DEFAULT_SHARE_NOMINATOR))
            .andExpect(jsonPath("$.shareDenominator").value(DEFAULT_SHARE_DENOMINATOR))
            .andExpect(jsonPath("$.taxExempt").value(DEFAULT_TAX_EXEMPT))
            .andExpect(jsonPath("$.primaryParty").value(DEFAULT_PRIMARY_PARTY))
            .andExpect(jsonPath("$.otherName").value(DEFAULT_OTHER_NAME))
            .andExpect(jsonPath("$.personIdType").value(DEFAULT_PERSON_ID_TYPE))
            .andExpect(jsonPath("$.personType").value(DEFAULT_PERSON_TYPE))
            .andExpect(jsonPath("$.fax").value(DEFAULT_FAX))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL))
            .andExpect(jsonPath("$.emailType").value(DEFAULT_EMAIL_TYPE))
            .andExpect(jsonPath("$.phoneNumber").value(DEFAULT_PHONE_NUMBER))
            .andExpect(jsonPath("$.payerId").value(DEFAULT_PAYER_ID))
            .andExpect(jsonPath("$.taxPayerNumber").value(DEFAULT_TAX_PAYER_NUMBER))
            .andExpect(jsonPath("$.comments").value(DEFAULT_COMMENTS))
            .andExpect(jsonPath("$.personIdIssuedBy").value(DEFAULT_PERSON_ID_ISSUED_BY))
            .andExpect(jsonPath("$.personIdDate").value(DEFAULT_PERSON_ID_DATE.toString()))
            .andExpect(jsonPath("$.personIdExpirationDate").value(DEFAULT_PERSON_ID_EXPIRATION_DATE.toString()))
            .andExpect(jsonPath("$.rcNumber").value(DEFAULT_RC_NUMBER))
            .andExpect(jsonPath("$.organization").value(DEFAULT_ORGANIZATION))
            .andExpect(jsonPath("$.businessNature").value(DEFAULT_BUSINESS_NATURE))
            .andExpect(jsonPath("$.birthPlace").value(DEFAULT_BIRTH_PLACE))
            .andExpect(jsonPath("$.birthDate").value(DEFAULT_BIRTH_DATE.toString()))
            .andExpect(jsonPath("$.personTitle").value(DEFAULT_PERSON_TITLE))
            .andExpect(jsonPath("$.gender").value(DEFAULT_GENDER))
            .andExpect(jsonPath("$.firstName").value(DEFAULT_FIRST_NAME))
            .andExpect(jsonPath("$.middleName").value(DEFAULT_MIDDLE_NAME))
            .andExpect(jsonPath("$.lastName").value(DEFAULT_LAST_NAME))
            .andExpect(jsonPath("$.civilState").value(DEFAULT_CIVIL_STATE))
            .andExpect(jsonPath("$.driverLicenseRegion").value(DEFAULT_DRIVER_LICENSE_REGION))
            .andExpect(jsonPath("$.driverLicence").value(DEFAULT_DRIVER_LICENCE))
            .andExpect(jsonPath("$.representativeId").value(DEFAULT_REPRESENTATIVE_ID))
            .andExpect(jsonPath("$.professionRegNo").value(DEFAULT_PROFESSION_REG_NO))
            .andExpect(jsonPath("$.occupation").value(DEFAULT_OCCUPATION));
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
            .partyType(UPDATED_PARTY_TYPE)
            .partyRoleType(UPDATED_PARTY_ROLE_TYPE)
            .partySubRoleType(UPDATED_PARTY_SUB_ROLE_TYPE)
            .deliveryType(UPDATED_DELIVERY_TYPE)
            .partyName(UPDATED_PARTY_NAME)
            .shareNominator(UPDATED_SHARE_NOMINATOR)
            .shareDenominator(UPDATED_SHARE_DENOMINATOR)
            .taxExempt(UPDATED_TAX_EXEMPT)
            .primaryParty(UPDATED_PRIMARY_PARTY)
            .otherName(UPDATED_OTHER_NAME)
            .personIdType(UPDATED_PERSON_ID_TYPE)
            .personType(UPDATED_PERSON_TYPE)
            .fax(UPDATED_FAX)
            .email(UPDATED_EMAIL)
            .emailType(UPDATED_EMAIL_TYPE)
            .phoneNumber(UPDATED_PHONE_NUMBER)
            .payerId(UPDATED_PAYER_ID)
            .taxPayerNumber(UPDATED_TAX_PAYER_NUMBER)
            .comments(UPDATED_COMMENTS)
            .personIdIssuedBy(UPDATED_PERSON_ID_ISSUED_BY)
            .personIdDate(UPDATED_PERSON_ID_DATE)
            .personIdExpirationDate(UPDATED_PERSON_ID_EXPIRATION_DATE)
            .rcNumber(UPDATED_RC_NUMBER)
            .organization(UPDATED_ORGANIZATION)
            .businessNature(UPDATED_BUSINESS_NATURE)
            .birthPlace(UPDATED_BIRTH_PLACE)
            .birthDate(UPDATED_BIRTH_DATE)
            .personTitle(UPDATED_PERSON_TITLE)
            .gender(UPDATED_GENDER)
            .firstName(UPDATED_FIRST_NAME)
            .middleName(UPDATED_MIDDLE_NAME)
            .lastName(UPDATED_LAST_NAME)
            .civilState(UPDATED_CIVIL_STATE)
            .driverLicenseRegion(UPDATED_DRIVER_LICENSE_REGION)
            .driverLicence(UPDATED_DRIVER_LICENCE)
            .representativeId(UPDATED_REPRESENTATIVE_ID)
            .professionRegNo(UPDATED_PROFESSION_REG_NO)
            .occupation(UPDATED_OCCUPATION);

        restPartyMockMvc.perform(put("/api/parties")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedParty)))
            .andExpect(status().isOk());

        // Validate the Party in the database
        List<Party> partyList = partyRepository.findAll();
        assertThat(partyList).hasSize(databaseSizeBeforeUpdate);
        Party testParty = partyList.get(partyList.size() - 1);
        assertThat(testParty.getPartyType()).isEqualTo(UPDATED_PARTY_TYPE);
        assertThat(testParty.getPartyRoleType()).isEqualTo(UPDATED_PARTY_ROLE_TYPE);
        assertThat(testParty.getPartySubRoleType()).isEqualTo(UPDATED_PARTY_SUB_ROLE_TYPE);
        assertThat(testParty.getDeliveryType()).isEqualTo(UPDATED_DELIVERY_TYPE);
        assertThat(testParty.getPartyName()).isEqualTo(UPDATED_PARTY_NAME);
        assertThat(testParty.getShareNominator()).isEqualTo(UPDATED_SHARE_NOMINATOR);
        assertThat(testParty.getShareDenominator()).isEqualTo(UPDATED_SHARE_DENOMINATOR);
        assertThat(testParty.getTaxExempt()).isEqualTo(UPDATED_TAX_EXEMPT);
        assertThat(testParty.getPrimaryParty()).isEqualTo(UPDATED_PRIMARY_PARTY);
        assertThat(testParty.getOtherName()).isEqualTo(UPDATED_OTHER_NAME);
        assertThat(testParty.getPersonIdType()).isEqualTo(UPDATED_PERSON_ID_TYPE);
        assertThat(testParty.getPersonType()).isEqualTo(UPDATED_PERSON_TYPE);
        assertThat(testParty.getFax()).isEqualTo(UPDATED_FAX);
        assertThat(testParty.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testParty.getEmailType()).isEqualTo(UPDATED_EMAIL_TYPE);
        assertThat(testParty.getPhoneNumber()).isEqualTo(UPDATED_PHONE_NUMBER);
        assertThat(testParty.getPayerId()).isEqualTo(UPDATED_PAYER_ID);
        assertThat(testParty.getTaxPayerNumber()).isEqualTo(UPDATED_TAX_PAYER_NUMBER);
        assertThat(testParty.getComments()).isEqualTo(UPDATED_COMMENTS);
        assertThat(testParty.getPersonIdIssuedBy()).isEqualTo(UPDATED_PERSON_ID_ISSUED_BY);
        assertThat(testParty.getPersonIdDate()).isEqualTo(UPDATED_PERSON_ID_DATE);
        assertThat(testParty.getPersonIdExpirationDate()).isEqualTo(UPDATED_PERSON_ID_EXPIRATION_DATE);
        assertThat(testParty.getRcNumber()).isEqualTo(UPDATED_RC_NUMBER);
        assertThat(testParty.getOrganization()).isEqualTo(UPDATED_ORGANIZATION);
        assertThat(testParty.getBusinessNature()).isEqualTo(UPDATED_BUSINESS_NATURE);
        assertThat(testParty.getBirthPlace()).isEqualTo(UPDATED_BIRTH_PLACE);
        assertThat(testParty.getBirthDate()).isEqualTo(UPDATED_BIRTH_DATE);
        assertThat(testParty.getPersonTitle()).isEqualTo(UPDATED_PERSON_TITLE);
        assertThat(testParty.getGender()).isEqualTo(UPDATED_GENDER);
        assertThat(testParty.getFirstName()).isEqualTo(UPDATED_FIRST_NAME);
        assertThat(testParty.getMiddleName()).isEqualTo(UPDATED_MIDDLE_NAME);
        assertThat(testParty.getLastName()).isEqualTo(UPDATED_LAST_NAME);
        assertThat(testParty.getCivilState()).isEqualTo(UPDATED_CIVIL_STATE);
        assertThat(testParty.getDriverLicenseRegion()).isEqualTo(UPDATED_DRIVER_LICENSE_REGION);
        assertThat(testParty.getDriverLicence()).isEqualTo(UPDATED_DRIVER_LICENCE);
        assertThat(testParty.getRepresentativeId()).isEqualTo(UPDATED_REPRESENTATIVE_ID);
        assertThat(testParty.getProfessionRegNo()).isEqualTo(UPDATED_PROFESSION_REG_NO);
        assertThat(testParty.getOccupation()).isEqualTo(UPDATED_OCCUPATION);

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
            .andExpect(jsonPath("$.[*].partyType").value(hasItem(DEFAULT_PARTY_TYPE)))
            .andExpect(jsonPath("$.[*].partyRoleType").value(hasItem(DEFAULT_PARTY_ROLE_TYPE)))
            .andExpect(jsonPath("$.[*].partySubRoleType").value(hasItem(DEFAULT_PARTY_SUB_ROLE_TYPE)))
            .andExpect(jsonPath("$.[*].deliveryType").value(hasItem(DEFAULT_DELIVERY_TYPE)))
            .andExpect(jsonPath("$.[*].partyName").value(hasItem(DEFAULT_PARTY_NAME)))
            .andExpect(jsonPath("$.[*].shareNominator").value(hasItem(DEFAULT_SHARE_NOMINATOR)))
            .andExpect(jsonPath("$.[*].shareDenominator").value(hasItem(DEFAULT_SHARE_DENOMINATOR)))
            .andExpect(jsonPath("$.[*].taxExempt").value(hasItem(DEFAULT_TAX_EXEMPT)))
            .andExpect(jsonPath("$.[*].primaryParty").value(hasItem(DEFAULT_PRIMARY_PARTY)))
            .andExpect(jsonPath("$.[*].otherName").value(hasItem(DEFAULT_OTHER_NAME)))
            .andExpect(jsonPath("$.[*].personIdType").value(hasItem(DEFAULT_PERSON_ID_TYPE)))
            .andExpect(jsonPath("$.[*].personType").value(hasItem(DEFAULT_PERSON_TYPE)))
            .andExpect(jsonPath("$.[*].fax").value(hasItem(DEFAULT_FAX)))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL)))
            .andExpect(jsonPath("$.[*].emailType").value(hasItem(DEFAULT_EMAIL_TYPE)))
            .andExpect(jsonPath("$.[*].phoneNumber").value(hasItem(DEFAULT_PHONE_NUMBER)))
            .andExpect(jsonPath("$.[*].payerId").value(hasItem(DEFAULT_PAYER_ID)))
            .andExpect(jsonPath("$.[*].taxPayerNumber").value(hasItem(DEFAULT_TAX_PAYER_NUMBER)))
            .andExpect(jsonPath("$.[*].comments").value(hasItem(DEFAULT_COMMENTS)))
            .andExpect(jsonPath("$.[*].personIdIssuedBy").value(hasItem(DEFAULT_PERSON_ID_ISSUED_BY)))
            .andExpect(jsonPath("$.[*].personIdDate").value(hasItem(DEFAULT_PERSON_ID_DATE.toString())))
            .andExpect(jsonPath("$.[*].personIdExpirationDate").value(hasItem(DEFAULT_PERSON_ID_EXPIRATION_DATE.toString())))
            .andExpect(jsonPath("$.[*].rcNumber").value(hasItem(DEFAULT_RC_NUMBER)))
            .andExpect(jsonPath("$.[*].organization").value(hasItem(DEFAULT_ORGANIZATION)))
            .andExpect(jsonPath("$.[*].businessNature").value(hasItem(DEFAULT_BUSINESS_NATURE)))
            .andExpect(jsonPath("$.[*].birthPlace").value(hasItem(DEFAULT_BIRTH_PLACE)))
            .andExpect(jsonPath("$.[*].birthDate").value(hasItem(DEFAULT_BIRTH_DATE.toString())))
            .andExpect(jsonPath("$.[*].personTitle").value(hasItem(DEFAULT_PERSON_TITLE)))
            .andExpect(jsonPath("$.[*].gender").value(hasItem(DEFAULT_GENDER)))
            .andExpect(jsonPath("$.[*].firstName").value(hasItem(DEFAULT_FIRST_NAME)))
            .andExpect(jsonPath("$.[*].middleName").value(hasItem(DEFAULT_MIDDLE_NAME)))
            .andExpect(jsonPath("$.[*].lastName").value(hasItem(DEFAULT_LAST_NAME)))
            .andExpect(jsonPath("$.[*].civilState").value(hasItem(DEFAULT_CIVIL_STATE)))
            .andExpect(jsonPath("$.[*].driverLicenseRegion").value(hasItem(DEFAULT_DRIVER_LICENSE_REGION)))
            .andExpect(jsonPath("$.[*].driverLicence").value(hasItem(DEFAULT_DRIVER_LICENCE)))
            .andExpect(jsonPath("$.[*].representativeId").value(hasItem(DEFAULT_REPRESENTATIVE_ID)))
            .andExpect(jsonPath("$.[*].professionRegNo").value(hasItem(DEFAULT_PROFESSION_REG_NO)))
            .andExpect(jsonPath("$.[*].occupation").value(hasItem(DEFAULT_OCCUPATION)));
    }
}
