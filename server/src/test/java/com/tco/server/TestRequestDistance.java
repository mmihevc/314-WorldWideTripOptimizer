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
        dist.requestVersion = 3;
        dist.requestType = "distance";
        dist.buildResponse();
    }

    @Test
    public void testType() {
        String type = dist.requestType;
        assertEquals("distance requestType", "distance", type);
    }

    @Test
    public void testVersion() {
        int version = dist.requestVersion;
        assertEquals("distance requestVersion", RequestHeader.CURRENT_SUPPORTED_VERSION, version);
    }

    @Test
    public void testDistance() {
        Long expectedDistance = 0L;
        assertEquals("distance distance", expectedDistance, dist.distance);
    }
}
