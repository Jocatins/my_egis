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
 * A SupportingDocument.
 */
@Entity
@Table(name = "supporting_document")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "supportingdocument")
public class SupportingDocument implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    @Column(name = "document_number")
    private String documentNumber;

    @Column(name = "ownership_area")
    private String ownershipArea;

    @Column(name = "page_count")
    private Integer pageCount;

    @Column(name = "status")
    private String status;

    @Column(name = "provided")
    private String provided;

    @Column(name = "type")
    private Integer type;

    @Column(name = "name")
    private String name;

    @Column(name = "file_size")
    private Integer fileSize;

    @Column(name = "content")
    private String content;

    @Column(name = "content_url")
    private String contentUrl;

    @Column(name = "image")
    private String image;

    @Column(name = "date")
    private LocalDate date;

    @ManyToOne
    @JsonIgnoreProperties("supportingDocuments")
    private Dictionary documentSubType;

    @ManyToOne
    @JsonIgnoreProperties("supportingDocuments")
    private Dictionary documentType;

    @ManyToOne
    @JsonIgnoreProperties("supportingDocuments")
    private Dictionary issuedBy;

    @ManyToMany(mappedBy = "docs")
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

    public String getDocumentNumber() {
        return documentNumber;
    }

    public SupportingDocument documentNumber(String documentNumber) {
        this.documentNumber = documentNumber;
        return this;
    }

    public void setDocumentNumber(String documentNumber) {
        this.documentNumber = documentNumber;
    }

    public String getOwnershipArea() {
        return ownershipArea;
    }

    public SupportingDocument ownershipArea(String ownershipArea) {
        this.ownershipArea = ownershipArea;
        return this;
    }

    public void setOwnershipArea(String ownershipArea) {
        this.ownershipArea = ownershipArea;
    }

    public Integer getPageCount() {
        return pageCount;
    }

    public SupportingDocument pageCount(Integer pageCount) {
        this.pageCount = pageCount;
        return this;
    }

    public void setPageCount(Integer pageCount) {
        this.pageCount = pageCount;
    }

    public String getStatus() {
        return status;
    }

    public SupportingDocument status(String status) {
        this.status = status;
        return this;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getProvided() {
        return provided;
    }

    public SupportingDocument provided(String provided) {
        this.provided = provided;
        return this;
    }

    public void setProvided(String provided) {
        this.provided = provided;
    }

    public Integer getType() {
        return type;
    }

    public SupportingDocument type(Integer type) {
        this.type = type;
        return this;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public String getName() {
        return name;
    }

    public SupportingDocument name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getFileSize() {
        return fileSize;
    }

    public SupportingDocument fileSize(Integer fileSize) {
        this.fileSize = fileSize;
        return this;
    }

    public void setFileSize(Integer fileSize) {
        this.fileSize = fileSize;
    }

    public String getContent() {
        return content;
    }

    public SupportingDocument content(String content) {
        this.content = content;
        return this;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getContentUrl() {
        return contentUrl;
    }

    public SupportingDocument contentUrl(String contentUrl) {
        this.contentUrl = contentUrl;
        return this;
    }

    public void setContentUrl(String contentUrl) {
        this.contentUrl = contentUrl;
    }

    public String getImage() {
        return image;
    }

    public SupportingDocument image(String image) {
        this.image = image;
        return this;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public LocalDate getDate() {
        return date;
    }

    public SupportingDocument date(LocalDate date) {
        this.date = date;
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Dictionary getDocumentSubType() {
        return documentSubType;
    }

    public SupportingDocument documentSubType(Dictionary dictionary) {
        this.documentSubType = dictionary;
        return this;
    }

    public void setDocumentSubType(Dictionary dictionary) {
        this.documentSubType = dictionary;
    }

    public Dictionary getDocumentType() {
        return documentType;
    }

    public SupportingDocument documentType(Dictionary dictionary) {
        this.documentType = dictionary;
        return this;
    }

    public void setDocumentType(Dictionary dictionary) {
        this.documentType = dictionary;
    }

    public Dictionary getIssuedBy() {
        return issuedBy;
    }

    public SupportingDocument issuedBy(Dictionary dictionary) {
        this.issuedBy = dictionary;
        return this;
    }

    public void setIssuedBy(Dictionary dictionary) {
        this.issuedBy = dictionary;
    }

    public Set<Transaction> getTransactions() {
        return transactions;
    }

    public SupportingDocument transactions(Set<Transaction> transactions) {
        this.transactions = transactions;
        return this;
    }

    public SupportingDocument addTransaction(Transaction transaction) {
        this.transactions.add(transaction);
        transaction.getDocs().add(this);
        return this;
    }

    public SupportingDocument removeTransaction(Transaction transaction) {
        this.transactions.remove(transaction);
        transaction.getDocs().remove(this);
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
        if (!(o instanceof SupportingDocument)) {
            return false;
        }
        return id != null && id.equals(((SupportingDocument) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "SupportingDocument{" +
            "id=" + getId() +
            ", documentNumber='" + getDocumentNumber() + "'" +
            ", ownershipArea='" + getOwnershipArea() + "'" +
            ", pageCount=" + getPageCount() +
            ", status='" + getStatus() + "'" +
            ", provided='" + getProvided() + "'" +
            ", type=" + getType() +
            ", name='" + getName() + "'" +
            ", fileSize=" + getFileSize() +
            ", content='" + getContent() + "'" +
            ", contentUrl='" + getContentUrl() + "'" +
            ", image='" + getImage() + "'" +
            ", date='" + getDate() + "'" +
            "}";
    }
}
