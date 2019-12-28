package com.lagos.egis.external.web.rest;

import com.lagos.egis.external.EgisexternalApp;
import com.lagos.egis.external.domain.Address;
import com.lagos.egis.external.repository.AddressRepository;
import com.lagos.egis.external.repository.search.AddressSearchRepository;
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
 * Integration tests for the {@link AddressResource} REST controller.
 */
@SpringBootTest(classes = EgisexternalApp.class)
public class AddressResourceIT {

    private static final String DEFAULT_ADDRESS_AREA_NAME = "AAAAAAAAAA";
    private static final String UPDATED_ADDRESS_AREA_NAME = "BBBBBBBBBB";

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

    private static final Integer DEFAULT_COUNTRY = 1;
    private static final Integer UPDATED_COUNTRY = 2;

    private static final Integer DEFAULT_REGION = 1;
    private static final Integer UPDATED_REGION = 2;

    private static final Integer DEFAULT_DISTRICT = 1;
    private static final Integer UPDATED_DISTRICT = 2;

    private static final String DEFAULT_VILLAGE = "AAAAAAAAAA";
    private static final String UPDATED_VILLAGE = "BBBBBBBBBB";

    private static final String DEFAULT_STATE = "AAAAAAAAAA";
    private static final String UPDATED_STATE = "BBBBBBBBBB";

    private static final String DEFAULT_ESTATE_NAME = "AAAAAAAAAA";
    private static final String UPDATED_ESTATE_NAME = "BBBBBBBBBB";

    private static final Integer DEFAULT_LOCAL_GOVERNMENT_AREA = 1;
    private static final Integer UPDATED_LOCAL_GOVERNMENT_AREA = 2;

    private static final Integer DEFAULT_LOCAL_COUNCIL_AREA = 1;
    private static final Integer UPDATED_LOCAL_COUNCIL_AREA = 2;

    private static final String DEFAULT_STREET_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_STREET_NUMBER = "BBBBBBBBBB";

    private static final Integer DEFAULT_STREET_TYPE = 1;
    private static final Integer UPDATED_STREET_TYPE = 2;

    private static final String DEFAULT_TOWN = "AAAAAAAAAA";
    private static final String UPDATED_TOWN = "BBBBBBBBBB";

    private static final String DEFAULT_WARD = "AAAAAAAAAA";
    private static final String UPDATED_WARD = "BBBBBBBBBB";

    private static final String DEFAULT_CATEGORY = "AAAAAAAAAA";
    private static final String UPDATED_CATEGORY = "BBBBBBBBBB";

    private static final Integer DEFAULT_STATE_OF_ORIGIN = 1;
    private static final Integer UPDATED_STATE_OF_ORIGIN = 2;

    private static final Integer DEFAULT_SCHEME_NAME = 1;
    private static final Integer UPDATED_SCHEME_NAME = 2;

    private static final String DEFAULT_BLOCK_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_BLOCK_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_PLOT_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_PLOT_NUMBER = "BBBBBBBBBB";

    @Autowired
    private AddressRepository addressRepository;

    /**
     * This repository is mocked in the com.lagos.egis.external.repository.search test package.
     *
     * @see com.lagos.egis.external.repository.search.AddressSearchRepositoryMockConfiguration
     */
    @Autowired
    private AddressSearchRepository mockAddressSearchRepository;

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

    private MockMvc restAddressMockMvc;

