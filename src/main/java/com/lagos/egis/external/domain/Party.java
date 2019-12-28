package com.lagos.egis.external.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @NotNull
    @Column(name = "party_type", nullable = false)
    private Integer partyType;

    @NotNull
    @Column(name = "party_role_type", nullable = false)
    private Integer partyRoleType;

    @Column(name = "party_sub_role_type")
    private Integer partySubRoleType;

    @Column(name = "delivery_type")
    private Integer deliveryType;

    @Column(name = "party_name")
    private String partyName;

    @Column(name = "share_nominator")
    private String shareNominator;

    @Column(name = "share_denominator")
    private String shareDenominator;

    @Column(name = "tax_exempt")
    private String taxExempt;

    @Column(name = "primary_party")
    private String primaryParty;

    @Column(name = "other_name")
    private String otherName;

    @Column(name = "person_id_type")
    private Integer personIdType;

    @Column(name = "person_type")
    private Integer personType;

    @Column(name = "fax")
    private String fax;

    @Column(name = "email")
    private String email;

    @Column(name = "email_type")
    private Integer emailType;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "payer_id")
    private String payerId;

    @Column(name = "tax_payer_number")
    private String taxPayerNumber;

    @Column(name = "comments")
    private String comments;

    @Column(name = "person_id_issued_by")
    private Integer personIdIssuedBy;

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

    @Column(name = "person_title")
    private Integer personTitle;

    @Column(name = "gender")
    private Integer gender;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "middle_name")
    private String middleName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "civil_state")
    private Integer civilState;

    @Column(name = "driver_license_region")
    private Integer driverLicenseRegion;

    @Column(name = "driver_licence")
    private String driverLicence;

    @Column(name = "representative_id")
    private Integer representativeId;

    @Column(name = "profession_reg_no")
    private String professionRegNo;

    @Column(name = "occupation")
    private String occupation;

    @OneToOne
    @JoinColumn(unique = true)
    private Address address;

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

    public Integer getPartyType() {
        return partyType;
    }

    public Party partyType(Integer partyType) {
        this.partyType = partyType;
        return this;
    }

    public void setPartyType(Integer partyType) {
        this.partyType = partyType;
    }

    public Integer getPartyRoleType() {
        return partyRoleType;
    }

    public Party partyRoleType(Integer partyRoleType) {
        this.partyRoleType = partyRoleType;
        return this;
    }

    public void setPartyRoleType(Integer partyRoleType) {
        this.partyRoleType = partyRoleType;
    }

    public Integer getPartySubRoleType() {
        return partySubRoleType;
    }

    public Party partySubRoleType(Integer partySubRoleType) {
        this.partySubRoleType = partySubRoleType;
        return this;
    }

    public void setPartySubRoleType(Integer partySubRoleType) {
        this.partySubRoleType = partySubRoleType;
    }

    public Integer getDeliveryType() {
        return deliveryType;
    }

    public Party deliveryType(Integer deliveryType) {
        this.deliveryType = deliveryType;
        return this;
    }

    public void setDeliveryType(Integer deliveryType) {
        this.deliveryType = deliveryType;
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

    public Integer getPersonIdType() {
        return personIdType;
    }

    public Party personIdType(Integer personIdType) {
        this.personIdType = personIdType;
        return this;
    }

    public void setPersonIdType(Integer personIdType) {
        this.personIdType = personIdType;
    }

    public Integer getPersonType() {
        return personType;
    }

    public Party personType(Integer personType) {
        this.personType = personType;
        return this;
    }

    public void setPersonType(Integer personType) {
        this.personType = personType;
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

    public Integer getEmailType() {
        return emailType;
    }

    public Party emailType(Integer emailType) {
        this.emailType = emailType;
        return this;
    }

    public void setEmailType(Integer emailType) {
        this.emailType = emailType;
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

    public Integer getPersonIdIssuedBy() {
        return personIdIssuedBy;
    }

    public Party personIdIssuedBy(Integer personIdIssuedBy) {
        this.personIdIssuedBy = personIdIssuedBy;
        return this;
    }

    public void setPersonIdIssuedBy(Integer personIdIssuedBy) {
        this.personIdIssuedBy = personIdIssuedBy;
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

    public Integer getPersonTitle() {
        return personTitle;
    }

    public Party personTitle(Integer personTitle) {
        this.personTitle = personTitle;
        return this;
    }

    public void setPersonTitle(Integer personTitle) {
        this.personTitle = personTitle;
    }

    public Integer getGender() {
        return gender;
    }

    public Party gender(Integer gender) {
        this.gender = gender;
        return this;
    }

    public void setGender(Integer gender) {
        this.gender = gender;
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

    public Integer getCivilState() {
        return civilState;
    }

    public Party civilState(Integer civilState) {
        this.civilState = civilState;
        return this;
    }

    public void setCivilState(Integer civilState) {
        this.civilState = civilState;
    }

    public Integer getDriverLicenseRegion() {
        return driverLicenseRegion;
    }

    public Party driverLicenseRegion(Integer driverLicenseRegion) {
        this.driverLicenseRegion = driverLicenseRegion;
        return this;
    }

    public void setDriverLicenseRegion(Integer driverLicenseRegion) {
        this.driverLicenseRegion = driverLicenseRegion;
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

    public Integer getRepresentativeId() {
        return representativeId;
    }

    public Party representativeId(Integer representativeId) {
        this.representativeId = representativeId;
        return this;
    }

    public void setRepresentativeId(Integer representativeId) {
        this.representativeId = representativeId;
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
            ", partyType=" + getPartyType() +
            ", partyRoleType=" + getPartyRoleType() +
            ", partySubRoleType=" + getPartySubRoleType() +
            ", deliveryType=" + getDeliveryType() +
            ", partyName='" + getPartyName() + "'" +
            ", shareNominator='" + getShareNominator() + "'" +
            ", shareDenominator='" + getShareDenominator() + "'" +
            ", taxExempt='" + getTaxExempt() + "'" +
            ", primaryParty='" + getPrimaryParty() + "'" +
            ", otherName='" + getOtherName() + "'" +
            ", personIdType=" + getPersonIdType() +
            ", personType=" + getPersonType() +
            ", fax='" + getFax() + "'" +
            ", email='" + getEmail() + "'" +
            ", emailType=" + getEmailType() +
            ", phoneNumber='" + getPhoneNumber() + "'" +
            ", payerId='" + getPayerId() + "'" +
            ", taxPayerNumber='" + getTaxPayerNumber() + "'" +
            ", comments='" + getComments() + "'" +
            ", personIdIssuedBy=" + getPersonIdIssuedBy() +
            ", personIdDate='" + getPersonIdDate() + "'" +
            ", personIdExpirationDate='" + getPersonIdExpirationDate() + "'" +
            ", rcNumber='" + getRcNumber() + "'" +
            ", organization='" + getOrganization() + "'" +
            ", businessNature='" + getBusinessNature() + "'" +
            ", birthPlace='" + getBirthPlace() + "'" +
            ", birthDate='" + getBirthDate() + "'" +
            ", personTitle=" + getPersonTitle() +
            ", gender=" + getGender() +
            ", firstName='" + getFirstName() + "'" +
            ", middleName='" + getMiddleName() + "'" +
            ", lastName='" + getLastName() + "'" +
            ", civilState=" + getCivilState() +
            ", driverLicenseRegion=" + getDriverLicenseRegion() +
            ", driverLicence='" + getDriverLicence() + "'" +
            ", representativeId=" + getRepresentativeId() +
            ", professionRegNo='" + getProfessionRegNo() + "'" +
            ", occupation='" + getOccupation() + "'" +
            "}";
    }
}
