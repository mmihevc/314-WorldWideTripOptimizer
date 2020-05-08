package com.tco.server;

public class twoPointOptimization {

    public static void optReverse(int[] route, int i1, int k) { // reverse in place
        while (i1 < k) {
            int temp = route[i1];
            route[i1] = route[k];
            route[k] = temp;
            i1++; k--;
        }
    }

    public static long[][] routeDistanceMatrix(Place[] places) {
        Place[] route = new Place[places.length+1];
        System.arraycopy(places, 0, route, 0, places.length);
        route[route.length-1] = places[0];
        return NearestNeighbor.buildDistanceMatrix(route);
    }

    public static void useRoute(int[] route, Place[] places) {
        Place[] update = new Place[places.length];
        for (int i=0; i < places.length; i++)
            update[i] = places[route[i]];
        System.arraycopy(update, 0, places, 0, places.length);
    }

    public static int[] newRoute(Place[] places) {
        int[] route = new int[places.length + 1];
        for (int i=0; i < places.length; i++)
            route[i] = i;
        route[route.length-1] = route[0];
        return route;
    }

    public static Place[] optimize(Place[] places, long[][] distanceMatrix, long time) {
        long start = System.nanoTime();
        int[] route = newRoute(places);
        //long[][] distanceMatrix = routeDistanceMatrix(places);
        int n = places.length;
        boolean improvement = true;
        while (improvement) {
            improvement = false;
            for (int i = 0; i <= n-3; i++) {  // assert n>4
                for (int k = i + 2; k <= n-1; k++) {
                    if(time < System.nanoTime()-start){
                        useRoute(route, places);
                        return places;
                    }
                    long curDist = distanceMatrix[route[i]][route[i+1]] + distanceMatrix[route[k]][route[k+1]];
                    long newDist = distanceMatrix[route[i]][route[k]] + distanceMatrix[route[i+1]][route[k+1]];
                    improvement = check(newDist, curDist, route, i+1, k);
                }
            }
        }
        useRoute(route, places);
        return places;
    }

    public static boolean check(long newDist, long curDist, int[] route, int i, int k) {
        if (newDist < curDist) {
            optReverse(route, i, k);
            return true;
        }
        return false;
    }
}
