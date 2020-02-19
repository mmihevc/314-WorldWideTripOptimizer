package com.tco.server;
import java.lang.Math;
public class Utility {
    double getDistance(double long1, double lat1, double long2, double lat2, int earthradius) {
        double L1 = lat1 * Math.PI / 180;
        double L2 = lat2 * Math.PI / 180;
        double DY = Math.abs(long1 - long2) * Math.PI / 180;
        double distance = Math.acos(Math.sin(L1) * Math.sin(L2) + Math.cos(L1) * Math.cos(L2) * Math.cos(DY)) * earthradius;
        //alert("thedistance between your points is: " + distance);
        return distance;
    }
}
