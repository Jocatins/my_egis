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

    @Column(name = "party_name")
    private String partyName;

    @Column(name = "share_nominator")
    private String shareNominator;

    @Column(name = "share_denominator")
    private String shareDenominator;

    @Column(name = "tax_exempt")
    private String taxExempt;

    @Column(name = "other_name")
    private String otherName;

    @Column(name = "fax")
    private String fax;

    @Column(name = "email")
    private String email;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "payer_id")
    private String payerId;

    @Column(name = "tax_payer_number")
    private String taxPayerNumber;

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

    @Column(name = "business_nature")
    private String businessNature;

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

    @Column(name = "driver_licence")
    private String driverLicence;

    @Column(name = "profession_reg_no")
    private String professionRegNo;

    @Column(name = "occupation")
    private String occupation;

    @OneToOne
    @JoinColumn(unique = true)
    private Address address;

    @ManyToOne
    @JsonIgnoreProperties("parties")
    private Dictionary partyType;

    @ManyToOne
    @JsonIgnoreProperties("parties")
    private Dictionary partyRoleType;

    @ManyToOne
    @JsonIgnoreProperties("parties")
    private Dictionary partySubRoleType;

    @ManyToOne
    @JsonIgnoreProperties("parties")
    private Dictionary deliveryType;

    @ManyToOne
    @JsonIgnoreProperties("parties")
    private Dictionary primaryParty;

    @ManyToOne
    @JsonIgnoreProperties("parties")
    private Dictionary personIdType;

    @ManyToOne
    @JsonIgnoreProperties("parties")
    private Dictionary personType;

    @ManyToOne
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
    private Dictionary representativeId;

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

    public String getPartyName() {
        return partyName;
    }

    public Party partyName(String partyName) {
        this.partyName = partyName;
        return this;
    }

    public void setPartyName(String partyName) {
        this.partyName = partyName;
    }

    public String getShareNominator() {
        return shareNominator;
    }

    public Party shareNominator(String shareNominator) {
        this.shareNominator = shareNominator;
        return this;
    }

    public void setShareNominator(String shareNominator) {
        this.shareNominator = shareNominator;
    }

    public String getShareDenominator() {
        return shareDenominator;
    }

    public Party shareDenominator(String shareDenominator) {
        this.shareDenominator = shareDenominator;
        return this;
    }

    public void setShareDenominator(String shareDenominator) {
        this.shareDenominator = shareDenominator;
    }

    public String getTaxExempt() {
        return taxExempt;
    }

    public Party taxExempt(String taxExempt) {
        this.taxExempt = taxExempt;
        return this;
    }

    public void setTaxExempt(String taxExempt) {
        this.taxExempt = taxExempt;
    }

    public String getOtherName() {
        return otherName;
    }

    public Party otherName(String otherName) {
        this.otherName = otherName;
        return this;
    }

    public void setOtherName(String otherName) {
        this.otherName = otherName;
    }

    public String getFax() {
        return fax;
    }

    public Party fax(String fax) {
        this.fax = fax;
        return this;
    }

    public void setFax(String fax) {
        this.fax = fax;
    }

    public String getEmail() {
        return email;
    }

    public Party email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
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

    public String getBusinessNature() {
        return businessNature;
    }

    public Party businessNature(String businessNature) {
        this.businessNature = businessNature;
        return this;
    }

    public void setBusinessNature(String businessNature) {
        this.businessNature = businessNature;
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

    public String getDriverLicence() {
        return driverLicence;
    }

    public Party driverLicence(String driverLicence) {
        this.driverLicence = driverLicence;
        return this;
    }

    public void setDriverLicence(String driverLicence) {
        this.driverLicence = driverLicence;
    }

    public String getProfessionRegNo() {
        return professionRegNo;
    }

    public Party professionRegNo(String professionRegNo) {
        this.professionRegNo = professionRegNo;
        return this;
    }

    public void setProfessionRegNo(String professionRegNo) {
        this.professionRegNo = professionRegNo;
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

    public Address getAddress() {
        return address;
    }

    public Party address(Address address) {
        this.address = address;
        return this;
    }

    public void setAddress(Address address) {
        this.address = address;
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

    public Dictionary getPartySubRoleType() {
        return partySubRoleType;
    }

    public Party partySubRoleType(Dictionary dictionary) {
        this.partySubRoleType = dictionary;
        return this;
    }

    public void setPartySubRoleType(Dictionary dictionary) {
        this.partySubRoleType = dictionary;
    }

    public Dictionary getDeliveryType() {
        return deliveryType;
    }

    public Party deliveryType(Dictionary dictionary) {
        this.deliveryType = dictionary;
        return this;
    }

    public void setDeliveryType(Dictionary dictionary) {
        this.deliveryType = dictionary;
    }

    public Dictionary getPrimaryParty() {
        return primaryParty;
    }

    public Party primaryParty(Dictionary dictionary) {
        this.primaryParty = dictionary;
        return this;
    }

    public void setPrimaryParty(Dictionary dictionary) {
        this.primaryParty = dictionary;
    }

    public Dictionary getPersonIdType() {
        return personIdType;
    }

    public Party personIdType(Dictionary dictionary) {
        this.personIdType = dictionary;
        return this;
    }

    public void setPersonIdType(Dictionary dictionary) {
        this.personIdType = dictionary;
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

    public Dictionary getRepresentativeId() {
        return representativeId;
    }

    public Party representativeId(Dictionary dictionary) {
        this.representativeId = dictionary;
        return this;
    }

    public void setRepresentativeId(Dictionary dictionary) {
        this.representativeId = dictionary;
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
            ", partyName='" + getPartyName() + "'" +
            ", shareNominator='" + getShareNominator() + "'" +
            ", shareDenominator='" + getShareDenominator() + "'" +
            ", taxExempt='" + getTaxExempt() + "'" +
            ", otherName='" + getOtherName() + "'" +
            ", fax='" + getFax() + "'" +
            ", email='" + getEmail() + "'" +
            ", phoneNumber='" + getPhoneNumber() + "'" +
            ", payerId='" + getPayerId() + "'" +
            ", taxPayerNumber='" + getTaxPayerNumber() + "'" +
            ", comments='" + getComments() + "'" +
            ", personIdDate='" + getPersonIdDate() + "'" +
            ", personIdExpirationDate='" + getPersonIdExpirationDate() + "'" +
            ", rcNumber='" + getRcNumber() + "'" +
            ", organization='" + getOrganization() + "'" +
            ", businessNature='" + getBusinessNature() + "'" +
            ", birthPlace='" + getBirthPlace() + "'" +
            ", birthDate='" + getBirthDate() + "'" +
            ", firstName='" + getFirstName() + "'" +
            ", middleName='" + getMiddleName() + "'" +
            ", lastName='" + getLastName() + "'" +
            ", driverLicence='" + getDriverLicence() + "'" +
            ", professionRegNo='" + getProfessionRegNo() + "'" +
            ", occupation='" + getOccupation() + "'" +
            "}";
    }
}
