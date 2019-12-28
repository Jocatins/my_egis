package com.lagos.egis.external.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;

/**
 * A TransactionExt.
 */
@Entity
@Table(name = "transaction_ext")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "transactionext")
public class TransactionExt implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    @Column(name = "extension_key")
    private String extensionKey;

    @Column(name = "extension_value")
    private String extensionValue;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getExtensionKey() {
        return extensionKey;
    }

    public TransactionExt extensionKey(String extensionKey) {
        this.extensionKey = extensionKey;
        return this;
    }

    public void setExtensionKey(String extensionKey) {
        this.extensionKey = extensionKey;
    }

    public String getExtensionValue() {
        return extensionValue;
    }

    public TransactionExt extensionValue(String extensionValue) {
        this.extensionValue = extensionValue;
        return this;
    }

    public void setExtensionValue(String extensionValue) {
        this.extensionValue = extensionValue;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TransactionExt)) {
            return false;
        }
        return id != null && id.equals(((TransactionExt) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "TransactionExt{" +
            "id=" + getId() +
            ", extensionKey='" + getExtensionKey() + "'" +
            ", extensionValue='" + getExtensionValue() + "'" +
            "}";
    }
}
