package com.tco.server;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class RequestFind extends RequestHeader {
    protected Filter filters;
    protected RequestConfig config;

    private final transient Logger log = LoggerFactory.getLogger(RequestFind.class);

    @Override
    public void buildResponse() {
        log.trace("buildResponse -> {}", this);
    }
}
