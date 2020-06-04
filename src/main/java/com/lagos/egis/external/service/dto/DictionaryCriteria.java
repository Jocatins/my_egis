package com.lagos.egis.external.service.dto;

import java.io.Serializable;
import java.util.Objects;
import io.github.jhipster.service.Criteria;
import io.github.jhipster.service.filter.BooleanFilter;
import io.github.jhipster.service.filter.DoubleFilter;
import io.github.jhipster.service.filter.Filter;
import io.github.jhipster.service.filter.FloatFilter;
import io.github.jhipster.service.filter.IntegerFilter;
import io.github.jhipster.service.filter.LongFilter;
import io.github.jhipster.service.filter.StringFilter;

/**
 * Criteria class for the {@link com.lagos.egis.external.domain.Dictionary} entity. This class is used
 * in {@link com.lagos.egis.external.web.rest.DictionaryResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /dictionaries?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class DictionaryCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter code;

    private StringFilter label;

    private StringFilter descr;

    private StringFilter category;

    public DictionaryCriteria(){
    }

    public DictionaryCriteria(DictionaryCriteria other){
        this.id = other.id == null ? null : other.id.copy();
        this.code = other.code == null ? null : other.code.copy();
        this.label = other.label == null ? null : other.label.copy();
        this.descr = other.descr == null ? null : other.descr.copy();
        this.category = other.category == null ? null : other.category.copy();
    }

    @Override
    public DictionaryCriteria copy() {
        return new DictionaryCriteria(this);
    }

    public LongFilter getId() {
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public StringFilter getCode() {
        return code;
    }

    public void setCode(StringFilter code) {
        this.code = code;
    }

    public StringFilter getLabel() {
        return label;
    }

    public void setLabel(StringFilter label) {
        this.label = label;
    }

    public StringFilter getDescr() {
        return descr;
    }

    public void setDescr(StringFilter descr) {
        this.descr = descr;
    }

    public StringFilter getCategory() {
        return category;
    }

    public void setCategory(StringFilter category) {
        this.category = category;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final DictionaryCriteria that = (DictionaryCriteria) o;
        return
            Objects.equals(id, that.id) &&
            Objects.equals(code, that.code) &&
            Objects.equals(label, that.label) &&
            Objects.equals(descr, that.descr) &&
            Objects.equals(category, that.category);
    }

    @Override
    public int hashCode() {
        return Objects.hash(
        id,
        code,
        label,
        descr,
        category
        );
    }

    @Override
    public String toString() {
        return "DictionaryCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (code != null ? "code=" + code + ", " : "") +
                (label != null ? "label=" + label + ", " : "") +
                (descr != null ? "descr=" + descr + ", " : "") +
                (category != null ? "category=" + category + ", " : "") +
            "}";
    }

}
