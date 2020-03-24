import {isJsonResponseValid, sendServerRequestWithBody} from "../../utils/restfulAPI";
import {HTTP_OK, PROTOCOL_VERSION} from "../Constants";
import * as tripSchema from "../../../schemas/TripResponse";
import * as distanceSchema from "../../../schemas/DistanceResponse";

export function tripCall(destinations, rad, port, callback){
    let values = {
        requestVersion: PROTOCOL_VERSION,
        requestType: 'trip',
        options: {
            earthRadius: rad,
        },
        places: [],
        distances: [],
    };
    for (let i=0; i < destinations.length; i++) {
        values.places[i] = {
            name: destinations[i].name,
            latitude: destinations[i].lat.toString(),
            longitude: destinations[i].lng.toString(),
        }
    }
    sendServerRequestWithBody('trip', values, port).then(
        atrip => processTripResponse(atrip, callback)
    );
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
