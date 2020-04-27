package com.tco.server;

import java.util.Arrays;
import java.util.concurrent.Callable;

class TourResult {
    public int[] tour;
    public long distance;

    TourResult(int[] tour, long distance) {
        this.tour = tour;
        this.distance = distance;
    }
}

public class Tour implements Callable<TourResult> {
    private long[][] distanceMatrix;
    private int[] tour;
    private boolean[] unvisitedPlaces;
    private int tourIndex;
    private int size;
    private int startPlace;

    Tour(int size, int startPlace, long[][] distanceMatrix) {
        this.distanceMatrix = distanceMatrix;
        this.size = size;
        this.startPlace = startPlace;

    }

    public TourResult call() {
        this.initializeTour(this.size, this.startPlace);
        this.buildTour();
        return new TourResult(this.tour, this.getTotalDistance());
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

    public long getTotalDistance() {
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