import React, {Component} from "react";
import {Polyline} from "react-leaflet";
import {getLines} from '../../utils/dateline';

export default class AtlasLine extends Component {

    render() {
        let lines = getLines(this.props.start, this.props.finish);
        if (lines.length === 0)
            return null;
        let components = [];
        for (let i=0; i < lines.length; i++)
            components.push(<Polyline color="darkgreen" positions={lines[i]} key={"line"+i}/>);
        return components;
    }

}