package com.lagos.egis.external.domain.ext;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.io.Serializable;
import java.time.Instant;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * A MailMessage.
 */
public class MailMessage  {

    private Long id;

    private String source;

    private String subject;


    private String body;

    private Instant sentDate;

    private List<MailReceiver> receivers = new ArrayList<>();

    private List<MailAttachment> mailAttachments = new ArrayList<>();

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public Instant getSentDate() {
        return sentDate;
    }

    public void setSentDate(Instant sentDate) {
        this.sentDate = sentDate;
    }

    public List<MailReceiver> getReceivers() {
        return receivers;
    }

    public void setReceivers(List<MailReceiver> receivers) {
        this.receivers = receivers;
    }

    public List<MailAttachment> getMailAttachments() {
        return mailAttachments;
    }

    public void setMailAttachments(List<MailAttachment> mailAttachments) {
        this.mailAttachments = mailAttachments;
    }
}
