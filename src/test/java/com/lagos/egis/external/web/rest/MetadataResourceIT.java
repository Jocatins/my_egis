package com.lagos.egis.external.web.rest;

import com.lagos.egis.external.EgisexternalApp;
import com.lagos.egis.external.domain.Metadata;
import com.lagos.egis.external.repository.MetadataRepository;
import com.lagos.egis.external.repository.search.MetadataSearchRepository;
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
 * Integration tests for the {@link MetadataResource} REST controller.
 */
@SpringBootTest(classes = EgisexternalApp.class)
public class MetadataResourceIT {

    private static final String DEFAULT_HJTYPE = "AAAAAAAAAA";
    private static final String UPDATED_HJTYPE = "BBBBBBBBBB";

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_LABEL = "AAAAAAAAAA";
    private static final String UPDATED_LABEL = "BBBBBBBBBB";

    private static final String DEFAULT_DESCR = "AAAAAAAAAA";
    private static final String UPDATED_DESCR = "BBBBBBBBBB";

    private static final String DEFAULT_CATEGORY = "AAAAAAAAAA";
    private static final String UPDATED_CATEGORY = "BBBBBBBBBB";

    private static final String DEFAULT_GENERAL_TERM = "AAAAAAAAAA";
    private static final String UPDATED_GENERAL_TERM = "BBBBBBBBBB";

    private static final String DEFAULT_SORT_ORDER = "AAAAAAAAAA";
    private static final String UPDATED_SORT_ORDER = "BBBBBBBBBB";

    private static final String DEFAULT_HIDDEN = "AAAAAAAAAA";
    private static final String UPDATED_HIDDEN = "BBBBBBBBBB";

    private static final String DEFAULT_GROUP_NAME = "AAAAAAAAAA";
    private static final String UPDATED_GROUP_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_WORKFLOW = "AAAAAAAAAA";
    private static final String UPDATED_WORKFLOW = "BBBBBBBBBB";

    private static final String DEFAULT_GROUP_CODE = "AAAAAAAAAA";
    private static final String UPDATED_GROUP_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_NORMAL_DURATION = "AAAAAAAAAA";
    private static final String UPDATED_NORMAL_DURATION = "BBBBBBBBBB";

    private static final String DEFAULT_LAPSED_DURATION = "AAAAAAAAAA";
    private static final String UPDATED_LAPSED_DURATION = "BBBBBBBBBB";

    private static final String DEFAULT_MAX_DURATION = "AAAAAAAAAA";
    private static final String UPDATED_MAX_DURATION = "BBBBBBBBBB";

    private static final String DEFAULT_RIGHT_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_RIGHT_TYPE = "BBBBBBBBBB";

    private static final String DEFAULT_RIGHT_TYPE_MULTIPLE = "AAAAAAAAAA";
    private static final String UPDATED_RIGHT_TYPE_MULTIPLE = "BBBBBBBBBB";

    private static final String DEFAULT_RIGHT_TYPE_OTHER = "AAAAAAAAAA";
    private static final String UPDATED_RIGHT_TYPE_OTHER = "BBBBBBBBBB";

    private static final String DEFAULT_CREATE_NEW_RRS = "AAAAAAAAAA";
    private static final String UPDATED_CREATE_NEW_RRS = "BBBBBBBBBB";

    private static final String DEFAULT_MODIFY_ACTIVE_RRRS = "AAAAAAAAAA";
    private static final String UPDATED_MODIFY_ACTIVE_RRRS = "BBBBBBBBBB";

    private static final String DEFAULT_RELATED_ACTIVE_RRRS = "AAAAAAAAAA";
    private static final String UPDATED_RELATED_ACTIVE_RRRS = "BBBBBBBBBB";

    private static final String DEFAULT_DISCHARGE_ACTIVE_RRRS = "AAAAAAAAAA";
    private static final String UPDATED_DISCHARGE_ACTIVE_RRRS = "BBBBBBBBBB";

    private static final String DEFAULT_BLOCKED_ACTIVE_RRRS = "AAAAAAAAAA";
    private static final String UPDATED_BLOCKED_ACTIVE_RRRS = "BBBBBBBBBB";

    private static final String DEFAULT_META_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_META_TYPE = "BBBBBBBBBB";

    private static final String DEFAULT_SOURCE_PARTY_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_SOURCE_PARTY_TYPE = "BBBBBBBBBB";

    private static final String DEFAULT_TARGET_PARTY_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_TARGET_PARTY_TYPE = "BBBBBBBBBB";

    private static final String DEFAULT_OTHER_PARTY_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_OTHER_PARTY_TYPE = "BBBBBBBBBB";

    private static final String DEFAULT_RELATED_TRANSACTION_CODE = "AAAAAAAAAA";
    private static final String UPDATED_RELATED_TRANSACTION_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_CASHIER_TRANSACTION_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CASHIER_TRANSACTION_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_FEE_PAYMENT_CODES = "AAAAAAAAAA";
    private static final String UPDATED_FEE_PAYMENT_CODES = "BBBBBBBBBB";

    private static final String DEFAULT_MANDATORY_DOCS_CODES = "AAAAAAAAAA";
    private static final String UPDATED_MANDATORY_DOCS_CODES = "BBBBBBBBBB";

    private static final String DEFAULT_MANDATORY_SCAN_OUTGOING_DOCS_CODES = "AAAAAAAAAA";
    private static final String UPDATED_MANDATORY_SCAN_OUTGOING_DOCS_CODES = "BBBBBBBBBB";

    private static final String DEFAULT_CREATE_MUTATE_PROPERTY = "AAAAAAAAAA";
    private static final String UPDATED_CREATE_MUTATE_PROPERTY = "BBBBBBBBBB";

    private static final String DEFAULT_REFERENCED_PROPERTIES = "AAAAAAAAAA";
    private static final String UPDATED_REFERENCED_PROPERTIES = "BBBBBBBBBB";

    private static final String DEFAULT_PRIOR_REQUIRED_TRANSACTIONS = "AAAAAAAAAA";
    private static final String UPDATED_PRIOR_REQUIRED_TRANSACTIONS = "BBBBBBBBBB";

    private static final String DEFAULT_CREATE_NEW_PARTY = "AAAAAAAAAA";
    private static final String UPDATED_CREATE_NEW_PARTY = "BBBBBBBBBB";

