package com.lagos.egis.external.util;

import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import org.apache.commons.lang.time.DateUtils;
import org.apache.http.client.HttpClient;
import org.apache.http.cookie.Cookie;
import org.apache.http.impl.client.BasicCookieStore;
import org.apache.http.impl.client.HttpClients;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class ManageToken {
    static List<Token> tokens = new ArrayList<>();

    public static String getToken() throws UnirestException {
        String stoken ="";
        if (tokens.size() == 0) {
            for (int i = 0; i < 3; i++) {

                HttpResponse<JsonNode> response = Unirest.post("http://web_app:changeit@localhost:9999/oauth/token")
                    .header("Content-Type", "application/x-www-form-urlencoded")
                    .field("scope", "openid")
                    .field("client_id", "web_app")
                    .field("grant_type", "password")
                    .field("username", "user")
                    .field("password", "user").asJson();

                JsonNode jsonResponse = response.getBody();

                Token token = new Token();
                token.setToken(jsonResponse.getObject().getString("access_token"));
                token.setRefreshToken(jsonResponse.getObject().getString("refresh_token"));
                token.setCreated(new Date());
                tokens.add(token);
            }
            stoken = tokens.get(0).getToken();
        } else {

            for (int i = 0; i < tokens.size(); i++) {
                Token token = tokens.get(i);
                Date newDate = new Date(); ;
                if(DateUtils.addSeconds(token.getCreated(), 299).getTime() > newDate.getTime()){
                    stoken = token.getToken();
                    break;
                }else{
                    JsonNode jsonResponse = Unirest.post("http://web_app:changeit@localhost:9999/oauth/token")
                        .header("Content-Type", "application/x-www-form-urlencoded")
                        .field("scope", "openid")
                        .field("client_id", "web_app")
                        .field("grant_type", "refresh_token")
                        .field("refresh_token", token.getRefreshToken())
                        .asJson()
                        .getBody();

                    token.setToken(jsonResponse.getObject().getString("access_token"));
                    token.setRefreshToken(jsonResponse.getObject().getString("refresh_token"));
                    token.setCreated(new Date());
                    tokens.set(i, token);
                    stoken = token.getToken();
                    break;
                }
            }
        }

        return stoken;
    }


}


class Token {
    String token;
    String refreshToken;
    Date created;
    String csrfToken;

    public Date getCreated() {
        return created;
    }

    public void setCreated(Date created) {
        this.created = created;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getCsrfToken() {
        return csrfToken;
    }

    public void setCsrfToken(String csrfToken) {
        this.csrfToken = csrfToken;
    }
}
