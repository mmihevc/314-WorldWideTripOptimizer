package com.tco.server;

import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.*;

public class TestFilter {
    private Filter filter;

    @Before
    public void createFilterForTestCases() {
        filter = new Filter(new String[]{"airport", "heliport", "balloonport"}, new String[]{"more..."});
    }

    @Test
    public void testType() {
       assertArrayEquals(filter.getType(), new String[]{"airport", "heliport", "balloonport"});
    }

    @Test
    public void testWhere() {
        assertArrayEquals(filter.getWhere(), new String[]{"more..."});
    }
}
