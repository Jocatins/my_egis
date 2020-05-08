import _root_.io.gatling.core.scenario.Simulation
import ch.qos.logback.classic.{Level, LoggerContext}
import io.gatling.core.Predef._
import io.gatling.http.Predef._
import org.slf4j.LoggerFactory

import scala.concurrent.duration._

/**
 * Performance test for the Metadata entity.
 */
class MetadataGatlingTest extends Simulation {

    val context: LoggerContext = LoggerFactory.getILoggerFactory.asInstanceOf[LoggerContext]
    // Log all HTTP requests
    //context.getLogger("io.gatling.http").setLevel(Level.valueOf("TRACE"))
    // Log failed HTTP requests
    //context.getLogger("io.gatling.http").setLevel(Level.valueOf("DEBUG"))

    val baseURL = Option(System.getProperty("baseURL")) getOrElse """http://localhost:8080"""

    val httpConf = http
        .baseUrl(baseURL)
        .inferHtmlResources()
        .acceptHeader("*/*")
        .acceptEncodingHeader("gzip, deflate")
        .acceptLanguageHeader("fr,fr-fr;q=0.8,en-us;q=0.5,en;q=0.3")
        .connectionHeader("keep-alive")
        .userAgentHeader("Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:33.0) Gecko/20100101 Firefox/33.0")
        .silentResources // Silence all resources like css or css so they don't clutter the results

    val headers_http = Map(
        "Accept" -> """application/json"""
    )

    val headers_http_authentication = Map(
        "Content-Type" -> """application/json""",
        "Accept" -> """application/json"""
    )

    val headers_http_authenticated = Map(
        "Accept" -> """application/json""",
        "Authorization" -> "${access_token}"
    )

    val scn = scenario("Test the Metadata entity")
        .exec(http("First unauthenticated request")
        .get("/api/account")
        .headers(headers_http)
        .check(status.is(401))
        ).exitHereIfFailed
        .pause(10)
        .exec(http("Authentication")
        .post("/api/authenticate")
        .headers(headers_http_authentication)
        .body(StringBody("""{"username":"admin", "password":"admin"}""")).asJson
        .check(header("Authorization").saveAs("access_token"))).exitHereIfFailed
        .pause(2)
        .exec(http("Authenticated request")
        .get("/api/account")
        .headers(headers_http_authenticated)
        .check(status.is(200)))
        .pause(10)
        .repeat(2) {
            exec(http("Get all metadata")
            .get("/api/metadata")
            .headers(headers_http_authenticated)
            .check(status.is(200)))
            .pause(10 seconds, 20 seconds)
            .exec(http("Create new metadata")
            .post("/api/metadata")
            .headers(headers_http_authenticated)
            .body(StringBody("""{
                "id":null
                , "hjtype":"SAMPLE_TEXT"
                , "code":"SAMPLE_TEXT"
                , "label":"SAMPLE_TEXT"
                , "descr":"SAMPLE_TEXT"
                , "category":"SAMPLE_TEXT"
                , "generalTerm":"SAMPLE_TEXT"
                , "sortOrder":"SAMPLE_TEXT"
                , "hidden":"SAMPLE_TEXT"
                , "groupName":"SAMPLE_TEXT"
                , "workflow":"SAMPLE_TEXT"
                , "groupCode":"SAMPLE_TEXT"
                , "normalDuration":"SAMPLE_TEXT"
                , "lapsedDuration":"SAMPLE_TEXT"
                , "maxDuration":"SAMPLE_TEXT"
                , "rightType":"SAMPLE_TEXT"
                , "rightTypeMultiple":"SAMPLE_TEXT"
                , "rightTypeOther":"SAMPLE_TEXT"
                , "createNewRrs":"SAMPLE_TEXT"
                , "modifyActiveRrrs":"SAMPLE_TEXT"
                , "relatedActiveRrrs":"SAMPLE_TEXT"
                , "dischargeActiveRrrs":"SAMPLE_TEXT"
                , "blockedActiveRrrs":"SAMPLE_TEXT"
                , "metaType":"SAMPLE_TEXT"
                , "sourcePartyType":"SAMPLE_TEXT"
                , "targetPartyType":"SAMPLE_TEXT"
                , "otherPartyType":"SAMPLE_TEXT"
                , "relatedTransactionCode":"SAMPLE_TEXT"
                , "cashierTransactionCode":"SAMPLE_TEXT"
                , "feePaymentCodes":"SAMPLE_TEXT"
                , "mandatoryDocsCodes":"SAMPLE_TEXT"
                , "mandatoryScanOutgoingDocsCodes":"SAMPLE_TEXT"
                , "createMutateProperty":"SAMPLE_TEXT"
                , "referencedProperties":"SAMPLE_TEXT"
                , "priorRequiredTransactions":"SAMPLE_TEXT"
                , "createNewParty":"SAMPLE_TEXT"
                , "partyBusinessRules":"SAMPLE_TEXT"
                , "reportTemplates":"SAMPLE_TEXT"
                , "detachable":"SAMPLE_TEXT"
                , "parentTransactionType":"SAMPLE_TEXT"
                , "internalCode":"SAMPLE_TEXT"
                , "version":"SAMPLE_TEXT"
                , "beginLifespanVersion":"SAMPLE_TEXT"
                , "endLifespanVersion":"SAMPLE_TEXT"
                , "tranIndex":"SAMPLE_TEXT"
                }""")).asJson
            .check(status.is(201))
            .check(headerRegex("Location", "(.*)").saveAs("new_metadata_url"))).exitHereIfFailed
            .pause(10)
            .repeat(5) {
                exec(http("Get created metadata")
                .get("${new_metadata_url}")
                .headers(headers_http_authenticated))
                .pause(10)
            }
            .exec(http("Delete created metadata")
            .delete("${new_metadata_url}")
            .headers(headers_http_authenticated))
            .pause(10)
        }

    val users = scenario("Users").exec(scn)

    setUp(
        users.inject(rampUsers(Integer.getInteger("users", 100)) during (Integer.getInteger("ramp", 1) minutes))
    ).protocols(httpConf)
}
