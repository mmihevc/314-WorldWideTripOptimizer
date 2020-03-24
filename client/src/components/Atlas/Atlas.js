import React, {Component} from 'react';
import {Col, Container, Row, Button, InputGroup,Input,Form,InputGroupAddon,InputGroupText, Alert, Table} from 'reactstrap';
import {Map, Marker, Polyline, Popup, TileLayer} from 'react-leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import Coordinates from 'coordinate-parser';
import {EARTH_RADIUS_UNITS_DEFAULT} from "../Constants";
import {tripCall} from "./tripCalls";
import {getCurrentLocation} from "./geolocation";

const MAP_BOUNDS = [[-90, -180], [90, 180]];
const MAP_CENTER_DEFAULT = [0, 0];
const MAP_LAYER_ATTRIBUTION = "&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors";
const MAP_LAYER_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const MAP_STYLE_LENGTH = 500;
const MAP_ZOOM_MAX = 17;
const MAP_ZOOM_MIN = 1;
const MARKER_ICON = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: [12, 40]  // for proper placement
});

export default class Atlas extends Component {

    constructor(props) {
        super(props);

        this.addMarker = this.addMarker.bind(this);
        this.markUserLocation = this.markUserLocation.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.goToDestinations = this.goToDestinations.bind(this);
        this.renderLongitudeLatitudeBox = this.renderLongitudeLatitudeBox.bind(this);
        this.renderDestination = this.renderDestination.bind(this);
        this.updateRoundTripDistance = this.updateRoundTripDistance.bind(this);

        this.state = {
            markerPosition: null,
            centerPosition: MAP_CENTER_DEFAULT,
            inputCoords: [],
            inputError: [],
            inputSubmitted: [],
            destinations: [],
            markerArray : [],
            numDestinations: 1,
            roundTripDistance: null,
            showItinerary: false
        };

        let i;
        for (i=0; i < this.state.numDestinations; i++)
            this.state.inputCoords[i] = '';

        getCurrentLocation(this.markUserLocation);
    }

    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col sm={12} md={{size: 6, offset: 3}}>
                            {this.renderLeafletMap()}
                            {this.renderHomeButton()}
                            {this.renderRoundTripDistance()}
                            {this.renderMultiple(this.state.numDestinations, this.renderLongitudeLatitudeBox)}
                            {this.renderAddDestinationButton()}
                            {this.renderSubmitButton()}
                        </Col>
                        <Col>
                            {this.renderItineraryButton()}
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }

    renderLeafletMap() {
        return (
            <Map ref={map => {this.leafletMap = map;}}
                 center={this.state.centerPosition}
                 zoom={MAP_ZOOM_MAX}
                 minZoom={MAP_ZOOM_MIN}
                 maxZoom={MAP_ZOOM_MAX}
                 maxBounds={MAP_BOUNDS}
                 onClick={this.addMarker}
                 style={{height: MAP_STYLE_LENGTH, maxWidth: MAP_STYLE_LENGTH}}>
                <TileLayer url={MAP_LAYER_URL} attribution={MAP_LAYER_ATTRIBUTION}/>
                {this.getMarker(this.getMarkerPosition(), this.state.markerPosition)}
                {this.renderMultiple(this.state.numDestinations, this.renderDestination)}
                {this.getLines(this.state.destinations)}
            </Map>
        )
    }

    renderRoundTripDistance() {
        if (this.state.roundTripDistance) {
            return (
                <Alert color="info" className="mt-2">Round Trip Distance: {this.state.roundTripDistance} miles</Alert>
            )
        }
    }

    getLines(markers) {
        if (markers.length < 2)
            return;
        let i;
        const components = [];
        for (i=0; i < markers.length-1; i++) {
            components.push(<div key={i}>{this.getLine(markers, i, i+1)}</div>)
        }
        if (markers.length > 2) {
            components.push(<div key="roundtrip">{this.getLine(markers, 0, markers.length - 1)}</div>)
        }
        return components;
    }

    getLine(markers, i1, i2) {
        let line = [markers[i1], markers[i2]];
        if (!this.lineCrossesMeridian(line)) {
            return <Polyline color="darkgreen" positions={line}/>;
        } else {
            let lat2 = this.calculateWrappingLat(markers, i1, i2);
            let line1 = [markers[i1], {lat: lat2, lng: 180}];
            let line2 = [markers[i2], {lat: lat2, lng: 180}];
            if (markers[i1].lng < 0)
                line1[1].lng = -180;
            if (markers[i2].lng < 0)
                line2[1].lng = -180;
            let components = [];
            components.push(<Polyline color="darkgreen" positions={line1} key="line1"/>);
            components.push(<Polyline color="darkgreen" positions={line2} key="line2"/>);
            return components;
        }
    }

    calculateWrappingLat(markers, i1, i2) {
        let latDiff = (markers[i1].lat - markers[i2].lat)
        let lngDiff1 = 180 - Math.abs(markers[i1].lng);
        let lngDiff2 = 180 - Math.abs(markers[i2].lng);
        let lat2 = markers[i1].lat - (latDiff/2)*(lngDiff1 / ((lngDiff1 + lngDiff2)/2));
        if (markers[i1].lat === markers[i2].lat) {
            lat2 = markers[i1].lat;
        }
        return lat2;
    }

    renderHomeButton() {
        return (
            <Button className="mt-1"
                    onClick={() => getCurrentLocation(this.markUserLocation)}>
                Where Am I?
            </Button>
        )
    }

    renderMultiple(numRenders, renderFunction) {
        const components = [];
        for (let i=0; i < numRenders; i++) {
            components.push(<div key={i}>{renderFunction(i)}</div>);
        }
        return components;
    }

    renderSubmitButton() {
        return (
            <Button className="ml-1" onClick={this.handleInputChange}>
                Submit
            </Button>
        )
    }

    renderLongitudeLatitudeBox(index) {
        return (
            <Form onSubmit={this.handleSubmit}>
                <br/>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>🌎</InputGroupText>
                    </InputGroupAddon>
                    <Input valid={this.state.inputError[index]}
                           invalid={!this.state.inputError[index] && (this.state.inputCoords[index] !== "")}
                           id={"longitudeLatitude"+index}
                           placeholder="Enter Longitude and Latitude Here"
                    />
                </InputGroup>
            </Form>
        )
    }

    renderItineraryButton() {
        if (this.state.showItinerary) {
            return (
                <Form>
                    <Button onClick={() => {this.setState({showItinerary: false})}}> Click to view itinerary</Button>
                    {this.renderItinerary()}
                </Form>
            )
        }
        else {
            return (
                <Form>
                    <Button onClick={() => {this.setState({showItinerary: true})}}> Click to view itinerary</Button>
                </Form>
            )
        }
    }

    renderItinerary() {
        return (
            <Table bordered>
                <thead>
                    <tr>
                        <th>Destination</th>
                        <th>Leg Distance</th>
                        <th>Cumulative Distance</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row"></th>
                    </tr>
                </tbody>
            </Table>
        )
    }

    renderAddDestinationButton() {
        return (
            <Button title="Add Destination"
                    onClick={() => {this.addDestination()}}>
                +
            </Button>
        )
    }

    addDestination() {
        this.state.inputCoords[this.state.numDestinations] = '';
        this.setState({
            numDestinations: this.state.numDestinations+1,
            inputCoords: this.state.inputCoords
        });
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    renderDestination(index){
        if (this.state.destinations[index]) {
            let cordString = this.state.destinations[index].lat.toFixed(2) + ", " +  this.state.destinations[index].lng.toFixed(2);
            return (
                <Marker position={this.state.destinations[index]} icon={MARKER_ICON}>
                    <Popup offset={[0, -18]} className="font-weight-bold">{cordString}</Popup>
                </Marker>
            );
        }
    };

    handleInputChange () {
        this.state.destinations = [];
        this.state.markerPosition = null;
        for (let i=0; i < this.state.numDestinations; i++) {
            this.state.inputCoords[i] = document.getElementById('longitudeLatitude' + i).value;
            this.state.inputSubmitted[i] = true;
            this.validateValue(this.state.inputCoords[i], i);
        }
        this.setState({
            inputCoords: this.state.inputCoords,
            inputSubmitted: this.state.inputSubmitted
        });
        this.goToDestinations();
        if(this.state.destinations.length >= 2) {
            tripCall(this.state.destinations, EARTH_RADIUS_UNITS_DEFAULT.miles, this.props.serverPort, this.updateRoundTripDistance);
        }
    };

    validateValue (v, index) {
        try {
            let userPosition = new Coordinates(this.state.inputCoords[index]);
            this.state.inputError[index] = true;
            let destination = {
                lat: userPosition.getLatitude(),
                lng: userPosition.getLongitude(),
                name: "place" + this.state.destinations.length.toString()
            };
            this.state.destinations[this.state.destinations.length] = destination;
            this.setState({
                inputError: this.state.inputError,
                destinations: this.state.destinations
            });
        } catch (error) {
            this.state.inputError[index] = false;
            this.setState({
                inputError: this.state.inputError
            });
        }
    }

    addMarker(mapClickInfo) {
        this.setState({markerPosition: mapClickInfo.latlng});
    }

    getMarkerPosition() {
        let markerPosition = '';
        if (this.state.markerPosition) {
            markerPosition = this.state.markerPosition.lat.toFixed(2) + ', ' + this.state.markerPosition.lng.toFixed(2);
        }
        return markerPosition;
    }

    getMarker(bodyJSX, position) {
        const initMarker = ref => {
            if (ref) {
                ref.leafletElement.openPopup()
            }
        };
        if (position) {
            return (
                <Marker ref={initMarker} position={position} icon={MARKER_ICON}>
                    <Popup offset={[0, -18]} className="font-weight-bold">{bodyJSX}</Popup>
                </Marker>
            );
        }
    }

    markUserLocation(location) {
        this.setState({
            markerPosition: {
                lat: location.latitude,
                lng: location.longitude
            }});
        this.leafletMap.leafletElement.setView({lat: location.latitude, lng: location.longitude}, MAP_ZOOM_MAX);
    }

    updateRoundTripDistance(distances) {
        let totalDist = 0;
        for (let i=0; i < distances.length; i++) {
            totalDist += distances[i];
        }
        this.setState({roundTripDistance: totalDist});
    }

    goToDestinations() {
        let markerGroup = [];
        for (let i=0; i < this.state.destinations.length; i++) {
            if (this.state.destinations[i]) {
                markerGroup[i] = [this.state.destinations[i].lat, this.state.destinations[i].lng]
            }
        }
        this.setState({markerArray : markerGroup});
        this.leafletMap.leafletElement.fitBounds(markerGroup);
    }

    lineCrossesMeridian(line) {
        return Math.abs(line[0].lng - line[1].lng) >= 180;
    }

}
