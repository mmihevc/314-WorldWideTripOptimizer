package com.tco.server;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class RequestTrip extends RequestHeader {

    protected Option options;
    protected Place[] places;
    protected Long[] distances;

    private final transient Logger log = LoggerFactory.getLogger(RequestTrip.class);

    RequestTrip() {
        this.requestType = "trip";
        this.requestVersion = RequestHeader.CURRENT_SUPPORTED_VERSION;
    }

    @Override
    public void buildResponse() {
        this.places=twoPointOptimization.optimize(this.places, Double.parseDouble(options.earthRadius));

        this.distances = new Long[places.length];
        for (int i = 1; i < places.length; i++) {
            getDistance(i);
            log.trace("buildResponse -> {}", this);
        }
        distanceBetweenFirstAndLast();
        log.trace("buildResponse -> {}", this);
    }

    void getDistance(int index) {
        double radius = Double.parseDouble(options.earthRadius);
        this.distances[index - 1] = Utility.getDistance(places[index-1], places[index], radius);
    }

    void distanceBetweenFirstAndLast() {
        double radius = Double.parseDouble(options.earthRadius);
        this.distances[distances.length - 1] = Utility.getDistance(places[0], places[places.length-1], radius);
    }

}
