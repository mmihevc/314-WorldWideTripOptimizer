package com.tco.server;

public class Option {
    protected String earthRadius;
    protected String title;
    protected Optimization optimization;
    protected Filter filter;


    Option(String earthRadius, String title){
        this.earthRadius=earthRadius;
        this.title=title;
        this.optimization=new Optimization();
    }
    Option(String earthRadius, String title, String response, String construction, String improvement){
        this.earthRadius=earthRadius;
        this.title=title;
        this.optimization=new Optimization(response, construction, improvement);
    }
}
