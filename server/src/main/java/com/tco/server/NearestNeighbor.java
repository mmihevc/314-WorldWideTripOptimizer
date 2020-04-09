package com.tco.server;


public class NearestNeighbor {

    protected static long[][] buildDistanceMatrix(Place[] places, double earthRadius) {
        long[][] distanceMatrix = new long[places.length][places.length];
        for (int i=0; i < places.length; i++) {
            for (int j=0; j < places.length; j++) {
                if (i == j)
                    distanceMatrix[i][j] = 0;
                else if (j < i)
                    distanceMatrix[i][j] = distanceMatrix[j][i];
                else
                    distanceMatrix[i][j] = Utility.getDistance(places[i], places[j], earthRadius);
            }
        }
        return distanceMatrix;
    }

}
