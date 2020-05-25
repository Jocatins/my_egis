package com.lagos.egis.external.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;

/**
 * A Surveyor.
 */
@Entity
@Table(name = "surveyor")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "surveyor")
public class Surveyor implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    @Column(name = "email")
    private String email;

    @Column(name = "surcon_number")
    private String surconNumber;

    @Column(name = "registration_number")
    private String registrationNumber;

    @Column(name = "phone")
    private String phone;

    @Column(name = "status")
    private String status;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public Surveyor email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSurconNumber() {
        return surconNumber;
    }

    public Surveyor surconNumber(String surconNumber) {
        this.surconNumber = surconNumber;
        return this;
    }

    public void setSurconNumber(String surconNumber) {
        this.surconNumber = surconNumber;
    }

    public String getRegistrationNumber() {
        return registrationNumber;
    }

    public Surveyor registrationNumber(String registrationNumber) {
        this.registrationNumber = registrationNumber;
        return this;
    }

    public void setRegistrationNumber(String registrationNumber) {
        this.registrationNumber = registrationNumber;
    }

    public String getPhone() {
        return phone;
    }

    public Surveyor phone(String phone) {
        this.phone = phone;
        return this;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getStatus() {
        return status;
    }

    public Surveyor status(String status) {
        this.status = status;
        return this;
    }

    public void setStatus(String status) {
        this.status = status;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Surveyor)) {
            return false;
        }
        return id != null && id.equals(((Surveyor) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Surveyor{" +
            "id=" + getId() +
            ", email='" + getEmail() + "'" +
            ", surconNumber='" + getSurconNumber() + "'" +
            ", registrationNumber='" + getRegistrationNumber() + "'" +
            ", phone='" + getPhone() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
