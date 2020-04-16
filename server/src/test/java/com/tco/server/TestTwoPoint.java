package com.tco.server;

import org.junit.Assert;
import org.junit.Test;
import static org.junit.Assert.*;

public class TestTwoPoint {
    @Test
    public void testTwoPoint(){
        long optimalDistance=0;
        long originalDistance=0;
        Place[] atrip = new Place[6];
        Place[] btrip = new Place[6];
        atrip[0] = new Place("45.415498", "6.634682", "Courchevel Tourisme");
        atrip[1] = new Place("47.137390", "10.269852", "St Anton am Arlberg");
        atrip[2] = new Place("40.635036", "-111.476452", "Deer Valley Resort");
        atrip[3] = new Place("50.115088", "-122.948647", "Whistler Blackcomb");
        atrip[4] = new Place("45.933915", "7.629187", "Cervinia Valtournenche");
        atrip[5] = new Place("-37.124956", "146.447541", "Mount Buller");
        btrip[0]=atrip[0];
        btrip[1]=atrip[4];
        btrip[2]=atrip[1];
        btrip[3]=atrip[5];
        btrip[4]=atrip[3];
        btrip[5]=atrip[2];
        atrip=twoPointOptimization.optimize(atrip, 6371.0);
        assertArrayEquals("msg", atrip, btrip);
    }
}
