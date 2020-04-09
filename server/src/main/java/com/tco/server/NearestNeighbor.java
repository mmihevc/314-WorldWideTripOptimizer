package com.tco.server;

import java.util.Arrays;

public class NearestNeighbor {

    public static Place[] nearestNeighbor(Place[] places) {
        if (places.length <= 3)
            return places;
        long[][] distanceMatrix = buildDistanceMatrix(places, 3958.8);
        int[] bestTour = new int[places.length];
        long bestDistance = Long.MAX_VALUE;
        for (int i=0; i < places.length; i++) {
            int[] tour = new int[places.length];
            boolean[] unvisitedPlaces = new boolean[places.length];
            Arrays.fill(tour, -1);
            Arrays.fill(unvisitedPlaces, true);
            tour[0] = i;     // add starting city to tour
            int tourIndex = 1;
            unvisitedPlaces[i] = false;    // remove starting city from list of unvisited cities
            // while there are unvisited cities remaining
            while (placesAreUnvisited(unvisitedPlaces)) {
                int lastPlace = getLastPlaceInTour(tour);
                int nextPlace = getClosestPlace(distanceMatrix, lastPlace, unvisitedPlaces);
                tour[tourIndex] = nextPlace;
                tourIndex++;
                unvisitedPlaces[nextPlace] = false;
            }
            long distance = getTourDistance(distanceMatrix, tour);
            if (distance < bestDistance) {
                bestDistance = distance;
                bestTour = tour.clone();
            }
        }
        Place[] newPlaces = new Place[places.length];
        for (int i=0; i < bestTour.length; i++)
            newPlaces[i] = places[bestTour[i]];
        return newPlaces;
    }

    protected static long getTourDistance(long[][] distanceMatrix, int[] tour) {
        long distance = 0;
        for (int i=0; i < tour.length-1; i++) {
            int start = tour[i];
            int finish = tour[i+1];
            distance += distanceMatrix[start][finish];
        }
        distance += distanceMatrix[tour[tour.length-1]][tour[0]];
        return distance;
    }

    protected static int getClosestPlace(long[][] distanceMatrix, int startPlace, boolean[] unvisitedPlaces) {
        long bestDistance = Long.MAX_VALUE;
        int closestPlace = -1;
        for (int i=0; i < distanceMatrix[startPlace].length; i++) {
            if (startPlace == i || !unvisitedPlaces[i])
                continue;
            long distance = distanceMatrix[startPlace][i];
            if (distance < bestDistance) {
                closestPlace = i;
                bestDistance = distance;
            }
        }
        return closestPlace;
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
