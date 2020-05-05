package com.lagos.egis.external.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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

    @Column(name = "village")
    private String village;

    @Column(name = "street_number")
    private String streetNumber;

    @Column(name = "town")
    private String town;

    @Column(name = "ward")
    private String ward;

    @Column(name = "block_number")
    private String blockNumber;

    @Column(name = "plot_number")
    private String plotNumber;

    @ManyToOne
    @JsonIgnoreProperties("addresses")
    private Dictionary country;

    @ManyToOne
    @JsonIgnoreProperties("addresses")
    private Dictionary region;

    @ManyToOne
    @JsonIgnoreProperties("addresses")
    private Dictionary district;

    @ManyToOne
    @JsonIgnoreProperties("addresses")
    private Dictionary state;

    @ManyToOne
    @JsonIgnoreProperties("addresses")
    private Dictionary estateName;

    @ManyToOne
    @JsonIgnoreProperties("addresses")
    private Dictionary localGovernmentArea;

    @ManyToOne
    @JsonIgnoreProperties("addresses")
    private Dictionary localCouncilArea;

    @ManyToOne
    @JsonIgnoreProperties("addresses")
    private Dictionary streetType;

    @ManyToOne
    @JsonIgnoreProperties("addresses")
    private Dictionary stateOfOrigin;

    @ManyToOne
    @JsonIgnoreProperties("addresses")
    private Dictionary schemeName;

    @ManyToOne
    @JsonIgnoreProperties("addresses")
    private Dictionary category;

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

    public Dictionary getCountry() {
        return country;
    }

    public Address country(Dictionary dictionary) {
        this.country = dictionary;
        return this;
    }

    public void setCountry(Dictionary dictionary) {
        this.country = dictionary;
    }

    public Dictionary getRegion() {
        return region;
    }

    public Address region(Dictionary dictionary) {
        this.region = dictionary;
        return this;
    }

    public void setRegion(Dictionary dictionary) {
        this.region = dictionary;
    }

    public Dictionary getDistrict() {
        return district;
    }

    public Address district(Dictionary dictionary) {
        this.district = dictionary;
        return this;
    }

    public void setDistrict(Dictionary dictionary) {
        this.district = dictionary;
    }

    public Dictionary getState() {
        return state;
    }

    public Address state(Dictionary dictionary) {
        this.state = dictionary;
        return this;
    }

    public void setState(Dictionary dictionary) {
        this.state = dictionary;
    }

    public Dictionary getEstateName() {
        return estateName;
    }

    public Address estateName(Dictionary dictionary) {
        this.estateName = dictionary;
        return this;
    }

    public void setEstateName(Dictionary dictionary) {
        this.estateName = dictionary;
    }

    public Dictionary getLocalGovernmentArea() {
        return localGovernmentArea;
    }

    public Address localGovernmentArea(Dictionary dictionary) {
        this.localGovernmentArea = dictionary;
        return this;
    }

    public void setLocalGovernmentArea(Dictionary dictionary) {
        this.localGovernmentArea = dictionary;
    }

    public Dictionary getLocalCouncilArea() {
        return localCouncilArea;
    }

    public Address localCouncilArea(Dictionary dictionary) {
        this.localCouncilArea = dictionary;
        return this;
    }

    public void setLocalCouncilArea(Dictionary dictionary) {
        this.localCouncilArea = dictionary;
    }

    public Dictionary getStreetType() {
        return streetType;
    }

    public Address streetType(Dictionary dictionary) {
        this.streetType = dictionary;
        return this;
    }

    public void setStreetType(Dictionary dictionary) {
        this.streetType = dictionary;
    }

    public Dictionary getStateOfOrigin() {
        return stateOfOrigin;
    }

    public Address stateOfOrigin(Dictionary dictionary) {
        this.stateOfOrigin = dictionary;
        return this;
    }

    public void setStateOfOrigin(Dictionary dictionary) {
        this.stateOfOrigin = dictionary;
    }

    public Dictionary getSchemeName() {
        return schemeName;
    }

    public Address schemeName(Dictionary dictionary) {
        this.schemeName = dictionary;
        return this;
    }

    public void setSchemeName(Dictionary dictionary) {
        this.schemeName = dictionary;
    }

    public Dictionary getCategory() {
        return category;
    }

    public Address category(Dictionary dictionary) {
        this.category = dictionary;
        return this;
    }

    public void setCategory(Dictionary dictionary) {
        this.category = dictionary;
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
            ", village='" + getVillage() + "'" +
            ", streetNumber='" + getStreetNumber() + "'" +
            ", town='" + getTown() + "'" +
            ", ward='" + getWard() + "'" +
            ", blockNumber='" + getBlockNumber() + "'" +
            ", plotNumber='" + getPlotNumber() + "'" +
            "}";
    }
}
