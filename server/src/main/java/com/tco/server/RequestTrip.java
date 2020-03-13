package com.tco.server;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class RequestTrip extends RequestHeader {

    private Option options;
    private Place[] places;
    private Long[] distances;

    private final transient Logger log = LoggerFactory.getLogger(RequestTrip.class);

    RequestTrip() {
        this.requestType = "trip";
        this.requestVersion = RequestHeader.CURRENT_SUPPORTED_VERSION;
    }

    @Override
    public void buildResponse() {
        for (int i = 1; i < places.length; i++) {
            getDistance(i);
            log.trace("buildResponse -> {}", this);
        }
    }

    String getType() { return this.requestType; }

    Integer getVersion() {
        return this.requestVersion;
    }

    void getDistance(int index) {
        double lng1 = places[index - 1].getLng();
        double lat1 = places[index - 1].getLat();
        double lng2 = places[index].getLng();
        double lat2 = places[index].getLat();
        int radius = options.earthRadius.intValue();
        Utility util = new Utility();
        this.distances[index - 1] = util.getDistance(lng1, lat1, lng2, lat2, radius);
    }

    public class Option {
        private Double earthRadius;
        private String title;

        Option(Double earthRadius, String title) {
            this.earthRadius = earthRadius;
            this.title = title;
        }
    }
}
