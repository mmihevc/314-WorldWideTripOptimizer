import {isJsonResponseValid, sendServerRequestWithBody} from "./restfulAPI";
import {HTTP_OK, PROTOCOL_VERSION} from "../components/Constants";
import * as tripSchema from "../../schemas/TripResponse";
import * as distanceSchema from "../../schemas/DistanceResponse";

export function tripCall(destinations, rad, port, callback, response , construction, improvement){
    if(response.length==0) response="1";
    if(construction.length==0) construction="none";
    if(improvement.length==0) improvement="none";
    let values = {
        requestVersion: PROTOCOL_VERSION,
        requestType: 'trip',
        options: { earthRadius: rad, optimization: { response: response, construction: construction, improvement: improvement},},
        places: [], distances: [],
    };
    for (let i=0; i < destinations.length; i++) {
        values.places[i] = {
            name: destinations[i].name,
            latitude: destinations[i].lat.toString(),
            longitude: destinations[i].lng.toString(),
        }
    }
    let d1 = new Date();
    sendServerRequestWithBody('trip', values, port).then(
        atrip => processTripResponse(atrip, callback)).then(
        function(){let d2=new Date();
            let seconds = d2.getSeconds()-d1.getSeconds();
            let ms=d2.getMilliseconds()-d1.getMilliseconds();
            alert(seconds*1000 + ms)}).then(
    )


}

function processTripResponse(atrip, callback){
    if (!isJsonResponseValid(atrip.body, tripSchema)){
        alert('error fetching trip')
    } else if (atrip.statusCode === HTTP_OK){
        callback(atrip.body.distances);
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
