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
 * A Transaction.
 */
@Entity
@Table(name = "transaction")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "transaction")
public class Transaction implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    @Column(name = "transaction_number")
    private String transactionNumber;

    @Column(name = "application_date")
    private LocalDate applicationDate;

    @Column(name = "transaction_start_date")
    private LocalDate transactionStartDate;

    @Column(name = "comments")
    private String comments;

    @Column(name = "create_date")
    private LocalDate createDate;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "complete_date")
    private LocalDate completeDate;

    @Column(name = "batch_id")
    private Integer batchId;

    @Column(name = "transaction_code")
    private String transactionCode;

    @OneToOne
    @JoinColumn(unique = true)
    private TransactionExt ext;

    @ManyToOne
    @JsonIgnoreProperties("transactions")
    private Dictionary transactionType;

    @ManyToOne
    @JsonIgnoreProperties("transactions")
    private Dictionary transactionSubType;

    @ManyToOne
    @JsonIgnoreProperties("transactions")
    private Dictionary ownershipType;

    @ManyToOne
    @JsonIgnoreProperties("transactions")
    private Dictionary tenureType;

    @ManyToMany ( fetch = FetchType.EAGER)
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "transaction_party",
               joinColumns = @JoinColumn(name = "transaction_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "party_id", referencedColumnName = "id"))
    private Set<Party> parties = new HashSet<>();

    @ManyToMany ( fetch = FetchType.EAGER)
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "transaction_parcel",
               joinColumns = @JoinColumn(name = "transaction_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "parcel_id", referencedColumnName = "id"))
    private Set<Parcel> parcels = new HashSet<>();

    @ManyToMany ( fetch = FetchType.EAGER)
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "transaction_docs",
               joinColumns = @JoinColumn(name = "transaction_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "docs_id", referencedColumnName = "id"))
    private Set<SupportingDocument> docs = new HashSet<>();

    @ManyToMany(mappedBy = "transactions")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Batch> batches = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTransactionNumber() {
        return transactionNumber;
    }

    public Transaction transactionNumber(String transactionNumber) {
        this.transactionNumber = transactionNumber;
        return this;
    }

    public void setTransactionNumber(String transactionNumber) {
        this.transactionNumber = transactionNumber;
    }

    public LocalDate getApplicationDate() {
        return applicationDate;
    }

    public Transaction applicationDate(LocalDate applicationDate) {
        this.applicationDate = applicationDate;
        return this;
    }

    public void setApplicationDate(LocalDate applicationDate) {
        this.applicationDate = applicationDate;
    }

    public LocalDate getTransactionStartDate() {
        return transactionStartDate;
    }

    public Transaction transactionStartDate(LocalDate transactionStartDate) {
        this.transactionStartDate = transactionStartDate;
        return this;
    }

    public void setTransactionStartDate(LocalDate transactionStartDate) {
        this.transactionStartDate = transactionStartDate;
    }

    public String getComments() {
        return comments;
    }

    public Transaction comments(String comments) {
        this.comments = comments;
        return this;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public LocalDate getCreateDate() {
        return createDate;
    }

    public Transaction createDate(LocalDate createDate) {
        this.createDate = createDate;
        return this;
    }

    public void setCreateDate(LocalDate createDate) {
        this.createDate = createDate;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public Transaction startDate(LocalDate startDate) {
        this.startDate = startDate;
        return this;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getCompleteDate() {
        return completeDate;
    }

    public Transaction completeDate(LocalDate completeDate) {
        this.completeDate = completeDate;
        return this;
    }

    public void setCompleteDate(LocalDate completeDate) {
        this.completeDate = completeDate;
    }

    public Integer getBatchId() {
        return batchId;
    }

    public Transaction batchId(Integer batchId) {
        this.batchId = batchId;
        return this;
    }

    public void setBatchId(Integer batchId) {
        this.batchId = batchId;
    }

    public String getTransactionCode() {
        return transactionCode;
    }

    public Transaction transactionCode(String transactionCode) {
        this.transactionCode = transactionCode;
        return this;
    }

    public void setTransactionCode(String transactionCode) {
        this.transactionCode = transactionCode;
    }

    public TransactionExt getExt() {
        return ext;
    }

    public Transaction ext(TransactionExt transactionExt) {
        this.ext = transactionExt;
        return this;
    }

    public void setExt(TransactionExt transactionExt) {
        this.ext = transactionExt;
    }

    public Dictionary getTransactionType() {
        return transactionType;
    }

    public Transaction transactionType(Dictionary dictionary) {
        this.transactionType = dictionary;
        return this;
    }

    public void setTransactionType(Dictionary dictionary) {
        this.transactionType = dictionary;
    }

    public Dictionary getTransactionSubType() {
        return transactionSubType;
    }

    public Transaction transactionSubType(Dictionary dictionary) {
        this.transactionSubType = dictionary;
        return this;
    }

    public void setTransactionSubType(Dictionary dictionary) {
        this.transactionSubType = dictionary;
    }

    public Dictionary getOwnershipType() {
        return ownershipType;
    }

    public Transaction ownershipType(Dictionary dictionary) {
        this.ownershipType = dictionary;
        return this;
    }

    public void setOwnershipType(Dictionary dictionary) {
        this.ownershipType = dictionary;
    }

    public Dictionary getTenureType() {
        return tenureType;
    }

    public Transaction tenureType(Dictionary dictionary) {
        this.tenureType = dictionary;
        return this;
    }

    public void setTenureType(Dictionary dictionary) {
        this.tenureType = dictionary;
    }

    public Set<Party> getParties() {
        return parties;
    }

    public Transaction parties(Set<Party> parties) {
        this.parties = parties;
        return this;
    }

    public Transaction addParty(Party party) {
        this.parties.add(party);
        party.getTransactions().add(this);
        return this;
    }

    public Transaction removeParty(Party party) {
        this.parties.remove(party);
        party.getTransactions().remove(this);
        return this;
    }

    public void setParties(Set<Party> parties) {
        this.parties = parties;
    }

    public Set<Parcel> getParcels() {
        return parcels;
    }

    public Transaction parcels(Set<Parcel> parcels) {
        this.parcels = parcels;
        return this;
    }

    public Transaction addParcel(Parcel parcel) {
        this.parcels.add(parcel);
        parcel.getTransactions().add(this);
        return this;
    }

    public Transaction removeParcel(Parcel parcel) {
        this.parcels.remove(parcel);
        parcel.getTransactions().remove(this);
        return this;
    }

    public void setParcels(Set<Parcel> parcels) {
        this.parcels = parcels;
    }

    public Set<SupportingDocument> getDocs() {
        return docs;
    }

    public Transaction docs(Set<SupportingDocument> supportingDocuments) {
        this.docs = supportingDocuments;
        return this;
    }

    public Transaction addDocs(SupportingDocument supportingDocument) {
        this.docs.add(supportingDocument);
        supportingDocument.getTransactions().add(this);
        return this;
    }

    public Transaction removeDocs(SupportingDocument supportingDocument) {
        this.docs.remove(supportingDocument);
        supportingDocument.getTransactions().remove(this);
        return this;
    }

    public void setDocs(Set<SupportingDocument> supportingDocuments) {
        this.docs = supportingDocuments;
    }

    public Set<Batch> getBatches() {
        return batches;
    }

    public Transaction batches(Set<Batch> batches) {
        this.batches = batches;
        return this;
    }

    public Transaction addBatch(Batch batch) {
        this.batches.add(batch);
        batch.getTransactions().add(this);
        return this;
    }

    public Transaction removeBatch(Batch batch) {
        this.batches.remove(batch);
        batch.getTransactions().remove(this);
        return this;
    }

    public void setBatches(Set<Batch> batches) {
        this.batches = batches;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Transaction)) {
            return false;
        }
        return id != null && id.equals(((Transaction) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Transaction{" +
            "id=" + getId() +
            ", transactionNumber='" + getTransactionNumber() + "'" +
            ", applicationDate='" + getApplicationDate() + "'" +
            ", transactionStartDate='" + getTransactionStartDate() + "'" +
            ", comments='" + getComments() + "'" +
            ", createDate='" + getCreateDate() + "'" +
            ", startDate='" + getStartDate() + "'" +
            ", completeDate='" + getCompleteDate() + "'" +
            ", batchId=" + getBatchId() +
            ", transactionCode='" + getTransactionCode() + "'" +
            "}";
    }
}
