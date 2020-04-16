package com.tco.server;

import java.util.Arrays;

public class NearestNeighbor {

    public static Place[] nearestNeighbor(Place[] places) {
        if (places.length <= 3)
            return places;
        long[][] distanceMatrix = buildDistanceMatrix(places);
        Tour bestTour = new Tour(places.length, 0, distanceMatrix);
        long bestDistance = Long.MAX_VALUE;
        for (int placeIndex=0; placeIndex < places.length; placeIndex++) {
            Tour curTour = new Tour(places.length, placeIndex, distanceMatrix);
            long curDistance = curTour.getTotalDistance(distanceMatrix);
            if (curDistance < bestDistance) {
                bestDistance = curDistance;
                bestTour = curTour;
            }
        }
        return bestTour.getTour(places);
    }

    protected static int getClosestPlace(long[][] distanceMatrix, int startPlace, boolean[] unvisitedPlaces) {
        long[] distances = distanceMatrix[startPlace];
        long bestDistance = Long.MAX_VALUE;
        int closestPlace = -1;
        for (int placeIndex=0; placeIndex < distances.length; placeIndex++) {
            if (!placeShouldBeVisited(placeIndex, startPlace, unvisitedPlaces))
                continue;
            long distance = distances[placeIndex];
            if (distance < bestDistance) {
                closestPlace = placeIndex;
                bestDistance = distance;
            }
        }
        return closestPlace;
    }

    private static boolean placeShouldBeVisited(int placeIndex, int startPlace, boolean[] unvisitedPlaces) {
        return startPlace != placeIndex && unvisitedPlaces[placeIndex];
    }

    protected static long[][] buildDistanceMatrix(Place[] places) {
        long[][] distanceMatrix = new long[places.length][places.length];
        for (int i=0; i < places.length; i++)
            for (int j=0; j < places.length; j++)
                distanceMatrix[i][j] = getDistanceAtIndices(places, distanceMatrix, i, j);
        return distanceMatrix;
    }

    private static long getDistanceAtIndices(Place[] places, long[][] distanceMatrix, int i, int j) {
        if (i == j)
            return 0;
        else if (j < i)
            return distanceMatrix[j][i];
        else
            return Utility.getDistance(places[i], places[j], 3958.8);
    }

}

class Tour {
    private long[][] distanceMatrix;
    private int[] tour;
    private boolean[] unvisitedPlaces;
    private int tourIndex;

    Tour(int size, int startPlace, long[][] distanceMatrix) {
        this.distanceMatrix = distanceMatrix;
        this.initializeTour(size, startPlace);
        this.buildTour();
    }

    private void initializeTour(int size, int startPlace) {
        this.tour = new int[size];
        this.unvisitedPlaces = new boolean[size];
        Arrays.fill(this.tour, -1);
        Arrays.fill(this.unvisitedPlaces, true);
        this.tour[0] = startPlace;
        this.unvisitedPlaces[startPlace] = false;
        this.tourIndex = 1;
    }

    private void buildTour() {
        while (this.placesAreUnvisited())
            this.visitNextPlace();
    }

    private void visitNextPlace() {
        int lastPlace = this.getLastPlace();
        int nextPlace = NearestNeighbor.getClosestPlace(distanceMatrix, lastPlace, unvisitedPlaces);
        this.addPlace(nextPlace);
        this.unvisitedPlaces[nextPlace] = false;
    }

    private void addPlace(int place) {
        this.tour[this.tourIndex] = place;
        this.tourIndex++;
    }

    private int getLastPlace() {
        return this.tour[this.tourIndex-1];
    }

    private boolean placesAreUnvisited() {
        for (boolean unvisitedPlace : unvisitedPlaces)
            if (unvisitedPlace)
                return true;
        return false;
    }

    public Place[] getTour(Place[] places) {
        Place[] newPlaces = new Place[places.length];
        for (int placeIndex=0; placeIndex < places.length; placeIndex++)
            newPlaces[placeIndex] = places[this.tour[placeIndex]];
        return newPlaces;
    }

    public long getTotalDistance(long[][] distanceMatrix) {
        long distance = 0;
        for (int placeIndex=0; placeIndex < this.tour.length-1; placeIndex++) {
            int start = this.tour[placeIndex];
            int finish = this.tour[placeIndex+1];
            distance += distanceMatrix[start][finish];
        }
        distance += distanceMatrix[this.tour[this.tour.length-1]][this.tour[0]];
        return distance;
    }

}