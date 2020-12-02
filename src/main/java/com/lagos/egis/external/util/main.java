package com.lagos.egis.external.util;

import com.mashape.unirest.http.*;
import com.mashape.unirest.request.HttpRequestWithBody;
import org.apache.http.cookie.Cookie;
import org.apache.http.impl.client.BasicCookieStore;

import java.io.*;
import java.net.URLEncoder;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

public class main {
    public static void main(String []args) throws Exception{
//
//        Unirest.setTimeouts(0, 0);
//        HttpResponse<JsonNode> response = Unirest.post("http://web_app:changeit@localhost:9999/oauth/token?username=user&password=user&grant_type=password&scope=openid")
//            .asJson();
//
//
//        HttpResponse<String> response1 = Unirest.post("http://172.25.48.1:9090/services/backoffice/api/aumentum/service/pushTransaction")
//            .header("Authorization", "Bearer "+ response.getBody().getObject().getString("access_token"))
//            .field("sbatch", "gfhdhff")
//            .asString();

        Unirest.setTimeouts(0, 0);
        HttpResponse<JsonNode> response = Unirest.post("http://LagosEgis:LagosIsFunPlaceToBe@197.253.22.83:9999/oauth/token?username=abclagos&password=abclagos&grant_type=password&scope=openid")
            .asJson();
        if(response.getStatusText().equalsIgnoreCase("UnAuthorized")){
            return ;
        }


        String message = "{\"BillRef\": \"INV0000000002-5\", \"Amount\": \"85000\", \"PaymentRef\": \"42185061/GWJQZSFN\", \"TransactionDate\": \"2019-07-02 06:01:00\" }";
        HttpResponse<String> response1 = Unirest.post("http://197.253.22.83:9090/services/adhoccbs/api/bills/paymentPushNotificationABC?payload="+URLEncoder.encode(message))
            .header("Authorization", "Bearer " + response.getBody().getObject().getString("access_token")).asString()
            //.field("payload", message).asString()
            ;

        System.out.println(response1.getBody());

    }
}
