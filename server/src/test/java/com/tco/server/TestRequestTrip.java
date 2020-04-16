package com.tco.server;

import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.assertEquals;


public class TestRequestTrip {
    private RequestTrip trip;

    @Before
    public void createTripRequestForTestCases(){
        trip = new RequestTrip();
        trip.requestType = "trip";
        trip.requestVersion = RequestHeader.CURRENT_SUPPORTED_VERSION;
    }

    @Test
    public void testType() {
        String type = trip.requestType;
        assertEquals("trip requestType", "trip", type);
    }

    @Test
    public void testVersion() {
        int version = trip.requestVersion;
        assertEquals("trip requestVersion", RequestHeader.CURRENT_SUPPORTED_VERSION, version);
    }

    @Test
    public void testDistancesT05() {

        trip.options = new Option("6371.0", "World Ski Resorts -> 51,794", "1", "none", "none");
        trip.places = new Place[6];
        trip.places[0] = new Place("45.415498", "6.634682", "Courchevel Tourisme");
        trip.places[1] = new Place("47.137390", "10.269852", "St Anton am Arlberg");
        trip.places[2] = new Place("40.635036", "-111.476452", "Deer Valley Resort");
        trip.places[3] = new Place("50.115088", "-122.948647", "Whistler Blackcomb");
        trip.places[4] = new Place("45.933915", "7.629187", "Cervinia Valtournenche");
        trip.places[5] = new Place("-37.124956", "146.447541", "Mount Buller");
        trip.buildResponse();
        long tripDistance = 0;
        for (long dist : trip.distances)
            tripDistance += dist;
        assertEquals("trip requestDistancesT05", 51794, tripDistance);
    }

}
