package com.tco.server;

import org.junit.Test;

import static org.junit.Assert.assertArrayEquals;

public class TestThreePoint {

    @Test
    public void testTwoPoint() {
        Place[] places = new Place[6];
        Place[] expected = new Place[6];
        places[0] = new Place("39.7392", "-104.9903", "Denver");
        places[1] = new Place("40.48", "-104.91", "Windsor");
        places[2] = new Place("40.01499", "-105.27055", "Boulder");
        places[3] = new Place("40.585258", "-105.084419", "Fort Collins");
        places[4] = new Place("39.76", "-105.23", "Golden");
        places[5] = new Place("40.41", "-104.71", "Greeley");
        expected[0]=places[0];
        expected[1]=places[5];
        expected[2]=places[1];
        expected[3]=places[3];
        expected[4]=places[2];
        expected[5]=places[4];
        threePointOptimization.optimize(places);
        assertArrayEquals("msg", places, expected);
    }

    @Test
    public void testSwap() {
        int[] route = {5, 6, 7, 8, 9, 10, 11, 12, 17};
        int[] swappedRoute = {5, 9, 10, 11, 12, 6, 7, 8, 17};
        int i = 0;
        int j = 3;
        int k = 7;
        threePointOptimization.swap(route, i+1, j, k);
        assertArrayEquals("3-opt swap", swappedRoute, route);
    }

    @Test
    public void testReverseAndSwap() {
        int[] route = {5, 6, 7, 8, 9, 10, 11, 12, 17};
        int[] swappedReversedRoute = {5, 9, 10, 11, 12, 8, 7, 6, 17};
        int i = 0;
        int j = 3;
        int k = 7;
        twoPointOptimization.optReverse(route, i+1, j);
        threePointOptimization.swap(route, i+1, j, k);
        assertArrayEquals("3-opt reverse and swap", swappedReversedRoute, route);
    }

}
