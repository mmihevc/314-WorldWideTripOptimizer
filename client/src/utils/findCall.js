import {HTTP_OK, PROTOCOL_VERSION} from "../components/Constants";
import * as findSchema from "../../schemas/FindResponse";
import {isJsonResponseValid, sendServerRequestWithBody} from "./restfulAPI";

export function findCall(match, limit, type, where, found = 1, port) {
    let values = {
        requestVersion: PROTOCOL_VERSION,
        requestType: 'find',
        match: match,
        narrow: [],
        limit: limit,
        found: found,
        places: []
    }
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