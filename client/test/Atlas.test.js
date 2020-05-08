import './enzyme.config.js';
import React from 'react';
import {mount, shallow} from 'enzyme';

import Atlas from '../src/components/Atlas/Atlas';
import {simulateOnClick} from "./buttonClick";
import {PROTOCOL_VERSION} from "../src/components/Constants";

function testInitialAppState() {
  const app = shallow(<Atlas />);

  let actualMarkerPosition = app.state().markerPosition;
  let actualMapCenter = app.state().centerPosition;

  let expectedMarkerPosition = null;
  let expectedMapCenter = [0, 0];

  expect(actualMarkerPosition).toEqual(expectedMarkerPosition);
  expect(actualMapCenter).toEqual(expectedMapCenter);
}
test("Testing Atlas's Initial State", testInitialAppState);

function testStateChanges() {
  const app = shallow(<Atlas />);

  let userLocation = app.state().userLocation;
  let expectedUserLocation = null;

  expect(userLocation).toEqual(expectedUserLocation);

}
test("Testing Atlas State Changes", testStateChanges);

function testGetInput() {
  const app = shallow(<Atlas />);
  const instance = app.instance();
  let getInput = instance.getInput();
  let expected = {"coord": undefined, "name": undefined};

  expect(getInput).toEqual(expected);
}
test("Testing Get Input", testGetInput);

function testChangeStartingLocation() {
  const app = shallow(<Atlas/>);
  simulateOnClick(app.find('Button[children="+"]'), app);
  simulateOnClick(app.find('Button[children="+"]'), app);
  simulateOnClick(app.find('Button[children="+"]'), app);
  expect(app.state().numInputs).toEqual(3);
}
test("Testing Atlas's changeStartDestination", testChangeStartingLocation);

function testGoToUserLocation() {
  const app = mount(<Atlas/>);
  const instance = app.instance();
  let position = {
    latitude: 5,
    longitude: 6
  };
  instance.setUserLocation(position);
  expect(app.state('userLocation')).toBe(position);
}
test("Testing Atlas goToUserLocation", testGoToUserLocation);

function testDetermineOldTrip() {
  const app = mount(<Atlas/>);
  const instance = app.instance();
  let jsonOld = { requestVersion: 4 };
  let jsonNew = { requestVersion: PROTOCOL_VERSION };
  let csvOld = {  data: [ {requestVersion: "3"} ] };
  let csvNew = {  data: [ {requestVersion: PROTOCOL_VERSION.toString()} ] };

  let jsonOldResult = instance.determineOldTrip("json", jsonOld);
  let jsonNewResult = instance.determineOldTrip("json", jsonNew);
  let csvOldResult = instance.determineOldTrip("csv", csvOld);
  let csvNewResult = instance.determineOldTrip("csv", csvNew);

  expect(jsonOldResult).toBe(true);
  expect(jsonNewResult).toBe(false);
  expect(csvOldResult).toBe(true);
  expect(csvNewResult).toBe(false);
}
test("Testing determineOldTrip", testDetermineOldTrip);

function testLoadTripDataJSON() {
  const app = mount(<Atlas/>);
  const instance = app.instance();
  let jsonData = {
    requestVersion: 5,
    requestType: "trip",
    options: {
      title: "Test JSON Data",
      earthRadius: 6371.0,
    },
    places: [ {name: "Courchevel Tourisme", latitude: "45.415498", longitude: "6.634682"} ]
  }
  instance.loadTripData(jsonData, "json");
  app.update();
  let destinations = app.state().destinations;
  let expectedDestinations = [{
    name: "Courchevel Tourisme",
    lat: 45.415498,
    lng: 6.634682
  } ]
  let numInputs = app.state().numInputs;
  expect(destinations).toEqual(expectedDestinations);
  expect(numInputs).toEqual(1);
}
test("Testing loadTripDataJSON", testLoadTripDataJSON);

function testLoadTripDataCSV() {
  const app = mount(<Atlas/>);
  const instance = app.instance();
  let csvData = {
    data: [ {requestVersion: PROTOCOL_VERSION.toString(), places__name: "Courchevel Tourisme", places__latitude: "45.415498", places__longitude: "6.634682"}, {} ]
  }
  instance.loadTripData(csvData, "csv");
  app.update();
  let destinations = app.state().destinations;
  let expectedDestinations = [{
    name: "Courchevel Tourisme",
    lat: 45.415498,
    lng: 6.634682
  } ]
  let numInputs = app.state().numInputs;
  expect(destinations).toEqual(expectedDestinations);
  expect(numInputs).toEqual(1);
}
test("Testing loadTripDataCSV", testLoadTripDataCSV);

function testReverseTrip() {
  const app = mount(<Atlas/>);
  const instance = app.instance();
  let jsonData = {
    requestVersion: PROTOCOL_VERSION,
    requestType: "trip",
    options: {
      title: "Test JSON Data",
      earthRadius: 6371.0,
    },
    places: [ {name: "Courchevel Tourisme", latitude: "45.415498", longitude: "6.634682"},
      {name: "Place 2", latitude: "6.88", longitude: "6.77"},
      {name: "Place 3", latitude: "9.88", longitude: "12.77"} ]
  }
  instance.loadTripData(jsonData, "json");
  instance.reverseTrip();
  app.update();

  let destinations = app.state().destinations;
  let expectedDestinations = [
    {name: "Place 3", lat: 9.88, lng: 12.77},
  {name: "Place 2", lat: 6.88, lng: 6.77},
    {name: "Courchevel Tourisme", lat: 45.415498, lng: 6.634682},
   ]
  expect(destinations).toEqual(expectedDestinations);
}
test("Testing testReverseTrip", testReverseTrip);

function testLoadTripDataCSV() {
  const app = mount(<Atlas/>);
  const instance = app.instance();
  let csvData = {
    data: [ {requestVersion: PROTOCOL_VERSION.toString(), places__name: "Courchevel Tourisme", places__latitude: "45.415498", places__longitude: "6.634682"}, {} ]
  }
  instance.loadTripData(csvData, "csv");
  app.update();
  let destinations = app.state().destinations;
  let expectedDestinations = [{
    name: "Courchevel Tourisme",
    lat: 45.415498,
    lng: 6.634682
  } ]
  let numInputs = app.state().numInputs;
  expect(destinations).toEqual(expectedDestinations);
  expect(numInputs).toEqual(1);
}
test("Testing loadTripDataCSV", testLoadTripDataCSV);

function testAddInputBox(){
  const app = mount(<Atlas/>);
  simulateOnClick(app.find('Button[children="+"]'), app);
  expect(app.state().numInputs).toEqual(1);
}
test("Testing addInputBox", testAddInputBox);