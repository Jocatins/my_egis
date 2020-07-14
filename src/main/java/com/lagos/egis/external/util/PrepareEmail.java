package com.lagos.egis.external.service.ext;

import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;

public class PrepareEmail {

    public static void sendEmail() throws UnirestException {

        JsonNode jsonResponse = Unirest.post("http://web_app:changeit@localhost:9999/oauth/token")
            .header("Content-Type", "application/json")
            .field("scope", "openid")
            .field("client_id", "web_app")
            .field("grant_type", "password")
            .field("username", "user")
            .field("password", "user")
            .asJson()
            .getBody();

        System.out.println(jsonResponse);
    }
}
