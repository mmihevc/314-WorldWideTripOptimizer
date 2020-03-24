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
        this.distances = new Long[places.length];
        for (int i = 1; i < places.length; i++) {
            getDistance(i);
            log.trace("buildResponse -> {}", this);
        }
        distanceBetweenFirstAndLast();
        log.trace("buildResponse -> {}", this);
    }

    void getDistance(int index) {
        double lng1 = places[index - 1].getLng();
        double lat1 = places[index - 1].getLat();
        double lng2 = places[index].getLng();
        double lat2 = places[index].getLat();
        double radius = Double.parseDouble(options.earthRadius);
        Utility util = new Utility();
        this.distances[index - 1] = util.getDistance(lng1, lat1, lng2, lat2, radius);
    }

    void distanceBetweenFirstAndLast() {
        double lng1 = Double.parseDouble(this.places[0].longitude);
        double lat1 = Double.parseDouble(this.places[0].latitude);
        double lng2 = Double.parseDouble(this.places[places.length - 1].longitude);
        double lat2 = Double.parseDouble(this.places[places.length - 1].latitude);
        double radius = Double.parseDouble(options.earthRadius);
        Utility util = new Utility();
        this.distances[distances.length - 1] = util.getDistance(lng1, lat1, lng2, lat2, radius);
    }

}
