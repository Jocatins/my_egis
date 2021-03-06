package com.lagos.egis.external.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import org.hibernate.cache.jcache.ConfigSettings;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.boot.autoconfigure.orm.jpa.HibernatePropertiesCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache = jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public HibernatePropertiesCustomizer hibernatePropertiesCustomizer(javax.cache.CacheManager cacheManager) {
        return hibernateProperties -> hibernateProperties.put(ConfigSettings.CACHE_MANAGER, cacheManager);
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            createCache(cm, com.lagos.egis.external.repository.UserRepository.USERS_BY_LOGIN_CACHE);
            createCache(cm, com.lagos.egis.external.repository.UserRepository.USERS_BY_EMAIL_CACHE);
            createCache(cm, com.lagos.egis.external.domain.User.class.getName());
            createCache(cm, com.lagos.egis.external.domain.Authority.class.getName());
            createCache(cm, com.lagos.egis.external.domain.User.class.getName() + ".authorities");
            createCache(cm, com.lagos.egis.external.domain.Batch.class.getName());
            createCache(cm, com.lagos.egis.external.domain.Batch.class.getName() + ".transactions");
            createCache(cm, com.lagos.egis.external.domain.Batch.class.getName() + ".parties");
            createCache(cm, com.lagos.egis.external.domain.Transaction.class.getName());
            createCache(cm, com.lagos.egis.external.domain.Transaction.class.getName() + ".parties");
            createCache(cm, com.lagos.egis.external.domain.Transaction.class.getName() + ".parcels");
            createCache(cm, com.lagos.egis.external.domain.Transaction.class.getName() + ".docs");
            createCache(cm, com.lagos.egis.external.domain.Transaction.class.getName() + ".batches");
            createCache(cm, com.lagos.egis.external.domain.TransactionExt.class.getName());
            createCache(cm, com.lagos.egis.external.domain.SupportingDocument.class.getName());
            createCache(cm, com.lagos.egis.external.domain.SupportingDocument.class.getName() + ".transactions");
            createCache(cm, com.lagos.egis.external.domain.Party.class.getName());
            createCache(cm, com.lagos.egis.external.domain.Party.class.getName() + ".batches");
            createCache(cm, com.lagos.egis.external.domain.Party.class.getName() + ".transactions");
            createCache(cm, com.lagos.egis.external.domain.Parcel.class.getName());
            createCache(cm, com.lagos.egis.external.domain.Parcel.class.getName() + ".transactions");
            createCache(cm, com.lagos.egis.external.domain.UserExt.class.getName());
            createCache(cm, com.lagos.egis.external.domain.Surveyor.class.getName());
            createCache(cm, com.lagos.egis.external.domain.SurveyTransaction.class.getName());
            createCache(cm, com.lagos.egis.external.domain.Dictionary.class.getName());
            createCache(cm, com.lagos.egis.external.domain.Metadata.class.getName());
            createCache(cm, com.lagos.egis.external.domain.Surveyor.class.getName() + ".yearSubscriptions");
            createCache(cm, com.lagos.egis.external.domain.EscalateContact.class.getName());
            createCache(cm, com.lagos.egis.external.domain.Escalation.class.getName());
            createCache(cm, com.lagos.egis.external.domain.YearSubscription.class.getName());
            createCache(cm, com.lagos.egis.external.domain.YearSubscription.class.getName() + ".surveyors");
            createCache(cm, com.lagos.egis.external.domain.YearSubscription.class.getName() + ".subscriptionDocs");
            createCache(cm, com.lagos.egis.external.domain.SubscriptionDocs.class.getName());
            createCache(cm, com.lagos.egis.external.domain.SubscriptionDocs.class.getName() + ".yearSubscriptions");
            // jhipster-needle-ehcache-add-entry
        };
    }

    private void createCache(javax.cache.CacheManager cm, String cacheName) {
        javax.cache.Cache<Object, Object> cache = cm.getCache(cacheName);
        if (cache != null) {
            cm.destroyCache(cacheName);
        }
        cm.createCache(cacheName, jcacheConfiguration);
    }

}
