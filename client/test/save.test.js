import './enzyme.config.js';
import {getGeoJSON, saveSVG} from '../src/utils/save';
import React from 'react';
import {mount} from "enzyme";
import Atlas from "../src/components/Atlas/Atlas";
import {simulateOnClick} from "./buttonClick";

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

function testSaveSVG() {
    const app = mount(<Atlas/>);
    const instance = app.instance();
    let svg = saveSVG(instance.leafletMap.leafletElement, true);
    let expectedSVG = "<?xml version=\"1.0\" standalone=\"no\"?><!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\"   \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\"><svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink= \"http://www.w3.org/1999/xlink\" width=\"0\" height=\"0\"></svg>";
    expect(svg).toEqual(expectedSVG);
}
test("testing save as SVG", testSaveSVG);
