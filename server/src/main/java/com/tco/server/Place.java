package com.tco.server;

public class Place {
    public String latitude;
    public String longitude;

    Place(String latitude, String longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }

    double getLat() {
        return Double.parseDouble(this.latitude);
    }

    double getLng() {
        return Double.parseDouble(this.longitude);
    }
}
