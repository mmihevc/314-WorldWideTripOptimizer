import React, {Component} from 'react';
import {Col, Container, Row, Button, Input, Alert, ButtonGroup, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import {Map, TileLayer} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Papa from "papaparse";
import Coordinates from 'coordinate-parser';
import {EARTH_RADIUS_UNITS_DEFAULT} from "../Constants";
import {tripCall} from "../../utils/tripCalls";
import {getCurrentLocation} from "../../utils/geolocation";
import AtlasLine from "./AtlasLine";
import AtlasMarker from "./AtlasMarker";
import AtlasInput from "./AtlasInput";
import Itinerary from "./Itinerary";
import {getInput, latLngToString, setInput} from "../../utils/input";
import {saveKML, saveSVG} from "../../utils/save";
import {DragDropContext} from 'react-beautiful-dnd';

const MAP_BOUNDS = [[-90, -180], [90, 180]];
const MAP_CENTER_DEFAULT = [0, 0];
const MAP_LAYER_ATTRIBUTION = "&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors";
const MAP_LAYER_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const MAP_STYLE_LENGTH = 500;
const MAP_ZOOM_MAX = 17;
const MAP_ZOOM_MIN = 1;

const UNICODE_REVERSE_SYMBOL = '\u21B9';

export default class Atlas extends Component {

    constructor(props) {
        super(props);
        this.goToUserLocation = this.goToUserLocation.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.goToDestinations = this.goToDestinations.bind(this);
        this.renderDestination = this.renderDestination.bind(this);
        this.renderInputBox = this.renderInputBox.bind(this);
        this.updateRoundTripDistance = this.updateRoundTripDistance.bind(this);
        this.loadFile = this.loadFile.bind(this);
        this.parseJSON = this.parseJSON.bind(this);
        this.parseCSV = this.parseCSV.bind(this);
        this.addToTripButton = this.addToTripButton.bind(this);
        this.addUserMarker = this.addUserMarker.bind(this);
        this.reverseTrip = this.reverseTrip.bind(this);
        this.displayStartBox = this.displayStartBox.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.displaySaveOptions = this.displaySaveOptions.bind(this);


        this.state = {
            userLocation: null,
            markerPosition: null,
            centerPosition: MAP_CENTER_DEFAULT,
            inputCoords: [],
            inputNames: [],
            inputError: [],
            inputSubmitted: [],
            destinations: [],
            markerArray : [],
            numInputs: 0,
            showItinerary: false,
            mapSaveFormat: 'KML',
            mapDropdownOpen: false,
            showStartBox: false,
            itineraryDropdown: false
        };
        this.clearInputs();
        getCurrentLocation(this.setUserLocation.bind(this), () => {this.setState({userLocation: false})});
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col sm={12} md={{size: 6, offset: 3}}>
                        {this.renderLeafletMap()}
                        {this.renderWhereAmI()}
                        {this.renderMapSave(this.state.destinations)}
                        {this.renderItinerarySave()}
                        <Itinerary destinations={this.state.destinations}/>
                        {this.renderRoundTripDistance()}
                        {this.state.showStartBox && this.renderInputBox(0)}
                        {this.renderMultiple(this.state.numInputs, this.renderInputBox)}
                        <ButtonGroup>
                            <Button onClick={() => {this.addInputBox()}}>+</Button>
                            <Button className="ml-1" onClick={this.displayStartBox}>Start</Button>
                        </ButtonGroup>
                        {this.renderModifyButtons()}
                        <p className="mt-2">
                            Load Trip:
                            <Input type='file' name='file' onChange={this.loadFile}/>
                        </p>
                    </Col>
                </Row>
            </Container>
        )
    }


    renderLeafletMap() {
        return (
            <Map ref={map => {this.leafletMap = map;}}
                 center={this.state.centerPosition}
                 zoom={MAP_ZOOM_MAX} minZoom={MAP_ZOOM_MIN} maxZoom={MAP_ZOOM_MAX}
                 maxBounds={MAP_BOUNDS}
                 onClick={(mapClickInfo) => {this.setState({markerPosition: mapClickInfo.latlng});}}
                 style={{height: MAP_STYLE_LENGTH, maxWidth: MAP_STYLE_LENGTH}}>
                <TileLayer url={MAP_LAYER_URL} attribution={MAP_LAYER_ATTRIBUTION}/>
                <AtlasMarker position={this.state.markerPosition} pan={false} addon={this.addToTripButton} popup={true}/>
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

    setUserLocation(position) {
        this.setState({
            userLocation: position
        }, this.goToUserLocation)
    }

    renderWhereAmI() {
        if (this.state.userLocation) {
            return (
                <Button className="mt-1" onClick={_ => getCurrentLocation(this.goToUserLocation)}>Where Am I?</Button>
            )
        }
    }

    renderMapSave(destinations) {
        return (
            <ButtonGroup>
                <Button className='ml-1 mt-1' onClick={_ => {
                    if (this.state.mapSaveFormat === 'KML')
                        saveKML(destinations);
                    else if (this.state.mapSaveFormat === 'SVG')
                        saveSVG(destinations);
                }}>Save Map</Button>
                <ButtonDropdown className='mt-1' isOpen={this.state.mapDropdownOpen} toggle={() => {
                    this.setState({mapDropdownOpen: !this.state.mapDropdownOpen})
                }}>
                    <DropdownToggle caret>
                        {this.state.mapSaveFormat}
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={() => {
                            this.setState({mapSaveFormat: 'KML'})
                        }}>KML</DropdownItem>
                        <DropdownItem onClick={() => {
                            this.setState({mapSaveFormat: 'SVG'})
                        }}>SVG</DropdownItem>
                    </DropdownMenu>
                </ButtonDropdown>
            </ButtonGroup>
        )
    }

    renderItinerarySave() {
        return (
            <ButtonGroup>
                <ButtonDropdown className='ml-1 mt-1' isOpen={this.state.itineraryDropdown} toggle={this.displaySaveOptions}>
                    <DropdownToggle>
                        Save Itinerary
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem>JSON</DropdownItem>
                        <DropdownItem>CSV</DropdownItem>
                    </DropdownMenu>
                </ButtonDropdown>
            </ButtonGroup>
        )
    }

    displaySaveOptions() {
        this.setState({ itineraryDropdown : !this.state.itineraryDropdown })
    }

    renderModifyButtons() {
        if (this.state.numInputs >= 1) {
            return (
                <ButtonGroup>
                    <Button className="ml-1" onClick={this.reverseTrip}>{UNICODE_REVERSE_SYMBOL}</Button>
                    <Button className="ml-1" onClick={this.handleInputChange}>Submit</Button>
                    <Button className="ml-1" onClick={this.handleDelete}>✕️</Button>
                </ButtonGroup>
            )
        }
    }

    handleDelete() {
        this.setState({numInputs: this.state.numInputs -1}, this.handleInputChange );
    }

    displayStartBox() {
        this.setState({showStartBox: !this.state.showStartBox})
    }

    renderMultiple(numRenders, renderFunction) {
        let components = [];
        for (let i=0; i < numRenders; i++)
            components.push(<div key={i}>{renderFunction(i)}</div>);
        return components;
    }

    addToTripButton() {
        return (
            <Button onClick={this.addUserMarker} color="primary" size="sm">Add to trip</Button>
        )
    }

    addUserMarker() {
        this.addInputBox(() => {
            setInput(this.state.numInputs-1, {
                coord: latLngToString(this.state.markerPosition.lat, this.state.markerPosition.lng),
                name: "Place " + (this.state.destinations.length+1)
            });
            this.handleInputChange();
        });
    }

    loadFile(event) {
        let file = event.target.files[0];
        if (file.type === 'application/json') {
            this.parseJSON(file);
        } else if (file.type === 'text/csv') {
            let config = {
                header: true,
                complete: this.parseCSV
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
                numInputs: data.length,
            }, () => {
                for (let i = 0; i < data.length; i++) {
                    let lat = format === 'json' ? data[i].latitude : data[i].places__latitude;
                    let lng = format === 'json' ? data[i].longitude : data[i].places__longitude;
                    let name = format === 'json' ? data[i].name : data[i].places__name;
                    this.setInput(i, {coord: latLngToString(lat, lng), name: name});
                }
                this.handleInputChange();
            }
        );
    }

    clearInputs() {
        for (let i=0; i < this.state.numInputs; i++) {
            this.state.inputCoords[i] = '';
            this.state.inputNames[i] = '';
        }
    }

    onDragEnd(){
    }


    renderInputBox(index) {
        return (
            <DragDropContext
                onDragEnd={this.onDragEnd}>
                {<AtlasInput index={index} valid={this.state.inputError[index]} invalid={!this.state.inputError[index] && (this.state.inputCoords[index] !== "")}/>}
            </DragDropContext>
        )
    }

    addInputBox(callback) {
        this.state.inputCoords[this.state.numInputs] = '';
        this.setState({
            numInputs: this.state.numInputs+1,
            inputCoords: this.state.inputCoords
        }, callback);
    }

    renderDestination(index) {
        return (
            <AtlasMarker position={this.state.destinations[index]} name={this.state.destinations[index].name} pan={true}/>
        )
    }

    handleInputChange () {
        this.state.destinations = [];
        this.state.markerPosition = null;
        for (let i=0; i < this.state.numInputs; i++) {
            let input = getInput(i);
            this.state.inputCoords[i] = input.coord;
            this.state.inputNames[i] = input.name;
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
            let inputName = "Place " + (this.state.destinations.length+1).toString();
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

    goToUserLocation() {
        this.setState({
            markerPosition: {
                lat: this.state.userLocation.latitude,
                lng: this.state.userLocation.longitude
            }
        });
        this.leafletMap.leafletElement.setView({lat: this.state.userLocation.latitude, lng: this.state.userLocation.longitude}, MAP_ZOOM_MAX);
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

    changeStartDestination(index) {
        let oldDestinations = [];
        for (let i=0; i < this.state.numInputs; i++)
            oldDestinations[i] = getInput(i);
        for (let i=0; i < this.state.numInputs; i++) {
            let newIndex = i - index;
            if (newIndex < 0)
                newIndex += this.state.numInputs;
            setInput(newIndex, oldDestinations[i]);
        }
        this.handleInputChange();
    }

    reverseTrip() {
        let oldDestinations = [];
        for (let i=1; i < this.state.numInputs; i++)
            oldDestinations[i] = getInput(i);
        for (let i=1; i < this.state.numInputs; i++) {
            let newIndex = this.state.numInputs-i;
            setInput(newIndex, oldDestinations[i]);
        }
        this.handleInputChange();
    }
}
