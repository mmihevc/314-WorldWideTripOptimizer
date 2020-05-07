package com.tco.server;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class RequestTrip extends RequestHeader {

    protected Option options;
    protected Place[] places;
    protected Long[] distances;

    private final transient Logger log = LoggerFactory.getLogger(RequestTrip.class);

    @Override
    public void buildResponse() {
        //if 3opt return 400
        long start = System.nanoTime();
        long[][] distanceMatrix = NearestNeighbor.buildDistanceMatrix(places);
        long time = Long.parseLong(this.options.optimization.response) * (long)Math.pow(10, 9);
        this.distances = new Long[places.length];
        double index = Math.pow((double)this.places.length/60, 1.25);
        int response = Integer.parseInt(this.options.optimization.response);
        if(response < index){
            this.expired();
            return;
        } 
        if (this.options.optimization.construction.equals("one"))
            this.places = NearestNeighbor.nearestNeighbor(this.places, distanceMatrix, (long)(getTime(time, start)*0.75));
            if(getTime(time, start) < response * 0.25){
                this.expired();
                return;
            }
        if (this.options.optimization.improvement.equals("2opt"))
            this.places = twoPointOptimization.optimize(this.places, distanceMatrix, (long)(getTime(time, start)*0.75));
            if(getTime(time, start) < response * 0.25){
                this.expired();
                return;
            }

        else if (this.options.optimization.improvement.equals("3opt")) {
                this.places = threePointOptimization.optimize(this.places, distanceMatrix, (long)(getTime(time, start)*0.75));
                if (getTime(time, start) < response * 0.25) {
                    this.expired();
                    return;
                }
            }
        this.expired();
    }

    long getTime(long time, long start){
        long MyTime= time - (System.nanoTime() - start);
        return MyTime;
    }

    void expired(){
        this.distances = new Long[places.length];
        double radius = Double.parseDouble(options.earthRadius);
        for (int i = 1; i < places.length; i++)
            getDistance(i, radius);
        distanceBetweenFirstAndLast(radius);
        log.trace("buildResponse -> {}", this);
    }

    void getDistance(int index, double radius) {
        this.distances[index - 1] = Utility.getDistance(places[index-1], places[index], radius);
    }

    void distanceBetweenFirstAndLast(double radius) {
        if (distances.length > 0)
            this.distances[distances.length - 1] = Utility.getDistance(places[0], places[places.length-1], radius);
    }

}
