package com.tco.server;

public class threePointOptimization {

    public static Place[] optimize(Place[] places) {
        Place[] route = new Place[places.length+1];
        System.arraycopy(places, 0, route, 0, places.length);
        route[route.length-1] = places[0];

        long[][] distanceMatrix = NearestNeighbor.buildDistanceMatrix(places);



        return route;
    }

}
