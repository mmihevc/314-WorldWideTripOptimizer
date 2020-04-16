package com.tco.server;

public abstract class RequestHeader {

  protected final static int CURRENT_SUPPORTED_VERSION = 4;

  protected Integer requestVersion;
  protected String requestType;

  public abstract void buildResponse();
}
