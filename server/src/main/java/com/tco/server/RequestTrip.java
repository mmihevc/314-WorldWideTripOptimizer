package com.tco.server;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public class RequestTrip extends RequestHeader {

    private Option options;
    private Place[] places;
    private Integer[] distances;


    private final transient Logger log = LoggerFactory.getLogger(RequestTrip.class);

    RequestTrip() {
        this.requestType = "trip";
        this.requestVersion = RequestHeader.CURRENT_SUPPORTED_VERSION;
    }

    @Override
    public void buildResponse() {
        log.trace("buildResponse -> {}", this);
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
