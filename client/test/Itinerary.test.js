import './enzyme.config.js';
import React from 'react';
import {shallow} from 'enzyme';

import Itinerary from '../src/components/Atlas/Itinerary';
import {Table, Button} from "reactstrap";

function testItinerary() {
    const itinerary = shallow(<Itinerary destinations={[{name: "test", lat:0, lng:0}]}/>);
    expect(itinerary.find(Table).length).toBe(0);
    simulateOnClick(itinerary.find(Button), itinerary);
    expect(itinerary.find(Table).length).toBe(1);
}
test("testing Itinerary", testItinerary);

function simulateOnClick(button, parentWrapper) {
    button.simulate('click');
    parentWrapper.update();
}