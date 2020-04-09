package com.tco.server;

import org.junit.Test;

import static org.junit.Assert.*;

public class TestNearestNeighbor {

    @Test
    public void testBuildDistanceMatrix() {
        long[][] expectedMatrix = {{ 0, 24, 59},
                                   {24,  0, 41},
                                   {59, 41,  0}};
        Place[] places = new Place[3];
        places[0] = new Place("39.7392", "-104.9903", "Denver");
        places[1] = new Place("40.01499", "-105.27055", "Boulder");
        places[2] = new Place("40.585258", "-105.084419", "Fort Collins");
        long[][] distanceMatrix = NearestNeighbor.buildDistanceMatrix(places, 3958.8);
        assertArrayEquals("NearestNeighbor buildDistanceMatrix", expectedMatrix, distanceMatrix);
    }

}
