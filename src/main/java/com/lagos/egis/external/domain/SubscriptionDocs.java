package com.lagos.egis.external.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Type;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A SubscriptionDocs.
 */
@Entity
@Table(name = "subscription_docs")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "subscriptiondocs")
public class SubscriptionDocs implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "content")
    private String content;

    @Column(name = "type")
    private String type;

    @Column(name = "filename")
    private String filename;

    @ManyToMany(mappedBy = "subscriptionDocs")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<YearSubscription> yearSubscriptions = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public SubscriptionDocs content(String content) {
        this.content = content;
        return this;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getType() {
        return type;
    }

    public SubscriptionDocs type(String type) {
        this.type = type;
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getFilename() {
        return filename;
    }

    public SubscriptionDocs filename(String filename) {
        this.filename = filename;
        return this;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public Set<YearSubscription> getYearSubscriptions() {
        return yearSubscriptions;
    }

    public SubscriptionDocs yearSubscriptions(Set<YearSubscription> yearSubscriptions) {
        this.yearSubscriptions = yearSubscriptions;
        return this;
    }

    public SubscriptionDocs addYearSubscription(YearSubscription yearSubscription) {
        this.yearSubscriptions.add(yearSubscription);
        yearSubscription.getSubscriptionDocs().add(this);
        return this;
    }

    public SubscriptionDocs removeYearSubscription(YearSubscription yearSubscription) {
        this.yearSubscriptions.remove(yearSubscription);
        yearSubscription.getSubscriptionDocs().remove(this);
        return this;
    }

    public void setYearSubscriptions(Set<YearSubscription> yearSubscriptions) {
        this.yearSubscriptions = yearSubscriptions;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SubscriptionDocs)) {
            return false;
        }
        return id != null && id.equals(((SubscriptionDocs) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "SubscriptionDocs{" +
            "id=" + getId() +
            ", content='" + getContent() + "'" +
            ", type='" + getType() + "'" +
            ", filename='" + getFilename() + "'" +
            "}";
    }
}
