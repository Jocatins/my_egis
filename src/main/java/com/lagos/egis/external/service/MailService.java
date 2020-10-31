package com.lagos.egis.external.service;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.lagos.egis.external.domain.User;

import com.lagos.egis.external.domain.ext.MailMessage;
import com.lagos.egis.external.domain.ext.MailReceiver;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.request.HttpRequestWithBody;
import io.github.jhipster.config.JHipsterProperties;

import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Locale;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.MessageSource;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

/**
 * Service for sending emails.
 * <p>
 * We use the {@link Async} annotation to send emails asynchronously.
 */
@Service
public class MailService {

    private final Logger log = LoggerFactory.getLogger(MailService.class);

    private static final String USER = "user";

    private static final String BASE_URL = "baseUrl";

    private final JHipsterProperties jHipsterProperties;

    private final JavaMailSender javaMailSender;

    private final MessageSource messageSource;

    private final SpringTemplateEngine templateEngine;

    public MailService(JHipsterProperties jHipsterProperties, JavaMailSender javaMailSender,
            MessageSource messageSource, SpringTemplateEngine templateEngine) {

        this.jHipsterProperties = jHipsterProperties;
        this.javaMailSender = javaMailSender;
        this.messageSource = messageSource;
        this.templateEngine = templateEngine;
    }

    @Async
    public void sendEmail(String[] to, String subject, String content, boolean isMultipart, boolean isHtml) {
        log.debug("Send email[multipart '{}' and html '{}'] to '{}' with subject '{}' and content={}",
            isMultipart, isHtml, to, subject, content);

        MailMessage mm = new MailMessage();
        List<MailReceiver> receivers = new ArrayList<>();
        for(int i=0; i<to.length; i++){
            MailReceiver re = new MailReceiver();
            re.setEmailAddress(to[i]);
            receivers.add(re);
        }
        receivers.addAll(receivers);
        String contentEncode = Base64.getEncoder().withoutPadding().encodeToString(content.getBytes());
        mm.setBody(contentEncode);
        mm.setSubject(subject);
        mm.setSource("external");
        mm.getReceivers().addAll(receivers);
        GsonBuilder builder = new GsonBuilder();
//        builder.serializeNulls();
        Gson gson = builder.disableHtmlEscaping().create();
        String mail = gson.toJson(mm);

        Unirest.setTimeouts(0, 0);

        try{
            String backoffice_secret = "admin".trim();
            final String userpass = "admin".trim() + ":" +backoffice_secret;
            final String basicAuth = "Basic " + new String(Base64.getEncoder().encode(userpass.getBytes()));

            HttpRequestWithBody requestBody = Unirest.post("http://localhost:8099/api/mail-messages")
                .header("Authorization", basicAuth)
                .header("Content-Type", "application/json");

            requestBody.field("mailMessage", mail);

            Unirest.setTimeouts(0, 0);
            HttpResponse<InputStream> isResponse = Unirest.post("http://localhost:8099/api/mail-messages")
                .header("Content-Type", "application/json")
                .header("Authorization", basicAuth)
                .header("Cookie", "GUEST_LANGUAGE_ID=en_US")
                .body(mail)
                .asBinary();

            String response = IOUtils.toString(isResponse.getBody(), "UTF-8");


            System.out.println(response);
            log.debug("Sent email to User '{}'", to);

        }catch (Exception ex){
            ex.printStackTrace();
        }

    }

    @Async
    public void sendEmailFromTemplate(User user, String templateName, String titleKey) {
        Locale locale = Locale.forLanguageTag(user.getLangKey());
        Context context = new Context(locale);
        context.setVariable(USER, user);
        context.setVariable(BASE_URL, jHipsterProperties.getMail().getBaseUrl());
        String content = templateEngine.process(templateName, context);
        String subject = messageSource.getMessage(titleKey, null, locale);
        String [] tos = new String[1];
        tos[0] = user.getEmail();
        sendEmail(tos, subject, content, false, true);
    }

    @Async
    public void sendActivationEmail(User user) {
        log.debug("Sending activation email to '{}'", user.getEmail());
        sendEmailFromTemplate(user, "mail/activationEmail", "email.activation.title");
    }

    @Async
    public void sendCreationEmail(User user) {
        log.debug("Sending creation email to '{}'", user.getEmail());
        sendEmailFromTemplate(user, "mail/creationEmail", "email.activation.title");
    }

    @Async
    public void sendPasswordResetMail(User user) {
        log.debug("Sending password reset email to '{}'", user.getEmail());
        sendEmailFromTemplate(user, "mail/passwordResetEmail", "email.reset.title");
    }
}
