package com.lagos.egis.external.web.rest.ext;

import com.lagos.egis.external.domain.Address;
import com.lagos.egis.external.repository.AddressRepository;
import com.lagos.egis.external.repository.search.AddressSearchRepository;
import com.lagos.egis.external.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.*;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing {@link Address}.
 */
@RestController
@RequestMapping("/api/backoffice")
@Transactional
public class BackOfficeResource {

    private final Logger log = LoggerFactory.getLogger(BackOfficeResource.class);

    @Value("${jhipster.clientApp.name}")
    private String applicationName;


    //transinfo
    @GetMapping("/transinfo")
    public String transinfo(@RequestParam String transCode, @RequestParam String param) throws IOException {

        String resourceUrl = "http://localhost:7777/transinfo/" + transCode +"/" + param;

        StringBuilder sb = new StringBuilder();

        StringBuffer result = new StringBuffer();


        URL url = new URL (resourceUrl );

        URLConnection conn = url.openConnection();

        /*
		String backoffice_account = "test@liferay.com";//PropsUtil.get("backoffice-account");
        String backoffice_secret = "test"; //PropsUtil.get("backoffice-secret");

        String userpass = backoffice_account.trim() + ":" +backoffice_secret;
        String basicAuth = "Basic " + new String(Base64.getEncoder().encode(userpass.getBytes()));
        conn.setRequestProperty ("Authorization", basicAuth);
		*/

        BufferedReader in = new BufferedReader(new InputStreamReader(
            conn.getInputStream()));

        String inputLine;
        while ((inputLine = in.readLine()) != null) {
            result.append(inputLine);
        }

        return result.toString();

    }



    @GetMapping("/transinfoWithGroup")
    public String transinfoWithGroup(@RequestParam String code) throws IOException {
		
		String resourceUrl = "http://localhost:7777/transinfoWithGroup/" + code.toUpperCase();
		
		StringBuilder sb = new StringBuilder();

        StringBuffer result = new StringBuffer();


        URL url = new URL (resourceUrl );

        URLConnection conn = url.openConnection();

        /*
		String backoffice_account = "test@liferay.com";//PropsUtil.get("backoffice-account");
        String backoffice_secret = "test"; //PropsUtil.get("backoffice-secret");

        String userpass = backoffice_account.trim() + ":" +backoffice_secret;
        String basicAuth = "Basic " + new String(Base64.getEncoder().encode(userpass.getBytes()));
        conn.setRequestProperty ("Authorization", basicAuth);
		*/

        BufferedReader in = new BufferedReader(new InputStreamReader(
            conn.getInputStream()));

        String inputLine;
        while ((inputLine = in.readLine()) != null) {
            result.append(inputLine);
        }

        return result.toString();
        
    }


