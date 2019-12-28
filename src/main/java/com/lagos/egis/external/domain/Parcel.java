package com.lagos.egis.external.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @Column(name = "spatial_unit_type")
    private Integer spatialUnitType;

    @Column(name = "registration_office_dictionary")
    private String registrationOfficeDictionary;

    @Column(name = "survey_type")
    private String surveyType;

    @Column(name = "survey_date")
    private LocalDate surveyDate;

    @Column(name = "property_type")
    private Integer propertyType;

    @Column(name = "accommodation")
    private String accommodation;

    @Column(name = "tenure_type")
    private Integer tenureType;

    @Column(name = "description")
    private String description;

    @Column(name = "property_area")
    private Double propertyArea;

    @Column(name = "location")
    private Integer location;

    @Column(name = "built_up_area_type")
    private Integer builtUpAreaType;

    @Column(name = "plan_number")
    private String planNumber;

    @Column(name = "measurement_unit_type")
    private Integer measurementUnitType;

    @Column(name = "premium_value")
    private String premiumValue;

    @Column(name = "land_use_category")
    private Integer landUseCategory;

    @Column(name = "land_use_type")
    private Integer landUseType;

    @Column(name = "development_status")
    private Integer developmentStatus;

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

    @Column(name = "register_type")
    private Integer registerType;

    @Column(name = "valuation")
    private String valuation;

    @Column(name = "comments")
    private String comments;

    @Column(name = "legal_description")
    private String legalDescription;

    @Column(name = "means_of_acq")
    private Integer meansOfAcq;

    @OneToOne
    @JoinColumn(unique = true)
    private Address address;

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

    public Integer getSpatialUnitType() {
        return spatialUnitType;
    }

    public Parcel spatialUnitType(Integer spatialUnitType) {
        this.spatialUnitType = spatialUnitType;
        return this;
    }

    public void setSpatialUnitType(Integer spatialUnitType) {
        this.spatialUnitType = spatialUnitType;
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

    public String getSurveyType() {
        return surveyType;
    }

    public Parcel surveyType(String surveyType) {
        this.surveyType = surveyType;
        return this;
    }

    public void setSurveyType(String surveyType) {
        this.surveyType = surveyType;
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

    public Integer getPropertyType() {
        return propertyType;
    }

    public Parcel propertyType(Integer propertyType) {
        this.propertyType = propertyType;
        return this;
    }

    public void setPropertyType(Integer propertyType) {
        this.propertyType = propertyType;
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

    public Integer getTenureType() {
        return tenureType;
    }

    public Parcel tenureType(Integer tenureType) {
        this.tenureType = tenureType;
        return this;
    }

    public void setTenureType(Integer tenureType) {
        this.tenureType = tenureType;
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

    public Integer getLocation() {
        return location;
    }

    public Parcel location(Integer location) {
        this.location = location;
        return this;
    }

    public void setLocation(Integer location) {
        this.location = location;
    }

    public Integer getBuiltUpAreaType() {
        return builtUpAreaType;
    }

    public Parcel builtUpAreaType(Integer builtUpAreaType) {
        this.builtUpAreaType = builtUpAreaType;
        return this;
    }

    public void setBuiltUpAreaType(Integer builtUpAreaType) {
        this.builtUpAreaType = builtUpAreaType;
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

    public Integer getMeasurementUnitType() {
        return measurementUnitType;
    }

    public Parcel measurementUnitType(Integer measurementUnitType) {
        this.measurementUnitType = measurementUnitType;
        return this;
    }

    public void setMeasurementUnitType(Integer measurementUnitType) {
        this.measurementUnitType = measurementUnitType;
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

    public Integer getLandUseCategory() {
        return landUseCategory;
    }

    public Parcel landUseCategory(Integer landUseCategory) {
        this.landUseCategory = landUseCategory;
        return this;
    }

    public void setLandUseCategory(Integer landUseCategory) {
        this.landUseCategory = landUseCategory;
    }

    public Integer getLandUseType() {
        return landUseType;
    }

    public Parcel landUseType(Integer landUseType) {
        this.landUseType = landUseType;
        return this;
    }

    public void setLandUseType(Integer landUseType) {
        this.landUseType = landUseType;
    }

    public Integer getDevelopmentStatus() {
        return developmentStatus;
    }

    public Parcel developmentStatus(Integer developmentStatus) {
        this.developmentStatus = developmentStatus;
        return this;
    }

    public void setDevelopmentStatus(Integer developmentStatus) {
        this.developmentStatus = developmentStatus;
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

    public Integer getRegisterType() {
        return registerType;
    }

    public Parcel registerType(Integer registerType) {
        this.registerType = registerType;
        return this;
    }

    public void setRegisterType(Integer registerType) {
        this.registerType = registerType;
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

    public Integer getMeansOfAcq() {
        return meansOfAcq;
    }

    public Parcel meansOfAcq(Integer meansOfAcq) {
        this.meansOfAcq = meansOfAcq;
        return this;
    }

    public void setMeansOfAcq(Integer meansOfAcq) {
        this.meansOfAcq = meansOfAcq;
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
            ", spatialUnitType=" + getSpatialUnitType() +
            ", registrationOfficeDictionary='" + getRegistrationOfficeDictionary() + "'" +
            ", surveyType='" + getSurveyType() + "'" +
            ", surveyDate='" + getSurveyDate() + "'" +
            ", propertyType=" + getPropertyType() +
            ", accommodation='" + getAccommodation() + "'" +
            ", tenureType=" + getTenureType() +
            ", description='" + getDescription() + "'" +
            ", propertyArea=" + getPropertyArea() +
            ", location=" + getLocation() +
            ", builtUpAreaType=" + getBuiltUpAreaType() +
            ", planNumber='" + getPlanNumber() + "'" +
            ", measurementUnitType=" + getMeasurementUnitType() +
            ", premiumValue='" + getPremiumValue() + "'" +
            ", landUseCategory=" + getLandUseCategory() +
            ", landUseType=" + getLandUseType() +
            ", developmentStatus=" + getDevelopmentStatus() +
            ", coordinateN=" + getCoordinateN() +
            ", coordinateS=" + getCoordinateS() +
            ", lagosSheetNumber='" + getLagosSheetNumber() + "'" +
            ", allocation='" + getAllocation() + "'" +
            ", location1=" + getLocation1() +
            ", unitNumber='" + getUnitNumber() + "'" +
            ", name='" + getName() + "'" +
            ", registerType=" + getRegisterType() +
            ", valuation='" + getValuation() + "'" +
            ", comments='" + getComments() + "'" +
            ", legalDescription='" + getLegalDescription() + "'" +
            ", meansOfAcq=" + getMeansOfAcq() +
            "}";
    }
}
