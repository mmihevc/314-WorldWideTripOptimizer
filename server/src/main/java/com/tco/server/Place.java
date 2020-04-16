package com.tco.server;

public class Place {
    public String latitude;
    public String longitude;
    public String name;

    Place(String latitude, String longitude, String name) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.name = name;
    }

    double getLat() {
        return Double.parseDouble(this.latitude);
    }

    double getLng() {
        return Double.parseDouble(this.longitude);
    }

}
