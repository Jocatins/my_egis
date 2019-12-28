package com.lagos.egis.external.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;

/**
 * A SurveyTransaction.
 */
@Entity
@Table(name = "survey_transaction")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "surveytransaction")
public class SurveyTransaction implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    @Column(name = "trans_code")
    private String transCode;

    @Column(name = "comment")
    private String comment;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTransCode() {
        return transCode;
    }

    public SurveyTransaction transCode(String transCode) {
        this.transCode = transCode;
        return this;
    }

    public void setTransCode(String transCode) {
        this.transCode = transCode;
    }

    public String getComment() {
        return comment;
    }

    public SurveyTransaction comment(String comment) {
        this.comment = comment;
        return this;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SurveyTransaction)) {
            return false;
        }
        return id != null && id.equals(((SurveyTransaction) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "SurveyTransaction{" +
            "id=" + getId() +
            ", transCode='" + getTransCode() + "'" +
            ", comment='" + getComment() + "'" +
            "}";
    }
}
