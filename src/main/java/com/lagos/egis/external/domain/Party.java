package com.lagos.egis.external.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

/**
 * A Party.
 */
@Entity
@Table(name = "party")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "party")
public class Party implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    @Column(name = "primary_party")
    private String primaryParty;

    @NotNull
    @Column(name = "email_address", nullable = false)
    private String emailAddress;

    @NotNull
    @Column(name = "phone_number", nullable = false)
    private String phoneNumber;

    @Column(name = "payer_id")
    private String payerId;

    @Column(name = "tax_payer_number")
    private String taxPayerNumber;

    @Column(name = "paye_number")
    private String payeNumber;

    @Column(name = "comments")
    private String comments;

    @Column(name = "person_id_date")
    private LocalDate personIdDate;

    @Column(name = "person_id_expiration_date")
    private LocalDate personIdExpirationDate;

    @Column(name = "rc_number")
    private String rcNumber;

    @Column(name = "organization")
    private String organization;

    @Column(name = "birth_place")
    private String birthPlace;

    @Column(name = "birth_date")
    private LocalDate birthDate;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "middle_name")
    private String middleName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "occupation")
    private String occupation;

    @Column(name = "unit_number")
    private String unitNumber;

    @Column(name = "block_number")
    private String blockNumber;

    @Column(name = "street_number")
    private String streetNumber;

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

    @Column(name = "long_address")
    private String longAddress;

    @Column(name = "town")
    private String town;

    @Column(name = "ward")
    private String ward;

    @Column(name = "plot_number")
    private String plotNumber;

    @Column(name = "next_of_kin_phone")
    private String nextOfKinPhone;

    @Column(name = "i_d_document_issued_date")
    private LocalDate iDDocumentIssuedDate;

    @Column(name = "i_d_document_expiration_date")
    private LocalDate iDDocumentExpirationDate;

    @Column(name = "i_d_document_number")
    private String iDDocumentNumber;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("parties")
    private Dictionary partyType;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("parties")
    private Dictionary partyRoleType;

    @ManyToOne
    @JsonIgnoreProperties("parties")
    private Dictionary personType;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("parties")
    private Dictionary emailType;

    @ManyToOne
    @JsonIgnoreProperties("parties")
    private Dictionary personIdIssuedBy;

    @ManyToOne
    @JsonIgnoreProperties("parties")
    private Dictionary personTitle;

    @ManyToOne
    @JsonIgnoreProperties("parties")
    private Dictionary gender;

    @ManyToOne
    @JsonIgnoreProperties("parties")
    private Dictionary civilState;

    @ManyToOne
    @JsonIgnoreProperties("parties")
    private Dictionary driverLicenseRegion;

    @ManyToOne
    @JsonIgnoreProperties("parties")
    private Dictionary businessNature;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("parties")
    private Dictionary phoneCategory;

    @ManyToOne
    @JsonIgnoreProperties("parties")
    private Dictionary nextOfKinPhoneCategory;

    @ManyToOne
    @JsonIgnoreProperties("parties")
    private Dictionary emailCategory;

    @ManyToOne
    @JsonIgnoreProperties("parties")
    private Dictionary addressCategory;

    @ManyToOne
    @JsonIgnoreProperties("parties")
    private Dictionary iDDocumentType;

    @ManyToOne
    @JsonIgnoreProperties("parties")
    private Dictionary iDDocumentIssuedBy;

    @ManyToOne
    @JsonIgnoreProperties("parties")
    private Dictionary suffixTitle;

    @ManyToOne
    @JsonIgnoreProperties("parties")
    private Dictionary stateofOrigin;

    @ManyToOne
    @JsonIgnoreProperties("parties")
    private Dictionary maritalStatus;

    @ManyToOne
    @JsonIgnoreProperties("parties")
    private Dictionary streetType;

    @ManyToOne
    @JsonIgnoreProperties("parties")
    private Dictionary estateName;

    @ManyToOne
    @JsonIgnoreProperties("parties")
    private Dictionary schemeName;

    @ManyToOne
    @JsonIgnoreProperties("parties")
    private Dictionary district;

    @ManyToOne
    @JsonIgnoreProperties("parties")
    private Dictionary localGovernmentArea;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("parties")
    private Dictionary country;

    @ManyToMany(mappedBy = "parties")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Batch> batches = new HashSet<>();

    @ManyToMany(mappedBy = "parties")
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

    public String getPrimaryParty() {
        return primaryParty;
    }

    public Party primaryParty(String primaryParty) {
        this.primaryParty = primaryParty;
        return this;
    }

    public void setPrimaryParty(String primaryParty) {
        this.primaryParty = primaryParty;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public Party emailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
        return this;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public Party phoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
        return this;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getPayerId() {
        return payerId;
    }

    public Party payerId(String payerId) {
        this.payerId = payerId;
        return this;
    }

    public void setPayerId(String payerId) {
        this.payerId = payerId;
    }

    public String getTaxPayerNumber() {
        return taxPayerNumber;
    }

    public Party taxPayerNumber(String taxPayerNumber) {
        this.taxPayerNumber = taxPayerNumber;
        return this;
    }

    public void setTaxPayerNumber(String taxPayerNumber) {
        this.taxPayerNumber = taxPayerNumber;
    }

    public String getPayeNumber() {
        return payeNumber;
    }

    public Party payeNumber(String payeNumber) {
        this.payeNumber = payeNumber;
        return this;
    }

    public void setPayeNumber(String payeNumber) {
        this.payeNumber = payeNumber;
    }

    public String getComments() {
        return comments;
    }

    public Party comments(String comments) {
        this.comments = comments;
        return this;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public LocalDate getPersonIdDate() {
        return personIdDate;
    }

    public Party personIdDate(LocalDate personIdDate) {
        this.personIdDate = personIdDate;
        return this;
    }

    public void setPersonIdDate(LocalDate personIdDate) {
        this.personIdDate = personIdDate;
    }

    public LocalDate getPersonIdExpirationDate() {
        return personIdExpirationDate;
    }

    public Party personIdExpirationDate(LocalDate personIdExpirationDate) {
        this.personIdExpirationDate = personIdExpirationDate;
        return this;
    }

    public void setPersonIdExpirationDate(LocalDate personIdExpirationDate) {
        this.personIdExpirationDate = personIdExpirationDate;
    }

    public String getRcNumber() {
        return rcNumber;
    }

    public Party rcNumber(String rcNumber) {
        this.rcNumber = rcNumber;
        return this;
    }

    public void setRcNumber(String rcNumber) {
        this.rcNumber = rcNumber;
    }

    public String getOrganization() {
        return organization;
    }

    public Party organization(String organization) {
        this.organization = organization;
        return this;
    }

    public void setOrganization(String organization) {
        this.organization = organization;
    }

    public String getBirthPlace() {
        return birthPlace;
    }

    public Party birthPlace(String birthPlace) {
        this.birthPlace = birthPlace;
        return this;
    }

    public void setBirthPlace(String birthPlace) {
        this.birthPlace = birthPlace;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public Party birthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
        return this;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }

    public String getFirstName() {
        return firstName;
    }

    public Party firstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getMiddleName() {
        return middleName;
    }

    public Party middleName(String middleName) {
        this.middleName = middleName;
        return this;
    }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    public String getLastName() {
        return lastName;
    }

    public Party lastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getOccupation() {
        return occupation;
    }

    public Party occupation(String occupation) {
        this.occupation = occupation;
        return this;
    }

    public void setOccupation(String occupation) {
        this.occupation = occupation;
    }

    public String getUnitNumber() {
        return unitNumber;
    }

    public Party unitNumber(String unitNumber) {
        this.unitNumber = unitNumber;
        return this;
    }

    public void setUnitNumber(String unitNumber) {
        this.unitNumber = unitNumber;
    }

    public String getBlockNumber() {
        return blockNumber;
    }

    public Party blockNumber(String blockNumber) {
        this.blockNumber = blockNumber;
        return this;
    }

    public void setBlockNumber(String blockNumber) {
        this.blockNumber = blockNumber;
    }

    public String getStreetNumber() {
        return streetNumber;
    }

    public Party streetNumber(String streetNumber) {
        this.streetNumber = streetNumber;
        return this;
    }

    public void setStreetNumber(String streetNumber) {
        this.streetNumber = streetNumber;
    }

    public String getStreetName() {
        return streetName;
    }

    public Party streetName(String streetName) {
        this.streetName = streetName;
        return this;
    }

    public void setStreetName(String streetName) {
        this.streetName = streetName;
    }

    public String getBuildingName() {
        return buildingName;
    }

    public Party buildingName(String buildingName) {
        this.buildingName = buildingName;
        return this;
    }

    public void setBuildingName(String buildingName) {
        this.buildingName = buildingName;
    }

    public String getBuildingNumber() {
        return buildingNumber;
    }

    public Party buildingNumber(String buildingNumber) {
        this.buildingNumber = buildingNumber;
        return this;
    }

    public void setBuildingNumber(String buildingNumber) {
        this.buildingNumber = buildingNumber;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public Party postalCode(String postalCode) {
        this.postalCode = postalCode;
        return this;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getCity() {
        return city;
    }

    public Party city(String city) {
        this.city = city;
        return this;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getVillage() {
        return village;
    }

    public Party village(String village) {
        this.village = village;
        return this;
    }

    public void setVillage(String village) {
        this.village = village;
    }

    public String getLongAddress() {
        return longAddress;
    }

    public Party longAddress(String longAddress) {
        this.longAddress = longAddress;
        return this;
    }

    public void setLongAddress(String longAddress) {
        this.longAddress = longAddress;
    }

    public String getTown() {
        return town;
    }

    public Party town(String town) {
        this.town = town;
        return this;
    }

    public void setTown(String town) {
        this.town = town;
    }

    public String getWard() {
        return ward;
    }

    public Party ward(String ward) {
        this.ward = ward;
        return this;
    }

    public void setWard(String ward) {
        this.ward = ward;
    }

    public String getPlotNumber() {
        return plotNumber;
    }

    public Party plotNumber(String plotNumber) {
        this.plotNumber = plotNumber;
        return this;
    }

    public void setPlotNumber(String plotNumber) {
        this.plotNumber = plotNumber;
    }

    public String getNextOfKinPhone() {
        return nextOfKinPhone;
    }

    public Party nextOfKinPhone(String nextOfKinPhone) {
        this.nextOfKinPhone = nextOfKinPhone;
        return this;
    }

    public void setNextOfKinPhone(String nextOfKinPhone) {
        this.nextOfKinPhone = nextOfKinPhone;
    }

    public LocalDate getiDDocumentIssuedDate() {
        return iDDocumentIssuedDate;
    }

    public Party iDDocumentIssuedDate(LocalDate iDDocumentIssuedDate) {
        this.iDDocumentIssuedDate = iDDocumentIssuedDate;
        return this;
    }

    public void setiDDocumentIssuedDate(LocalDate iDDocumentIssuedDate) {
        this.iDDocumentIssuedDate = iDDocumentIssuedDate;
    }

    public LocalDate getiDDocumentExpirationDate() {
        return iDDocumentExpirationDate;
    }

    public Party iDDocumentExpirationDate(LocalDate iDDocumentExpirationDate) {
        this.iDDocumentExpirationDate = iDDocumentExpirationDate;
        return this;
    }

    public void setiDDocumentExpirationDate(LocalDate iDDocumentExpirationDate) {
        this.iDDocumentExpirationDate = iDDocumentExpirationDate;
    }

    public String getiDDocumentNumber() {
        return iDDocumentNumber;
    }

    public Party iDDocumentNumber(String iDDocumentNumber) {
        this.iDDocumentNumber = iDDocumentNumber;
        return this;
    }

    public void setiDDocumentNumber(String iDDocumentNumber) {
        this.iDDocumentNumber = iDDocumentNumber;
    }

    public Dictionary getPartyType() {
        return partyType;
    }

    public Party partyType(Dictionary dictionary) {
        this.partyType = dictionary;
        return this;
    }

    public void setPartyType(Dictionary dictionary) {
        this.partyType = dictionary;
    }

    public Dictionary getPartyRoleType() {
        return partyRoleType;
    }

    public Party partyRoleType(Dictionary dictionary) {
        this.partyRoleType = dictionary;
        return this;
    }

    public void setPartyRoleType(Dictionary dictionary) {
        this.partyRoleType = dictionary;
    }

    public Dictionary getPersonType() {
        return personType;
    }

    public Party personType(Dictionary dictionary) {
        this.personType = dictionary;
        return this;
    }

    public void setPersonType(Dictionary dictionary) {
        this.personType = dictionary;
    }

    public Dictionary getEmailType() {
        return emailType;
    }

    public Party emailType(Dictionary dictionary) {
        this.emailType = dictionary;
        return this;
    }

    public void setEmailType(Dictionary dictionary) {
        this.emailType = dictionary;
    }

    public Dictionary getPersonIdIssuedBy() {
        return personIdIssuedBy;
    }

    public Party personIdIssuedBy(Dictionary dictionary) {
        this.personIdIssuedBy = dictionary;
        return this;
    }

    public void setPersonIdIssuedBy(Dictionary dictionary) {
        this.personIdIssuedBy = dictionary;
    }

    public Dictionary getPersonTitle() {
        return personTitle;
    }

    public Party personTitle(Dictionary dictionary) {
        this.personTitle = dictionary;
        return this;
    }

    public void setPersonTitle(Dictionary dictionary) {
        this.personTitle = dictionary;
    }

    public Dictionary getGender() {
        return gender;
    }

    public Party gender(Dictionary dictionary) {
        this.gender = dictionary;
        return this;
    }

    public void setGender(Dictionary dictionary) {
        this.gender = dictionary;
    }

    public Dictionary getCivilState() {
        return civilState;
    }

    public Party civilState(Dictionary dictionary) {
        this.civilState = dictionary;
        return this;
    }

    public void setCivilState(Dictionary dictionary) {
        this.civilState = dictionary;
    }

    public Dictionary getDriverLicenseRegion() {
        return driverLicenseRegion;
    }

    public Party driverLicenseRegion(Dictionary dictionary) {
        this.driverLicenseRegion = dictionary;
        return this;
    }

    public void setDriverLicenseRegion(Dictionary dictionary) {
        this.driverLicenseRegion = dictionary;
    }

    public Dictionary getBusinessNature() {
        return businessNature;
    }

    public Party businessNature(Dictionary dictionary) {
        this.businessNature = dictionary;
        return this;
    }

    public void setBusinessNature(Dictionary dictionary) {
        this.businessNature = dictionary;
    }

    public Dictionary getPhoneCategory() {
        return phoneCategory;
    }

    public Party phoneCategory(Dictionary dictionary) {
        this.phoneCategory = dictionary;
        return this;
    }

    public void setPhoneCategory(Dictionary dictionary) {
        this.phoneCategory = dictionary;
    }

    public Dictionary getNextOfKinPhoneCategory() {
        return nextOfKinPhoneCategory;
    }

    public Party nextOfKinPhoneCategory(Dictionary dictionary) {
        this.nextOfKinPhoneCategory = dictionary;
        return this;
    }

    public void setNextOfKinPhoneCategory(Dictionary dictionary) {
        this.nextOfKinPhoneCategory = dictionary;
    }

    public Dictionary getEmailCategory() {
        return emailCategory;
    }

    public Party emailCategory(Dictionary dictionary) {
        this.emailCategory = dictionary;
        return this;
    }

    public void setEmailCategory(Dictionary dictionary) {
        this.emailCategory = dictionary;
    }

    public Dictionary getAddressCategory() {
        return addressCategory;
    }

    public Party addressCategory(Dictionary dictionary) {
        this.addressCategory = dictionary;
        return this;
    }

    public void setAddressCategory(Dictionary dictionary) {
        this.addressCategory = dictionary;
    }

    public Dictionary getIDDocumentType() {
        return iDDocumentType;
    }

    public Party iDDocumentType(Dictionary dictionary) {
        this.iDDocumentType = dictionary;
        return this;
    }

    public void setIDDocumentType(Dictionary dictionary) {
        this.iDDocumentType = dictionary;
    }

    public Dictionary getIDDocumentIssuedBy() {
        return iDDocumentIssuedBy;
    }

    public Party iDDocumentIssuedBy(Dictionary dictionary) {
        this.iDDocumentIssuedBy = dictionary;
        return this;
    }

    public void setIDDocumentIssuedBy(Dictionary dictionary) {
        this.iDDocumentIssuedBy = dictionary;
    }

    public Dictionary getSuffixTitle() {
        return suffixTitle;
    }

    public Party suffixTitle(Dictionary dictionary) {
        this.suffixTitle = dictionary;
        return this;
    }

    public void setSuffixTitle(Dictionary dictionary) {
        this.suffixTitle = dictionary;
    }

    public Dictionary getStateofOrigin() {
        return stateofOrigin;
    }

    public Party stateofOrigin(Dictionary dictionary) {
        this.stateofOrigin = dictionary;
        return this;
    }

    public void setStateofOrigin(Dictionary dictionary) {
        this.stateofOrigin = dictionary;
    }

    public Dictionary getMaritalStatus() {
        return maritalStatus;
    }

    public Party maritalStatus(Dictionary dictionary) {
        this.maritalStatus = dictionary;
        return this;
    }

    public void setMaritalStatus(Dictionary dictionary) {
        this.maritalStatus = dictionary;
    }

    public Dictionary getStreetType() {
        return streetType;
    }

    public Party streetType(Dictionary dictionary) {
        this.streetType = dictionary;
        return this;
    }

    public void setStreetType(Dictionary dictionary) {
        this.streetType = dictionary;
    }

    public Dictionary getEstateName() {
        return estateName;
    }

    public Party estateName(Dictionary dictionary) {
        this.estateName = dictionary;
        return this;
    }

    public void setEstateName(Dictionary dictionary) {
        this.estateName = dictionary;
    }

    public Dictionary getSchemeName() {
        return schemeName;
    }

    public Party schemeName(Dictionary dictionary) {
        this.schemeName = dictionary;
        return this;
    }

    public void setSchemeName(Dictionary dictionary) {
        this.schemeName = dictionary;
    }

    public Dictionary getDistrict() {
        return district;
    }

    public Party district(Dictionary dictionary) {
        this.district = dictionary;
        return this;
    }

    public void setDistrict(Dictionary dictionary) {
        this.district = dictionary;
    }

    public Dictionary getLocalGovernmentArea() {
        return localGovernmentArea;
    }

    public Party localGovernmentArea(Dictionary dictionary) {
        this.localGovernmentArea = dictionary;
        return this;
    }

    public void setLocalGovernmentArea(Dictionary dictionary) {
        this.localGovernmentArea = dictionary;
    }

    public Dictionary getCountry() {
        return country;
    }

    public Party country(Dictionary dictionary) {
        this.country = dictionary;
        return this;
    }

    public void setCountry(Dictionary dictionary) {
        this.country = dictionary;
    }

    public Set<Batch> getBatches() {
        return batches;
    }

    public Party batches(Set<Batch> batches) {
        this.batches = batches;
        return this;
    }

    public Party addBatch(Batch batch) {
        this.batches.add(batch);
        batch.getParties().add(this);
        return this;
    }

    public Party removeBatch(Batch batch) {
        this.batches.remove(batch);
        batch.getParties().remove(this);
        return this;
    }

    public void setBatches(Set<Batch> batches) {
        this.batches = batches;
    }

    public Set<Transaction> getTransactions() {
        return transactions;
    }

    public Party transactions(Set<Transaction> transactions) {
        this.transactions = transactions;
        return this;
    }

    public Party addTransaction(Transaction transaction) {
        this.transactions.add(transaction);
        transaction.getParties().add(this);
        return this;
    }

    public Party removeTransaction(Transaction transaction) {
        this.transactions.remove(transaction);
        transaction.getParties().remove(this);
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
        if (!(o instanceof Party)) {
            return false;
        }
        return id != null && id.equals(((Party) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Party{" +
            "id=" + getId() +
            ", primaryParty='" + getPrimaryParty() + "'" +
            ", emailAddress='" + getEmailAddress() + "'" +
            ", phoneNumber='" + getPhoneNumber() + "'" +
            ", payerId='" + getPayerId() + "'" +
            ", taxPayerNumber='" + getTaxPayerNumber() + "'" +
            ", payeNumber='" + getPayeNumber() + "'" +
            ", comments='" + getComments() + "'" +
            ", personIdDate='" + getPersonIdDate() + "'" +
            ", personIdExpirationDate='" + getPersonIdExpirationDate() + "'" +
            ", rcNumber='" + getRcNumber() + "'" +
            ", organization='" + getOrganization() + "'" +
            ", birthPlace='" + getBirthPlace() + "'" +
            ", birthDate='" + getBirthDate() + "'" +
            ", firstName='" + getFirstName() + "'" +
            ", middleName='" + getMiddleName() + "'" +
            ", lastName='" + getLastName() + "'" +
            ", occupation='" + getOccupation() + "'" +
            ", unitNumber='" + getUnitNumber() + "'" +
            ", blockNumber='" + getBlockNumber() + "'" +
            ", streetNumber='" + getStreetNumber() + "'" +
            ", streetName='" + getStreetName() + "'" +
            ", buildingName='" + getBuildingName() + "'" +
            ", buildingNumber='" + getBuildingNumber() + "'" +
            ", postalCode='" + getPostalCode() + "'" +
            ", city='" + getCity() + "'" +
            ", village='" + getVillage() + "'" +
            ", longAddress='" + getLongAddress() + "'" +
            ", town='" + getTown() + "'" +
            ", ward='" + getWard() + "'" +
            ", plotNumber='" + getPlotNumber() + "'" +
            ", nextOfKinPhone='" + getNextOfKinPhone() + "'" +
            ", iDDocumentIssuedDate='" + getiDDocumentIssuedDate() + "'" +
            ", iDDocumentExpirationDate='" + getiDDocumentExpirationDate() + "'" +
            ", iDDocumentNumber='" + getiDDocumentNumber() + "'" +
            "}";
    }
}
