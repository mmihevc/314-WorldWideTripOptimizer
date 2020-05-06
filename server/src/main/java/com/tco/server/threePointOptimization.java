package com.tco.server;

import java.util.Arrays;

public class threePointOptimization {

    public static void swap(int[] route, int i1, int j, int k) {
        int[] first = Arrays.copyOfRange(route, j+1, k+1);
        int[] second = Arrays.copyOfRange(route, i1, j+1);
        for (int n=0; n < first.length; n++)
            route[n+i1] = first[n];
        for (int n=0; n < second.length; n++)
            route[n+i1+first.length] = second[n];
    }

    public static boolean check3Opt(long[][] distanceMatrix, int[] route, long d0, Segments segs) {
        int i = segs.i, j = segs.j, k = segs.k;
        long[] optDistances = segs.get3optDistances(distanceMatrix, route);
        if (d0 > optDistances[0]) {
            twoPointOptimization.optReverse(route, i+1, j);
            twoPointOptimization.optReverse(route, j+1, k);
            return true;
        } else if (d0 > optDistances[1]) {
            twoPointOptimization.optReverse(route, j+1, k);
            swap(route, i+1, j, k);
            return true;
        } else if (d0 > optDistances[2]) {
            twoPointOptimization.optReverse(route, i+1, j);
            swap(route, i+1, j, k);
            return true;
        } else if (d0 > optDistances[3]) {
            swap(route, i+1, j, k);
            return true;
        }
        return false;
    }

    public static boolean check2Opt(long[][] distanceMatrix, int[] route, long d0, Segments segs) {
        int i = segs.i, j = segs.j, k = segs.k;
        long[] optDistances = segs.get2optDistances(distanceMatrix, route);
        if (d0 > optDistances[0]) {
            twoPointOptimization.optReverse(route, i+1, j);
            return true;
        } else if (d0 > optDistances[1]) {
            twoPointOptimization.optReverse(route, j+1, k);
            return true;
        } else if (d0 > optDistances[2]) {
            twoPointOptimization.optReverse(route, i+1, k);
            return true;
        }
        return false;
    }

    public static boolean reverseSegmentIfBetter(long[][] distanceMatrix, int[] route, Segments segs) {
        long d0 = segs.getOriginalDistance(distanceMatrix, route);
        if (check3Opt(distanceMatrix, route, d0, segs))
            return true;
        else if (check2Opt(distanceMatrix, route, d0, segs))
            return true;
        return false;
    }

    public static Place[] optimize(Place[] places, long[][] distanceMatrix, long time) {
        long start = System.nanoTime();
        int[] route = twoPointOptimization.newRoute(places);
        //long[][] distanceMatrix = twoPointOptimization.routeDistanceMatrix(places);
        int n = places.length;
        boolean improvement = true;
        while (improvement) {
            for (int i = 0; i <= n - 5; i++) {
                for (int j = i + 2; j <= n - 3; j++) {
                    for (int k = j + 2; k <= n - 1; k++) {
                        if(time < System.nanoTime()-start){
                            twoPointOptimization.useRoute(route, places);
                            return places;
                        }
                        improvement = reverseSegmentIfBetter(distanceMatrix, route, new Segments(i, j, k));
                    }
                }
            }
        }
        twoPointOptimization.useRoute(route, places);
        return places;
    }

};

class Segments {
    int i;
    int j;
    int k;
    public Segments(int i, int j, int k) {
        this.i = i;
        this.j = j;
        this.k = k;
    }

    public long getOriginalDistance(long[][] distanceMatrix, int[] route) {
        return distanceMatrix[route[i]][route[i+1]] + distanceMatrix[route[j]][route[j+1]] + distanceMatrix[route[k]][route[k+1]];
    }

    public long[] get2optDistances(long[][] distanceMatrix, int[] route) {
        long d1 = distanceMatrix[route[i]][route[j]] + distanceMatrix[route[i+1]][route[j+1]] + distanceMatrix[route[k]][route[k+1]];
        long d2 = distanceMatrix[route[i]][route[i+1]] + distanceMatrix[route[j]][route[k]] + distanceMatrix[route[j+1]][route[k+1]];
        long d3 = distanceMatrix[route[i]][route[k]] + distanceMatrix[route[j+1]][route[j]] + distanceMatrix[route[i+1]][route[k+1]];
        return new long[]{d1, d2, d3};
    }

    public long[] get3optDistances(long[][] distanceMatrix, int[] route) {
        long d4 = distanceMatrix[route[i]][route[j]] + distanceMatrix[route[i+1]][route[k]] + distanceMatrix[route[j+1]][route[k+1]];
        long d5 = distanceMatrix[route[i]][route[k]] + distanceMatrix[route[j+1]][route[i+1]] + distanceMatrix[route[j]][route[k+1]];
        long d6 = distanceMatrix[route[i]][route[j+1]] + distanceMatrix[route[k]][route[j]] + distanceMatrix[route[i+1]][route[k+1]];
        long d7 = distanceMatrix[route[i]][route[j+1]] + distanceMatrix[route[k]][route[i+1]] + distanceMatrix[route[j]][route[k+1]];
        return new long[]{d4, d5, d6, d7};
    }
}
