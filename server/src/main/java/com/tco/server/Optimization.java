package com.tco.server;

public class Optimization {
    protected String response;
    protected String construction;
    protected String improvement;

    Optimization(){
        this.response="1";
        this.construction="none";
        this.improvement="none";
    }
    Optimization(String response, String construction, String improvement){
        this.response=response;
        this.construction=construction;
        this.improvement=improvement;
    }

}
