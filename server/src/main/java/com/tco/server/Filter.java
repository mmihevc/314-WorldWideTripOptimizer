package com.tco.server;

public class Filter {

    protected String response;
    protected String type;
    protected String where;

    Filter(){
        this.response="1";
        this.type="airport";
        this.where="country";
    }
    Filter(String response, String type, String where){
        this.response=response;
        this.type=type;
        this.where=where;
    }
}
