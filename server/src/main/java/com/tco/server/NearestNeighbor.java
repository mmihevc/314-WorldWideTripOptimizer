package com.tco.server;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.concurrent.*;

public class NearestNeighbor {

    private static final Logger log = LoggerFactory.getLogger(NearestNeighbor.class);

    public static Place[] nearestNeighbor(Place[] places, long[][] distanceMatrix, long time) {
        if (places.length <= 3)
            return places;
        //long[][] distanceMatrix = buildDistanceMatrix(places);
        ExecutorService executorService = getThreadExecutor();
        Set<Callable<TourResult>> tasks = new HashSet<>();
        for (int placeIndex=0; placeIndex < places.length; placeIndex++)
            tasks.add(new Tour(places.length, placeIndex, distanceMatrix));
        List<Future<TourResult>> results;
        try {
            results = executorService.invokeAll(tasks, time - (time/10), TimeUnit.NANOSECONDS);
        } catch (InterruptedException ie) {
            log.error("Error running nearestNeighbor threads\n" + ie.getMessage());
            return places;
        }
        executorService.shutdown();
        int[] bestTour = processTourResults(results);
        return getTourAsPlaceArray(places, bestTour);
    }

    public static int[] processTourResults(List<Future<TourResult>> tourResults) {
        int[] bestTour = new int[tourResults.size()];
        long bestDistance = Long.MAX_VALUE;
        for (Future<TourResult> tourResult: tourResults) {
            TourResult tour;
            try {
                tour = tourResult.get();
            } catch (Exception e) {
                log.error("Error processing tour results\n" + e.getMessage());
                return bestTour;
            }
            if (tour.distance < bestDistance) {
                bestDistance = tour.distance;
                bestTour = tour.tour;
            }
        }
        return bestTour;
    }

    public static ExecutorService getThreadExecutor() {
        int logicalThreads = Runtime.getRuntime().availableProcessors();
        return Executors.newFixedThreadPool(logicalThreads/2);
    }

    public static Place[] getTourAsPlaceArray(Place[] places, int[] tour) {
        Place[] newPlaces = new Place[places.length];
        for (int placeIndex=0; placeIndex < places.length; placeIndex++)
            newPlaces[placeIndex] = places[tour[placeIndex]];
        return newPlaces;
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
