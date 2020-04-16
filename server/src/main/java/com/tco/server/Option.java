package com.tco.server;

public class Option {
    protected String earthRadius;
    protected String title;
    protected Optimization optimization;


    Option(String earthRadius, String title){
        this.earthRadius=earthRadius;
        this.title=title;
        this.optimization=new Optimization();
        //this.response=1;
        //this.improvement="none";
        //this.construction="none";
    }
    Option(String earthRadius, String title, String response, String construction, String improvement){
        this.earthRadius=earthRadius;
        this.title=title;
        this.optimization=new Optimization();
        this.optimization.response=response;
        this.optimization.improvement=improvement;
        this.optimization.construction=construction;
    }
}
