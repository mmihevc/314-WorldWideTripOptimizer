package com.tco.server;

public class Filter {

    protected String[] type;
    protected String[] where;

    Filter(){
        this.type= new String[]{"airport", "heliport", "balloonport"};
        this.where= new String[]{"more..."};
    }
    Filter(String[] type, String[] where){
        this.type=type;
        this.where=where;
    }

    public String[] getType() {
        return this.type;
    }

    public String[] getWhere() {
        return this.where;
    }
}
