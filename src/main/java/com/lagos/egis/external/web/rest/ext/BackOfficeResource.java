package com.lagos.egis.external.web.rest.ext;


import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;


import java.net.*;
import java.nio.charset.StandardCharsets;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.util.Base64;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Optional;
import com.lagos.egis.external.domain.Batch;
import com.lagos.egis.external.repository.BatchRepository;
import com.lagos.egis.external.web.rest.errors.BadRequestAlertException;
import com.lagos.egis.external.web.rest.ext.util.GzipUtil;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import com.mashape.unirest.request.HttpRequestWithBody;
/**
 * REST controller for managing {@link Address}.
 */
@RestController
@RequestMapping("/api/backoffice")
@Transactional
public class BackOfficeResource {

    private final Logger log = LoggerFactory.getLogger(BackOfficeResource.class);

    private final String AUMENTUM_SERVICE_CALL ="http://localhost:8060/api/jsonws/AumentumServices-portlet.calls";
    private final String FORM_SERVICE_CALL ="http://localhost:7777";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;
    private final BatchRepository batchRepository;

    public BackOfficeResource(final BatchRepository batchRepository){
        this.batchRepository = batchRepository;
    }

    @GetMapping("/filedownload")
    public ResponseEntity  filedownloadForm(
        @RequestParam final String transCode, @RequestParam final String param) throws IOException
    {
        final String resourceUrl = "http://localhost:7777/forms/filedownload?sheetName=" + transCode +"&complexParams=" + param;
        final StringBuffer result = new StringBuffer();
        final URL url = new URL (resourceUrl );
        final URLConnection conn = url.openConnection();
        final BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        return ResponseEntity.ok().header(HttpHeaders.CONTENT_TYPE, "application/pdf").body(in);
//        String inputLine;
//        while ((inputLine = in.readLine()) != null) {
//            result.append(inputLine);
//        }
//        return result.toString();
    }

    //http://localhost:7777/forms/download?sheetName=AOSL&complexParams=LA_APPLICATION_TYPE^Individual|LA_AGENT^true|USR_MULTIPARTY_INDIVIDUAL_COUNT^2|USR_MULTIPARTY_ORGANISATION_COUNT^2
    @GetMapping("/download")
    public String downloadForm(
        @RequestParam final String transCode, @RequestParam final String param) throws IOException
    {
        final String resourceUrl = "http://localhost:7777/forms/download?sheetName=" + transCode +"&complexParams=" + param;
        final StringBuffer result = new StringBuffer();
        final URL url = new URL (resourceUrl );
        final URLConnection conn = url.openConnection();
        final BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        String inputLine;
        while ((inputLine = in.readLine()) != null) {
            result.append(inputLine);
        }
        return result.toString();
    }

    @GetMapping("/downloadWithMore")
    public String downloadWithMore(
        @RequestParam final String transCode,
        @RequestParam final String laApplication,
        @RequestParam final String laAgent,
        @RequestParam final Integer usrMultiInd,
        @RequestParam final Integer usrMutliOrg
        ) throws IOException
    {
        //?sheetName=AOSL&laApplication=Individual&laAgent=true&usrMultiInd=2&usrMutliOrg=2
        final String resourceUrl = "http://localhost:7777/forms/downloadWithMore?sheetName=" + transCode +
            "&laApplication=" + laApplication +
            "&laAgent=" + laAgent +"&usrMultiInd=" + usrMultiInd +
            "&usrMutliOrg=" + usrMutliOrg;
        final StringBuffer result = new StringBuffer();
        final URL url = new URL (resourceUrl );
        final URLConnection conn = url.openConnection();
        final BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        String inputLine;
        while ((inputLine = in.readLine()) != null) {
            result.append(inputLine);
        }
        return result.toString();
    }
    //transinfo
    @GetMapping("/transinfo")
    public String transinfo(@RequestParam final String transCode, @RequestParam final String param) throws IOException {

        final String resourceUrl = "http://localhost:7777/transinfo/" + transCode +"/" + param;
        final StringBuffer result = new StringBuffer();
        final URL url = new URL (resourceUrl );
        final URLConnection conn = url.openConnection();
        final BufferedReader in = new BufferedReader(new InputStreamReader(
            conn.getInputStream()));

        String inputLine;
        while ((inputLine = in.readLine()) != null) {
            result.append(inputLine);
        }

        return result.toString();

    }



    @GetMapping("/transinfoWithGroup")
    public String transinfoWithGroup(@RequestParam final String group) throws IOException {

		final String resourceUrl = "http://localhost:7777/transinfoWithGroup/" + group.toUpperCase();

		final StringBuilder sb = new StringBuilder();

        final StringBuffer result = new StringBuffer();


        final URL url = new URL (resourceUrl );

        final URLConnection conn = url.openConnection();
        final BufferedReader in = new BufferedReader(new InputStreamReader(
            conn.getInputStream()));

        String inputLine;
        while ((inputLine = in.readLine()) != null) {
            result.append(inputLine);
        }

        return result.toString();

    }


