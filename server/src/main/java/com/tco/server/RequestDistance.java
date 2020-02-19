package com.tco.server;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class RequestDistance extends RequestHeader {
    private Place place1;
    private Place place2;
    private double earthRadius;
    private int distance;

    private final transient Logger log = LoggerFactory.getLogger(RequestDistance.class);

    RequestDistance() {
        this.requestType = "distance";
        this.requestVersion = RequestHeader.CURRENT_SUPPORTED_VERSION;
    }

    @Override
    public void buildResponse() {
        Utility util = new Utility();
        this.distance = (int) util.getDistance(place1.longitude, place1.latitude, place2.longitude, place2.latitude, (int) earthRadius);
        log.trace("buildResponse -> {}", this);
    }

    private class Place {
        private double latitude;
        private double longitude;

        Place(double latitude, double longitude) {
            this.latitude = latitude;
            this.longitude = longitude;
        }
    }

    String getType() {
        return this.requestType;
    }

    Integer getVersion() {
        return this.requestVersion;
    }
}
