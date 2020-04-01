package com.tco.server;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class RequestDistance extends RequestHeader  {
    protected Place place1;
    protected Place place2;
    protected Double earthRadius;
    protected Long distance;

    private final transient Logger log = LoggerFactory.getLogger(RequestDistance.class);

    @Override
    public void buildResponse() {
        this.distance = Utility.getDistance(place1, place2, earthRadius);
        log.trace("buildResponse -> {}", this);
    }

}
