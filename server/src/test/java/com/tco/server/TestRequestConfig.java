package com.tco.server;

import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.*;

/** Verifies the operation of the TIP config class and its buildResponse method.
 */
public class TestRequestConfig {
  private RequestConfig conf;

  @Before
  public void createConfigurationForTestCases(){
    conf = new RequestConfig();
    conf.buildResponse();
  }

  @Test
  public void testType() {
    String type = conf.getType();
    assertEquals("config requestType", "config", type);
  }

  @Test
  public void testVersion() {
    int version = conf.getVersion();
    assertEquals("config requestVersion", RequestHeader.CURRENT_SUPPORTED_VERSION, version);
  }

  @Test
  public void testServerName() {
    String name = conf.getServerName();
    assertEquals("config name", "t11 [hip, hip]", name);
  }

  @Test
  public void testSupportedRequests() {
    String[] supportedRequests = conf.getSupportedRequests();
    String assertMessage = "config supportedRequests";
    assertArrayEquals(assertMessage, new String[]{"config", "distance", "trip"}, supportedRequests);
  }
}
