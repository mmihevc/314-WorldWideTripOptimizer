package com.tco.server;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class RequestDistance extends RequestHeader  {
    private Place place1;
    private Place place2;
    private Double earthRadius;
    private Integer distance;

    private final transient Logger log = LoggerFactory.getLogger(RequestDistance.class);

    RequestDistance() {
        this.requestType = "distance";
        this.requestVersion = RequestHeader.CURRENT_SUPPORTED_VERSION;
    }

    @Override
    public void buildResponse() {
        double lng1 = Double.parseDouble(this.place1.longitude);
        double lat1 = Double.parseDouble(this.place1.latitude);
        double lng2 = Double.parseDouble(this.place2.longitude);
        double lat2 = Double.parseDouble(this.place2.latitude);
        int radius = this.earthRadius.intValue();
        Utility util = new Utility();
        this.distance = (int) util.getDistance(lng1, lat1, lng2, lat2, radius);
        log.trace("buildResponse -> {}", this);
    }

    String getType() {
        return this.requestType;
    }

    Integer getVersion() {
        return this.requestVersion;
    }
}