    private static final String DEFAULT_PARTY_BUSINESS_RULES = "AAAAAAAAAA";
    private static final String UPDATED_PARTY_BUSINESS_RULES = "BBBBBBBBBB";

    private static final String DEFAULT_REPORT_TEMPLATES = "AAAAAAAAAA";
    private static final String UPDATED_REPORT_TEMPLATES = "BBBBBBBBBB";

    private static final String DEFAULT_DETACHABLE = "AAAAAAAAAA";
    private static final String UPDATED_DETACHABLE = "BBBBBBBBBB";

    private static final String DEFAULT_PARENT_TRANSACTION_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_PARENT_TRANSACTION_TYPE = "BBBBBBBBBB";

    private static final String DEFAULT_INTERNAL_CODE = "AAAAAAAAAA";
    private static final String UPDATED_INTERNAL_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_VERSION = "AAAAAAAAAA";
    private static final String UPDATED_VERSION = "BBBBBBBBBB";

    private static final String DEFAULT_BEGIN_LIFESPAN_VERSION = "AAAAAAAAAA";
    private static final String UPDATED_BEGIN_LIFESPAN_VERSION = "BBBBBBBBBB";

    private static final String DEFAULT_END_LIFESPAN_VERSION = "AAAAAAAAAA";
    private static final String UPDATED_END_LIFESPAN_VERSION = "BBBBBBBBBB";

    private static final String DEFAULT_TRAN_INDEX = "AAAAAAAAAA";
    private static final String UPDATED_TRAN_INDEX = "BBBBBBBBBB";

    @Autowired
    private MetadataRepository metadataRepository;

    /**
     * This repository is mocked in the com.lagos.egis.external.repository.search test package.
     *
     * @see com.lagos.egis.external.repository.search.MetadataSearchRepositoryMockConfiguration
     */
    @Autowired
    private MetadataSearchRepository mockMetadataSearchRepository;

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

    private MockMvc restMetadataMockMvc;

