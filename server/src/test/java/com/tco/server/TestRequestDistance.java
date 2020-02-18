package com.tco.server;

import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.*;

public class TestRequestDistance {
    private RequestDistance dist;

    @Before
    public void createDistanceRequestForTestCases(){
        dist = new RequestDistance();
    }

    @Test
    public void testType() {
        String type = dist.getType();
        assertEquals("distance requestType", "distance", type);
    }

    @Test
    public void testVersion() {
        int version = dist.getVersion();
        assertEquals("distance requestVersion", RequestHeader.CURRENT_SUPPORTED_VERSION, version);
    }
}
