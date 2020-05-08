package com.tco.server;

import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.concurrent.TimeUnit;

import static org.junit.Assert.*;

public class TestNearestNeighbor {

    private static final Logger log = LoggerFactory.getLogger(TestNearestNeighbor.class);

    @Test
    public void testNearestNeighbor() {
        Place[] places = new Place[6];
        places[0] = new Place("39.7392", "-104.9903", "Denver");
        places[1] = new Place("40.48", "-104.91", "Windsor");
        places[2] = new Place("40.01499", "-105.27055", "Boulder");
        places[3] = new Place("40.585258", "-105.084419", "Fort Collins");
        places[4] = new Place("39.76", "-105.23", "Golden");
        places[5] = new Place("40.41", "-104.71", "Greeley");
        Place[] sortedPlaces = NearestNeighbor.nearestNeighbor(places, NearestNeighbor.buildDistanceMatrix(places), Long.MAX_VALUE);
        long totalDistance = 0;
        long expectedDistance = 145;
        for (int i = 0; i < places.length-1; i++)
            totalDistance += Utility.getDistance(sortedPlaces[i], sortedPlaces[i+1], 3958.8);
        totalDistance += Utility.getDistance(sortedPlaces[sortedPlaces.length-1], sortedPlaces[0], 3958.8);
        for (Place place : sortedPlaces)
            log.error(place.name);
        assertEquals("NearestNeighbor nearestNeighbor", expectedDistance, totalDistance);
    }

    @Test
    public void testNearestNeighbor2Places() {
        Place[] places = new Place[2];
        places[0] = new Place("39.7392", "-104.9903", "Denver");
        places[1] = new Place("40.48", "-104.91", "Windsor");
        Place[] sortedPlaces = NearestNeighbor.nearestNeighbor(places, NearestNeighbor.buildDistanceMatrix(places), Long.MAX_VALUE);
        assertArrayEquals("NearestNeighbor 2 places", sortedPlaces, places);
    }

    @Test
    public void testNearestNeighborNoTourResults() {
        Place[] places = new Place[6];
        places[0] = new Place("39.7392", "-104.9903", "Denver");
        places[1] = new Place("40.48", "-104.91", "Windsor");
        places[2] = new Place("40.01499", "-105.27055", "Boulder");
        places[3] = new Place("40.585258", "-105.084419", "Fort Collins");
        places[4] = new Place("39.76", "-105.23", "Golden");
        places[5] = new Place("40.41", "-104.71", "Greeley");
        Place[] sortedPlaces = NearestNeighbor.nearestNeighbor(places, NearestNeighbor.buildDistanceMatrix(places), 10L);
        assertArrayEquals("NearestNeighbor no tour results", sortedPlaces, places);
    }

    @Test
    public void testBuildDistanceMatrix() {
        long[][] expectedMatrix = {{0, 24, 59},
                {24, 0, 41},
                {59, 41, 0}};
        Place[] places = new Place[3];
        places[0] = new Place("39.7392", "-104.9903", "Denver");
        places[1] = new Place("40.01499", "-105.27055", "Boulder");
        places[2] = new Place("40.585258", "-105.084419", "Fort Collins");
        long[][] distanceMatrix = NearestNeighbor.buildDistanceMatrix(places);
        assertArrayEquals("NearestNeighbor buildDistanceMatrix", expectedMatrix, distanceMatrix);
    }

}