    private Address address;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AddressResource addressResource = new AddressResource(addressRepository, mockAddressSearchRepository);
        this.restAddressMockMvc = MockMvcBuilders.standaloneSetup(addressResource)
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
    public static Address createEntity(EntityManager em) {
        Address address = new Address()
            .addressAreaName(DEFAULT_ADDRESS_AREA_NAME)
            .streetName(DEFAULT_STREET_NAME)
            .buildingName(DEFAULT_BUILDING_NAME)
            .buildingNumber(DEFAULT_BUILDING_NUMBER)
            .postalCode(DEFAULT_POSTAL_CODE)
            .city(DEFAULT_CITY)
            .country(DEFAULT_COUNTRY)
            .region(DEFAULT_REGION)
            .district(DEFAULT_DISTRICT)
            .village(DEFAULT_VILLAGE)
            .state(DEFAULT_STATE)
            .estateName(DEFAULT_ESTATE_NAME)
            .localGovernmentArea(DEFAULT_LOCAL_GOVERNMENT_AREA)
            .localCouncilArea(DEFAULT_LOCAL_COUNCIL_AREA)
            .streetNumber(DEFAULT_STREET_NUMBER)
            .streetType(DEFAULT_STREET_TYPE)
            .town(DEFAULT_TOWN)
            .ward(DEFAULT_WARD)
            .category(DEFAULT_CATEGORY)
            .stateOfOrigin(DEFAULT_STATE_OF_ORIGIN)
            .schemeName(DEFAULT_SCHEME_NAME)
            .blockNumber(DEFAULT_BLOCK_NUMBER)
            .plotNumber(DEFAULT_PLOT_NUMBER);
        return address;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Address createUpdatedEntity(EntityManager em) {
        Address address = new Address()
            .addressAreaName(UPDATED_ADDRESS_AREA_NAME)
            .streetName(UPDATED_STREET_NAME)
            .buildingName(UPDATED_BUILDING_NAME)
            .buildingNumber(UPDATED_BUILDING_NUMBER)
            .postalCode(UPDATED_POSTAL_CODE)
            .city(UPDATED_CITY)
            .country(UPDATED_COUNTRY)
            .region(UPDATED_REGION)
            .district(UPDATED_DISTRICT)
            .village(UPDATED_VILLAGE)
            .state(UPDATED_STATE)
            .estateName(UPDATED_ESTATE_NAME)
            .localGovernmentArea(UPDATED_LOCAL_GOVERNMENT_AREA)
            .localCouncilArea(UPDATED_LOCAL_COUNCIL_AREA)
            .streetNumber(UPDATED_STREET_NUMBER)
            .streetType(UPDATED_STREET_TYPE)
            .town(UPDATED_TOWN)
            .ward(UPDATED_WARD)
            .category(UPDATED_CATEGORY)
            .stateOfOrigin(UPDATED_STATE_OF_ORIGIN)
            .schemeName(UPDATED_SCHEME_NAME)
            .blockNumber(UPDATED_BLOCK_NUMBER)
            .plotNumber(UPDATED_PLOT_NUMBER);
        return address;
    }

    @BeforeEach
    public void initTest() {
        address = createEntity(em);
    }

    @Test
    @Transactional
    public void createAddress() throws Exception {
        int databaseSizeBeforeCreate = addressRepository.findAll().size();

        // Create the Address
        restAddressMockMvc.perform(post("/api/addresses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(address)))
            .andExpect(status().isCreated());

        // Validate the Address in the database
        List<Address> addressList = addressRepository.findAll();
        assertThat(addressList).hasSize(databaseSizeBeforeCreate + 1);
        Address testAddress = addressList.get(addressList.size() - 1);
        assertThat(testAddress.getAddressAreaName()).isEqualTo(DEFAULT_ADDRESS_AREA_NAME);
        assertThat(testAddress.getStreetName()).isEqualTo(DEFAULT_STREET_NAME);
        assertThat(testAddress.getBuildingName()).isEqualTo(DEFAULT_BUILDING_NAME);
        assertThat(testAddress.getBuildingNumber()).isEqualTo(DEFAULT_BUILDING_NUMBER);
        assertThat(testAddress.getPostalCode()).isEqualTo(DEFAULT_POSTAL_CODE);
        assertThat(testAddress.getCity()).isEqualTo(DEFAULT_CITY);
        assertThat(testAddress.getCountry()).isEqualTo(DEFAULT_COUNTRY);
        assertThat(testAddress.getRegion()).isEqualTo(DEFAULT_REGION);
        assertThat(testAddress.getDistrict()).isEqualTo(DEFAULT_DISTRICT);
        assertThat(testAddress.getVillage()).isEqualTo(DEFAULT_VILLAGE);
        assertThat(testAddress.getState()).isEqualTo(DEFAULT_STATE);
        assertThat(testAddress.getEstateName()).isEqualTo(DEFAULT_ESTATE_NAME);
        assertThat(testAddress.getLocalGovernmentArea()).isEqualTo(DEFAULT_LOCAL_GOVERNMENT_AREA);
        assertThat(testAddress.getLocalCouncilArea()).isEqualTo(DEFAULT_LOCAL_COUNCIL_AREA);
        assertThat(testAddress.getStreetNumber()).isEqualTo(DEFAULT_STREET_NUMBER);
        assertThat(testAddress.getStreetType()).isEqualTo(DEFAULT_STREET_TYPE);
        assertThat(testAddress.getTown()).isEqualTo(DEFAULT_TOWN);
        assertThat(testAddress.getWard()).isEqualTo(DEFAULT_WARD);
        assertThat(testAddress.getCategory()).isEqualTo(DEFAULT_CATEGORY);
        assertThat(testAddress.getStateOfOrigin()).isEqualTo(DEFAULT_STATE_OF_ORIGIN);
        assertThat(testAddress.getSchemeName()).isEqualTo(DEFAULT_SCHEME_NAME);
        assertThat(testAddress.getBlockNumber()).isEqualTo(DEFAULT_BLOCK_NUMBER);
        assertThat(testAddress.getPlotNumber()).isEqualTo(DEFAULT_PLOT_NUMBER);

        // Validate the Address in Elasticsearch
        verify(mockAddressSearchRepository, times(1)).save(testAddress);
    }

    @Test
    @Transactional
    public void createAddressWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = addressRepository.findAll().size();

        // Create the Address with an existing ID
        address.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAddressMockMvc.perform(post("/api/addresses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(address)))
            .andExpect(status().isBadRequest());

        // Validate the Address in the database
        List<Address> addressList = addressRepository.findAll();
        assertThat(addressList).hasSize(databaseSizeBeforeCreate);

        // Validate the Address in Elasticsearch
        verify(mockAddressSearchRepository, times(0)).save(address);
    }


    @Test
    @Transactional
    public void getAllAddresses() throws Exception {
        // Initialize the database
        addressRepository.saveAndFlush(address);

        // Get all the addressList
        restAddressMockMvc.perform(get("/api/addresses?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(address.getId().intValue())))
            .andExpect(jsonPath("$.[*].addressAreaName").value(hasItem(DEFAULT_ADDRESS_AREA_NAME)))
            .andExpect(jsonPath("$.[*].streetName").value(hasItem(DEFAULT_STREET_NAME)))
            .andExpect(jsonPath("$.[*].buildingName").value(hasItem(DEFAULT_BUILDING_NAME)))
            .andExpect(jsonPath("$.[*].buildingNumber").value(hasItem(DEFAULT_BUILDING_NUMBER)))
            .andExpect(jsonPath("$.[*].postalCode").value(hasItem(DEFAULT_POSTAL_CODE)))
            .andExpect(jsonPath("$.[*].city").value(hasItem(DEFAULT_CITY)))
            .andExpect(jsonPath("$.[*].country").value(hasItem(DEFAULT_COUNTRY)))
            .andExpect(jsonPath("$.[*].region").value(hasItem(DEFAULT_REGION)))
            .andExpect(jsonPath("$.[*].district").value(hasItem(DEFAULT_DISTRICT)))
            .andExpect(jsonPath("$.[*].village").value(hasItem(DEFAULT_VILLAGE)))
            .andExpect(jsonPath("$.[*].state").value(hasItem(DEFAULT_STATE)))
            .andExpect(jsonPath("$.[*].estateName").value(hasItem(DEFAULT_ESTATE_NAME)))
            .andExpect(jsonPath("$.[*].localGovernmentArea").value(hasItem(DEFAULT_LOCAL_GOVERNMENT_AREA)))
            .andExpect(jsonPath("$.[*].localCouncilArea").value(hasItem(DEFAULT_LOCAL_COUNCIL_AREA)))
            .andExpect(jsonPath("$.[*].streetNumber").value(hasItem(DEFAULT_STREET_NUMBER)))
            .andExpect(jsonPath("$.[*].streetType").value(hasItem(DEFAULT_STREET_TYPE)))
            .andExpect(jsonPath("$.[*].town").value(hasItem(DEFAULT_TOWN)))
            .andExpect(jsonPath("$.[*].ward").value(hasItem(DEFAULT_WARD)))
            .andExpect(jsonPath("$.[*].category").value(hasItem(DEFAULT_CATEGORY)))
            .andExpect(jsonPath("$.[*].stateOfOrigin").value(hasItem(DEFAULT_STATE_OF_ORIGIN)))
            .andExpect(jsonPath("$.[*].schemeName").value(hasItem(DEFAULT_SCHEME_NAME)))
            .andExpect(jsonPath("$.[*].blockNumber").value(hasItem(DEFAULT_BLOCK_NUMBER)))
            .andExpect(jsonPath("$.[*].plotNumber").value(hasItem(DEFAULT_PLOT_NUMBER)));
    }
    
    @Test
    @Transactional
    public void getAddress() throws Exception {
        // Initialize the database
        addressRepository.saveAndFlush(address);

        // Get the address
        restAddressMockMvc.perform(get("/api/addresses/{id}", address.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(address.getId().intValue()))
            .andExpect(jsonPath("$.addressAreaName").value(DEFAULT_ADDRESS_AREA_NAME))
            .andExpect(jsonPath("$.streetName").value(DEFAULT_STREET_NAME))
            .andExpect(jsonPath("$.buildingName").value(DEFAULT_BUILDING_NAME))
            .andExpect(jsonPath("$.buildingNumber").value(DEFAULT_BUILDING_NUMBER))
            .andExpect(jsonPath("$.postalCode").value(DEFAULT_POSTAL_CODE))
            .andExpect(jsonPath("$.city").value(DEFAULT_CITY))
            .andExpect(jsonPath("$.country").value(DEFAULT_COUNTRY))
            .andExpect(jsonPath("$.region").value(DEFAULT_REGION))
            .andExpect(jsonPath("$.district").value(DEFAULT_DISTRICT))
            .andExpect(jsonPath("$.village").value(DEFAULT_VILLAGE))
            .andExpect(jsonPath("$.state").value(DEFAULT_STATE))
            .andExpect(jsonPath("$.estateName").value(DEFAULT_ESTATE_NAME))
            .andExpect(jsonPath("$.localGovernmentArea").value(DEFAULT_LOCAL_GOVERNMENT_AREA))
            .andExpect(jsonPath("$.localCouncilArea").value(DEFAULT_LOCAL_COUNCIL_AREA))
            .andExpect(jsonPath("$.streetNumber").value(DEFAULT_STREET_NUMBER))
            .andExpect(jsonPath("$.streetType").value(DEFAULT_STREET_TYPE))
            .andExpect(jsonPath("$.town").value(DEFAULT_TOWN))
            .andExpect(jsonPath("$.ward").value(DEFAULT_WARD))
            .andExpect(jsonPath("$.category").value(DEFAULT_CATEGORY))
            .andExpect(jsonPath("$.stateOfOrigin").value(DEFAULT_STATE_OF_ORIGIN))
            .andExpect(jsonPath("$.schemeName").value(DEFAULT_SCHEME_NAME))
            .andExpect(jsonPath("$.blockNumber").value(DEFAULT_BLOCK_NUMBER))
            .andExpect(jsonPath("$.plotNumber").value(DEFAULT_PLOT_NUMBER));
    }

    @Test
    @Transactional
    public void getNonExistingAddress() throws Exception {
        // Get the address
        restAddressMockMvc.perform(get("/api/addresses/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAddress() throws Exception {
        // Initialize the database
        addressRepository.saveAndFlush(address);

        int databaseSizeBeforeUpdate = addressRepository.findAll().size();

        // Update the address
        Address updatedAddress = addressRepository.findById(address.getId()).get();
        // Disconnect from session so that the updates on updatedAddress are not directly saved in db
        em.detach(updatedAddress);
        updatedAddress
            .addressAreaName(UPDATED_ADDRESS_AREA_NAME)
            .streetName(UPDATED_STREET_NAME)
            .buildingName(UPDATED_BUILDING_NAME)
            .buildingNumber(UPDATED_BUILDING_NUMBER)
            .postalCode(UPDATED_POSTAL_CODE)
            .city(UPDATED_CITY)
            .country(UPDATED_COUNTRY)
            .region(UPDATED_REGION)
            .district(UPDATED_DISTRICT)
            .village(UPDATED_VILLAGE)
            .state(UPDATED_STATE)
            .estateName(UPDATED_ESTATE_NAME)
            .localGovernmentArea(UPDATED_LOCAL_GOVERNMENT_AREA)
            .localCouncilArea(UPDATED_LOCAL_COUNCIL_AREA)
            .streetNumber(UPDATED_STREET_NUMBER)
            .streetType(UPDATED_STREET_TYPE)
            .town(UPDATED_TOWN)
            .ward(UPDATED_WARD)
            .category(UPDATED_CATEGORY)
            .stateOfOrigin(UPDATED_STATE_OF_ORIGIN)
            .schemeName(UPDATED_SCHEME_NAME)
            .blockNumber(UPDATED_BLOCK_NUMBER)
            .plotNumber(UPDATED_PLOT_NUMBER);

        restAddressMockMvc.perform(put("/api/addresses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAddress)))
            .andExpect(status().isOk());

        // Validate the Address in the database
        List<Address> addressList = addressRepository.findAll();
        assertThat(addressList).hasSize(databaseSizeBeforeUpdate);
        Address testAddress = addressList.get(addressList.size() - 1);
        assertThat(testAddress.getAddressAreaName()).isEqualTo(UPDATED_ADDRESS_AREA_NAME);
        assertThat(testAddress.getStreetName()).isEqualTo(UPDATED_STREET_NAME);
        assertThat(testAddress.getBuildingName()).isEqualTo(UPDATED_BUILDING_NAME);
        assertThat(testAddress.getBuildingNumber()).isEqualTo(UPDATED_BUILDING_NUMBER);
        assertThat(testAddress.getPostalCode()).isEqualTo(UPDATED_POSTAL_CODE);
        assertThat(testAddress.getCity()).isEqualTo(UPDATED_CITY);
        assertThat(testAddress.getCountry()).isEqualTo(UPDATED_COUNTRY);
        assertThat(testAddress.getRegion()).isEqualTo(UPDATED_REGION);
        assertThat(testAddress.getDistrict()).isEqualTo(UPDATED_DISTRICT);
        assertThat(testAddress.getVillage()).isEqualTo(UPDATED_VILLAGE);
        assertThat(testAddress.getState()).isEqualTo(UPDATED_STATE);
        assertThat(testAddress.getEstateName()).isEqualTo(UPDATED_ESTATE_NAME);
        assertThat(testAddress.getLocalGovernmentArea()).isEqualTo(UPDATED_LOCAL_GOVERNMENT_AREA);
        assertThat(testAddress.getLocalCouncilArea()).isEqualTo(UPDATED_LOCAL_COUNCIL_AREA);
        assertThat(testAddress.getStreetNumber()).isEqualTo(UPDATED_STREET_NUMBER);
        assertThat(testAddress.getStreetType()).isEqualTo(UPDATED_STREET_TYPE);
        assertThat(testAddress.getTown()).isEqualTo(UPDATED_TOWN);
        assertThat(testAddress.getWard()).isEqualTo(UPDATED_WARD);
        assertThat(testAddress.getCategory()).isEqualTo(UPDATED_CATEGORY);
        assertThat(testAddress.getStateOfOrigin()).isEqualTo(UPDATED_STATE_OF_ORIGIN);
        assertThat(testAddress.getSchemeName()).isEqualTo(UPDATED_SCHEME_NAME);
        assertThat(testAddress.getBlockNumber()).isEqualTo(UPDATED_BLOCK_NUMBER);
        assertThat(testAddress.getPlotNumber()).isEqualTo(UPDATED_PLOT_NUMBER);

        // Validate the Address in Elasticsearch
        verify(mockAddressSearchRepository, times(1)).save(testAddress);
    }

    @Test
    @Transactional
    public void updateNonExistingAddress() throws Exception {
        int databaseSizeBeforeUpdate = addressRepository.findAll().size();

        // Create the Address

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAddressMockMvc.perform(put("/api/addresses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(address)))
            .andExpect(status().isBadRequest());

        // Validate the Address in the database
        List<Address> addressList = addressRepository.findAll();
        assertThat(addressList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Address in Elasticsearch
        verify(mockAddressSearchRepository, times(0)).save(address);
    }

    @Test
    @Transactional
    public void deleteAddress() throws Exception {
        // Initialize the database
        addressRepository.saveAndFlush(address);

        int databaseSizeBeforeDelete = addressRepository.findAll().size();

        // Delete the address
        restAddressMockMvc.perform(delete("/api/addresses/{id}", address.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Address> addressList = addressRepository.findAll();
        assertThat(addressList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Address in Elasticsearch
        verify(mockAddressSearchRepository, times(1)).deleteById(address.getId());
    }

    @Test
    @Transactional
    public void searchAddress() throws Exception {
        // Initialize the database
        addressRepository.saveAndFlush(address);
        when(mockAddressSearchRepository.search(queryStringQuery("id:" + address.getId())))
            .thenReturn(Collections.singletonList(address));
        // Search the address
        restAddressMockMvc.perform(get("/api/_search/addresses?query=id:" + address.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(address.getId().intValue())))
            .andExpect(jsonPath("$.[*].addressAreaName").value(hasItem(DEFAULT_ADDRESS_AREA_NAME)))
            .andExpect(jsonPath("$.[*].streetName").value(hasItem(DEFAULT_STREET_NAME)))
            .andExpect(jsonPath("$.[*].buildingName").value(hasItem(DEFAULT_BUILDING_NAME)))
            .andExpect(jsonPath("$.[*].buildingNumber").value(hasItem(DEFAULT_BUILDING_NUMBER)))
            .andExpect(jsonPath("$.[*].postalCode").value(hasItem(DEFAULT_POSTAL_CODE)))
            .andExpect(jsonPath("$.[*].city").value(hasItem(DEFAULT_CITY)))
            .andExpect(jsonPath("$.[*].country").value(hasItem(DEFAULT_COUNTRY)))
            .andExpect(jsonPath("$.[*].region").value(hasItem(DEFAULT_REGION)))
            .andExpect(jsonPath("$.[*].district").value(hasItem(DEFAULT_DISTRICT)))
            .andExpect(jsonPath("$.[*].village").value(hasItem(DEFAULT_VILLAGE)))
            .andExpect(jsonPath("$.[*].state").value(hasItem(DEFAULT_STATE)))
            .andExpect(jsonPath("$.[*].estateName").value(hasItem(DEFAULT_ESTATE_NAME)))
            .andExpect(jsonPath("$.[*].localGovernmentArea").value(hasItem(DEFAULT_LOCAL_GOVERNMENT_AREA)))
            .andExpect(jsonPath("$.[*].localCouncilArea").value(hasItem(DEFAULT_LOCAL_COUNCIL_AREA)))
            .andExpect(jsonPath("$.[*].streetNumber").value(hasItem(DEFAULT_STREET_NUMBER)))
            .andExpect(jsonPath("$.[*].streetType").value(hasItem(DEFAULT_STREET_TYPE)))
            .andExpect(jsonPath("$.[*].town").value(hasItem(DEFAULT_TOWN)))
            .andExpect(jsonPath("$.[*].ward").value(hasItem(DEFAULT_WARD)))
            .andExpect(jsonPath("$.[*].category").value(hasItem(DEFAULT_CATEGORY)))
            .andExpect(jsonPath("$.[*].stateOfOrigin").value(hasItem(DEFAULT_STATE_OF_ORIGIN)))
            .andExpect(jsonPath("$.[*].schemeName").value(hasItem(DEFAULT_SCHEME_NAME)))
            .andExpect(jsonPath("$.[*].blockNumber").value(hasItem(DEFAULT_BLOCK_NUMBER)))
            .andExpect(jsonPath("$.[*].plotNumber").value(hasItem(DEFAULT_PLOT_NUMBER)));
    }
}
