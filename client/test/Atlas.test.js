import './enzyme.config.js';
import React from 'react';
import {mount, shallow} from 'enzyme';

import Atlas from '../src/components/Atlas/Atlas';
import {simulateOnClick} from "./buttonClick";

//const UNICODE_REVERSE_SYMBOL = '\u21B9';

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


function testChangeStartingLocation() {
  const app = shallow(<Atlas/>);
  simulateOnClick(app.find('Button[children="+"]'), app);
  simulateOnClick(app.find('Button[children="+"]'), app);
  simulateOnClick(app.find('Button[children="+"]'), app);
  expect(app.state().numInputs).toEqual(3);
}
test("Testing Atlas's changeStartDestination", testChangeStartingLocation);

function testReverseTrip() {
  const app = shallow(<Atlas/>);
  let oldDest = app.state().destinations(0);
  simulateOnClick(app.find('Button[children="Add to trip"]'), app);
  simulateOnClick(app.find('Button[children="Add to trip"]'), app);
  simulateOnClick(app.find('Button[children="Add to trip"]'), app);
  simulateOnClick(app.find('Button[children=\'\u21B9\']'), app);
  expect(app.state().numInputs).toEqual(3);
  expect(app.state().destinations(app.state().numInputs.length)).toEqual(oldDest);
}
test("Testing Atlas's ReverseTrip Function", testReverseTrip);

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

/*
function testUpdateRoundTripDistance() {
  const app = mount(<Atlas/>);
  const instance = app.instance();
  let position = {
    latitude: 5,
    longitude: 6
  };
  instance.setUserLocation(position);
  app.update();
  simulateOnClick(app.find('Button[children="Add to trip"]'), app);
}
test("Testing updateRoundTripDistance", testUpdateRoundTripDistance);
 */