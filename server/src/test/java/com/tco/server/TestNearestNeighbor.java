package com.tco.server;

import org.junit.Test;

import static org.junit.Assert.*;

public class TestNearestNeighbor {

    @Test
    public void testNearestNeighbor() {
        Place[] places = new Place[6];
        places[0] = new Place("39.7392", "-104.9903", "Denver");
        places[1] = new Place("40.48", "-104.91", "Windsor");
        places[2] = new Place("40.01499", "-105.27055", "Boulder");
        places[3] = new Place("40.585258", "-105.084419", "Fort Collins");
        places[4] = new Place("39.76", "-105.23", "Golden");
        places[5] = new Place("40.41", "-104.71", "Greeley");
        Place[] sortedPlaces = NearestNeighbor.nearestNeighbor(places);
        Place[] expectedPlaces = new Place[6];
        expectedPlaces[0] = places[0];
        expectedPlaces[1] = places[4];
        expectedPlaces[2] = places[2];
        expectedPlaces[3] = places[5];
        expectedPlaces[4] = places[1];
        expectedPlaces[5] = places[3];
        assertArrayEquals("NearestNeighbor nearestNeighbor", expectedPlaces, sortedPlaces);
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
        long[][] distanceMatrix = NearestNeighbor.buildDistanceMatrix(places, 3958.8);
        assertArrayEquals("NearestNeighbor buildDistanceMatrix", expectedMatrix, distanceMatrix);
    }

}