    @GetMapping("/getMandatorySupportDocs")
    public String getMandatorySupportDocs(@RequestParam final String code) throws IOException {

		final String resourceUrl = "http://localhost:7777/trans_document/" + code.toUpperCase();

		final StringBuilder sb = new StringBuilder();

        final StringBuffer result = new StringBuffer();


        final URL url = new URL (resourceUrl );

        final URLConnection conn = url.openConnection();
        final BufferedReader in = new BufferedReader(new InputStreamReader(
            conn.getInputStream()));

        String inputLine;
        while ((inputLine = in.readLine()) != null) {
            result.append(inputLine);
        }

        return result.toString();

    }



    @GetMapping("/transmetadata")
    public String getTransmetadata(@RequestParam final String code) throws IOException {

        final String backoffice_service_url = ""; //PropsUtil.get("backoffice-service-url");

        final StringBuilder sb = new StringBuilder();

        final StringBuffer result = new StringBuffer();


        final URL url = new URL(AUMENTUM_SERVICE_CALL +"/list-transaction-metada/code/"+ code.toUpperCase() );

        final URLConnection conn = url.openConnection();

        final String backoffice_account = "test@liferay.com";//PropsUtil.get("backoffice-account");
        final String backoffice_secret = "test"; //PropsUtil.get("backoffice-secret");

        final String userpass = backoffice_account.trim() + ":" +backoffice_secret;
        final String basicAuth = "Basic " + new String(Base64.getEncoder().encode(userpass.getBytes()));
        conn.setRequestProperty ("Authorization", basicAuth);

        final BufferedReader in = new BufferedReader(new InputStreamReader(
            conn.getInputStream()));

        String inputLine;
        while ((inputLine = in.readLine()) != null) {
            result.append(inputLine);
        }

       // return "{\"metadata\": \"{\\\"@class\\\":\\\"com.landsystems.lrs.model.TransactionMetaData\\\",\\\"id\\\":4,\\\"code\\\":\\\"AOSL\\\",\\\"label\\\":\\\"Allocation of State Land\\\",\\\"descr\\\":\\\"Allocation of State Land\\\",\\\"category\\\":\\\"transaction_type\\\",\\\"general_term\\\":true,\\\"sort_order\\\":0,\\\"hidden\\\":false,\\\"bootstrap\\\":null,\\\"groupName\\\":\\\"First Registration\\\",\\\"workflow\\\":\\\"LUAC Allocation of State Land\\\",\\\"groupCode\\\":\\\"FRG\\\",\\\"normalDuration\\\":20,\\\"lapsedDuration\\\":0,\\\"maxDuration\\\":20,\\\"rightType\\\":\\\"right_type_none\\\",\\\"rightTypeMultiple\\\":null,\\\"rightTypeOther\\\":null,\\\"createNewRRRs\\\":\\\"right_type_occupancy\\\",\\\"modifyActiveRRRs\\\":\\\"\\\",\\\"relatedActiveRRRs\\\":\\\"right_type_none\\\",\\\"dischargeActiveRRRs\\\":\\\"\\\",\\\"blockedByActiveRRRs\\\":\\\"\\\",\\\"metaType\\\":0,\\\"sourcePartyType\\\":\\\"lr_grantor\\\",\\\"targetPartyType\\\":\\\"lr_grantee\\\",\\\"otherPartyType\\\":null,\\\"relatedTransactionCode\\\":\\\"\\\",\\\"cashierTransactionCode\\\":\\\"ft_application_form_C_APFF;ft_annual_ground_rent_C_AGR;ft_premium_C_PRE;ft_development_charges_C_DC;ft_stamp_duty_C_SD;ft_administrative_charges_C_AC;ft_registration_conveyance_C_RCF;ft_survey_fee_C_SVF;ft_capital_development_levy_C_CDLF\\\",\\\"feePaymentCodes\\\":\\\"ft_personal_income_tax_C_PIT\\\",\\\"mandatoryDocsCodes\\\":\\\"\\\",\\\"mandatoryScanOutgoingDocsCodes\\\":\\\"dt_form_payment_receipt|af*;dt_form_payment_receipt|af*;dt_photograph|2*;dt_certificate_incorporation*;dt_form|2*\\\",\\\"createMutateProperty\\\":\\\"101\\\",\\\"referencedProperties\\\":\\\"201\\\",\\\"priorRequiredTransactions\\\":\\\"\\\",\\\"createNewParty\\\":true,\\\"partyBusinessRules\\\":null,\\\"reportTemplates\\\":null,\\\"detachable\\\":true,\\\"parentTransactionType\\\":null,\\\"subTransactionTypes\\\":[],\\\"internalCode\\\":\\\"201\\\",\\\"version\\\":1,\\\"beginLifespanVersion\\\":\\\"2019-08-17T21:12:22.030\\\",\\\"endLifespanVersion\\\":null}\",\"responseCode\": \"000\"}";

        return result.toString();
    }


