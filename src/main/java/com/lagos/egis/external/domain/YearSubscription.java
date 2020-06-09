package com.lagos.egis.external.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

/**
 * A YearSubscription.
 */
@Entity
@Table(name = "year_subscription")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "yearsubscription")
public class YearSubscription implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    @Column(name = "year")
    private Integer year;

    @Column(name = "status")
    private String status;

    @Column(name = "request_date")
    private LocalDate requestDate;

    @Column(name = "processed_date")
    private LocalDate processedDate;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "year_subscription_surveyor",
               joinColumns = @JoinColumn(name = "year_subscription_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "surveyor_id", referencedColumnName = "id"))
    private Set<Surveyor> surveyors = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "year_subscription_subscription_docs",
               joinColumns = @JoinColumn(name = "year_subscription_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "subscription_docs_id", referencedColumnName = "id"))
    private Set<SubscriptionDocs> subscriptionDocs = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getYear() {
        return year;
    }

    public YearSubscription year(Integer year) {
        this.year = year;
        return this;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public String getStatus() {
        return status;
    }

    public YearSubscription status(String status) {
        this.status = status;
        return this;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDate getRequestDate() {
        return requestDate;
    }

    public YearSubscription requestDate(LocalDate requestDate) {
        this.requestDate = requestDate;
        return this;
    }

    public void setRequestDate(LocalDate requestDate) {
        this.requestDate = requestDate;
    }

    public LocalDate getProcessedDate() {
        return processedDate;
    }

    public YearSubscription processedDate(LocalDate processedDate) {
        this.processedDate = processedDate;
        return this;
    }

    public void setProcessedDate(LocalDate processedDate) {
        this.processedDate = processedDate;
    }

    public Set<Surveyor> getSurveyors() {
        return surveyors;
    }

    public YearSubscription surveyors(Set<Surveyor> surveyors) {
        this.surveyors = surveyors;
        return this;
    }

    public YearSubscription addSurveyor(Surveyor surveyor) {
        this.surveyors.add(surveyor);
        surveyor.getYearSubscriptions().add(this);
        return this;
    }

    public YearSubscription removeSurveyor(Surveyor surveyor) {
        this.surveyors.remove(surveyor);
        surveyor.getYearSubscriptions().remove(this);
        return this;
    }

    public void setSurveyors(Set<Surveyor> surveyors) {
        this.surveyors = surveyors;
    }

    public Set<SubscriptionDocs> getSubscriptionDocs() {
        return subscriptionDocs;
    }

    public YearSubscription subscriptionDocs(Set<SubscriptionDocs> subscriptionDocs) {
        this.subscriptionDocs = subscriptionDocs;
        return this;
    }

    public YearSubscription addSubscriptionDocs(SubscriptionDocs subscriptionDocs) {
        this.subscriptionDocs.add(subscriptionDocs);
        subscriptionDocs.getYearSubscriptions().add(this);
        return this;
    }

    public YearSubscription removeSubscriptionDocs(SubscriptionDocs subscriptionDocs) {
        this.subscriptionDocs.remove(subscriptionDocs);
        subscriptionDocs.getYearSubscriptions().remove(this);
        return this;
    }

    public void setSubscriptionDocs(Set<SubscriptionDocs> subscriptionDocs) {
        this.subscriptionDocs = subscriptionDocs;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof YearSubscription)) {
            return false;
        }
        return id != null && id.equals(((YearSubscription) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "YearSubscription{" +
            "id=" + getId() +
            ", year=" + getYear() +
            ", status='" + getStatus() + "'" +
            ", requestDate='" + getRequestDate() + "'" +
            ", processedDate='" + getProcessedDate() + "'" +
            "}";
    }
}
