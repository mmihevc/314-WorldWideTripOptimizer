import './enzyme.config.js';
import React from 'react';
import {shallow} from 'enzyme';

import Itinerary from '../src/components/Atlas/Itinerary';
import {Table, Button} from "reactstrap";

function testItinerary() {
    const itinerary = shallow(<Itinerary destinations={[
        {name: "test1", lat:0, lng:0},
        {name: "test2", lat:7, lng:8},
        {name: "test3", lat:12, lng:-4},
        {name: "test4", lat:5, lng:20},
        ]}/>);
    expect(itinerary.find(Table).length).toBe(0);
    simulateOnClick(itinerary.find(Button), itinerary);
    expect(itinerary.find(Table).length).toBe(1);
}
test("testing Itinerary", testItinerary);

function simulateOnClick(button, parentWrapper) {
    button.simulate('click');
    parentWrapper.update();
}