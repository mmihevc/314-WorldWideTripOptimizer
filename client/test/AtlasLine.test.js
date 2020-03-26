import './enzyme.config.js';
import React from 'react';
import {shallow} from 'enzyme';

import AtlasLine from '../src/components/Atlas/AtlasLine';
import {Polyline} from "react-leaflet";

function testLineWrap() {
    const lineWrapped = shallow(<AtlasLine start={{lat: 10, lng: 120}} finish={{lat: -10, lng: -120}}/>);
    const lineNoWrap = shallow(<AtlasLine start={{lat: 10, lng: 120}} finish={{lat: -10, lng: 128}}/>);

    expect(lineWrapped.find(Polyline).length).toBe(2);
    expect(lineNoWrap.find(Polyline).length).toBe(1);
}
test("testing AtlasLine wrapping", testLineWrap);