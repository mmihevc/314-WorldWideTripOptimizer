package com.tco.server;

import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.*;

public class TestPlace {
    private Place place;

    @Before
    public void createPlaceForTestCases() {
        place = new Place("20.24", "50.12", "place");
    }

    @Test
    public void testLat() {
        assertEquals("place lat", place.getLat(), 20.24, 0.000001);
    }

    @Test
    public void testLng() {
        assertEquals("place lng", place.getLng(), 50.12, 0.000001);
    }

}
