package com.tco.server;

import org.junit.Test;
import java.util.Random;
import java.nio.charset.Charset;

import static org.junit.Assert.assertArrayEquals;

public class TestThreePoint {

    @Test
    public void testThreePoint() {
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
        threePointOptimization.optimize(places, NearestNeighbor.buildDistanceMatrix(places), Long.MAX_VALUE);
        assertArrayEquals("msg", places, expected);
    }
    @Test
    public void longerTest(){
        Random r = new Random();
        Place[] places = new Place[200];
        for(int i=0;i<places.length;i++){
            double latitude = -90 + 180 * r.nextDouble();
            double longitude = -180 + 360 * r.nextDouble();
            latitude=Math.round(latitude*100.0)/100.0;
            longitude=Math.round(longitude*100.0)/100.0;
            byte[] array = new byte[7]; // length is bounded by 7
            new Random().nextBytes(array);
            String name = new String(array, Charset.forName("UTF-8"));
            places[i]=new Place(Double.toString(latitude), Double.toString(longitude), name);
        }
        long[][] distances = NearestNeighbor.buildDistanceMatrix(places);
        threePointOptimization.optimize(places, distances, Long.MAX_VALUE);
        threePointOptimization.optimize(places, distances, 0);
        twoPointOptimization.optimize(places, twoPointOptimization.routeDistanceMatrix(places), Long.MAX_VALUE);
        NearestNeighbor.nearestNeighbor(places, distances, Long.MAX_VALUE);
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