    private Metadata metadata;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MetadataResource metadataResource = new MetadataResource(metadataRepository, mockMetadataSearchRepository);
        this.restMetadataMockMvc = MockMvcBuilders.standaloneSetup(metadataResource)
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
    public static Metadata createEntity(EntityManager em) {
        Metadata metadata = new Metadata()
            .hjtype(DEFAULT_HJTYPE)
            .code(DEFAULT_CODE)
            .label(DEFAULT_LABEL)
            .descr(DEFAULT_DESCR)
            .category(DEFAULT_CATEGORY)
            .generalTerm(DEFAULT_GENERAL_TERM)
            .sortOrder(DEFAULT_SORT_ORDER)
            .hidden(DEFAULT_HIDDEN)
            .groupName(DEFAULT_GROUP_NAME)
            .workflow(DEFAULT_WORKFLOW)
            .groupCode(DEFAULT_GROUP_CODE)
            .normalDuration(DEFAULT_NORMAL_DURATION)
            .lapsedDuration(DEFAULT_LAPSED_DURATION)
            .maxDuration(DEFAULT_MAX_DURATION)
            .rightType(DEFAULT_RIGHT_TYPE)
            .rightTypeMultiple(DEFAULT_RIGHT_TYPE_MULTIPLE)
            .rightTypeOther(DEFAULT_RIGHT_TYPE_OTHER)
            .createNewRrs(DEFAULT_CREATE_NEW_RRS)
            .modifyActiveRrrs(DEFAULT_MODIFY_ACTIVE_RRRS)
            .relatedActiveRrrs(DEFAULT_RELATED_ACTIVE_RRRS)
            .dischargeActiveRrrs(DEFAULT_DISCHARGE_ACTIVE_RRRS)
            .blockedActiveRrrs(DEFAULT_BLOCKED_ACTIVE_RRRS)
            .metaType(DEFAULT_META_TYPE)
            .sourcePartyType(DEFAULT_SOURCE_PARTY_TYPE)
            .targetPartyType(DEFAULT_TARGET_PARTY_TYPE)
            .otherPartyType(DEFAULT_OTHER_PARTY_TYPE)
            .relatedTransactionCode(DEFAULT_RELATED_TRANSACTION_CODE)
            .cashierTransactionCode(DEFAULT_CASHIER_TRANSACTION_CODE)
            .feePaymentCodes(DEFAULT_FEE_PAYMENT_CODES)
            .mandatoryDocsCodes(DEFAULT_MANDATORY_DOCS_CODES)
            .mandatoryScanOutgoingDocsCodes(DEFAULT_MANDATORY_SCAN_OUTGOING_DOCS_CODES)
            .createMutateProperty(DEFAULT_CREATE_MUTATE_PROPERTY)
            .referencedProperties(DEFAULT_REFERENCED_PROPERTIES)
            .priorRequiredTransactions(DEFAULT_PRIOR_REQUIRED_TRANSACTIONS)
            .createNewParty(DEFAULT_CREATE_NEW_PARTY)
            .partyBusinessRules(DEFAULT_PARTY_BUSINESS_RULES)
            .reportTemplates(DEFAULT_REPORT_TEMPLATES)
            .detachable(DEFAULT_DETACHABLE)
            .parentTransactionType(DEFAULT_PARENT_TRANSACTION_TYPE)
            .internalCode(DEFAULT_INTERNAL_CODE)
            .version(DEFAULT_VERSION)
            .beginLifespanVersion(DEFAULT_BEGIN_LIFESPAN_VERSION)
            .endLifespanVersion(DEFAULT_END_LIFESPAN_VERSION)
            .tranIndex(DEFAULT_TRAN_INDEX);
        return metadata;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Metadata createUpdatedEntity(EntityManager em) {
        Metadata metadata = new Metadata()
            .hjtype(UPDATED_HJTYPE)
            .code(UPDATED_CODE)
            .label(UPDATED_LABEL)
            .descr(UPDATED_DESCR)
            .category(UPDATED_CATEGORY)
            .generalTerm(UPDATED_GENERAL_TERM)
            .sortOrder(UPDATED_SORT_ORDER)
            .hidden(UPDATED_HIDDEN)
            .groupName(UPDATED_GROUP_NAME)
            .workflow(UPDATED_WORKFLOW)
            .groupCode(UPDATED_GROUP_CODE)
            .normalDuration(UPDATED_NORMAL_DURATION)
            .lapsedDuration(UPDATED_LAPSED_DURATION)
            .maxDuration(UPDATED_MAX_DURATION)
            .rightType(UPDATED_RIGHT_TYPE)
            .rightTypeMultiple(UPDATED_RIGHT_TYPE_MULTIPLE)
            .rightTypeOther(UPDATED_RIGHT_TYPE_OTHER)
            .createNewRrs(UPDATED_CREATE_NEW_RRS)
            .modifyActiveRrrs(UPDATED_MODIFY_ACTIVE_RRRS)
            .relatedActiveRrrs(UPDATED_RELATED_ACTIVE_RRRS)
            .dischargeActiveRrrs(UPDATED_DISCHARGE_ACTIVE_RRRS)
            .blockedActiveRrrs(UPDATED_BLOCKED_ACTIVE_RRRS)
            .metaType(UPDATED_META_TYPE)
            .sourcePartyType(UPDATED_SOURCE_PARTY_TYPE)
            .targetPartyType(UPDATED_TARGET_PARTY_TYPE)
            .otherPartyType(UPDATED_OTHER_PARTY_TYPE)
            .relatedTransactionCode(UPDATED_RELATED_TRANSACTION_CODE)
            .cashierTransactionCode(UPDATED_CASHIER_TRANSACTION_CODE)
            .feePaymentCodes(UPDATED_FEE_PAYMENT_CODES)
            .mandatoryDocsCodes(UPDATED_MANDATORY_DOCS_CODES)
            .mandatoryScanOutgoingDocsCodes(UPDATED_MANDATORY_SCAN_OUTGOING_DOCS_CODES)
            .createMutateProperty(UPDATED_CREATE_MUTATE_PROPERTY)
            .referencedProperties(UPDATED_REFERENCED_PROPERTIES)
            .priorRequiredTransactions(UPDATED_PRIOR_REQUIRED_TRANSACTIONS)
            .createNewParty(UPDATED_CREATE_NEW_PARTY)
            .partyBusinessRules(UPDATED_PARTY_BUSINESS_RULES)
            .reportTemplates(UPDATED_REPORT_TEMPLATES)
            .detachable(UPDATED_DETACHABLE)
            .parentTransactionType(UPDATED_PARENT_TRANSACTION_TYPE)
            .internalCode(UPDATED_INTERNAL_CODE)
            .version(UPDATED_VERSION)
            .beginLifespanVersion(UPDATED_BEGIN_LIFESPAN_VERSION)
            .endLifespanVersion(UPDATED_END_LIFESPAN_VERSION)
            .tranIndex(UPDATED_TRAN_INDEX);
        return metadata;
    }

    @BeforeEach
    public void initTest() {
        metadata = createEntity(em);
    }

    @Test
    @Transactional
    public void createMetadata() throws Exception {
        int databaseSizeBeforeCreate = metadataRepository.findAll().size();

        // Create the Metadata
        restMetadataMockMvc.perform(post("/api/metadata")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(metadata)))
            .andExpect(status().isCreated());

        // Validate the Metadata in the database
        List<Metadata> metadataList = metadataRepository.findAll();
        assertThat(metadataList).hasSize(databaseSizeBeforeCreate + 1);
        Metadata testMetadata = metadataList.get(metadataList.size() - 1);
        assertThat(testMetadata.getHjtype()).isEqualTo(DEFAULT_HJTYPE);
        assertThat(testMetadata.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testMetadata.getLabel()).isEqualTo(DEFAULT_LABEL);
        assertThat(testMetadata.getDescr()).isEqualTo(DEFAULT_DESCR);
        assertThat(testMetadata.getCategory()).isEqualTo(DEFAULT_CATEGORY);
        assertThat(testMetadata.getGeneralTerm()).isEqualTo(DEFAULT_GENERAL_TERM);
        assertThat(testMetadata.getSortOrder()).isEqualTo(DEFAULT_SORT_ORDER);
        assertThat(testMetadata.getHidden()).isEqualTo(DEFAULT_HIDDEN);
        assertThat(testMetadata.getGroupName()).isEqualTo(DEFAULT_GROUP_NAME);
        assertThat(testMetadata.getWorkflow()).isEqualTo(DEFAULT_WORKFLOW);
        assertThat(testMetadata.getGroupCode()).isEqualTo(DEFAULT_GROUP_CODE);
        assertThat(testMetadata.getNormalDuration()).isEqualTo(DEFAULT_NORMAL_DURATION);
        assertThat(testMetadata.getLapsedDuration()).isEqualTo(DEFAULT_LAPSED_DURATION);
        assertThat(testMetadata.getMaxDuration()).isEqualTo(DEFAULT_MAX_DURATION);
        assertThat(testMetadata.getRightType()).isEqualTo(DEFAULT_RIGHT_TYPE);
        assertThat(testMetadata.getRightTypeMultiple()).isEqualTo(DEFAULT_RIGHT_TYPE_MULTIPLE);
        assertThat(testMetadata.getRightTypeOther()).isEqualTo(DEFAULT_RIGHT_TYPE_OTHER);
        assertThat(testMetadata.getCreateNewRrs()).isEqualTo(DEFAULT_CREATE_NEW_RRS);
        assertThat(testMetadata.getModifyActiveRrrs()).isEqualTo(DEFAULT_MODIFY_ACTIVE_RRRS);
        assertThat(testMetadata.getRelatedActiveRrrs()).isEqualTo(DEFAULT_RELATED_ACTIVE_RRRS);
        assertThat(testMetadata.getDischargeActiveRrrs()).isEqualTo(DEFAULT_DISCHARGE_ACTIVE_RRRS);
        assertThat(testMetadata.getBlockedActiveRrrs()).isEqualTo(DEFAULT_BLOCKED_ACTIVE_RRRS);
        assertThat(testMetadata.getMetaType()).isEqualTo(DEFAULT_META_TYPE);
        assertThat(testMetadata.getSourcePartyType()).isEqualTo(DEFAULT_SOURCE_PARTY_TYPE);
        assertThat(testMetadata.getTargetPartyType()).isEqualTo(DEFAULT_TARGET_PARTY_TYPE);
        assertThat(testMetadata.getOtherPartyType()).isEqualTo(DEFAULT_OTHER_PARTY_TYPE);
        assertThat(testMetadata.getRelatedTransactionCode()).isEqualTo(DEFAULT_RELATED_TRANSACTION_CODE);
        assertThat(testMetadata.getCashierTransactionCode()).isEqualTo(DEFAULT_CASHIER_TRANSACTION_CODE);
        assertThat(testMetadata.getFeePaymentCodes()).isEqualTo(DEFAULT_FEE_PAYMENT_CODES);
        assertThat(testMetadata.getMandatoryDocsCodes()).isEqualTo(DEFAULT_MANDATORY_DOCS_CODES);
        assertThat(testMetadata.getMandatoryScanOutgoingDocsCodes()).isEqualTo(DEFAULT_MANDATORY_SCAN_OUTGOING_DOCS_CODES);
        assertThat(testMetadata.getCreateMutateProperty()).isEqualTo(DEFAULT_CREATE_MUTATE_PROPERTY);
        assertThat(testMetadata.getReferencedProperties()).isEqualTo(DEFAULT_REFERENCED_PROPERTIES);
        assertThat(testMetadata.getPriorRequiredTransactions()).isEqualTo(DEFAULT_PRIOR_REQUIRED_TRANSACTIONS);
        assertThat(testMetadata.getCreateNewParty()).isEqualTo(DEFAULT_CREATE_NEW_PARTY);
        assertThat(testMetadata.getPartyBusinessRules()).isEqualTo(DEFAULT_PARTY_BUSINESS_RULES);
        assertThat(testMetadata.getReportTemplates()).isEqualTo(DEFAULT_REPORT_TEMPLATES);
        assertThat(testMetadata.getDetachable()).isEqualTo(DEFAULT_DETACHABLE);
        assertThat(testMetadata.getParentTransactionType()).isEqualTo(DEFAULT_PARENT_TRANSACTION_TYPE);
        assertThat(testMetadata.getInternalCode()).isEqualTo(DEFAULT_INTERNAL_CODE);
        assertThat(testMetadata.getVersion()).isEqualTo(DEFAULT_VERSION);
        assertThat(testMetadata.getBeginLifespanVersion()).isEqualTo(DEFAULT_BEGIN_LIFESPAN_VERSION);
        assertThat(testMetadata.getEndLifespanVersion()).isEqualTo(DEFAULT_END_LIFESPAN_VERSION);
        assertThat(testMetadata.getTranIndex()).isEqualTo(DEFAULT_TRAN_INDEX);

        // Validate the Metadata in Elasticsearch
        verify(mockMetadataSearchRepository, times(1)).save(testMetadata);
    }

