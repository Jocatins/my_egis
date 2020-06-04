package com.lagos.egis.external.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
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

    @Column(name = "property_number")
    private String propertyNumber;

    @Column(name = "parcel_lineage")
    private String parcelLineage;

    @Column(name = "survey_plan_number")
    private String surveyPlanNumber;

    @Column(name = "property_description")
    private String propertyDescription;

    @Column(name = "area")
    private Double area;

    @Column(name = "description")
    private String description;

    @Column(name = "property_area")
    private Double propertyArea;

    @Column(name = "plan_number")
    private String planNumber;

    @Column(name = "premium_value")
    private Double premiumValue;

    @Column(name = "coordinate_n")
    private Integer coordinateN;

    @Column(name = "coordinate_e")
    private Integer coordinateE;

    @Column(name = "lagos_sheet_number")
    private String lagosSheetNumber;

    @Column(name = "unit_number")
    private String unitNumber;

    @Column(name = "valuation_amount")
    private Double valuationAmount;

    @Column(name = "comments")
    private String comments;

    @Column(name = "street_number")
    private String streetNumber;

    @Column(name = "street_name")
    private String streetName;

    @NotNull
    @Column(name = "block_number", nullable = false)
    private String blockNumber;

    @NotNull
    @Column(name = "plot_number", nullable = false)
    private String plotNumber;

    @Column(name = "ward")
    private String ward;

    @Column(name = "town")
    private String town;

    @Column(name = "village")
    private String village;

    @Column(name = "upin")
    private String upin;

    @Column(name = "comment")
    private String comment;

    @ManyToOne
    @JsonIgnoreProperties("parcels")
    private Dictionary location;

    @ManyToOne
    @JsonIgnoreProperties("parcels")
    private Dictionary builtUpAreaType;

    @ManyToOne(optional = false)
    @NotNull
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
    private Dictionary governmentStatus;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("parcels")
    private Dictionary propertyType;

    @ManyToOne
    @JsonIgnoreProperties("parcels")
    private Dictionary streetType;

    @ManyToOne
    @JsonIgnoreProperties("parcels")
    private Dictionary estateName;

    @ManyToOne
    @JsonIgnoreProperties("parcels")
    private Dictionary schemeName;

    @ManyToOne
    @JsonIgnoreProperties("parcels")
    private Dictionary state;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("parcels")
    private Dictionary localGovernmentArea;

    @ManyToOne
    @JsonIgnoreProperties("parcels")
    private Dictionary locationofLand;

    @ManyToOne
    @JsonIgnoreProperties("parcels")
    private Dictionary typeOfAccommodation;

    @ManyToOne
    @JsonIgnoreProperties("parcels")
    private Dictionary tenureType;

    @ManyToOne
    @JsonIgnoreProperties("parcels")
    private Dictionary district;

    @ManyToOne
    @JsonIgnoreProperties("parcels")
    private Dictionary allocationName;

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

    public String getPropertyNumber() {
        return propertyNumber;
    }

    public Parcel propertyNumber(String propertyNumber) {
        this.propertyNumber = propertyNumber;
        return this;
    }

    public void setPropertyNumber(String propertyNumber) {
        this.propertyNumber = propertyNumber;
    }

    public String getParcelLineage() {
        return parcelLineage;
    }

    public Parcel parcelLineage(String parcelLineage) {
        this.parcelLineage = parcelLineage;
        return this;
    }

    public void setParcelLineage(String parcelLineage) {
        this.parcelLineage = parcelLineage;
    }

    public String getSurveyPlanNumber() {
        return surveyPlanNumber;
    }

    public Parcel surveyPlanNumber(String surveyPlanNumber) {
        this.surveyPlanNumber = surveyPlanNumber;
        return this;
    }

    public void setSurveyPlanNumber(String surveyPlanNumber) {
        this.surveyPlanNumber = surveyPlanNumber;
    }

    public String getPropertyDescription() {
        return propertyDescription;
    }

    public Parcel propertyDescription(String propertyDescription) {
        this.propertyDescription = propertyDescription;
        return this;
    }

    public void setPropertyDescription(String propertyDescription) {
        this.propertyDescription = propertyDescription;
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

    public Double getPremiumValue() {
        return premiumValue;
    }

    public Parcel premiumValue(Double premiumValue) {
        this.premiumValue = premiumValue;
        return this;
    }

    public void setPremiumValue(Double premiumValue) {
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

    public Integer getCoordinateE() {
        return coordinateE;
    }

    public Parcel coordinateE(Integer coordinateE) {
        this.coordinateE = coordinateE;
        return this;
    }

    public void setCoordinateE(Integer coordinateE) {
        this.coordinateE = coordinateE;
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

    public Double getValuationAmount() {
        return valuationAmount;
    }

    public Parcel valuationAmount(Double valuationAmount) {
        this.valuationAmount = valuationAmount;
        return this;
    }

    public void setValuationAmount(Double valuationAmount) {
        this.valuationAmount = valuationAmount;
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

    public String getStreetNumber() {
        return streetNumber;
    }

    public Parcel streetNumber(String streetNumber) {
        this.streetNumber = streetNumber;
        return this;
    }

    public void setStreetNumber(String streetNumber) {
        this.streetNumber = streetNumber;
    }

    public String getStreetName() {
        return streetName;
    }

    public Parcel streetName(String streetName) {
        this.streetName = streetName;
        return this;
    }

    public void setStreetName(String streetName) {
        this.streetName = streetName;
    }

    public String getBlockNumber() {
        return blockNumber;
    }

    public Parcel blockNumber(String blockNumber) {
        this.blockNumber = blockNumber;
        return this;
    }

    public void setBlockNumber(String blockNumber) {
        this.blockNumber = blockNumber;
    }

    public String getPlotNumber() {
        return plotNumber;
    }

    public Parcel plotNumber(String plotNumber) {
        this.plotNumber = plotNumber;
        return this;
    }

    public void setPlotNumber(String plotNumber) {
        this.plotNumber = plotNumber;
    }

    public String getWard() {
        return ward;
    }

    public Parcel ward(String ward) {
        this.ward = ward;
        return this;
    }

    public void setWard(String ward) {
        this.ward = ward;
    }

    public String getTown() {
        return town;
    }

    public Parcel town(String town) {
        this.town = town;
        return this;
    }

    public void setTown(String town) {
        this.town = town;
    }

    public String getVillage() {
        return village;
    }

    public Parcel village(String village) {
        this.village = village;
        return this;
    }

    public void setVillage(String village) {
        this.village = village;
    }

    public String getUpin() {
        return upin;
    }

    public Parcel upin(String upin) {
        this.upin = upin;
        return this;
    }

    public void setUpin(String upin) {
        this.upin = upin;
    }

    public String getComment() {
        return comment;
    }

    public Parcel comment(String comment) {
        this.comment = comment;
        return this;
    }

    public void setComment(String comment) {
        this.comment = comment;
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

    public Dictionary getGovernmentStatus() {
        return governmentStatus;
    }

    public Parcel governmentStatus(Dictionary dictionary) {
        this.governmentStatus = dictionary;
        return this;
    }

    public void setGovernmentStatus(Dictionary dictionary) {
        this.governmentStatus = dictionary;
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

    public Dictionary getStreetType() {
        return streetType;
    }

    public Parcel streetType(Dictionary dictionary) {
        this.streetType = dictionary;
        return this;
    }

    public void setStreetType(Dictionary dictionary) {
        this.streetType = dictionary;
    }

    public Dictionary getEstateName() {
        return estateName;
    }

    public Parcel estateName(Dictionary dictionary) {
        this.estateName = dictionary;
        return this;
    }

    public void setEstateName(Dictionary dictionary) {
        this.estateName = dictionary;
    }

    public Dictionary getSchemeName() {
        return schemeName;
    }

    public Parcel schemeName(Dictionary dictionary) {
        this.schemeName = dictionary;
        return this;
    }

    public void setSchemeName(Dictionary dictionary) {
        this.schemeName = dictionary;
    }

    public Dictionary getState() {
        return state;
    }

    public Parcel state(Dictionary dictionary) {
        this.state = dictionary;
        return this;
    }

    public void setState(Dictionary dictionary) {
        this.state = dictionary;
    }

    public Dictionary getLocalGovernmentArea() {
        return localGovernmentArea;
    }

    public Parcel localGovernmentArea(Dictionary dictionary) {
        this.localGovernmentArea = dictionary;
        return this;
    }

    public void setLocalGovernmentArea(Dictionary dictionary) {
        this.localGovernmentArea = dictionary;
    }

    public Dictionary getLocationofLand() {
        return locationofLand;
    }

    public Parcel locationofLand(Dictionary dictionary) {
        this.locationofLand = dictionary;
        return this;
    }

    public void setLocationofLand(Dictionary dictionary) {
        this.locationofLand = dictionary;
    }

    public Dictionary getTypeOfAccommodation() {
        return typeOfAccommodation;
    }

    public Parcel typeOfAccommodation(Dictionary dictionary) {
        this.typeOfAccommodation = dictionary;
        return this;
    }

    public void setTypeOfAccommodation(Dictionary dictionary) {
        this.typeOfAccommodation = dictionary;
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

    public Dictionary getDistrict() {
        return district;
    }

    public Parcel district(Dictionary dictionary) {
        this.district = dictionary;
        return this;
    }

    public void setDistrict(Dictionary dictionary) {
        this.district = dictionary;
    }

    public Dictionary getAllocationName() {
        return allocationName;
    }

    public Parcel allocationName(Dictionary dictionary) {
        this.allocationName = dictionary;
        return this;
    }

    public void setAllocationName(Dictionary dictionary) {
        this.allocationName = dictionary;
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
            ", propertyNumber='" + getPropertyNumber() + "'" +
            ", parcelLineage='" + getParcelLineage() + "'" +
            ", surveyPlanNumber='" + getSurveyPlanNumber() + "'" +
            ", propertyDescription='" + getPropertyDescription() + "'" +
            ", area=" + getArea() +
            ", description='" + getDescription() + "'" +
            ", propertyArea=" + getPropertyArea() +
            ", planNumber='" + getPlanNumber() + "'" +
            ", premiumValue=" + getPremiumValue() +
            ", coordinateN=" + getCoordinateN() +
            ", coordinateE=" + getCoordinateE() +
            ", lagosSheetNumber='" + getLagosSheetNumber() + "'" +
            ", unitNumber='" + getUnitNumber() + "'" +
            ", valuationAmount=" + getValuationAmount() +
            ", comments='" + getComments() + "'" +
            ", streetNumber='" + getStreetNumber() + "'" +
            ", streetName='" + getStreetName() + "'" +
            ", blockNumber='" + getBlockNumber() + "'" +
            ", plotNumber='" + getPlotNumber() + "'" +
            ", ward='" + getWard() + "'" +
            ", town='" + getTown() + "'" +
            ", district='" + getDistrict() + "'" +
            ", village='" + getVillage() + "'" +
            ", upin='" + getUpin() + "'" +
            ", comment='" + getComment() + "'" +
            "}";
    }
}
