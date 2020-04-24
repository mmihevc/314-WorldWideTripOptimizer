package com.tco.server;

import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class TestThreePoint {
    private final static Logger log = LoggerFactory.getLogger(twoPointOptimization.class);

    public void testTwoPoint(){
        Place[] atrip = new Place[6];
        Place[] btrip = new Place[6];
        atrip[0] = new Place("45.415498", "6.634682", "Courchevel Tourisme");
        atrip[1] = new Place("47.137390", "10.269852", "St Anton am Arlberg");
        atrip[2] = new Place("40.635036", "-111.476452", "Deer Valley Resort");
        atrip[3] = new Place("50.115088", "-122.948647", "Whistler Blackcomb");
        atrip[4] = new Place("45.933915", "7.629187", "Cervinia Valtournenche");
        atrip[5] = new Place("-37.124956", "146.447541", "Mount Buller");
        btrip[0]=atrip[0];
        btrip[1]=atrip[2];
        btrip[2]=atrip[3];
        btrip[3]=atrip[4];
        btrip[4]=atrip[5];
        btrip[5]=atrip[1];
        threePointOptimization.optimize(atrip);

        for (Place place: atrip) {
            log.error(place.name);
        }

        //assertArrayEquals("msg", atrip, btrip);
    }

}