    @Test
    @Transactional
    public void createMetadataWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = metadataRepository.findAll().size();

        // Create the Metadata with an existing ID
        metadata.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMetadataMockMvc.perform(post("/api/metadata")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(metadata)))
            .andExpect(status().isBadRequest());

        // Validate the Metadata in the database
        List<Metadata> metadataList = metadataRepository.findAll();
        assertThat(metadataList).hasSize(databaseSizeBeforeCreate);

        // Validate the Metadata in Elasticsearch
        verify(mockMetadataSearchRepository, times(0)).save(metadata);
    }


    @Test
    @Transactional
    public void getAllMetadata() throws Exception {
        // Initialize the database
        metadataRepository.saveAndFlush(metadata);

        // Get all the metadataList
        restMetadataMockMvc.perform(get("/api/metadata?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(metadata.getId().intValue())))
            .andExpect(jsonPath("$.[*].hjtype").value(hasItem(DEFAULT_HJTYPE)))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE)))
            .andExpect(jsonPath("$.[*].label").value(hasItem(DEFAULT_LABEL)))
            .andExpect(jsonPath("$.[*].descr").value(hasItem(DEFAULT_DESCR)))
            .andExpect(jsonPath("$.[*].category").value(hasItem(DEFAULT_CATEGORY)))
            .andExpect(jsonPath("$.[*].generalTerm").value(hasItem(DEFAULT_GENERAL_TERM)))
            .andExpect(jsonPath("$.[*].sortOrder").value(hasItem(DEFAULT_SORT_ORDER)))
            .andExpect(jsonPath("$.[*].hidden").value(hasItem(DEFAULT_HIDDEN)))
            .andExpect(jsonPath("$.[*].groupName").value(hasItem(DEFAULT_GROUP_NAME)))
            .andExpect(jsonPath("$.[*].workflow").value(hasItem(DEFAULT_WORKFLOW)))
            .andExpect(jsonPath("$.[*].groupCode").value(hasItem(DEFAULT_GROUP_CODE)))
            .andExpect(jsonPath("$.[*].normalDuration").value(hasItem(DEFAULT_NORMAL_DURATION)))
            .andExpect(jsonPath("$.[*].lapsedDuration").value(hasItem(DEFAULT_LAPSED_DURATION)))
            .andExpect(jsonPath("$.[*].maxDuration").value(hasItem(DEFAULT_MAX_DURATION)))
            .andExpect(jsonPath("$.[*].rightType").value(hasItem(DEFAULT_RIGHT_TYPE)))
            .andExpect(jsonPath("$.[*].rightTypeMultiple").value(hasItem(DEFAULT_RIGHT_TYPE_MULTIPLE)))
            .andExpect(jsonPath("$.[*].rightTypeOther").value(hasItem(DEFAULT_RIGHT_TYPE_OTHER)))
            .andExpect(jsonPath("$.[*].createNewRrs").value(hasItem(DEFAULT_CREATE_NEW_RRS)))
            .andExpect(jsonPath("$.[*].modifyActiveRrrs").value(hasItem(DEFAULT_MODIFY_ACTIVE_RRRS)))
            .andExpect(jsonPath("$.[*].relatedActiveRrrs").value(hasItem(DEFAULT_RELATED_ACTIVE_RRRS)))
            .andExpect(jsonPath("$.[*].dischargeActiveRrrs").value(hasItem(DEFAULT_DISCHARGE_ACTIVE_RRRS)))
            .andExpect(jsonPath("$.[*].blockedActiveRrrs").value(hasItem(DEFAULT_BLOCKED_ACTIVE_RRRS)))
            .andExpect(jsonPath("$.[*].metaType").value(hasItem(DEFAULT_META_TYPE)))
            .andExpect(jsonPath("$.[*].sourcePartyType").value(hasItem(DEFAULT_SOURCE_PARTY_TYPE)))
            .andExpect(jsonPath("$.[*].targetPartyType").value(hasItem(DEFAULT_TARGET_PARTY_TYPE)))
            .andExpect(jsonPath("$.[*].otherPartyType").value(hasItem(DEFAULT_OTHER_PARTY_TYPE)))
            .andExpect(jsonPath("$.[*].relatedTransactionCode").value(hasItem(DEFAULT_RELATED_TRANSACTION_CODE)))
            .andExpect(jsonPath("$.[*].cashierTransactionCode").value(hasItem(DEFAULT_CASHIER_TRANSACTION_CODE)))
            .andExpect(jsonPath("$.[*].feePaymentCodes").value(hasItem(DEFAULT_FEE_PAYMENT_CODES)))
            .andExpect(jsonPath("$.[*].mandatoryDocsCodes").value(hasItem(DEFAULT_MANDATORY_DOCS_CODES)))
            .andExpect(jsonPath("$.[*].mandatoryScanOutgoingDocsCodes").value(hasItem(DEFAULT_MANDATORY_SCAN_OUTGOING_DOCS_CODES)))
            .andExpect(jsonPath("$.[*].createMutateProperty").value(hasItem(DEFAULT_CREATE_MUTATE_PROPERTY)))
            .andExpect(jsonPath("$.[*].referencedProperties").value(hasItem(DEFAULT_REFERENCED_PROPERTIES)))
            .andExpect(jsonPath("$.[*].priorRequiredTransactions").value(hasItem(DEFAULT_PRIOR_REQUIRED_TRANSACTIONS)))
            .andExpect(jsonPath("$.[*].createNewParty").value(hasItem(DEFAULT_CREATE_NEW_PARTY)))
            .andExpect(jsonPath("$.[*].partyBusinessRules").value(hasItem(DEFAULT_PARTY_BUSINESS_RULES)))
            .andExpect(jsonPath("$.[*].reportTemplates").value(hasItem(DEFAULT_REPORT_TEMPLATES)))
            .andExpect(jsonPath("$.[*].detachable").value(hasItem(DEFAULT_DETACHABLE)))
            .andExpect(jsonPath("$.[*].parentTransactionType").value(hasItem(DEFAULT_PARENT_TRANSACTION_TYPE)))
            .andExpect(jsonPath("$.[*].internalCode").value(hasItem(DEFAULT_INTERNAL_CODE)))
            .andExpect(jsonPath("$.[*].version").value(hasItem(DEFAULT_VERSION)))
            .andExpect(jsonPath("$.[*].beginLifespanVersion").value(hasItem(DEFAULT_BEGIN_LIFESPAN_VERSION)))
            .andExpect(jsonPath("$.[*].endLifespanVersion").value(hasItem(DEFAULT_END_LIFESPAN_VERSION)))
            .andExpect(jsonPath("$.[*].tranIndex").value(hasItem(DEFAULT_TRAN_INDEX)));
    }
    
    @Test
    @Transactional
    public void getMetadata() throws Exception {
        // Initialize the database
        metadataRepository.saveAndFlush(metadata);

        // Get the metadata
        restMetadataMockMvc.perform(get("/api/metadata/{id}", metadata.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(metadata.getId().intValue()))
            .andExpect(jsonPath("$.hjtype").value(DEFAULT_HJTYPE))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE))
            .andExpect(jsonPath("$.label").value(DEFAULT_LABEL))
            .andExpect(jsonPath("$.descr").value(DEFAULT_DESCR))
            .andExpect(jsonPath("$.category").value(DEFAULT_CATEGORY))
            .andExpect(jsonPath("$.generalTerm").value(DEFAULT_GENERAL_TERM))
            .andExpect(jsonPath("$.sortOrder").value(DEFAULT_SORT_ORDER))
            .andExpect(jsonPath("$.hidden").value(DEFAULT_HIDDEN))
            .andExpect(jsonPath("$.groupName").value(DEFAULT_GROUP_NAME))
            .andExpect(jsonPath("$.workflow").value(DEFAULT_WORKFLOW))
            .andExpect(jsonPath("$.groupCode").value(DEFAULT_GROUP_CODE))
            .andExpect(jsonPath("$.normalDuration").value(DEFAULT_NORMAL_DURATION))
            .andExpect(jsonPath("$.lapsedDuration").value(DEFAULT_LAPSED_DURATION))
            .andExpect(jsonPath("$.maxDuration").value(DEFAULT_MAX_DURATION))
            .andExpect(jsonPath("$.rightType").value(DEFAULT_RIGHT_TYPE))
            .andExpect(jsonPath("$.rightTypeMultiple").value(DEFAULT_RIGHT_TYPE_MULTIPLE))
            .andExpect(jsonPath("$.rightTypeOther").value(DEFAULT_RIGHT_TYPE_OTHER))
            .andExpect(jsonPath("$.createNewRrs").value(DEFAULT_CREATE_NEW_RRS))
            .andExpect(jsonPath("$.modifyActiveRrrs").value(DEFAULT_MODIFY_ACTIVE_RRRS))
            .andExpect(jsonPath("$.relatedActiveRrrs").value(DEFAULT_RELATED_ACTIVE_RRRS))
            .andExpect(jsonPath("$.dischargeActiveRrrs").value(DEFAULT_DISCHARGE_ACTIVE_RRRS))
            .andExpect(jsonPath("$.blockedActiveRrrs").value(DEFAULT_BLOCKED_ACTIVE_RRRS))
            .andExpect(jsonPath("$.metaType").value(DEFAULT_META_TYPE))
            .andExpect(jsonPath("$.sourcePartyType").value(DEFAULT_SOURCE_PARTY_TYPE))
            .andExpect(jsonPath("$.targetPartyType").value(DEFAULT_TARGET_PARTY_TYPE))
            .andExpect(jsonPath("$.otherPartyType").value(DEFAULT_OTHER_PARTY_TYPE))
            .andExpect(jsonPath("$.relatedTransactionCode").value(DEFAULT_RELATED_TRANSACTION_CODE))
            .andExpect(jsonPath("$.cashierTransactionCode").value(DEFAULT_CASHIER_TRANSACTION_CODE))
            .andExpect(jsonPath("$.feePaymentCodes").value(DEFAULT_FEE_PAYMENT_CODES))
            .andExpect(jsonPath("$.mandatoryDocsCodes").value(DEFAULT_MANDATORY_DOCS_CODES))
            .andExpect(jsonPath("$.mandatoryScanOutgoingDocsCodes").value(DEFAULT_MANDATORY_SCAN_OUTGOING_DOCS_CODES))
            .andExpect(jsonPath("$.createMutateProperty").value(DEFAULT_CREATE_MUTATE_PROPERTY))
            .andExpect(jsonPath("$.referencedProperties").value(DEFAULT_REFERENCED_PROPERTIES))
            .andExpect(jsonPath("$.priorRequiredTransactions").value(DEFAULT_PRIOR_REQUIRED_TRANSACTIONS))
            .andExpect(jsonPath("$.createNewParty").value(DEFAULT_CREATE_NEW_PARTY))
            .andExpect(jsonPath("$.partyBusinessRules").value(DEFAULT_PARTY_BUSINESS_RULES))
            .andExpect(jsonPath("$.reportTemplates").value(DEFAULT_REPORT_TEMPLATES))
            .andExpect(jsonPath("$.detachable").value(DEFAULT_DETACHABLE))
            .andExpect(jsonPath("$.parentTransactionType").value(DEFAULT_PARENT_TRANSACTION_TYPE))
            .andExpect(jsonPath("$.internalCode").value(DEFAULT_INTERNAL_CODE))
            .andExpect(jsonPath("$.version").value(DEFAULT_VERSION))
            .andExpect(jsonPath("$.beginLifespanVersion").value(DEFAULT_BEGIN_LIFESPAN_VERSION))
            .andExpect(jsonPath("$.endLifespanVersion").value(DEFAULT_END_LIFESPAN_VERSION))
            .andExpect(jsonPath("$.tranIndex").value(DEFAULT_TRAN_INDEX));
    }

    @Test
    @Transactional
    public void getNonExistingMetadata() throws Exception {
        // Get the metadata
        restMetadataMockMvc.perform(get("/api/metadata/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMetadata() throws Exception {
        // Initialize the database
        metadataRepository.saveAndFlush(metadata);

        int databaseSizeBeforeUpdate = metadataRepository.findAll().size();

        // Update the metadata
        Metadata updatedMetadata = metadataRepository.findById(metadata.getId()).get();
        // Disconnect from session so that the updates on updatedMetadata are not directly saved in db
        em.detach(updatedMetadata);
        updatedMetadata
            .hjtype(UPDATED_HJTYPE)
            .code(UPDATED_CODE)
            .label(UPDATED_LABEL)
            .descr(UPDATED_DESCR)
            .category(UPDATED_CATEGORY)
            .generalTerm(UPDATED_GENERAL_TERM)
            .sortOrder(UPDATED_SORT_ORDER)
            .hidden(UPDATED_HIDDEN)
            .groupName(UPDATED_GROUP_NAME)
            .workflow(UPDATED_WORKFLOW)
            .groupCode(UPDATED_GROUP_CODE)
            .normalDuration(UPDATED_NORMAL_DURATION)
            .lapsedDuration(UPDATED_LAPSED_DURATION)
            .maxDuration(UPDATED_MAX_DURATION)
            .rightType(UPDATED_RIGHT_TYPE)
            .rightTypeMultiple(UPDATED_RIGHT_TYPE_MULTIPLE)
            .rightTypeOther(UPDATED_RIGHT_TYPE_OTHER)
            .createNewRrs(UPDATED_CREATE_NEW_RRS)
            .modifyActiveRrrs(UPDATED_MODIFY_ACTIVE_RRRS)
            .relatedActiveRrrs(UPDATED_RELATED_ACTIVE_RRRS)
            .dischargeActiveRrrs(UPDATED_DISCHARGE_ACTIVE_RRRS)
            .blockedActiveRrrs(UPDATED_BLOCKED_ACTIVE_RRRS)
            .metaType(UPDATED_META_TYPE)
            .sourcePartyType(UPDATED_SOURCE_PARTY_TYPE)
            .targetPartyType(UPDATED_TARGET_PARTY_TYPE)
            .otherPartyType(UPDATED_OTHER_PARTY_TYPE)
            .relatedTransactionCode(UPDATED_RELATED_TRANSACTION_CODE)
            .cashierTransactionCode(UPDATED_CASHIER_TRANSACTION_CODE)
            .feePaymentCodes(UPDATED_FEE_PAYMENT_CODES)
            .mandatoryDocsCodes(UPDATED_MANDATORY_DOCS_CODES)
            .mandatoryScanOutgoingDocsCodes(UPDATED_MANDATORY_SCAN_OUTGOING_DOCS_CODES)
            .createMutateProperty(UPDATED_CREATE_MUTATE_PROPERTY)
            .referencedProperties(UPDATED_REFERENCED_PROPERTIES)
            .priorRequiredTransactions(UPDATED_PRIOR_REQUIRED_TRANSACTIONS)
            .createNewParty(UPDATED_CREATE_NEW_PARTY)
            .partyBusinessRules(UPDATED_PARTY_BUSINESS_RULES)
            .reportTemplates(UPDATED_REPORT_TEMPLATES)
            .detachable(UPDATED_DETACHABLE)
            .parentTransactionType(UPDATED_PARENT_TRANSACTION_TYPE)
            .internalCode(UPDATED_INTERNAL_CODE)
            .version(UPDATED_VERSION)
            .beginLifespanVersion(UPDATED_BEGIN_LIFESPAN_VERSION)
            .endLifespanVersion(UPDATED_END_LIFESPAN_VERSION)
            .tranIndex(UPDATED_TRAN_INDEX);

        restMetadataMockMvc.perform(put("/api/metadata")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMetadata)))
            .andExpect(status().isOk());

        // Validate the Metadata in the database
        List<Metadata> metadataList = metadataRepository.findAll();
        assertThat(metadataList).hasSize(databaseSizeBeforeUpdate);
        Metadata testMetadata = metadataList.get(metadataList.size() - 1);
        assertThat(testMetadata.getHjtype()).isEqualTo(UPDATED_HJTYPE);
        assertThat(testMetadata.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testMetadata.getLabel()).isEqualTo(UPDATED_LABEL);
        assertThat(testMetadata.getDescr()).isEqualTo(UPDATED_DESCR);
        assertThat(testMetadata.getCategory()).isEqualTo(UPDATED_CATEGORY);
        assertThat(testMetadata.getGeneralTerm()).isEqualTo(UPDATED_GENERAL_TERM);
        assertThat(testMetadata.getSortOrder()).isEqualTo(UPDATED_SORT_ORDER);
        assertThat(testMetadata.getHidden()).isEqualTo(UPDATED_HIDDEN);
        assertThat(testMetadata.getGroupName()).isEqualTo(UPDATED_GROUP_NAME);
        assertThat(testMetadata.getWorkflow()).isEqualTo(UPDATED_WORKFLOW);
        assertThat(testMetadata.getGroupCode()).isEqualTo(UPDATED_GROUP_CODE);
        assertThat(testMetadata.getNormalDuration()).isEqualTo(UPDATED_NORMAL_DURATION);
        assertThat(testMetadata.getLapsedDuration()).isEqualTo(UPDATED_LAPSED_DURATION);
        assertThat(testMetadata.getMaxDuration()).isEqualTo(UPDATED_MAX_DURATION);
        assertThat(testMetadata.getRightType()).isEqualTo(UPDATED_RIGHT_TYPE);
        assertThat(testMetadata.getRightTypeMultiple()).isEqualTo(UPDATED_RIGHT_TYPE_MULTIPLE);
        assertThat(testMetadata.getRightTypeOther()).isEqualTo(UPDATED_RIGHT_TYPE_OTHER);
        assertThat(testMetadata.getCreateNewRrs()).isEqualTo(UPDATED_CREATE_NEW_RRS);
        assertThat(testMetadata.getModifyActiveRrrs()).isEqualTo(UPDATED_MODIFY_ACTIVE_RRRS);
        assertThat(testMetadata.getRelatedActiveRrrs()).isEqualTo(UPDATED_RELATED_ACTIVE_RRRS);
        assertThat(testMetadata.getDischargeActiveRrrs()).isEqualTo(UPDATED_DISCHARGE_ACTIVE_RRRS);
        assertThat(testMetadata.getBlockedActiveRrrs()).isEqualTo(UPDATED_BLOCKED_ACTIVE_RRRS);
        assertThat(testMetadata.getMetaType()).isEqualTo(UPDATED_META_TYPE);
        assertThat(testMetadata.getSourcePartyType()).isEqualTo(UPDATED_SOURCE_PARTY_TYPE);
        assertThat(testMetadata.getTargetPartyType()).isEqualTo(UPDATED_TARGET_PARTY_TYPE);
        assertThat(testMetadata.getOtherPartyType()).isEqualTo(UPDATED_OTHER_PARTY_TYPE);
        assertThat(testMetadata.getRelatedTransactionCode()).isEqualTo(UPDATED_RELATED_TRANSACTION_CODE);
        assertThat(testMetadata.getCashierTransactionCode()).isEqualTo(UPDATED_CASHIER_TRANSACTION_CODE);
        assertThat(testMetadata.getFeePaymentCodes()).isEqualTo(UPDATED_FEE_PAYMENT_CODES);
        assertThat(testMetadata.getMandatoryDocsCodes()).isEqualTo(UPDATED_MANDATORY_DOCS_CODES);
        assertThat(testMetadata.getMandatoryScanOutgoingDocsCodes()).isEqualTo(UPDATED_MANDATORY_SCAN_OUTGOING_DOCS_CODES);
        assertThat(testMetadata.getCreateMutateProperty()).isEqualTo(UPDATED_CREATE_MUTATE_PROPERTY);
        assertThat(testMetadata.getReferencedProperties()).isEqualTo(UPDATED_REFERENCED_PROPERTIES);
        assertThat(testMetadata.getPriorRequiredTransactions()).isEqualTo(UPDATED_PRIOR_REQUIRED_TRANSACTIONS);
        assertThat(testMetadata.getCreateNewParty()).isEqualTo(UPDATED_CREATE_NEW_PARTY);
        assertThat(testMetadata.getPartyBusinessRules()).isEqualTo(UPDATED_PARTY_BUSINESS_RULES);
        assertThat(testMetadata.getReportTemplates()).isEqualTo(UPDATED_REPORT_TEMPLATES);
        assertThat(testMetadata.getDetachable()).isEqualTo(UPDATED_DETACHABLE);
        assertThat(testMetadata.getParentTransactionType()).isEqualTo(UPDATED_PARENT_TRANSACTION_TYPE);
        assertThat(testMetadata.getInternalCode()).isEqualTo(UPDATED_INTERNAL_CODE);
        assertThat(testMetadata.getVersion()).isEqualTo(UPDATED_VERSION);
        assertThat(testMetadata.getBeginLifespanVersion()).isEqualTo(UPDATED_BEGIN_LIFESPAN_VERSION);
        assertThat(testMetadata.getEndLifespanVersion()).isEqualTo(UPDATED_END_LIFESPAN_VERSION);
        assertThat(testMetadata.getTranIndex()).isEqualTo(UPDATED_TRAN_INDEX);

        // Validate the Metadata in Elasticsearch
        verify(mockMetadataSearchRepository, times(1)).save(testMetadata);
    }

    @Test
    @Transactional
    public void updateNonExistingMetadata() throws Exception {
        int databaseSizeBeforeUpdate = metadataRepository.findAll().size();

        // Create the Metadata

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMetadataMockMvc.perform(put("/api/metadata")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(metadata)))
            .andExpect(status().isBadRequest());

        // Validate the Metadata in the database
        List<Metadata> metadataList = metadataRepository.findAll();
        assertThat(metadataList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Metadata in Elasticsearch
        verify(mockMetadataSearchRepository, times(0)).save(metadata);
    }

    @Test
    @Transactional
    public void deleteMetadata() throws Exception {
        // Initialize the database
        metadataRepository.saveAndFlush(metadata);

        int databaseSizeBeforeDelete = metadataRepository.findAll().size();

        // Delete the metadata
        restMetadataMockMvc.perform(delete("/api/metadata/{id}", metadata.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Metadata> metadataList = metadataRepository.findAll();
        assertThat(metadataList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Metadata in Elasticsearch
        verify(mockMetadataSearchRepository, times(1)).deleteById(metadata.getId());
    }

    @Test
    @Transactional
    public void searchMetadata() throws Exception {
        // Initialize the database
        metadataRepository.saveAndFlush(metadata);
        when(mockMetadataSearchRepository.search(queryStringQuery("id:" + metadata.getId())))
            .thenReturn(Collections.singletonList(metadata));
        // Search the metadata
        restMetadataMockMvc.perform(get("/api/_search/metadata?query=id:" + metadata.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(metadata.getId().intValue())))
            .andExpect(jsonPath("$.[*].hjtype").value(hasItem(DEFAULT_HJTYPE)))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE)))
            .andExpect(jsonPath("$.[*].label").value(hasItem(DEFAULT_LABEL)))
            .andExpect(jsonPath("$.[*].descr").value(hasItem(DEFAULT_DESCR)))
            .andExpect(jsonPath("$.[*].category").value(hasItem(DEFAULT_CATEGORY)))
            .andExpect(jsonPath("$.[*].generalTerm").value(hasItem(DEFAULT_GENERAL_TERM)))
            .andExpect(jsonPath("$.[*].sortOrder").value(hasItem(DEFAULT_SORT_ORDER)))
            .andExpect(jsonPath("$.[*].hidden").value(hasItem(DEFAULT_HIDDEN)))
            .andExpect(jsonPath("$.[*].groupName").value(hasItem(DEFAULT_GROUP_NAME)))
            .andExpect(jsonPath("$.[*].workflow").value(hasItem(DEFAULT_WORKFLOW)))
            .andExpect(jsonPath("$.[*].groupCode").value(hasItem(DEFAULT_GROUP_CODE)))
            .andExpect(jsonPath("$.[*].normalDuration").value(hasItem(DEFAULT_NORMAL_DURATION)))
            .andExpect(jsonPath("$.[*].lapsedDuration").value(hasItem(DEFAULT_LAPSED_DURATION)))
            .andExpect(jsonPath("$.[*].maxDuration").value(hasItem(DEFAULT_MAX_DURATION)))
            .andExpect(jsonPath("$.[*].rightType").value(hasItem(DEFAULT_RIGHT_TYPE)))
            .andExpect(jsonPath("$.[*].rightTypeMultiple").value(hasItem(DEFAULT_RIGHT_TYPE_MULTIPLE)))
            .andExpect(jsonPath("$.[*].rightTypeOther").value(hasItem(DEFAULT_RIGHT_TYPE_OTHER)))
            .andExpect(jsonPath("$.[*].createNewRrs").value(hasItem(DEFAULT_CREATE_NEW_RRS)))
            .andExpect(jsonPath("$.[*].modifyActiveRrrs").value(hasItem(DEFAULT_MODIFY_ACTIVE_RRRS)))
            .andExpect(jsonPath("$.[*].relatedActiveRrrs").value(hasItem(DEFAULT_RELATED_ACTIVE_RRRS)))
            .andExpect(jsonPath("$.[*].dischargeActiveRrrs").value(hasItem(DEFAULT_DISCHARGE_ACTIVE_RRRS)))
            .andExpect(jsonPath("$.[*].blockedActiveRrrs").value(hasItem(DEFAULT_BLOCKED_ACTIVE_RRRS)))
            .andExpect(jsonPath("$.[*].metaType").value(hasItem(DEFAULT_META_TYPE)))
            .andExpect(jsonPath("$.[*].sourcePartyType").value(hasItem(DEFAULT_SOURCE_PARTY_TYPE)))
            .andExpect(jsonPath("$.[*].targetPartyType").value(hasItem(DEFAULT_TARGET_PARTY_TYPE)))
            .andExpect(jsonPath("$.[*].otherPartyType").value(hasItem(DEFAULT_OTHER_PARTY_TYPE)))
            .andExpect(jsonPath("$.[*].relatedTransactionCode").value(hasItem(DEFAULT_RELATED_TRANSACTION_CODE)))
            .andExpect(jsonPath("$.[*].cashierTransactionCode").value(hasItem(DEFAULT_CASHIER_TRANSACTION_CODE)))
            .andExpect(jsonPath("$.[*].feePaymentCodes").value(hasItem(DEFAULT_FEE_PAYMENT_CODES)))
            .andExpect(jsonPath("$.[*].mandatoryDocsCodes").value(hasItem(DEFAULT_MANDATORY_DOCS_CODES)))
            .andExpect(jsonPath("$.[*].mandatoryScanOutgoingDocsCodes").value(hasItem(DEFAULT_MANDATORY_SCAN_OUTGOING_DOCS_CODES)))
            .andExpect(jsonPath("$.[*].createMutateProperty").value(hasItem(DEFAULT_CREATE_MUTATE_PROPERTY)))
            .andExpect(jsonPath("$.[*].referencedProperties").value(hasItem(DEFAULT_REFERENCED_PROPERTIES)))
            .andExpect(jsonPath("$.[*].priorRequiredTransactions").value(hasItem(DEFAULT_PRIOR_REQUIRED_TRANSACTIONS)))
            .andExpect(jsonPath("$.[*].createNewParty").value(hasItem(DEFAULT_CREATE_NEW_PARTY)))
            .andExpect(jsonPath("$.[*].partyBusinessRules").value(hasItem(DEFAULT_PARTY_BUSINESS_RULES)))
            .andExpect(jsonPath("$.[*].reportTemplates").value(hasItem(DEFAULT_REPORT_TEMPLATES)))
            .andExpect(jsonPath("$.[*].detachable").value(hasItem(DEFAULT_DETACHABLE)))
            .andExpect(jsonPath("$.[*].parentTransactionType").value(hasItem(DEFAULT_PARENT_TRANSACTION_TYPE)))
            .andExpect(jsonPath("$.[*].internalCode").value(hasItem(DEFAULT_INTERNAL_CODE)))
            .andExpect(jsonPath("$.[*].version").value(hasItem(DEFAULT_VERSION)))
            .andExpect(jsonPath("$.[*].beginLifespanVersion").value(hasItem(DEFAULT_BEGIN_LIFESPAN_VERSION)))
            .andExpect(jsonPath("$.[*].endLifespanVersion").value(hasItem(DEFAULT_END_LIFESPAN_VERSION)))
            .andExpect(jsonPath("$.[*].tranIndex").value(hasItem(DEFAULT_TRAN_INDEX)));
    }
}
