import './enzyme.config.js';
import React from 'react';
import {shallow, mount} from 'enzyme';

import Atlas from '../src/components/Atlas/Atlas';
import {setInput} from "../src/utils/input";
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


function testChangeStartingLocation() {
  const app = shallow(<Atlas/>);
  simulateOnClick(app.find('Button[children="+"]'), app);
  simulateOnClick(app.find('Button[children="+"]'), app);
  simulateOnClick(app.find('Button[children="+"]'), app);
  expect(app.state().numInputs).toEqual(3);
}
test("Testing Atlas's changeStartDestination", testChangeStartingLocation);
