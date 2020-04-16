import {getGeoJSON} from '../src/utils/save';

function testGetGeoJSON() {
    let destinations = [
        {name: "test1", lat:0, lng:0},
        {name: "test2", lat:7, lng:8},
    ];
    let geoJSON = getGeoJSON(destinations);
    let expectedJSON = {
        features: [
            {
                geometry: {
                    coordinates: [0, 0],
                    type: "Point"
                },
                properties: {
                    name: "test1"
                },
                type: "Feature"
            },
            {
                geometry: {
                    coordinates: [8, 7],
                    type: "Point"
                },
                properties: {
                    name: "test2"
                },
                type: "Feature"
            },
            {
                geometry: {
                    coordinates: [[0, 0], [8, 7]],
                    type: "LineString"
                },
                properties: {
                    name: ""
                },
                type: "Feature"
            },
            {
                geometry: {
                    coordinates: [[8, 7], [0, 0]],
                    type: "LineString"
                },
                properties: {
                    name: ""
                },
                type: "Feature"
            }
            ],
        type: "FeatureCollection"
    };

    expect(geoJSON).toEqual(expectedJSON);
}
test("testing getGeoJSON", testGetGeoJSON);