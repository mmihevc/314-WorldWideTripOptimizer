package com.tco.server;

import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.*;

public class TestRequestDistance {
    private RequestDistance dist;

    @Before
    public void createDistanceRequestForTestCases(){
        dist = new RequestDistance();
        dist.place1 = new Place("20.12", "30.14", "place1");
        dist.place2 = new Place("20.12", "30.14", "place2");
        dist.earthRadius = 1024.0;
        dist.buildResponse();
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

    @Test
    public void testDistance() {
        Long expectedDistance = new Long(0);
        assertEquals("distance distance", dist.distance, expectedDistance);
    }
}
