package com.tco.server;

import com.google.gson.Gson;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/** This class defines the Config response that provides the client
 * with server specific configuration information.
 *  
 * When used with restful API services,
 * An object is created from the request JSON by the MicroServer using GSON.
 * The buildResponse method is called to set the configuration information.
 * The MicroServer constructs the response JSON from the object using GSON.
 *  
 * When used for testing purposes,
 * An object is created using the constructor below.
 * The buildResponse method is called to set the configuration information.
 * The getDistance method is called to obtain the distance value for comparisons.
 */
public class RequestConfig extends RequestHeader {
  private String serverName;
  private String[] supportedRequests;
  private String[] filterType;
  private String[] filterWhere;
  private String[] construction;
  private String[] improvement;
  private OptimizationConfig optimization;
  private Filter filters;

  private final static String[] SUPPORTED_REQUESTS = {"config", "distance", "trip", "find"};

  private final transient Logger log = LoggerFactory.getLogger(RequestConfig.class);


  RequestConfig() {
    this.requestType = "config";
    this.requestVersion = RequestHeader.CURRENT_SUPPORTED_VERSION;
  }


  @Override
  public void buildResponse() {
    this.serverName = "t11 [hip, hip]";
    this.buildSupportedRequests();
    this.optimization = new OptimizationConfig();
    this.filters = new Filter();
    if (filters != null) {
      this.filterType = filters.type;
      //this.filterWhere = buildWhere();
    }
    if (optimization != null) {
      this.construction = optimization.construction;
      this.improvement = optimization.improvement;
    }
    log.trace("buildResponse -> {}", this);
  }

  //access the dbHandler class in this method to search the database
  private String[] buildWhere() {
    DbHandler query = new DbHandler();
    ArrayList<String> where = new ArrayList<>();

    //need to fill these with the data from the table using query
    String[] countries = query.getQuery("SELECT name FROM country", "name");
    where.addAll(Arrays.asList(countries));
    String[] regions = query.getQuery("SELECT name FROM region", "name");
    where.addAll(Arrays.asList(regions));
    String[] municipalities = query.getQuery("SELECT municipality FROM country", "municipality");


    //return where.toArray(new String[0]); //??
    return null;
  }

  private void buildSupportedRequests() {
      this.supportedRequests = SUPPORTED_REQUESTS;
  }

  String getServerName() {
    return this.serverName;
  }

  String getType() {
    return this.requestType;
  }

  Integer getVersion() {
    return this.requestVersion;
  }

  String[] getSupportedRequests() { return this.supportedRequests; }

  String[] getFilterType() { return this.filterType; }

  String[] getFilterWhere() { return this.filterWhere; }

  String[] getImprovement() { return this.improvement; }

  String[] getConstruction() { return this.construction; }

}

class OptimizationConfig {
    protected String[] construction = new String[]{"none", "one", "some"};
    protected String[] improvement = new String[]{"none", "2opt", "3opt"};
}