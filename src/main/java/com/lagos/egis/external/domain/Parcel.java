package com.lagos.egis.external.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

/**
 * A Parcel.
 */
@Entity
@Table(name = "parcel")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "parcel")
public class Parcel implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    @Column(name = "label")
    private String label;

    @Column(name = "area")
    private Double area;

    @Column(name = "registration_office_dictionary")
    private String registrationOfficeDictionary;

    @Column(name = "survey_date")
    private LocalDate surveyDate;

    @Column(name = "accommodation")
    private String accommodation;

    @Column(name = "description")
    private String description;

    @Column(name = "property_area")
    private Double propertyArea;

    @Column(name = "plan_number")
    private String planNumber;

    @Column(name = "premium_value")
    private String premiumValue;

    @Column(name = "coordinate_n")
    private Integer coordinateN;

    @Column(name = "coordinate_s")
    private Integer coordinateS;

    @Column(name = "lagos_sheet_number")
    private String lagosSheetNumber;

    @Column(name = "allocation")
    private String allocation;

    @Column(name = "location_1")
    private Integer location1;

    @Column(name = "unit_number")
    private String unitNumber;

    @Column(name = "name")
    private String name;

    @Column(name = "valuation")
    private String valuation;

    @Column(name = "comments")
    private String comments;

    @Column(name = "legal_description")
    private String legalDescription;

    @OneToOne
    @JoinColumn(unique = true)
    private Address address;

    @ManyToOne
    @JsonIgnoreProperties("parcels")
    private Dictionary spatialUnitType;

    @ManyToOne
    @JsonIgnoreProperties("parcels")
    private Dictionary surveyType;

    @ManyToOne
    @JsonIgnoreProperties("parcels")
    private Dictionary propertyType;

    @ManyToOne
    @JsonIgnoreProperties("parcels")
    private Dictionary tenureType;

    @ManyToOne
    @JsonIgnoreProperties("parcels")
    private Dictionary location;

    @ManyToOne
    @JsonIgnoreProperties("parcels")
    private Dictionary builtUpAreaType;

    @ManyToOne
    @JsonIgnoreProperties("parcels")
    private Dictionary measurementUnitType;

    @ManyToOne
    @JsonIgnoreProperties("parcels")
    private Dictionary landUseCategory;

    @ManyToOne
    @JsonIgnoreProperties("parcels")
    private Dictionary landUseType;

    @ManyToOne
    @JsonIgnoreProperties("parcels")
    private Dictionary developmentStatus;

    @ManyToOne
    @JsonIgnoreProperties("parcels")
    private Dictionary registerType;

    @ManyToOne
    @JsonIgnoreProperties("parcels")
    private Dictionary meansOfAcq;

    @ManyToOne
    @JsonIgnoreProperties("parcels")
    private Dictionary region;

    @ManyToMany(mappedBy = "parcels")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Transaction> transactions = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLabel() {
        return label;
    }

    public Parcel label(String label) {
        this.label = label;
        return this;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public Double getArea() {
        return area;
    }

    public Parcel area(Double area) {
        this.area = area;
        return this;
    }

    public void setArea(Double area) {
        this.area = area;
    }

    public String getRegistrationOfficeDictionary() {
        return registrationOfficeDictionary;
    }

    public Parcel registrationOfficeDictionary(String registrationOfficeDictionary) {
        this.registrationOfficeDictionary = registrationOfficeDictionary;
        return this;
    }

    public void setRegistrationOfficeDictionary(String registrationOfficeDictionary) {
        this.registrationOfficeDictionary = registrationOfficeDictionary;
    }

    public LocalDate getSurveyDate() {
        return surveyDate;
    }

    public Parcel surveyDate(LocalDate surveyDate) {
        this.surveyDate = surveyDate;
        return this;
    }

    public void setSurveyDate(LocalDate surveyDate) {
        this.surveyDate = surveyDate;
    }

    public String getAccommodation() {
        return accommodation;
    }

    public Parcel accommodation(String accommodation) {
        this.accommodation = accommodation;
        return this;
    }

    public void setAccommodation(String accommodation) {
        this.accommodation = accommodation;
    }

    public String getDescription() {
        return description;
    }

    public Parcel description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getPropertyArea() {
        return propertyArea;
    }

    public Parcel propertyArea(Double propertyArea) {
        this.propertyArea = propertyArea;
        return this;
    }

    public void setPropertyArea(Double propertyArea) {
        this.propertyArea = propertyArea;
    }

    public String getPlanNumber() {
        return planNumber;
    }

    public Parcel planNumber(String planNumber) {
        this.planNumber = planNumber;
        return this;
    }

    public void setPlanNumber(String planNumber) {
        this.planNumber = planNumber;
    }

    public String getPremiumValue() {
        return premiumValue;
    }

    public Parcel premiumValue(String premiumValue) {
        this.premiumValue = premiumValue;
        return this;
    }

    public void setPremiumValue(String premiumValue) {
        this.premiumValue = premiumValue;
    }

    public Integer getCoordinateN() {
        return coordinateN;
    }

    public Parcel coordinateN(Integer coordinateN) {
        this.coordinateN = coordinateN;
        return this;
    }

    public void setCoordinateN(Integer coordinateN) {
        this.coordinateN = coordinateN;
    }

    public Integer getCoordinateS() {
        return coordinateS;
    }

    public Parcel coordinateS(Integer coordinateS) {
        this.coordinateS = coordinateS;
        return this;
    }

    public void setCoordinateS(Integer coordinateS) {
        this.coordinateS = coordinateS;
    }

    public String getLagosSheetNumber() {
        return lagosSheetNumber;
    }

    public Parcel lagosSheetNumber(String lagosSheetNumber) {
        this.lagosSheetNumber = lagosSheetNumber;
        return this;
    }

    public void setLagosSheetNumber(String lagosSheetNumber) {
        this.lagosSheetNumber = lagosSheetNumber;
    }

    public String getAllocation() {
        return allocation;
    }

    public Parcel allocation(String allocation) {
        this.allocation = allocation;
        return this;
    }

    public void setAllocation(String allocation) {
        this.allocation = allocation;
    }

    public Integer getLocation1() {
        return location1;
    }

    public Parcel location1(Integer location1) {
        this.location1 = location1;
        return this;
    }

    public void setLocation1(Integer location1) {
        this.location1 = location1;
    }

    public String getUnitNumber() {
        return unitNumber;
    }

    public Parcel unitNumber(String unitNumber) {
        this.unitNumber = unitNumber;
        return this;
    }

    public void setUnitNumber(String unitNumber) {
        this.unitNumber = unitNumber;
    }

    public String getName() {
        return name;
    }

    public Parcel name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getValuation() {
        return valuation;
    }

    public Parcel valuation(String valuation) {
        this.valuation = valuation;
        return this;
    }

    public void setValuation(String valuation) {
        this.valuation = valuation;
    }

    public String getComments() {
        return comments;
    }

    public Parcel comments(String comments) {
        this.comments = comments;
        return this;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public String getLegalDescription() {
        return legalDescription;
    }

    public Parcel legalDescription(String legalDescription) {
        this.legalDescription = legalDescription;
        return this;
    }

    public void setLegalDescription(String legalDescription) {
        this.legalDescription = legalDescription;
    }

    public Address getAddress() {
        return address;
    }

    public Parcel address(Address address) {
        this.address = address;
        return this;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public Dictionary getSpatialUnitType() {
        return spatialUnitType;
    }

    public Parcel spatialUnitType(Dictionary dictionary) {
        this.spatialUnitType = dictionary;
        return this;
    }

    public void setSpatialUnitType(Dictionary dictionary) {
        this.spatialUnitType = dictionary;
    }

    public Dictionary getSurveyType() {
        return surveyType;
    }

    public Parcel surveyType(Dictionary dictionary) {
        this.surveyType = dictionary;
        return this;
    }

    public void setSurveyType(Dictionary dictionary) {
        this.surveyType = dictionary;
    }

    public Dictionary getPropertyType() {
        return propertyType;
    }

    public Parcel propertyType(Dictionary dictionary) {
        this.propertyType = dictionary;
        return this;
    }

    public void setPropertyType(Dictionary dictionary) {
        this.propertyType = dictionary;
    }

    public Dictionary getTenureType() {
        return tenureType;
    }

    public Parcel tenureType(Dictionary dictionary) {
        this.tenureType = dictionary;
        return this;
    }

    public void setTenureType(Dictionary dictionary) {
        this.tenureType = dictionary;
    }

    public Dictionary getLocation() {
        return location;
    }

    public Parcel location(Dictionary dictionary) {
        this.location = dictionary;
        return this;
    }

    public void setLocation(Dictionary dictionary) {
        this.location = dictionary;
    }

    public Dictionary getBuiltUpAreaType() {
        return builtUpAreaType;
    }

    public Parcel builtUpAreaType(Dictionary dictionary) {
        this.builtUpAreaType = dictionary;
        return this;
    }

    public void setBuiltUpAreaType(Dictionary dictionary) {
        this.builtUpAreaType = dictionary;
    }

    public Dictionary getMeasurementUnitType() {
        return measurementUnitType;
    }

    public Parcel measurementUnitType(Dictionary dictionary) {
        this.measurementUnitType = dictionary;
        return this;
    }

    public void setMeasurementUnitType(Dictionary dictionary) {
        this.measurementUnitType = dictionary;
    }

    public Dictionary getLandUseCategory() {
        return landUseCategory;
    }

    public Parcel landUseCategory(Dictionary dictionary) {
        this.landUseCategory = dictionary;
        return this;
    }

    public void setLandUseCategory(Dictionary dictionary) {
        this.landUseCategory = dictionary;
    }

    public Dictionary getLandUseType() {
        return landUseType;
    }

    public Parcel landUseType(Dictionary dictionary) {
        this.landUseType = dictionary;
        return this;
    }

    public void setLandUseType(Dictionary dictionary) {
        this.landUseType = dictionary;
    }

    public Dictionary getDevelopmentStatus() {
        return developmentStatus;
    }

    public Parcel developmentStatus(Dictionary dictionary) {
        this.developmentStatus = dictionary;
        return this;
    }

    public void setDevelopmentStatus(Dictionary dictionary) {
        this.developmentStatus = dictionary;
    }

    public Dictionary getRegisterType() {
        return registerType;
    }

    public Parcel registerType(Dictionary dictionary) {
        this.registerType = dictionary;
        return this;
    }

    public void setRegisterType(Dictionary dictionary) {
        this.registerType = dictionary;
    }

    public Dictionary getMeansOfAcq() {
        return meansOfAcq;
    }

    public Parcel meansOfAcq(Dictionary dictionary) {
        this.meansOfAcq = dictionary;
        return this;
    }

    public void setMeansOfAcq(Dictionary dictionary) {
        this.meansOfAcq = dictionary;
    }

    public Dictionary getRegion() {
        return region;
    }

    public Parcel region(Dictionary dictionary) {
        this.region = dictionary;
        return this;
    }

    public void setRegion(Dictionary dictionary) {
        this.region = dictionary;
    }

    public Set<Transaction> getTransactions() {
        return transactions;
    }

    public Parcel transactions(Set<Transaction> transactions) {
        this.transactions = transactions;
        return this;
    }

    public Parcel addTransaction(Transaction transaction) {
        this.transactions.add(transaction);
        transaction.getParcels().add(this);
        return this;
    }

    public Parcel removeTransaction(Transaction transaction) {
        this.transactions.remove(transaction);
        transaction.getParcels().remove(this);
        return this;
    }

    public void setTransactions(Set<Transaction> transactions) {
        this.transactions = transactions;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Parcel)) {
            return false;
        }
        return id != null && id.equals(((Parcel) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Parcel{" +
            "id=" + getId() +
            ", label='" + getLabel() + "'" +
            ", area=" + getArea() +
            ", registrationOfficeDictionary='" + getRegistrationOfficeDictionary() + "'" +
            ", surveyDate='" + getSurveyDate() + "'" +
            ", accommodation='" + getAccommodation() + "'" +
            ", description='" + getDescription() + "'" +
            ", propertyArea=" + getPropertyArea() +
            ", planNumber='" + getPlanNumber() + "'" +
            ", premiumValue='" + getPremiumValue() + "'" +
            ", coordinateN=" + getCoordinateN() +
            ", coordinateS=" + getCoordinateS() +
            ", lagosSheetNumber='" + getLagosSheetNumber() + "'" +
            ", allocation='" + getAllocation() + "'" +
            ", location1=" + getLocation1() +
            ", unitNumber='" + getUnitNumber() + "'" +
            ", name='" + getName() + "'" +
            ", valuation='" + getValuation() + "'" +
            ", comments='" + getComments() + "'" +
            ", legalDescription='" + getLegalDescription() + "'" +
            "}";
    }
}
