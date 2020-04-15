package com.tco.server;

public class twoPointOptimization {
    //public static long distances[][];

    public static Place[] optReverse(Place route[], int i1, int k) { // reverse in place
        while(i1 < k) {
            Place temp = route[i1];
            route[i1] = route[k];
            route[k] = temp;
            i1++; k--;
        }
        return route;
    }
    /*
    public static long dis(Place route[], int l, int k) {
        long distance = 0;
        Boolean neg=false;
        if(l>k) {
            neg=true;
            int temp=l;
            l=k;
            k=temp;
        }
        distance=distance+distances[l][k];
        if(neg) {
            distance=-distance;
        }
        return distance;
    }
    */
    public static Place[] optimize(Place route[], double radius) {
        Place mytrip[]= new Place[route.length+1];
        for(int j=0;j<route.length;j++){
            mytrip[j]=route[j];
        }
        mytrip[mytrip.length-1]=route[0];
        route=mytrip;
        int n=route.length-1;
        Boolean improvement = true;
        while(improvement) {
            improvement = false;
            for (int i = 0; i <= n-3; i++) {  // assert n>4
                for (int k = i + 2; k <= n-1; k++) {
                    double delta = -Utility.getDistance(route[i], route[i+1], radius)-Utility.getDistance(route[k], route[k+1], radius)+Utility.getDistance(route[i], route[k], radius)+Utility.getDistance(route[i+1], route[k+1], radius);
                    //double delta = -dis(route,i,i+1)-dis(route,k,k+1)+dis(route,i,k)+dis(route,i+1,k+1);
                    if (delta < 0) { //improvement?
                        route=optReverse(route, i+1, k);
                        improvement = true;
                    }
                }
            }
        }
        mytrip=new Place[route.length-1];
        for(int j=0;j<mytrip.length;j++){
            mytrip[j]=route[j];
        }
        return mytrip;
    }
}
