import React, {Component} from 'react';
import {Col, Container, Row, Button, InputGroup,Input,Form,InputGroupAddon,InputGroupText, Alert, Table} from 'reactstrap';
import {Map, TileLayer} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Coordinates from 'coordinate-parser';
import {EARTH_RADIUS_UNITS_DEFAULT} from "../Constants";
import {tripCall} from "./tripCalls";
import {getCurrentLocation} from "./geolocation";
import AtlasLine from "./AtlasLine";
import AtlasMarker from "./AtlasMarker";
import AtlasInput from "./AtlasInput";
import {downloadFile} from "./fileIO";

const MAP_BOUNDS = [[-90, -180], [90, 180]];
const MAP_CENTER_DEFAULT = [0, 0];
const MAP_LAYER_ATTRIBUTION = "&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors";
const MAP_LAYER_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const MAP_STYLE_LENGTH = 500;
const MAP_ZOOM_MAX = 17;
const MAP_ZOOM_MIN = 1;


export default class Atlas extends Component {

    constructor(props) {
        super(props);

        this.addMarker = this.addMarker.bind(this);
        this.markUserLocation = this.markUserLocation.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.goToDestinations = this.goToDestinations.bind(this);
        this.renderDestination = this.renderDestination.bind(this);
        this.renderInputBox = this.renderInputBox.bind(this);
        this.updateRoundTripDistance = this.updateRoundTripDistance.bind(this);

        this.state = {
            markerPosition: null,
            centerPosition: MAP_CENTER_DEFAULT,
            inputCoords: [],
            inputNames: [],
            inputError: [],
            inputSubmitted: [],
            destinations: [], //contains lat, lon, and name, can add distance to that
            markerArray : [],
            numDestinations: 1,
            roundTripDistance: null,
            showItinerary: false
        };

        for (let i=0; i < this.state.numDestinations; i++) {
            this.state.inputCoords[i] = '';
            this.state.inputNames[i] = '';
        }

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
                            {this.renderItineraryButton()}
                            {this.renderRoundTripDistance()}
                            {this.renderMultiple(this.state.numDestinations, this.renderInputBox)}
                            {this.renderAddDestinationButton()}
                            {this.renderSubmitButton()}
                            {this.renderLoadFromFileButton()}
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
                <AtlasMarker position={this.state.markerPosition} name="Home" pan={false}/>
                {this.renderMultiple(this.state.destinations.length, this.renderDestination)}
                {this.renderLines(this.state.destinations)}
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

    renderLines(destinations) {
        if (destinations.length >= 2) {
            const components = [];
            for (let i=0; i < destinations.length-1; i++)
                components.push(<div key={i}><AtlasLine start={destinations[i]} finish={destinations[i+1]}/></div>);
            components.push(<div key={destinations.length}><AtlasLine start={destinations[0]} finish={destinations[destinations.length-1]}/></div>);
            return components;
        }
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

    renderLoadFromFileButton() {
        return (
            <Input type='file' name='file' className="mt-1" onChange={this.loadFile}/>
        )
    }

    loadFile(event) {
        let file = event.target.files[0];
        if (file.type === 'application/json') {
            alert("yus");
        } else if (file.type === 'text/csv') {
            alert("ree")
        }
    }

    renderItineraryButton() {
        if (this.state.showItinerary) {
            return (
                <Form>
                    <br />
                    <Button className="mt-1"
                        onClick={() => {this.setState({showItinerary: false})}}> Click to view itinerary</Button>
                    {this.renderItinerary()}
                </Form>
            )
        }
        else {
            return (
                <Form>
                    <br />
                    <Button onClick={() => {this.setState({showItinerary: true})}}> Click to view itinerary</Button>
                </Form>
            )
        }
    }

    renderInputBox(index) {
        return (
            <AtlasInput index={index} valid={this.state.inputError[index]} invalid={!this.state.inputError[index] && (this.state.inputCoords[index] !== "")}/>
        )
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
                        <td>{this.state.inputNames[0]}</td>
                        <td>{this.state.destinations[0].distance}</td>
                    </tr>
                    <tr>
                        <td>{this.state.inputNames[1]}</td>
                        {/*<td>{this.state.destinations[1].distance}</td>*/}
                    </tr>
                    <tr>
                        <td>{this.state.inputNames[2]}</td>
                        {/*<td>{this.state.destinations[2].distance}</td>*/}
                    </tr>
                    <tr>
                        <td>{this.state.inputNames[3]}</td>
                        {/*<td>{this.state.destinations[3].distance}</td>*/}
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

    renderDestination(index) {
        return (
            <AtlasMarker position={this.state.destinations[index]}
                            name={this.state.destinations[index].name}
                            pan={true}/>
        );
    };

    handleInputChange () {
        this.state.destinations = [];
        this.state.markerPosition = null;
        for (let i=0; i < this.state.numDestinations; i++) {
            this.state.inputCoords[i] = document.getElementById('longitudeLatitude' + i).value;
            this.state.inputNames[i] = document.getElementById('name' + i).value;
            this.state.inputSubmitted[i] = true;
            this.validateValue(i);
        }
        this.setState({
            inputCoords: this.state.inputCoords,
            inputSubmitted: this.state.inputSubmitted
        });
        this.goToDestinations(this.state.destinations);
        if(this.state.destinations.length >= 2) {
            tripCall(this.state.destinations, EARTH_RADIUS_UNITS_DEFAULT.miles, this.props.serverPort, this.updateRoundTripDistance);
        }
    };

    validateValue(index) {
        try {
            let userPosition = new Coordinates(this.state.inputCoords[index]);
            this.state.inputError[index] = true;
            let inputName = "place" + this.state.destinations.length.toString();
            if (this.state.inputNames[index] !== "") {
                inputName = this.state.inputNames[index];
            }
            this.state.destinations[this.state.destinations.length] = {
                lat: userPosition.getLatitude(),
                lng: userPosition.getLongitude(),
                name: inputName
            };
            this.setState({
                inputError: this.state.inputError,
                destinations: this.state.destinations
            });
        } catch (error) {
            alert(error)
            this.state.inputError[index] = false;
            this.setState({
                inputError: this.state.inputError
            });
        }
    }

    addMarker(mapClickInfo) {
        this.setState({markerPosition: mapClickInfo.latlng});
    }

    markUserLocation(location) {
        this.setState({
            markerPosition: {
                lat: location.latitude,
                lng: location.longitude
            }
        });
        this.leafletMap.leafletElement.setView({lat: location.latitude, lng: location.longitude}, MAP_ZOOM_MAX);
    }

    updateRoundTripDistance(distances) { //change to update distances and midfy state directly in their
        let totalDist = 0;
        let cumulativeDistance=0;
        for (let i=0; i < distances.length; i++) {
            //for each distance in distances i wanna set the state so each destination has a distance value equal to that distance
            //make a new state
            cumulativeDistance=cumulativeDistance + distances[i];
            this.state.destinations[i].distance = distances[i];
            this.state.destinations[i].cumulativeDistance=cumulativeDistance;
            totalDist += distances[i];
        }
            this.setState({
                roundTripDistance: totalDist,
                destinations: this.state.destinations
            });

    }

    goToDestinations(destinations) {
        let markerGroup = [];
        for (let i=0; i < destinations.length; i++)
            if (destinations[i])
                markerGroup[i] = [destinations[i].lat, destinations[i].lng];
        this.setState({markerArray : markerGroup});
        this.leafletMap.leafletElement.fitBounds(markerGroup);
    }

}
