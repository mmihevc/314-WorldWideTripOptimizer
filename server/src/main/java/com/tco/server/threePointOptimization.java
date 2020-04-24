package com.tco.server;

import java.util.Arrays;

public class threePointOptimization {

    public static void swap(int[] route, int j, int k, int i) {
        int[] first = Arrays.copyOfRange(route, j, k);
        int[] second = Arrays.copyOfRange(route, i, j);

        for (int n=0; n < first.length; n++)
            route[n] = first[n];
        for (int n=0; n < second.length; n++)
            route[n+first.length] = second[n];
    }

    public static long reverseSegmentIfBetter(long[][] distanceMatrix, int[] route, int i, int j, int k) {
        int A = route[i], B = route[i + 1], C = route[j], D = route[j + 1], E = route[k], F = route[k + 1];
        long d0 = distanceMatrix[A][B] + distanceMatrix[C][D] + distanceMatrix[E][F];
        long d1 = distanceMatrix[A][C] + distanceMatrix[B][D] + distanceMatrix[E][F];
        long d2 = distanceMatrix[A][B] + distanceMatrix[C][E] + distanceMatrix[D][F];
        long d3 = distanceMatrix[A][D] + distanceMatrix[E][B] + distanceMatrix[C][F];
        long d4 = distanceMatrix[F][B] + distanceMatrix[C][D] + distanceMatrix[E][A];

        if (d0 > d1) {
            twoPointOptimization.optReverse(route, i + 1, j + 1);
            return -d0 + d1;
        } else if (d0 > d2) {
            twoPointOptimization.optReverse(route, j + 1, k + 1);
            return -d0 + d2;
        } else if(d0 > d4) {
            twoPointOptimization.optReverse(route,i+1,k+1);
            return -d0 + d4;
        } else if (d0 > d3) {
            swap(route, j+1, k+1, i+1);
            return -d0 + d3;
        }

        return 0;
    }

    public static void optimize(Place[] places) {
        int[] route = twoPointOptimization.newRoute(places);
        long[][] distanceMatrix = twoPointOptimization.routeDistanceMatrix(places);
        int n = places.length;
        boolean improvement = true;
        while (improvement) {
            improvement = false;
            for (int i = 0; i <= n - 5; i++) {
                for (int j = i + 2; j <= n - 3; j++) {
                    for (int k = j + 2; k <= n - 1; k++) {
                        long delta = reverseSegmentIfBetter(distanceMatrix, route, i, j, k);
                        if (delta < 0)
                            improvement = true;
                    }
                }
            }
        }
        twoPointOptimization.useRoute(route, places);
    }

}
