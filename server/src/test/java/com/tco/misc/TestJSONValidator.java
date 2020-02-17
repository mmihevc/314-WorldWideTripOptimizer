package com.tco.misc;

import java.lang.reflect.Type;

import com.tco.server.RequestConfig;
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
    public void testMissingSchema() {
        test("", JSONValidator.class, false);
    }

}