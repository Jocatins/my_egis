package com.lagos.egis.external.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;

/**
 * A Address.
 */
@Entity
@Table(name = "address")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "address")
public class Address implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    @Column(name = "address_area_name")
    private String addressAreaName;

    @Column(name = "street_name")
    private String streetName;

    @Column(name = "building_name")
    private String buildingName;

    @Column(name = "building_number")
    private String buildingNumber;

    @Column(name = "postal_code")
    private String postalCode;

    @Column(name = "city")
    private String city;

    @Column(name = "country")
    private Integer country;

    @Column(name = "region")
    private Integer region;

    @Column(name = "district")
    private Integer district;

    @Column(name = "village")
    private String village;

    @Column(name = "state")
    private String state;

    @Column(name = "estate_name")
    private String estateName;

    @Column(name = "local_government_area")
    private Integer localGovernmentArea;

    @Column(name = "local_council_area")
    private Integer localCouncilArea;

    @Column(name = "street_number")
    private String streetNumber;

    @Column(name = "street_type")
    private Integer streetType;

    @Column(name = "town")
    private String town;

    @Column(name = "ward")
    private String ward;

    @Column(name = "category")
    private String category;

    @Column(name = "state_of_origin")
    private Integer stateOfOrigin;

    @Column(name = "scheme_name")
    private Integer schemeName;

    @Column(name = "block_number")
    private String blockNumber;

    @Column(name = "plot_number")
    private String plotNumber;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAddressAreaName() {
        return addressAreaName;
    }

    public Address addressAreaName(String addressAreaName) {
        this.addressAreaName = addressAreaName;
        return this;
    }

    public void setAddressAreaName(String addressAreaName) {
        this.addressAreaName = addressAreaName;
    }

    public String getStreetName() {
        return streetName;
    }

    public Address streetName(String streetName) {
        this.streetName = streetName;
        return this;
    }

    public void setStreetName(String streetName) {
        this.streetName = streetName;
    }

    public String getBuildingName() {
        return buildingName;
    }

    public Address buildingName(String buildingName) {
        this.buildingName = buildingName;
        return this;
    }

    public void setBuildingName(String buildingName) {
        this.buildingName = buildingName;
    }

    public String getBuildingNumber() {
        return buildingNumber;
    }

    public Address buildingNumber(String buildingNumber) {
        this.buildingNumber = buildingNumber;
        return this;
    }

    public void setBuildingNumber(String buildingNumber) {
        this.buildingNumber = buildingNumber;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public Address postalCode(String postalCode) {
        this.postalCode = postalCode;
        return this;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getCity() {
        return city;
    }

    public Address city(String city) {
        this.city = city;
        return this;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public Integer getCountry() {
        return country;
    }

    public Address country(Integer country) {
        this.country = country;
        return this;
    }

    public void setCountry(Integer country) {
        this.country = country;
    }

    public Integer getRegion() {
        return region;
    }

    public Address region(Integer region) {
        this.region = region;
        return this;
    }

    public void setRegion(Integer region) {
        this.region = region;
    }

    public Integer getDistrict() {
        return district;
    }

    public Address district(Integer district) {
        this.district = district;
        return this;
    }

    public void setDistrict(Integer district) {
        this.district = district;
    }

    public String getVillage() {
        return village;
    }

    public Address village(String village) {
        this.village = village;
        return this;
    }

    public void setVillage(String village) {
        this.village = village;
    }

    public String getState() {
        return state;
    }

    public Address state(String state) {
        this.state = state;
        return this;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getEstateName() {
        return estateName;
    }

    public Address estateName(String estateName) {
        this.estateName = estateName;
        return this;
    }

    public void setEstateName(String estateName) {
        this.estateName = estateName;
    }

    public Integer getLocalGovernmentArea() {
        return localGovernmentArea;
    }

    public Address localGovernmentArea(Integer localGovernmentArea) {
        this.localGovernmentArea = localGovernmentArea;
        return this;
    }

    public void setLocalGovernmentArea(Integer localGovernmentArea) {
        this.localGovernmentArea = localGovernmentArea;
    }

    public Integer getLocalCouncilArea() {
        return localCouncilArea;
    }

    public Address localCouncilArea(Integer localCouncilArea) {
        this.localCouncilArea = localCouncilArea;
        return this;
    }

    public void setLocalCouncilArea(Integer localCouncilArea) {
        this.localCouncilArea = localCouncilArea;
    }

    public String getStreetNumber() {
        return streetNumber;
    }

    public Address streetNumber(String streetNumber) {
        this.streetNumber = streetNumber;
        return this;
    }

    public void setStreetNumber(String streetNumber) {
        this.streetNumber = streetNumber;
    }

    public Integer getStreetType() {
        return streetType;
    }

    public Address streetType(Integer streetType) {
        this.streetType = streetType;
        return this;
    }

    public void setStreetType(Integer streetType) {
        this.streetType = streetType;
    }

    public String getTown() {
        return town;
    }

    public Address town(String town) {
        this.town = town;
        return this;
    }

    public void setTown(String town) {
        this.town = town;
    }

    public String getWard() {
        return ward;
    }

    public Address ward(String ward) {
        this.ward = ward;
        return this;
    }

    public void setWard(String ward) {
        this.ward = ward;
    }

    public String getCategory() {
        return category;
    }

    public Address category(String category) {
        this.category = category;
        return this;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Integer getStateOfOrigin() {
        return stateOfOrigin;
    }

    public Address stateOfOrigin(Integer stateOfOrigin) {
        this.stateOfOrigin = stateOfOrigin;
        return this;
    }

    public void setStateOfOrigin(Integer stateOfOrigin) {
        this.stateOfOrigin = stateOfOrigin;
    }

    public Integer getSchemeName() {
        return schemeName;
    }

    public Address schemeName(Integer schemeName) {
        this.schemeName = schemeName;
        return this;
    }

    public void setSchemeName(Integer schemeName) {
        this.schemeName = schemeName;
    }

    public String getBlockNumber() {
        return blockNumber;
    }

    public Address blockNumber(String blockNumber) {
        this.blockNumber = blockNumber;
        return this;
    }

    public void setBlockNumber(String blockNumber) {
        this.blockNumber = blockNumber;
    }

    public String getPlotNumber() {
        return plotNumber;
    }

    public Address plotNumber(String plotNumber) {
        this.plotNumber = plotNumber;
        return this;
    }

    public void setPlotNumber(String plotNumber) {
        this.plotNumber = plotNumber;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Address)) {
            return false;
        }
        return id != null && id.equals(((Address) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Address{" +
            "id=" + getId() +
            ", addressAreaName='" + getAddressAreaName() + "'" +
            ", streetName='" + getStreetName() + "'" +
            ", buildingName='" + getBuildingName() + "'" +
            ", buildingNumber='" + getBuildingNumber() + "'" +
            ", postalCode='" + getPostalCode() + "'" +
            ", city='" + getCity() + "'" +
            ", country=" + getCountry() +
            ", region=" + getRegion() +
            ", district=" + getDistrict() +
            ", village='" + getVillage() + "'" +
            ", state='" + getState() + "'" +
            ", estateName='" + getEstateName() + "'" +
            ", localGovernmentArea=" + getLocalGovernmentArea() +
            ", localCouncilArea=" + getLocalCouncilArea() +
            ", streetNumber='" + getStreetNumber() + "'" +
            ", streetType=" + getStreetType() +
            ", town='" + getTown() + "'" +
            ", ward='" + getWard() + "'" +
            ", category='" + getCategory() + "'" +
            ", stateOfOrigin=" + getStateOfOrigin() +
            ", schemeName=" + getSchemeName() +
            ", blockNumber='" + getBlockNumber() + "'" +
            ", plotNumber='" + getPlotNumber() + "'" +
            "}";
    }
}
