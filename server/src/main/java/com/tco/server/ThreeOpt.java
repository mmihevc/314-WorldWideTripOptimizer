package com.tco.server;


public class ThreeOpt {

    //need to write three op swap exchange what is first and what is second
    //exchange what is between i+1 and j, j+1 and k swap front to back

    //copy and paste two opt if statement 6 more times

    //2opt reverse in if statements or just a swap  or just a reverse

    //do I want to find best delta and be done or stop at the first best
    //seven ifs from bottom to top

    public static void twoOptReverse(Place[] route, int i1, int k) { // reverse in place
        while(i1 < k) {
            Place temp = route[i1];
            route[i1] = route[k];
            route[k] = temp;
            i1++; k--;
        }
    }

    public static void threeOptSwap(Place[] route, int i1, int j, int k) {

    }

    public static Place[] threeOpt(Place[] place) {
        boolean improvement = true;
        while (improvement) {
            improvement = false;
            //n is the length place.length
            //might have to modify the indexing
            for (int i= 0; i<= place.length-3; i++) {
                for (int j = i; j < place.length-2; j++) {
                    for (int k = j; k <= place.length-1; k++) {
                        // several deltas with their route changes.
                        //i | j+1 --> k | i+1 --> j | k+1
                        //swap
                        long d1 = -Utility.getDistance(place[i],place[i+1],3958.8)-Utility.getDistance(place[j],place[j+1],3958.8)-Utility.getDistance(place[k], place[k+1],3958.8)+Utility.getDistance(place[i],place[k+1],3958.8)+Utility.getDistance(place[i+1],place[j], 3958.8)+Utility.getDistance(place[j+1], place[k], 3958.8);
                        if (d1 < 0) { //improvement?
                            threeOptSwap(place, i+1, j+1, k);
                            improvement = true;
                        }
                        //i | j+1 --> k | j <-- i+1 | k+1
                        //reverse (j <-- i+1) then swap
                        long d2 = 0;
                        if (d2 < 0) {
                            twoOptReverse(place, i+1, j);
                            threeOptSwap(place, i, j, k);
                            improvement = true;
                        }
                        //i | k <-- j+1 | i+1 --> j | k+1
                        //reverse (k <-- j+1) then swap
                        long d3 = 0;
                        if (d3 < 0) {
                            twoOptReverse(place, k, j+1);
                            threeOptSwap(place, i, j, k);
                            improvement = true;
                        }
                        //i | j <-- i+1 | k <-- j+1 | k+1
                        //reverse?
                        long d4 = 0;
                        if (d4 < 0) {
                            twoOptReverse(place, j, i+1);
                            twoOptReverse(place, k, j+1);
                            improvement = true;
                        }
                        //i | k <-- j+1 | j <-- i+1 | k+1
                        //swap
                        long d5 = 0;
                        if (d5 < 0) {
                            threeOptSwap(place, i, j, k);
                            threeOptSwap(place, i, j, k);
                            improvement = true;
                        }
                        //i | i+1 --> j | k <-- j+1 | k+1
                        //reverse
                        long d6 = 0;
                        if (d6 < 0) {
                            twoOptReverse(place, k, j+1);
                            improvement = true;
                        }
                        //i | j <-- i+1 | j+1 --> k | k+1
                        //reverse
                        long d7 = 0;
                        if (d7 < 0) {
                            twoOptReverse(place, j, i+1);
                            improvement = true;
                        }
                    }
                 }
             }
         }
        return place;
    }
}
