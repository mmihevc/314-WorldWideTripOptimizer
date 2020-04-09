package com.tco.server;

import java.util.Arrays;

public class NearestNeighbor {

    public static Place[] nearestNeighbor(Place[] places) {
        long[][] distanceMatrix = buildDistanceMatrix(places, 3958.8);
        int[] bestTour;
        long bestDistance = Long.MAX_VALUE;
        for (int i=0; i < places.length; i++) {
            int[] tour = new int[places.length];
            boolean[] unvisitedPlaces = new boolean[places.length];
            Arrays.fill(tour, -1);
            Arrays.fill(unvisitedPlaces, true);

            tour[0] = i;     // add starting city to tour
            unvisitedPlaces[i] = false;    // remove starting city from list of unvisited cities

            // while there are unvisited cities remaining
            while (placesAreUnvisited(unvisitedPlaces)) {
                int lastPlace = getLastPlaceInTour(tour);


            }


        }

        return places;
    }

    protected static int getClosestPlace(long[][] distanceMatrix, int startPlace, boolean[] unvisitedPlaces) {
        return -1;
    }

    protected static int getLastPlaceInTour(int[] tour) {
        for (int i=0; i < tour.length; i++)
            if (tour[i] != -1)
                return tour[i];
        return -1;
    }

    protected static boolean placesAreUnvisited(boolean[] unvisitedPlaces) {
        for (int i=0; i < unvisitedPlaces.length; i++)
            if (unvisitedPlaces[i])
                return true;
        return false;
    }

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
