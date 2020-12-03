package com.lagos.egis.external.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;

/**
 * A TitleSelectOptions.
 */
@Entity
@Table(name = "title_select_options")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "titleselectoptions")
public class TitleSelectOptions implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    @Column(name = "transaction_id")
    private String transactionId;

    @Column(name = "query_field")
    private String queryField;

    @Column(name = "query_value")
    private String queryValue;

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

    public TitleSelectOptions transactionId(String transactionId) {
        this.transactionId = transactionId;
        return this;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }

    public String getQueryField() {
        return queryField;
    }

    public TitleSelectOptions queryField(String queryField) {
        this.queryField = queryField;
        return this;
    }

    public void setQueryField(String queryField) {
        this.queryField = queryField;
    }

    public String getQueryValue() {
        return queryValue;
    }

    public TitleSelectOptions queryValue(String queryValue) {
        this.queryValue = queryValue;
        return this;
    }

    public void setQueryValue(String queryValue) {
        this.queryValue = queryValue;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TitleSelectOptions)) {
            return false;
        }
        return id != null && id.equals(((TitleSelectOptions) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "TitleSelectOptions{" +
            "id=" + getId() +
            ", transactionId='" + getTransactionId() + "'" +
            ", queryField='" + getQueryField() + "'" +
            ", queryValue='" + getQueryValue() + "'" +
            "}";
    }
}
