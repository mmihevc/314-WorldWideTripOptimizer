import './enzyme.config.js';
import React from 'react';
import {shallow} from 'enzyme';

import About from '../src/components/About/About';
import {JACKIE_BIO, KAIS_BIO, KEVIN_BIO, MADDIE_BIO, TEAM_STATEMENT} from '../src/components/Constants';
import {simulateOnClick} from "./buttonClick";

const about = shallow(<About />);

function testBioChange() {
    let initialBioValue = about.state().bio;
    expect(initialBioValue).toEqual(TEAM_STATEMENT);

    testBioAfterClick(0, KEVIN_BIO);
    testBioAfterClick(0, TEAM_STATEMENT);
    testBioAfterClick(1, MADDIE_BIO);
    testBioAfterClick(2, KAIS_BIO);
    testBioAfterClick(3, JACKIE_BIO);
    testBioAfterClick(3, TEAM_STATEMENT);
}

function testBioAfterClick(bioIndex, bioText) {
    simulateOnClick(about.find('Card').at(bioIndex), about);
    let clickToggleValue = about.state().bio;
    expect(clickToggleValue).toEqual(bioText);
}

test("Testing About's Bio Buttons", testBioChange);