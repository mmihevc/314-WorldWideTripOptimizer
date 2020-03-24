import React, {Component} from "react";
import {Polyline} from "react-leaflet";

export default class AtlasLine extends Component {

    render() {
        let line = [this.props.start, this.props.finish];
        if (!this.lineCrossesMeridian(line)) {
            return <Polyline color="darkgreen" positions={line}/>;
        } else {
            let lat2 = this.calculateWrappingLat(this.props.start, this.props.finish);
            let line1 = [this.props.start, {lat: lat2, lng: 180}];
            let line2 = [this.props.finish, {lat: lat2, lng: 180}];
            if (this.props.start.lng < 0)
                line1[1].lng = -180;
            if (this.props.finish.lng < 0)
                line2[1].lng = -180;
            let components = [];
            components.push(<Polyline color="darkgreen" positions={line1} key="line1"/>);
            components.push(<Polyline color="darkgreen" positions={line2} key="line2"/>);
            return components;
        }
    }

    calculateWrappingLat(start, finish) {
        let latDiff = (start.lat - finish.lat)
        let lngDiff1 = 180 - Math.abs(start.lng);
        let lngDiff2 = 180 - Math.abs(finish.lng);
        let lat2 = start.lat - (latDiff/2)*(lngDiff1 / ((lngDiff1 + lngDiff2)/2));
        if (start.lat === finish.lat) {
            lat2 = start.lat;
        }
        return lat2;
    }

    lineCrossesMeridian(line) {
        return Math.abs(line[0].lng - line[1].lng) >= 180;
    }

}