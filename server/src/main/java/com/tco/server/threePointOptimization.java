package com.tco.server;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Arrays;

public class threePointOptimization {

    private final static Logger log = LoggerFactory.getLogger(threePointOptimization.class);

    public static void swap(int[] route, int i, int j, int k) {
        log.error("i: " + i + ", j: " + j + ", k:" + k);
        int[] first = Arrays.copyOfRange(route, j+1, k+1);
        int[] second = Arrays.copyOfRange(route, i, j+1);
        for (int n=0; n < first.length; n++)
            route[n+i] = first[n];
        for (int n=0; n < second.length; n++)
            route[n+i+first.length] = second[n];
    }

    public static boolean reverseSegmentIfBetter(long[][] distanceMatrix, int[] route, int i, int j, int k) {
        int A = route[i], B = route[i + 1], C = route[j], D = route[j + 1], E = route[k], F = route[k + 1];
        long d0 = distanceMatrix[A][B] + distanceMatrix[C][D] + distanceMatrix[E][F];   // Original
        long d1 = distanceMatrix[A][C] + distanceMatrix[B][D] + distanceMatrix[E][F];   // 2-opt
        long d2 = distanceMatrix[A][B] + distanceMatrix[C][E] + distanceMatrix[D][F];   // 2-opt
        long d3 = distanceMatrix[A][D] + distanceMatrix[E][B] + distanceMatrix[C][F];   // 2-opt
        long d4 = distanceMatrix[A][C] + distanceMatrix[B][E] + distanceMatrix[D][F];   // 3-opt
        long d5 = distanceMatrix[A][E] + distanceMatrix[D][B] + distanceMatrix[C][F];   // 3-opt
        long d6 = distanceMatrix[A][D] + distanceMatrix[E][C] + distanceMatrix[B][F];   // 3-opt
        long d7 = distanceMatrix[A][D] + distanceMatrix[E][B] + distanceMatrix[C][F];   // 3-opt

        // It is typically best to try the three opt cases before the two opt cases
        if (d0 > d4) {
            twoPointOptimization.optReverse(route, i+1, j);
            twoPointOptimization.optReverse(route, j+1, k);
            return true;
        } else if (d0 > d5) {
            swap(route, i+1, j, k);
            twoPointOptimization.optReverse(route, i+1, j);
            twoPointOptimization.optReverse(route, j+1, k);
            return true;
        } else if (d0 > d6) {
            swap(route, i+1, j, k);
            twoPointOptimization.optReverse(route, j+1, k);
            return true;
        } else if (d0 > d7) {
            swap(route, i+1, j, k);
            return true;
        } else if (d0 > d1) {
            twoPointOptimization.optReverse(route, i+1, j);
            return true;
        } else if (d0 > d2) {
            twoPointOptimization.optReverse(route, j+1, k);
            return true;
        } else if (d0 > d3) {
            twoPointOptimization.optReverse(route, i+1, k);
        }

        return false;
    }

    public static void optimize(Place[] places) {
        int[] route = twoPointOptimization.newRoute(places);
        long[][] distanceMatrix = twoPointOptimization.routeDistanceMatrix(places);
        int n = places.length;
        boolean improvement = true;
        while (improvement) {
            for (int i = 0; i <= n - 5; i++) {
                for (int j = i + 2; j <= n - 3; j++) {
                    for (int k = j + 2; k <= n - 1; k++) {
                        improvement = reverseSegmentIfBetter(distanceMatrix, route, i, j, k);
                    }
                }
            }
        }
        twoPointOptimization.useRoute(route, places);
    }

}
