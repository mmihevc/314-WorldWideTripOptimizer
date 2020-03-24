package com.tco.server;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class RequestDistance extends RequestHeader  {
    protected Place place1;
    protected Place place2;
    protected Double earthRadius;
    protected Long distance;

    private final transient Logger log = LoggerFactory.getLogger(RequestDistance.class);

    RequestDistance() {
        this.requestType = "distance";
        this.requestVersion = RequestHeader.CURRENT_SUPPORTED_VERSION;
    }

    @Override
    public void buildResponse() {
        double lng1 = place1.getLng();
        double lat1 = place1.getLat();
        double lng2 = place2.getLng();
        double lat2 = place2.getLat();
        Utility util = new Utility();
        this.distance = util.getDistance(lng1, lat1, lng2, lat2, earthRadius);
        log.trace("buildResponse -> {}", this);
    }

}
