package com.lagos.egis.external.util;

import org.apache.commons.io.IOUtils;
import org.apache.http.Header;
import org.apache.http.HttpHost;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClientBuilder;


import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.Base64;

public class OAuthClient {

    private String tokenEndpoint = "http://web_app:changeit@localhost:9999/oauth/token";
    private String client_id = "web_app";
    private String client_secret = "changeit";
    private String grant_type = "password";
    private String scope = "openid";

    public String callService() {

        /* HTTPCLIENT AND HTTPPOST OOBJECT */
        HttpClient httpClient = HttpClientBuilder.create().build();
        HttpPost httpPost = new HttpPost(tokenEndpoint);

        /* AUTHENTICATION CREDENTIALS ENCODING */
        String base64Credentials = Base64.getEncoder().encodeToString((  "user:user"
            ).getBytes());

        /* HEADER INFO */
        //httpPost.addHeader("Authorization", "Basic " + base64Credentials);
        httpPost.addHeader("Content-Type", "application/x-www-form-urlencoded");

        /* PROXY CONFIG */
//        HttpHost target = new HttpHost("proxy", 9999, "http");
//        RequestConfig config = RequestConfig.custom().setProxy(target).build();
//        httpPost.setConfig(config);

        /* OAUTH PARAMETERS ADDED TO BODY */
        StringEntity input = null;
        try {
            input = new StringEntity("username=user" +  "&password=user"  + "&grant_type=" + grant_type + "&scope=" + scope);
            httpPost.setEntity(input);
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }

        /* SEND AND RETRIEVE RESPONSE */
        HttpResponse response = null;
        try {
            response = httpClient.execute(httpPost);
        } catch (IOException e) {
            e.printStackTrace();
        }

        /* RESPONSE AS STRING */
        String result = null;
        try {
            result = IOUtils.toString(response.getEntity().getContent(), "UTF-8");
        } catch (IOException e) {
            e.printStackTrace();
        }
        Header[] cookies = response.getHeaders("Set-Cookie");

        return result;
    }

    public static void main(String[] args) {
        OAuthClient oauthClient = new OAuthClient();
        String res = oauthClient.callService();
        System.out.println(res);
    }
}
