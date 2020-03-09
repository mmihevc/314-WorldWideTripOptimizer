package com.tco.misc;

import java.lang.reflect.Type;

import com.tco.server.RequestConfig;
import com.tco.server.RequestDistance;
import com.tco.server.RequestTrip;
import org.junit.Test;

import static org.junit.Assert.assertTrue;

public class TestJSONValidator {

    private void test(String request, Type type, boolean valid) {
        try {
            JSONValidator.validate(type, request);
            assertTrue("valid", valid);
        } catch (Exception e) {
            assertTrue("invalid: " + e.getMessage(), !valid);
        }
    }

    @Test
    public void testRequestConfigFail() {
        test("{}", RequestConfig.class, false);
    }

    @Test
    public void testRequestConfigPass() {
        test("{\"requestType\":\"config\",\"requestVersion\":1}", RequestConfig.class, true);
    }

    @Test
    public void testRequestDistanceFail() {
        test("{}", RequestDistance.class, false);
    }

    @Test
    public void testRequestDistancePass() {
        test("{\"requestType\": \"distance\",\"requestVersion\" : 3," +
                "\"place1\": {\"latitude\": \"40.6\",\"longitude\": \"-105.1\"}," +
                "\"place2\": {\"latitude\": \"-33.9\",\"longitude\": \"151.2\"}," +
                "\"earthRadius\": 6371.0}", RequestDistance.class, true);
    }
    @Test
    public void testRequestTripFail(){
        test("{}", RequestTrip.class, false);
    }
    @Test
    public void testRequestTripPass (){
        test("{\"requestType\": \"trip\",\"requestVersion\": 3," +
                "\"options\": { \"title\":\"My Trip\", \"earthRadius\":\"3959.0\" }," +
                "\"places\": [{\"name\":\"Denver\",\"latitude\": \"39.7\", \"longitude\": \"-105.0\"},\n" +
                "        {\"name\":\"Boulder\",\"latitude\": \"40.0\", \"longitude\": \"-105.3\"},\n" +
                "        {\"name\":\"Fort Collins\", \"latitude\": \"40.6\", \"longitude\": \"-105.1\"}]," +
                "\"distances\": [20, 40, 50] }", RequestTrip.class, true);
    }

    @Test
    public void testMissingSchema() {
        test("", JSONValidator.class, false);
    }

}