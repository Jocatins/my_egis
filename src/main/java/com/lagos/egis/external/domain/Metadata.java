package com.lagos.egis.external.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;

/**
 * A Metadata.
 */
@Entity
@Table(name = "metadata")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "metadata")
public class Metadata implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    @Column(name = "hjtype")
    private String hjtype;

    @Column(name = "code")
    private String code;

    @Column(name = "label")
    private String label;

    @Column(name = "descr")
    private String descr;

    @Column(name = "category")
    private String category;

    @Column(name = "general_term")
    private String generalTerm;

    @Column(name = "sort_order")
    private String sortOrder;

    @Column(name = "hidden")
    private String hidden;

    @Column(name = "group_name")
    private String groupName;

    @Column(name = "workflow")
    private String workflow;

    @Column(name = "group_code")
    private String groupCode;

    @Column(name = "normal_duration")
    private String normalDuration;

    @Column(name = "lapsed_duration")
    private String lapsedDuration;

    @Column(name = "max_duration")
    private String maxDuration;

    @Column(name = "right_type")
    private String rightType;

    @Column(name = "right_type_multiple")
    private String rightTypeMultiple;

    @Column(name = "right_type_other")
    private String rightTypeOther;

    @Column(name = "create_new_rrs")
    private String createNewRrs;

    @Column(name = "modify_active_rrrs")
    private String modifyActiveRrrs;

    @Column(name = "related_active_rrrs")
    private String relatedActiveRrrs;

    @Column(name = "discharge_active_rrrs")
    private String dischargeActiveRrrs;

    @Column(name = "blocked_active_rrrs")
    private String blockedActiveRrrs;

    @Column(name = "meta_type")
    private String metaType;

    @Column(name = "source_party_type")
    private String sourcePartyType;

    @Column(name = "target_party_type")
    private String targetPartyType;

    @Column(name = "other_party_type")
    private String otherPartyType;

    @Column(name = "related_transaction_code")
    private String relatedTransactionCode;

    @Column(name = "cashier_transaction_code")
    private String cashierTransactionCode;

    @Column(name = "fee_payment_codes")
    private String feePaymentCodes;

    @Column(name = "mandatory_docs_codes")
    private String mandatoryDocsCodes;

    @Column(name = "mandatory_scan_outgoing_docs_codes")
    private String mandatoryScanOutgoingDocsCodes;

    @Column(name = "create_mutate_property")
    private String createMutateProperty;

    @Column(name = "referenced_properties")
    private String referencedProperties;

    @Column(name = "prior_required_transactions")
    private String priorRequiredTransactions;

    @Column(name = "create_new_party")
    private String createNewParty;

    @Column(name = "party_business_rules")
    private String partyBusinessRules;

    @Column(name = "report_templates")
    private String reportTemplates;

    @Column(name = "detachable")
    private String detachable;

    @Column(name = "parent_transaction_type")
    private String parentTransactionType;

    @Column(name = "internal_code")
    private String internalCode;

    @Column(name = "version")
    private String version;

    @Column(name = "begin_lifespan_version")
    private String beginLifespanVersion;

    @Column(name = "end_lifespan_version")
    private String endLifespanVersion;

    @Column(name = "tran_index")
    private String tranIndex;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getHjtype() {
        return hjtype;
    }

    public Metadata hjtype(String hjtype) {
        this.hjtype = hjtype;
        return this;
    }

    public void setHjtype(String hjtype) {
        this.hjtype = hjtype;
    }

    public String getCode() {
        return code;
    }

    public Metadata code(String code) {
        this.code = code;
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getLabel() {
        return label;
    }

    public Metadata label(String label) {
        this.label = label;
        return this;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getDescr() {
        return descr;
    }

    public Metadata descr(String descr) {
        this.descr = descr;
        return this;
    }

    public void setDescr(String descr) {
        this.descr = descr;
    }

    public String getCategory() {
        return category;
    }

    public Metadata category(String category) {
        this.category = category;
        return this;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getGeneralTerm() {
        return generalTerm;
    }

    public Metadata generalTerm(String generalTerm) {
        this.generalTerm = generalTerm;
        return this;
    }

    public void setGeneralTerm(String generalTerm) {
        this.generalTerm = generalTerm;
    }

    public String getSortOrder() {
        return sortOrder;
    }

    public Metadata sortOrder(String sortOrder) {
        this.sortOrder = sortOrder;
        return this;
    }

    public void setSortOrder(String sortOrder) {
        this.sortOrder = sortOrder;
    }

    public String getHidden() {
        return hidden;
    }

    public Metadata hidden(String hidden) {
        this.hidden = hidden;
        return this;
    }

    public void setHidden(String hidden) {
        this.hidden = hidden;
    }

    public String getGroupName() {
        return groupName;
    }

    public Metadata groupName(String groupName) {
        this.groupName = groupName;
        return this;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }

    public String getWorkflow() {
        return workflow;
    }

    public Metadata workflow(String workflow) {
        this.workflow = workflow;
        return this;
    }

    public void setWorkflow(String workflow) {
        this.workflow = workflow;
    }

    public String getGroupCode() {
        return groupCode;
    }

    public Metadata groupCode(String groupCode) {
        this.groupCode = groupCode;
        return this;
    }

    public void setGroupCode(String groupCode) {
        this.groupCode = groupCode;
    }

    public String getNormalDuration() {
        return normalDuration;
    }

    public Metadata normalDuration(String normalDuration) {
        this.normalDuration = normalDuration;
        return this;
    }

    public void setNormalDuration(String normalDuration) {
        this.normalDuration = normalDuration;
    }

    public String getLapsedDuration() {
        return lapsedDuration;
    }

    public Metadata lapsedDuration(String lapsedDuration) {
        this.lapsedDuration = lapsedDuration;
        return this;
    }

    public void setLapsedDuration(String lapsedDuration) {
        this.lapsedDuration = lapsedDuration;
    }

    public String getMaxDuration() {
        return maxDuration;
    }

    public Metadata maxDuration(String maxDuration) {
        this.maxDuration = maxDuration;
        return this;
    }

    public void setMaxDuration(String maxDuration) {
        this.maxDuration = maxDuration;
    }

    public String getRightType() {
        return rightType;
    }

    public Metadata rightType(String rightType) {
        this.rightType = rightType;
        return this;
    }

    public void setRightType(String rightType) {
        this.rightType = rightType;
    }

    public String getRightTypeMultiple() {
        return rightTypeMultiple;
    }

    public Metadata rightTypeMultiple(String rightTypeMultiple) {
        this.rightTypeMultiple = rightTypeMultiple;
        return this;
    }

    public void setRightTypeMultiple(String rightTypeMultiple) {
        this.rightTypeMultiple = rightTypeMultiple;
    }

    public String getRightTypeOther() {
        return rightTypeOther;
    }

    public Metadata rightTypeOther(String rightTypeOther) {
        this.rightTypeOther = rightTypeOther;
        return this;
    }

    public void setRightTypeOther(String rightTypeOther) {
        this.rightTypeOther = rightTypeOther;
    }

    public String getCreateNewRrs() {
        return createNewRrs;
    }

    public Metadata createNewRrs(String createNewRrs) {
        this.createNewRrs = createNewRrs;
        return this;
    }

    public void setCreateNewRrs(String createNewRrs) {
        this.createNewRrs = createNewRrs;
    }

    public String getModifyActiveRrrs() {
        return modifyActiveRrrs;
    }

    public Metadata modifyActiveRrrs(String modifyActiveRrrs) {
        this.modifyActiveRrrs = modifyActiveRrrs;
        return this;
    }

    public void setModifyActiveRrrs(String modifyActiveRrrs) {
        this.modifyActiveRrrs = modifyActiveRrrs;
    }

    public String getRelatedActiveRrrs() {
        return relatedActiveRrrs;
    }

    public Metadata relatedActiveRrrs(String relatedActiveRrrs) {
        this.relatedActiveRrrs = relatedActiveRrrs;
        return this;
    }

    public void setRelatedActiveRrrs(String relatedActiveRrrs) {
        this.relatedActiveRrrs = relatedActiveRrrs;
    }

    public String getDischargeActiveRrrs() {
        return dischargeActiveRrrs;
    }

    public Metadata dischargeActiveRrrs(String dischargeActiveRrrs) {
        this.dischargeActiveRrrs = dischargeActiveRrrs;
        return this;
    }

    public void setDischargeActiveRrrs(String dischargeActiveRrrs) {
        this.dischargeActiveRrrs = dischargeActiveRrrs;
    }

    public String getBlockedActiveRrrs() {
        return blockedActiveRrrs;
    }

    public Metadata blockedActiveRrrs(String blockedActiveRrrs) {
        this.blockedActiveRrrs = blockedActiveRrrs;
        return this;
    }

    public void setBlockedActiveRrrs(String blockedActiveRrrs) {
        this.blockedActiveRrrs = blockedActiveRrrs;
    }

    public String getMetaType() {
        return metaType;
    }

    public Metadata metaType(String metaType) {
        this.metaType = metaType;
        return this;
    }

    public void setMetaType(String metaType) {
        this.metaType = metaType;
    }

    public String getSourcePartyType() {
        return sourcePartyType;
    }

    public Metadata sourcePartyType(String sourcePartyType) {
        this.sourcePartyType = sourcePartyType;
        return this;
    }

    public void setSourcePartyType(String sourcePartyType) {
        this.sourcePartyType = sourcePartyType;
    }

    public String getTargetPartyType() {
        return targetPartyType;
    }

    public Metadata targetPartyType(String targetPartyType) {
        this.targetPartyType = targetPartyType;
        return this;
    }

    public void setTargetPartyType(String targetPartyType) {
        this.targetPartyType = targetPartyType;
    }

    public String getOtherPartyType() {
        return otherPartyType;
    }

    public Metadata otherPartyType(String otherPartyType) {
        this.otherPartyType = otherPartyType;
        return this;
    }

    public void setOtherPartyType(String otherPartyType) {
        this.otherPartyType = otherPartyType;
    }

    public String getRelatedTransactionCode() {
        return relatedTransactionCode;
    }

    public Metadata relatedTransactionCode(String relatedTransactionCode) {
        this.relatedTransactionCode = relatedTransactionCode;
        return this;
    }

    public void setRelatedTransactionCode(String relatedTransactionCode) {
        this.relatedTransactionCode = relatedTransactionCode;
    }

    public String getCashierTransactionCode() {
        return cashierTransactionCode;
    }

    public Metadata cashierTransactionCode(String cashierTransactionCode) {
        this.cashierTransactionCode = cashierTransactionCode;
        return this;
    }

    public void setCashierTransactionCode(String cashierTransactionCode) {
        this.cashierTransactionCode = cashierTransactionCode;
    }

    public String getFeePaymentCodes() {
        return feePaymentCodes;
    }

    public Metadata feePaymentCodes(String feePaymentCodes) {
        this.feePaymentCodes = feePaymentCodes;
        return this;
    }

    public void setFeePaymentCodes(String feePaymentCodes) {
        this.feePaymentCodes = feePaymentCodes;
    }

    public String getMandatoryDocsCodes() {
        return mandatoryDocsCodes;
    }

    public Metadata mandatoryDocsCodes(String mandatoryDocsCodes) {
        this.mandatoryDocsCodes = mandatoryDocsCodes;
        return this;
    }

    public void setMandatoryDocsCodes(String mandatoryDocsCodes) {
        this.mandatoryDocsCodes = mandatoryDocsCodes;
    }

    public String getMandatoryScanOutgoingDocsCodes() {
        return mandatoryScanOutgoingDocsCodes;
    }

    public Metadata mandatoryScanOutgoingDocsCodes(String mandatoryScanOutgoingDocsCodes) {
        this.mandatoryScanOutgoingDocsCodes = mandatoryScanOutgoingDocsCodes;
        return this;
    }

    public void setMandatoryScanOutgoingDocsCodes(String mandatoryScanOutgoingDocsCodes) {
        this.mandatoryScanOutgoingDocsCodes = mandatoryScanOutgoingDocsCodes;
    }

    public String getCreateMutateProperty() {
        return createMutateProperty;
    }

    public Metadata createMutateProperty(String createMutateProperty) {
        this.createMutateProperty = createMutateProperty;
        return this;
    }

    public void setCreateMutateProperty(String createMutateProperty) {
        this.createMutateProperty = createMutateProperty;
    }

    public String getReferencedProperties() {
        return referencedProperties;
    }

    public Metadata referencedProperties(String referencedProperties) {
        this.referencedProperties = referencedProperties;
        return this;
    }

    public void setReferencedProperties(String referencedProperties) {
        this.referencedProperties = referencedProperties;
    }

    public String getPriorRequiredTransactions() {
        return priorRequiredTransactions;
    }

    public Metadata priorRequiredTransactions(String priorRequiredTransactions) {
        this.priorRequiredTransactions = priorRequiredTransactions;
        return this;
    }

    public void setPriorRequiredTransactions(String priorRequiredTransactions) {
        this.priorRequiredTransactions = priorRequiredTransactions;
    }

    public String getCreateNewParty() {
        return createNewParty;
    }

    public Metadata createNewParty(String createNewParty) {
        this.createNewParty = createNewParty;
        return this;
    }

    public void setCreateNewParty(String createNewParty) {
        this.createNewParty = createNewParty;
    }

    public String getPartyBusinessRules() {
        return partyBusinessRules;
    }

    public Metadata partyBusinessRules(String partyBusinessRules) {
        this.partyBusinessRules = partyBusinessRules;
        return this;
    }

    public void setPartyBusinessRules(String partyBusinessRules) {
        this.partyBusinessRules = partyBusinessRules;
    }

    public String getReportTemplates() {
        return reportTemplates;
    }

    public Metadata reportTemplates(String reportTemplates) {
        this.reportTemplates = reportTemplates;
        return this;
    }

    public void setReportTemplates(String reportTemplates) {
        this.reportTemplates = reportTemplates;
    }

    public String getDetachable() {
        return detachable;
    }

    public Metadata detachable(String detachable) {
        this.detachable = detachable;
        return this;
    }

    public void setDetachable(String detachable) {
        this.detachable = detachable;
    }

    public String getParentTransactionType() {
        return parentTransactionType;
    }

    public Metadata parentTransactionType(String parentTransactionType) {
        this.parentTransactionType = parentTransactionType;
        return this;
    }

    public void setParentTransactionType(String parentTransactionType) {
        this.parentTransactionType = parentTransactionType;
    }

    public String getInternalCode() {
        return internalCode;
    }

    public Metadata internalCode(String internalCode) {
        this.internalCode = internalCode;
        return this;
    }

    public void setInternalCode(String internalCode) {
        this.internalCode = internalCode;
    }

    public String getVersion() {
        return version;
    }

    public Metadata version(String version) {
        this.version = version;
        return this;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public String getBeginLifespanVersion() {
        return beginLifespanVersion;
    }

    public Metadata beginLifespanVersion(String beginLifespanVersion) {
        this.beginLifespanVersion = beginLifespanVersion;
        return this;
    }

    public void setBeginLifespanVersion(String beginLifespanVersion) {
        this.beginLifespanVersion = beginLifespanVersion;
    }

    public String getEndLifespanVersion() {
        return endLifespanVersion;
    }

    public Metadata endLifespanVersion(String endLifespanVersion) {
        this.endLifespanVersion = endLifespanVersion;
        return this;
    }

    public void setEndLifespanVersion(String endLifespanVersion) {
        this.endLifespanVersion = endLifespanVersion;
    }

    public String getTranIndex() {
        return tranIndex;
    }

    public Metadata tranIndex(String tranIndex) {
        this.tranIndex = tranIndex;
        return this;
    }

    public void setTranIndex(String tranIndex) {
        this.tranIndex = tranIndex;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Metadata)) {
            return false;
        }
        return id != null && id.equals(((Metadata) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Metadata{" +
            "id=" + getId() +
            ", hjtype='" + getHjtype() + "'" +
            ", code='" + getCode() + "'" +
            ", label='" + getLabel() + "'" +
            ", descr='" + getDescr() + "'" +
            ", category='" + getCategory() + "'" +
            ", generalTerm='" + getGeneralTerm() + "'" +
            ", sortOrder='" + getSortOrder() + "'" +
            ", hidden='" + getHidden() + "'" +
            ", groupName='" + getGroupName() + "'" +
            ", workflow='" + getWorkflow() + "'" +
            ", groupCode='" + getGroupCode() + "'" +
            ", normalDuration='" + getNormalDuration() + "'" +
            ", lapsedDuration='" + getLapsedDuration() + "'" +
            ", maxDuration='" + getMaxDuration() + "'" +
            ", rightType='" + getRightType() + "'" +
            ", rightTypeMultiple='" + getRightTypeMultiple() + "'" +
            ", rightTypeOther='" + getRightTypeOther() + "'" +
            ", createNewRrs='" + getCreateNewRrs() + "'" +
            ", modifyActiveRrrs='" + getModifyActiveRrrs() + "'" +
            ", relatedActiveRrrs='" + getRelatedActiveRrrs() + "'" +
            ", dischargeActiveRrrs='" + getDischargeActiveRrrs() + "'" +
            ", blockedActiveRrrs='" + getBlockedActiveRrrs() + "'" +
            ", metaType='" + getMetaType() + "'" +
            ", sourcePartyType='" + getSourcePartyType() + "'" +
            ", targetPartyType='" + getTargetPartyType() + "'" +
            ", otherPartyType='" + getOtherPartyType() + "'" +
            ", relatedTransactionCode='" + getRelatedTransactionCode() + "'" +
            ", cashierTransactionCode='" + getCashierTransactionCode() + "'" +
            ", feePaymentCodes='" + getFeePaymentCodes() + "'" +
            ", mandatoryDocsCodes='" + getMandatoryDocsCodes() + "'" +
            ", mandatoryScanOutgoingDocsCodes='" + getMandatoryScanOutgoingDocsCodes() + "'" +
            ", createMutateProperty='" + getCreateMutateProperty() + "'" +
            ", referencedProperties='" + getReferencedProperties() + "'" +
            ", priorRequiredTransactions='" + getPriorRequiredTransactions() + "'" +
            ", createNewParty='" + getCreateNewParty() + "'" +
            ", partyBusinessRules='" + getPartyBusinessRules() + "'" +
            ", reportTemplates='" + getReportTemplates() + "'" +
            ", detachable='" + getDetachable() + "'" +
            ", parentTransactionType='" + getParentTransactionType() + "'" +
            ", internalCode='" + getInternalCode() + "'" +
            ", version='" + getVersion() + "'" +
            ", beginLifespanVersion='" + getBeginLifespanVersion() + "'" +
            ", endLifespanVersion='" + getEndLifespanVersion() + "'" +
            ", tranIndex='" + getTranIndex() + "'" +
            "}";
    }
}
