import './enzyme.config.js';
import React from 'react';
import {mount, shallow} from 'enzyme';

import Atlas from '../src/components/Atlas/Atlas';
import {simulateOnClick} from "./buttonClick";

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

function testUpdateRoundTripDistance() {
  const app = mount(<Atlas/>);
  const instance = app.instance();
  let position = {
    latitude: 5,
    longitude: 6
  };
  instance.setUserLocation(position);
  app.update();
  //simulateOnClick(app.find('Button[children="Add to trip"]'), app);
}
test("Testing updateRoundTripDistance", testUpdateRoundTripDistance);
