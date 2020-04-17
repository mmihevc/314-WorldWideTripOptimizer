package com.tco.server;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class RequestTrip extends RequestHeader {

    protected Option options;
    protected Place[] places;
    protected Long[] distances;

    private final transient Logger log = LoggerFactory.getLogger(RequestTrip.class);

    @Override
    public void buildResponse() {
        // nn 1s=85 2s
        // 2opt 1s=100 2s 240

        if(this.options.optimization.improvement.equals("2opt")){
           this.places=twoPointOptimization.optimize(this.places, Double.parseDouble(options.earthRadius));}
        if(this.options.optimization.construction.equals("one")){
            this.places=NearestNeighbor.nearestNeighbor(this.places);}
        this.distances = new Long[places.length];
        double radius = Double.parseDouble(options.earthRadius);
        for (int i = 1; i < places.length; i++)
            getDistance(i, radius);
        distanceBetweenFirstAndLast(radius);
        log.trace("buildResponse -> {}", this);
    }

    void getDistance(int index, double radius) {
        this.distances[index - 1] = Utility.getDistance(places[index-1], places[index], radius);
    }

    void distanceBetweenFirstAndLast(double radius) {
        if (distances.length > 0)
            this.distances[distances.length - 1] = Utility.getDistance(places[0], places[places.length-1], radius);
    }

}
