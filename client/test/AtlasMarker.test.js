import './enzyme.config.js';
import React from 'react';
import {shallow} from 'enzyme';

import AtlasMarker from '../src/components/Atlas/AtlasMarker';
import {Popup} from "react-leaflet";

function testMarker() {
    const noMarker = shallow(<AtlasMarker pan={true} name={"marker"}/>);
    const marker = shallow(<AtlasMarker position={{lat: 4, lng: 5}} pan={true} name={"marker"}/>);

    expect(noMarker.find(Popup).length).toBe(0);
    expect(marker.find(Popup).length).toBe(1);
}
test("testing AtlasMarker rendering", testMarker);