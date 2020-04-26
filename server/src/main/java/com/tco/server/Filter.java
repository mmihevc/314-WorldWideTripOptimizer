package com.tco.server;

public class Filter {

    protected String response;
    protected String type;
    protected String where;

    Filter(){
        this.response="1"; //check this number
        this.type="airport"; //["airport", "balloon", "helicopter"]
        this.where="country"; //["country", "country and region", "country and region and municipality", "region name or municipality"]
    }
    Filter(String response, String type, String where){
        this.response=response;
        this.type=type;
        this.where=where;
    }
}
