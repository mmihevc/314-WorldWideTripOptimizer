package com.tco.server;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class twoPointOptimization {

    private final static Logger log = LoggerFactory.getLogger(twoPointOptimization.class);

    public static void optReverse(Place[] route, int i1, int k) { // reverse in place
        while (i1 < k) {
            Place temp = route[i1];
            route[i1] = route[k];
            route[k] = temp;
            i1++; k--;
        }
    }

    public static long dis(Place[] route, int i, int j) {
        return Utility.getDistance(route[i], route[j], 3958.8);
    }

    public static void optimize(Place places[]) {
        Place route[]= new Place[places.length+1];
        System.arraycopy(places, 0, route, 0, places.length);
        route[route.length-1] = new Place(places[0].latitude, places[0].longitude, places[0].name);

        int n = places.length;

        boolean improvement = true;
        while (improvement) {
            improvement = false;
            for (int i = 0; i <= n-3; i++) {  // assert n>4
                for (int k = i + 2; k <= n-1; k++) {
                    long delta = -dis(route,i,i+1)-dis(route,k,k+1)+dis(route,i,k)+dis(route,i+1,k+1);
                    if (delta < 0) { //improvement?
                        optReverse(route, i+1, k);
                        improvement = true;
                    }
                }
            }
        }

        System.arraycopy(route, 0, places, 0, places.length);
    }
}
