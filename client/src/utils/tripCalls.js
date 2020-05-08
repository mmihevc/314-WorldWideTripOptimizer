import {isJsonResponseValid, sendServerRequestWithBody} from "./restfulAPI";
import {HTTP_OK, PROTOCOL_VERSION} from "../components/Constants";
import * as tripSchema from "../../schemas/TripResponse";
import * as distanceSchema from "../../schemas/DistanceResponse";
import {goToDestinations} from "../components/Atlas/Atlas"
export function tripCall(destinations, rad, port, callback, optOptions){
    let values = tripToJSON(destinations, rad, optOptions);
    let d1 = new Date();
    sendServerRequestWithBody('trip', values, port).then(
        atrip => processTripResponse(atrip, callback)).then(
        function(){let d2=new Date();
            let seconds = d2.getSeconds()-d1.getSeconds();
            let ms=d2.getMilliseconds()-d1.getMilliseconds();
            //alert(seconds*1000 + ms);
            });

}

export function tripToJSON(destinations, rad, optOptions) {
    if(optOptions.response.length == 0) optOptions.response="1";
    if(optOptions.construction.length == 0) optOptions.construction="none";
    if(optOptions.improvement.length == 0) optOptions.improvement="none";
    let values = {
        requestVersion: PROTOCOL_VERSION,
        requestType: 'trip',
        options: { earthRadius: rad, optimization: {
            response: optOptions.response,
            construction: optOptions.construction,
            improvement: optOptions.improvement},
        },
        places: [], distances: [],
    };
    for (let i=0; i < destinations.length; i++) {
        values.places[i] = {
            name: destinations[i].name,
            latitude: destinations[i].lat.toString(),
            longitude: destinations[i].lng.toString(),
        }
    }

    return values;
}

function processTripResponse(atrip, callback){
    if (!isJsonResponseValid(atrip.body, tripSchema)){
        alert('error fetching trip')
    }
    else if (atrip.statusCode === HTTP_OK){
        callback(atrip.body)
        //atrip.then(goToDestinations(atrip.body.places));
        return atrip;
    }
}

export function distanceCall(place1, place2, rad, port) {
    const values = {
        requestVersion: PROTOCOL_VERSION,
        requestType: 'distance',
        place1 : {
            longitude: place1.lng,
            latitude: place1.lat
        },
        place2 : {
            longitude: place2.lng,
            latitude: place2.lat
        },
        earthRadius: rad
    };
    sendServerRequestWithBody('distance', values, port).then(
        adistance => {
            this.processDistanceResponse(adistance);
            alert("the distance between your points is: "+adistance.body.distance);
        }
    );
}

function processDistanceResponse(adistance){
    if (!isJsonResponseValid(adistance.body, distanceSchema)){
        alert('error fetching distance')
    } else if (adistance.statusCode === HTTP_OK){
        return adistance;
    }
}