    @GetMapping("/transmetadata")
    public String getTransmetadata(@RequestParam String code) throws IOException {

        String backoffice_service_url = ""; //PropsUtil.get("backoffice-service-url");

        StringBuilder sb = new StringBuilder();

        StringBuffer result = new StringBuffer();


        URL url = new URL("http://localhost:8060/api/jsonws/AumentumServices-portlet.calls/list-transaction-metada/code/"+ code.toUpperCase() );

        URLConnection conn = url.openConnection();

        String backoffice_account = "test@liferay.com";//PropsUtil.get("backoffice-account");
        String backoffice_secret = "test"; //PropsUtil.get("backoffice-secret");

        String userpass = backoffice_account.trim() + ":" +backoffice_secret;
        String basicAuth = "Basic " + new String(Base64.getEncoder().encode(userpass.getBytes()));
        conn.setRequestProperty ("Authorization", basicAuth);

        BufferedReader in = new BufferedReader(new InputStreamReader(
            conn.getInputStream()));

        String inputLine;
        while ((inputLine = in.readLine()) != null) {
            result.append(inputLine);
        }

       // return "{\"metadata\": \"{\\\"@class\\\":\\\"com.landsystems.lrs.model.TransactionMetaData\\\",\\\"id\\\":4,\\\"code\\\":\\\"AOSL\\\",\\\"label\\\":\\\"Allocation of State Land\\\",\\\"descr\\\":\\\"Allocation of State Land\\\",\\\"category\\\":\\\"transaction_type\\\",\\\"general_term\\\":true,\\\"sort_order\\\":0,\\\"hidden\\\":false,\\\"bootstrap\\\":null,\\\"groupName\\\":\\\"First Registration\\\",\\\"workflow\\\":\\\"LUAC Allocation of State Land\\\",\\\"groupCode\\\":\\\"FRG\\\",\\\"normalDuration\\\":20,\\\"lapsedDuration\\\":0,\\\"maxDuration\\\":20,\\\"rightType\\\":\\\"right_type_none\\\",\\\"rightTypeMultiple\\\":null,\\\"rightTypeOther\\\":null,\\\"createNewRRRs\\\":\\\"right_type_occupancy\\\",\\\"modifyActiveRRRs\\\":\\\"\\\",\\\"relatedActiveRRRs\\\":\\\"right_type_none\\\",\\\"dischargeActiveRRRs\\\":\\\"\\\",\\\"blockedByActiveRRRs\\\":\\\"\\\",\\\"metaType\\\":0,\\\"sourcePartyType\\\":\\\"lr_grantor\\\",\\\"targetPartyType\\\":\\\"lr_grantee\\\",\\\"otherPartyType\\\":null,\\\"relatedTransactionCode\\\":\\\"\\\",\\\"cashierTransactionCode\\\":\\\"ft_application_form_C_APFF;ft_annual_ground_rent_C_AGR;ft_premium_C_PRE;ft_development_charges_C_DC;ft_stamp_duty_C_SD;ft_administrative_charges_C_AC;ft_registration_conveyance_C_RCF;ft_survey_fee_C_SVF;ft_capital_development_levy_C_CDLF\\\",\\\"feePaymentCodes\\\":\\\"ft_personal_income_tax_C_PIT\\\",\\\"mandatoryDocsCodes\\\":\\\"\\\",\\\"mandatoryScanOutgoingDocsCodes\\\":\\\"dt_form_payment_receipt|af*;dt_form_payment_receipt|af*;dt_photograph|2*;dt_certificate_incorporation*;dt_form|2*\\\",\\\"createMutateProperty\\\":\\\"101\\\",\\\"referencedProperties\\\":\\\"201\\\",\\\"priorRequiredTransactions\\\":\\\"\\\",\\\"createNewParty\\\":true,\\\"partyBusinessRules\\\":null,\\\"reportTemplates\\\":null,\\\"detachable\\\":true,\\\"parentTransactionType\\\":null,\\\"subTransactionTypes\\\":[],\\\"internalCode\\\":\\\"201\\\",\\\"version\\\":1,\\\"beginLifespanVersion\\\":\\\"2019-08-17T21:12:22.030\\\",\\\"endLifespanVersion\\\":null}\",\"responseCode\": \"000\"}";

        return result.toString();
    }


    @GetMapping("/fetchDictionaryValuesObj")
    public String fetchDictionaryValuesObj(@RequestParam String category) throws IOException {

        String backoffice_service_url = ""; //PropsUtil.get("backoffice-service-url");

        StringBuilder sb = new StringBuilder();

        StringBuffer result = new StringBuffer();

        URL url = new URL("http://localhost:8060/api/jsonws/AumentumServices-portlet.calls/fetch-dictionary-values-obj/category/"+ category );

        URLConnection conn = url.openConnection();

        String backoffice_account = "test@liferay.com";//PropsUtil.get("backoffice-account");
        String backoffice_secret = "test"; //PropsUtil.get("backoffice-secret");

        String userpass = backoffice_account.trim() + ":" +backoffice_secret;
        String basicAuth = "Basic " + new String(Base64.getEncoder().encode(userpass.getBytes()));
        conn.setRequestProperty ("Authorization", basicAuth);

        BufferedReader in = new BufferedReader(new InputStreamReader(
            conn.getInputStream()));

        String inputLine;
        while ((inputLine = in.readLine()) != null) {
            result.append(inputLine);
        }
        return result.toString();
    }
}
