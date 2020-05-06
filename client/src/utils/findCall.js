import {HTTP_OK, PROTOCOL_VERSION} from "../components/Constants";
import * as findSchema from "../../schemas/FindResponse";
import {isJsonResponseValid, sendServerRequestWithBody} from "./restfulAPI";

export function findCall(match, limit, type, where, found = 1, port) {
    let values = {
        requestVersion: PROTOCOL_VERSION,
        requestType: 'find',
        match: match, //from the search box
        limit: limit, //we might want to get this from the user
        found: found, //I do not believe we can define this ourselves
        narrow: [], //this comes from the config request I believe
        places: [] //contains fields for name, latitude, longitude, id, altitude, municipality, type, region, country, continent
    }

    //use a for loop to fill places from the database?

    sendServerRequestWithBody('find', values, port).then(
        aTrip => processFindResponse(aTrip)
    );
}

function processFindResponse(aTrip, callback){
    if (!isJsonResponseValid(aTrip.body, findSchema)){
        alert('error fetching find')
    }
    else if (aTrip.statusCode === HTTP_OK){
        callback(aTrip.body)
        return aTrip;
    }
}