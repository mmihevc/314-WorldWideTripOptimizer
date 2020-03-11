package com.tco.server;

import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class TestRequestTrip {
    private RequestTrip trip;

    @Before
    public void createTripRequestForTestCases(){
        trip = new RequestTrip();
    }

    @Test
    public void testType() {
        String type = trip.getType();
        assertEquals("trip requestType", "trip", type);
    }

    @Test
    public void testVersion() {
        int version = trip.getVersion();
        assertEquals("trip requestVersion", RequestHeader.CURRENT_SUPPORTED_VERSION, version);
    }

}
