package com.tco.server;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class RequestFind extends RequestHeader {
    protected Filter filters;

    private final transient Logger log = LoggerFactory.getLogger(RequestFind.class);

    @Override
    public void buildResponse() {
        if(filters.type.equals("airport")){ /*do something*/}
        if(filters.type.equals("balloon")){ /*do something*/}
        if(filters.type.equals("helicopter")){ /*do something*/}
        if(filters.where.equals("country")){ /*do something*/}
        if(filters.where.equals("country and region")){ /*do something*/}
        if(filters.where.equals("country and region and municipality")){ /*do something*/}
        if(filters.where.equals("region name or municipality")){ /*do something*/}
        log.trace("buildResponse -> {}", this);
    }
}
