package com.tco.server;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class RequestTrip extends RequestHeader {

    private final transient Logger log = LoggerFactory.getLogger(RequestTrip.class);

    RequestTrip() {
        this.requestType = "trip";
        this.requestVersion = RequestHeader.CURRENT_SUPPORTED_VERSION;
    }

    @Override
    public void buildResponse() {
        log.trace("buildResponse -> {}", this);
    }
}
