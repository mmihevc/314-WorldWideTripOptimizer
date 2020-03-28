import React, {Component} from 'react';
import {Col, Container, Row, Button, Input, Alert} from 'reactstrap';
import {Map, TileLayer} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Papa from "papaparse";
import Coordinates from 'coordinate-parser';
import {EARTH_RADIUS_UNITS_DEFAULT} from "../Constants";
import {tripCall} from "./tripCalls";
import {getCurrentLocation} from "./geolocation";
import AtlasLine from "./AtlasLine";
import AtlasMarker from "./AtlasMarker";
import AtlasInput from "./AtlasInput";
import Itinerary from "./Itinerary";

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
        this.loadFile = this.loadFile.bind(this);
        this.parseJSON = this.parseJSON.bind(this);
        this.parseCSV = this.parseCSV.bind(this);
        this.state = {
            centerPosition: MAP_CENTER_DEFAULT,
            inputCoords: [],
            inputNames: [],
            inputError: [],
            inputSubmitted: [],
            destinations: [],
            markerArray : [],
            numDestinations: 1,
            showItinerary: false
        };
        this.clearInputs();
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
                            <Itinerary destinations={this.state.destinations}/>
                            {this.renderRoundTripDistance()}
                            {this.renderMultiple(this.state.numDestinations, this.renderInputBox)}
                            {this.renderAddDestinationButton()}
                            {this.renderSubmitButton()}
                            {this.renderLoadFromFileButton()}
                        </Col>
                    </Row>
                </Container>
            </div>
        )
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
        const components = [];
        for (let i=0; i < destinations.length-1; i++)
            components.push(<div key={i}><AtlasLine start={destinations[i]} finish={destinations[i+1]}/></div>);
        components.push(<div key={-1}><AtlasLine start={destinations[0]} finish={destinations[destinations.length-1]}/></div>);
        return components;
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
            this.parseJSON(file);
        } else if (file.type === 'text/csv') {
            let config = {
                header: true,
                complete: this.parseCSV.bind(this)
            };
            Papa.parse(file, config);
        }
    }

    parseJSON(file){
        let reader = new FileReader();
        reader.readAsText(file);
        reader.onload = (evt) => {
            let content = evt.target.result.toString();
            let obj = JSON.parse(content);
            this.loadTripData(obj, 'json');
        }
    }

    parseCSV(results) {
        this.loadTripData(results, 'csv');
    }

    loadTripData(tripData, format) {
        let data = format === 'json' ? tripData.places : tripData.data;
        if (format === 'csv')
            data.pop();
        this.setState({
                numDestinations: data.length,
            },
            () => {
                for (let i = 0; i < data.length; i++) {
                    let lat = format === 'json' ? data[i].latitude : data[i].places__latitude;
                    let lng = format === 'json' ? data[i].longitude : data[i].places__longitude;
                    let name = format === 'json' ? data[i].name : data[i].places__name;
                    document.getElementById('longitudeLatitude'+i).value = lat + ", " + lng;
                    document.getElementById('name'+i).value = name;
                }
                this.handleInputChange()
            }
        );
    }

    clearInputs() {
        for (let i=0; i < this.state.numDestinations; i++) {
            this.state.inputCoords[i] = '';
            this.state.inputNames[i] = '';
        }
    }

    renderInputBox(index) {
        return (
            <AtlasInput index={index} valid={this.state.inputError[index]} invalid={!this.state.inputError[index] && (this.state.inputCoords[index] !== "")}/>
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

    renderDestination(index) {
        let destination = this.state.destinations[index];
        return (
            <AtlasMarker position={destination} name={destination.name} pan={true}/>
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
            inputSubmitted: this.state.inputSubmitted,
            destinations: this.state.destinations,
            inputError: this.state.inputError
        }, () => {
            this.goToDestinations(this.state.destinations);
            if(this.state.destinations.length >= 2)
                tripCall(this.state.destinations, EARTH_RADIUS_UNITS_DEFAULT.miles, this.props.serverPort, this.updateRoundTripDistance);
        });
    };

    validateValue(index) {
        try {
            let userPosition = new Coordinates(this.state.inputCoords[index]);
            this.state.inputError[index] = true;
            let inputName = "place" + this.state.destinations.length.toString();
            if (this.state.inputNames[index] !== "")
                inputName = this.state.inputNames[index];
            this.state.destinations[this.state.destinations.length] = {
                lat: userPosition.getLatitude(),
                lng: userPosition.getLongitude(),
                name: inputName
            };
        } catch (error) {
            console.log(error);
            this.state.inputError[index] = false;
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

    updateRoundTripDistance(distances) {
        let cumulativeDistance = 0;
        this.setState({
            destinations: this.state.destinations.map((destination, i) => {
                cumulativeDistance += distances[i];
                destination.distance = distances[i];
                destination.cumulativeDistance = cumulativeDistance;
                return destination;
            })
        }, () => {
            this.setState({
                roundTripDistance: cumulativeDistance
            });
        });
    }

    goToDestinations(destinations) {
        if (destinations.length >= 1) {
            this.setState({
                markerArray: destinations.map((destination) => {
                    return [destination.lat, destination.lng]
                })
            }, () => {
                this.leafletMap.leafletElement.fitBounds(this.state.markerArray)
            });
        }
    }

}
