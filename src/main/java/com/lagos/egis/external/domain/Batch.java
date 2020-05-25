package com.lagos.egis.external.domain;
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
 * A Batch.
 */
@Entity
@Table(name = "batch")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "batch")
public class Batch implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    @Column(name = "batch_number")
    private Integer batchNumber;

    @Column(name = "invoice_number")
    private String invoiceNumber;

    @Column(name = "create_date")
    private LocalDate createDate;

    @Column(name = "delivery_date")
    private LocalDate deliveryDate;

    @Column(name = "office_id")
    private Integer officeId;

    @ManyToOne
    @JsonIgnoreProperties("batches")
    private User user;

    @ManyToOne
    @JsonIgnoreProperties("batches")
    private Dictionary batchStatus;


    @ManyToMany (cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "batch_transaction",
               joinColumns = @JoinColumn(name = "batch_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "transaction_id", referencedColumnName = "id"))
    private Set<Transaction> transactions = new HashSet<>();

    @ManyToMany ( fetch = FetchType.EAGER)
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "batch_party",
               joinColumns = @JoinColumn(name = "batch_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "party_id", referencedColumnName = "id"))
    private Set<Party> parties = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getBatchNumber() {
        return batchNumber;
    }

    public Batch batchNumber(Integer batchNumber) {
        this.batchNumber = batchNumber;
        return this;
    }

    public void setBatchNumber(Integer batchNumber) {
        this.batchNumber = batchNumber;
    }

    public String getInvoiceNumber() {
        return invoiceNumber;
    }

    public Batch invoiceNumber(String invoiceNumber) {
        this.invoiceNumber = invoiceNumber;
        return this;
    }

    public void setInvoiceNumber(String invoiceNumber) {
        this.invoiceNumber = invoiceNumber;
    }

    public LocalDate getCreateDate() {
        return createDate;
    }

    public Batch createDate(LocalDate createDate) {
        this.createDate = createDate;
        return this;
    }

    public void setCreateDate(LocalDate createDate) {
        this.createDate = createDate;
    }

    public LocalDate getDeliveryDate() {
        return deliveryDate;
    }

    public Batch deliveryDate(LocalDate deliveryDate) {
        this.deliveryDate = deliveryDate;
        return this;
    }

    public void setDeliveryDate(LocalDate deliveryDate) {
        this.deliveryDate = deliveryDate;
    }

    public Integer getOfficeId() {
        return officeId;
    }

    public Batch officeId(Integer officeId) {
        this.officeId = officeId;
        return this;
    }

    public void setOfficeId(Integer officeId) {
        this.officeId = officeId;
    }

    public User getUser() {
        return user;
    }

    public Batch user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Dictionary getBatchStatus() {
        return batchStatus;
    }

    public Batch batchStatus(Dictionary dictionary) {
        this.batchStatus = dictionary;
        return this;
    }

    public void setBatchStatus(Dictionary dictionary) {
        this.batchStatus = dictionary;
    }

    public Set<Transaction> getTransactions() {
        return transactions;
    }

    public Batch transactions(Set<Transaction> transactions) {
        this.transactions = transactions;
        return this;
    }

    public Batch addTransaction(Transaction transaction) {
        this.transactions.add(transaction);
        transaction.getBatches().add(this);
        return this;
    }

    public Batch removeTransaction(Transaction transaction) {
        this.transactions.remove(transaction);
        transaction.getBatches().remove(this);
        return this;
    }

    public void setTransactions(Set<Transaction> transactions) {
        this.transactions = transactions;
    }

    public Set<Party> getParties() {
        return parties;
    }

    public Batch parties(Set<Party> parties) {
        this.parties = parties;
        return this;
    }

    public Batch addParty(Party party) {
        this.parties.add(party);
        party.getBatches().add(this);
        return this;
    }

    public Batch removeParty(Party party) {
        this.parties.remove(party);
        party.getBatches().remove(this);
        return this;
    }

    public void setParties(Set<Party> parties) {
        this.parties = parties;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Batch)) {
            return false;
        }
        return id != null && id.equals(((Batch) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Batch{" +
            "id=" + getId() +
            ", batchNumber=" + getBatchNumber() +
            ", invoiceNumber='" + getInvoiceNumber() + "'" +
            ", createDate='" + getCreateDate() + "'" +
            ", deliveryDate='" + getDeliveryDate() + "'" +
            ", officeId=" + getOfficeId() +
            "}";
    }
}
