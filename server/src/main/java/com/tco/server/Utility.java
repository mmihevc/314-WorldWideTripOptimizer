package com.tco.server;
import java.lang.Math;
public class Utility {

    long getDistance(double long1, double lat1, double long2, double lat2, int earthradius) {
        double f = 1 / 298.257223563;
        //System.out.println("long "+long1);
        //System.out.println("lat "+lat1);
        //System.out.println("long "+long2);
        //System.out.println("lat "+lat2);
        double DL = Math.toRadians(long2 - long1);
        double U1 = Math.atan((1 - f) * Math.tan(Math.toRadians(lat1)));
        double U2 = Math.atan((1 - f) * Math.tan(Math.toRadians(lat2)));
        double sinU1 = Math.sin(U1);
        double sinU2 = Math.sin(U2);
        double cosU1 = Math.cos(U1);
        double cosU2 = Math.cos(U2);
        double cosDL = Math.cos(DL);
        double sinDL = Math.sin(DL);
        double top = Math.sqrt(Math.pow(cosU2 * sinDL, 2) + Math.pow(cosU1 * sinU2 - sinU1 * cosU2 * cosDL, 2));
        double bottom = sinU1 * sinU2 + cosU1 * cosU2 * cosDL;
        double distance = Math.atan2(top, 1 / bottom) * earthradius;
        return Math.round(distance);
    }
}
