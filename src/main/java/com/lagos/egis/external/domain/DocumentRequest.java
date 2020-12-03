package com.lagos.egis.external.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;

/**
 * A DocumentRequest.
 */
@Entity
@Table(name = "document_request")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "documentrequest")
public class DocumentRequest implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    @Column(name = "transaction_id")
    private String transactionId;

    @Column(name = "document_id")
    private String documentId;

    @Column(name = "document_type")
    private String documentType;

    @Column(name = "document_sub_type")
    private String documentSubType;

    @Column(name = "document_number")
    private String documentNumber;

    @Column(name = "survey_plan_number")
    private String surveyPlanNumber;

    @Column(name = "property_description")
    private String propertyDescription;

    @Column(name = "title_number")
    private String titleNumber;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTransactionId() {
        return transactionId;
    }

    public DocumentRequest transactionId(String transactionId) {
        this.transactionId = transactionId;
        return this;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }

    public String getDocumentId() {
        return documentId;
    }

    public DocumentRequest documentId(String documentId) {
        this.documentId = documentId;
        return this;
    }

    public void setDocumentId(String documentId) {
        this.documentId = documentId;
    }

    public String getDocumentType() {
        return documentType;
    }

    public DocumentRequest documentType(String documentType) {
        this.documentType = documentType;
        return this;
    }

    public void setDocumentType(String documentType) {
        this.documentType = documentType;
    }

    public String getDocumentSubType() {
        return documentSubType;
    }

    public DocumentRequest documentSubType(String documentSubType) {
        this.documentSubType = documentSubType;
        return this;
    }

    public void setDocumentSubType(String documentSubType) {
        this.documentSubType = documentSubType;
    }

    public String getDocumentNumber() {
        return documentNumber;
    }

    public DocumentRequest documentNumber(String documentNumber) {
        this.documentNumber = documentNumber;
        return this;
    }

    public void setDocumentNumber(String documentNumber) {
        this.documentNumber = documentNumber;
    }

    public String getSurveyPlanNumber() {
        return surveyPlanNumber;
    }

    public DocumentRequest surveyPlanNumber(String surveyPlanNumber) {
        this.surveyPlanNumber = surveyPlanNumber;
        return this;
    }

    public void setSurveyPlanNumber(String surveyPlanNumber) {
        this.surveyPlanNumber = surveyPlanNumber;
    }

    public String getPropertyDescription() {
        return propertyDescription;
    }

    public DocumentRequest propertyDescription(String propertyDescription) {
        this.propertyDescription = propertyDescription;
        return this;
    }

    public void setPropertyDescription(String propertyDescription) {
        this.propertyDescription = propertyDescription;
    }

    public String getTitleNumber() {
        return titleNumber;
    }

    public DocumentRequest titleNumber(String titleNumber) {
        this.titleNumber = titleNumber;
        return this;
    }

    public void setTitleNumber(String titleNumber) {
        this.titleNumber = titleNumber;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof DocumentRequest)) {
            return false;
        }
        return id != null && id.equals(((DocumentRequest) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "DocumentRequest{" +
            "id=" + getId() +
            ", transactionId='" + getTransactionId() + "'" +
            ", documentId='" + getDocumentId() + "'" +
            ", documentType='" + getDocumentType() + "'" +
            ", documentSubType='" + getDocumentSubType() + "'" +
            ", documentNumber='" + getDocumentNumber() + "'" +
            ", surveyPlanNumber='" + getSurveyPlanNumber() + "'" +
            ", propertyDescription='" + getPropertyDescription() + "'" +
            ", titleNumber='" + getTitleNumber() + "'" +
            "}";
    }
}
