package com.lagos.egis.external.util;

import com.mashape.unirest.http.*;
import org.apache.http.cookie.Cookie;
import org.apache.http.impl.client.BasicCookieStore;

import java.io.*;
import java.util.List;

public class main {
    public static void main(String []args) throws Exception{

        Unirest.setTimeouts(0, 0);
        HttpResponse<JsonNode> response = Unirest.post("http://web_app:changeit@localhost:9999/oauth/token?username=user&password=user&grant_type=password&scope=openid")
            .asJson();


        HttpResponse<String> response1 = Unirest.post("http://172.25.48.1:9090/services/backoffice/api/aumentum/service/pushTransaction")
            .header("Authorization", "Bearer "+ response.getBody().getObject().getString("access_token"))
            .field("sbatch", "gfhdhff")
            .asString();

        System.out.println(response1.getBody());
    }
}