    @GetMapping("/fetchDictionaryValuesObj")
    public String fetchDictionaryValuesObj(@RequestParam final String category) throws IOException {

        final String backoffice_service_url = ""; //PropsUtil.get("backoffice-service-url");

        final StringBuilder sb = new StringBuilder();

        final StringBuffer result = new StringBuffer();

        final URL url = new URL(AUMENTUM_SERVICE_CALL +"/fetch-dictionary-values-obj/category/"+ category );

        final URLConnection conn = url.openConnection();

        final String backoffice_account = "test@liferay.com";//PropsUtil.get("backoffice-account");
        final String backoffice_secret = "test"; //PropsUtil.get("backoffice-secret");

        final String userpass = backoffice_account.trim() + ":" +backoffice_secret;
        final String basicAuth = "Basic " + new String(Base64.getEncoder().encode(userpass.getBytes()));
        conn.setRequestProperty ("Authorization", basicAuth);

        final BufferedReader in = new BufferedReader(new InputStreamReader(
            conn.getInputStream()));

        String inputLine;
        while ((inputLine = in.readLine()) != null) {
            result.append(inputLine);
        }
        return result.toString();
    }

    /**
     * {@code POST  /batches} : Create a new batch.
     *
     * @param batch the batch to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new batch, or with status {@code 400 (Bad Request)} if the batch has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/pushTransaction")
    public  String pushTransaction(@RequestBody final String sBatch) throws URISyntaxException, Exception {
        log.debug("REST pushing Batch : {}", sBatch);
        if (sBatch == null) {
            throw new BadRequestAlertException("A new batch cannot already have an ID", "", "idexists");
        }

        Map <String, String> map = new HashMap<String, String>();

        byte[]   bytesEncoded = Base64.getEncoder().encode(GzipUtil.zip(sBatch));
        String compressed = new String(bytesEncoded);
        map.put("batch", compressed);
        return fetchUrlContentDirectREST("/pushTransaction", map);

    }


    public String fetchUrlContentDirectREST(final String resource_url, final Map<String,
    String> query) throws UnirestException, IOException{
        Unirest.setTimeouts(0, 0);

        final String backoffice_account = "test@liferay.com";//PropsUtil.get("backoffice-account");
        final String backoffice_secret = "test"; //PropsUtil.get("backoffice-secret");

        final String userpass = backoffice_account.trim() + ":" +backoffice_secret;
        final String basicAuth = "Basic " + new String(Base64.getEncoder().encode(userpass.getBytes()));

        HttpRequestWithBody requestBody = Unirest.post("http://localhost:8060/api/jsonws/AumentumServices-portlet.calls/pushTransaction")
        .header("Authorization", basicAuth)
        .header("Content-Type", "application/x-www-form-urlencoded");

        // .header("Cookie", "GUEST_LANGUAGE_ID=en_US; JSESSIONID=1E79752588666F38D404DA0F8AEB3242");

        Iterator<Map.Entry<String, String>> iterator = query.entrySet().iterator();
        while (iterator.hasNext()) {
            Map.Entry<String, String> entry = iterator.next();
            requestBody.field(entry.getKey(), entry.getValue());
        }
        HttpResponse<InputStream> isResponse = requestBody.asBinary();

        String response = IOUtils.toString(isResponse.getBody(), "UTF-8");

        return response;
    }

    public String fetchUrlContentDirectRESTOLD(final String resource_url, final String query,
       final String endpoint, final String requestMethod, final String serverType){
		try{

            //String token = jsonRESTLogin();

            URL url = null;
            String api_address = "";
            HttpURLConnection conn = null;
            if (serverType.equalsIgnoreCase("FormServer")){
                api_address = FORM_SERVICE_CALL;
                System.out.println(api_address + resource_url);
                url = new URL (api_address + resource_url  );
                conn = (HttpURLConnection) url.openConnection();
            }else{
                final String backoffice_account = "test@liferay.com";//PropsUtil.get("backoffice-account");
                final String backoffice_secret = "test"; //PropsUtil.get("backoffice-secret");

                final String userpass = backoffice_account.trim() + ":" +backoffice_secret;
                final String basicAuth = "Basic " + new String(Base64.getEncoder().encode(userpass.getBytes()));

                api_address = AUMENTUM_SERVICE_CALL;
                url = new URL (api_address + resource_url  );
                conn = (HttpURLConnection) url.openConnection();
                conn.setRequestProperty ("Authorization", basicAuth);
            }
			conn.setDoOutput(true);
			conn.setRequestMethod(requestMethod);

			if (requestMethod.equalsIgnoreCase("POST")){
                final OutputStream os = conn.getOutputStream();
                os.write(query.getBytes());
                os.flush();
            }


			if (conn.getResponseCode() != HttpURLConnection.HTTP_OK) {
				System.out.println("Problem with the request " +url.toString() +
						+ conn.getResponseCode() +">>" + conn.getResponseMessage());			}
			final BufferedReader br = new BufferedReader(new InputStreamReader(
					(conn.getInputStream())));
			String output;
			final StringBuilder response = new StringBuilder();
			while ((output = br.readLine()) != null) {
				response.append(output);
			}
			conn.disconnect();

			return  response.toString();
		} catch (final Exception ex) {
			System.out.println(ex.getMessage());
			System.out.println(ex);
		}
		return null;
	}
}
