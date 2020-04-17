import React, {Component} from 'react';
import {Alert, Button, ButtonGroup, Col, Container, DropdownItem, DropdownMenu, DropdownToggle, Form, FormGroup, Input, InputGroup, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row} from 'reactstrap';
import {Map, TileLayer} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Papa from "papaparse";
import Coordinates from 'coordinate-parser';
import {EARTH_RADIUS_UNITS_DEFAULT, PROTOCOL_VERSION} from "../Constants";
import {tripCall} from "../../utils/tripCalls";
import {getCurrentLocation} from "../../utils/geolocation";
import AtlasLine from "./AtlasLine";
import AtlasMarker from "./AtlasMarker";
import AtlasInput from "./AtlasInput";
import handleSubmit from "./AtlasInput";
import Itinerary from "./Itinerary";
import {latLngToString, parseIndex, parseStateName} from "../../utils/input";
import {saveCSV, saveJSON, saveKML, saveSVG} from "../../utils/save";
import Dropdown from "reactstrap/lib/Dropdown";

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
        this.handleSwitch = this.handleSwitch.bind(this);
        this.displayStartBox = this.displayStartBox.bind(this);
        this.displayOptPopover = this.displayOptPopover.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.setInput = this.setInput.bind(this);
        this.getInput = this.getInput.bind(this);
        this.connectOneTwoOrThreeOpt = this.connectOneTwoOrThreeOpt.bind(this);
        this.handleDeleteFunction = this.handleDeleteFunction.bind(this);
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
            SettingsDropDownOpen: false,
            showStartBox: false,
            showOpt: false,
            response: '',
            construction: '',
            improvement: ''
        };
        getCurrentLocation(this.setUserLocation.bind(this), () => {this.setState({userLocation: false})});
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col sm={12} md={{size: 6, offset: 3}}>
                        {this.renderLeafletMap()}
                        <ButtonGroup>
                            {this.renderWhereAmI()}
                            {this.renderSettings()}
                            {this.renderOptimizationOptions()}
                        </ButtonGroup>
                        <Itinerary destinations={this.state.destinations}/>
                        {this.renderRoundTripDistance()}
                        {this.state.showStartBox && this.renderInputBox(this.state.numInputs)}
                        {this.renderMultiple(this.state.numInputs, this.renderInputBox)}
                        <ButtonGroup>
                            <Button onClick={() => {this.addInputBox()}}>+</Button>
                            <Button className="ml-1" onClick={this.displayStartBox}>Start</Button>
                        </ButtonGroup>
                        {this.renderModifyButtons()}
                        {this.renderLoadTrip()}
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

    renderLoadTrip() {
        return (
            <p className="mt-2">
                Load Trip:
                <Input type='file' name='file' onChange={this.loadFile}/>
            </p>
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
            return ( <Button className="ml-1" onClick={_ => getCurrentLocation(this.goToUserLocation)}>Where Am I?</Button>)
        }
    }

    renderSettings(){
        return (
            <Dropdown className='ml-1' isOpen={this.state.SettingsDropDownOpen} toggle={() => {
                this.setState({SettingsDropDownOpen: !this.state.SettingsDropDownOpen})
            }}>
                <DropdownToggle caret>Settings</DropdownToggle>
                <DropdownMenu>
                    <DropdownItem header>Save Map</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={() => {saveKML(this.state.destinations)}}>KML</DropdownItem>
                    <DropdownItem onClick={() => {saveSVG(this.state.destinations)}}>SVG</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem header>Save Itinerary</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={() => {saveJSON(this.state.destinations)}}>JSON</DropdownItem>
                    <DropdownItem onClick={() =>{saveCSV(this.state.destinations)}}>CSV</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        )
    }

    renderOptimizationOptions() {
        return (
            <Form onSubmit={handleSubmit}>
                <Button className="ml-1" onClick={this.displayOptPopover}>Opt Options</Button>
                <Modal isOpen={this.state.showOpt} toggle={this.displayOptPopover}>
                    <ModalHeader toggle={this.displayOptPopover}>Select Options Before Loading File</ModalHeader>
                    <ModalBody>
                        <InputGroup>
                            <Input id="response" placeholder="Enter desired response time: 1-60" onChange={this.connectOneTwoOrThreeOpt}/>
                        </InputGroup><br/>
                        {this.renderSelect("Construction", "none", "one", "some")}
                        <br/>
                        {this.renderSelect("Improvement",  "none", "2opt", "3opt")}
                        {this.renderLoadTrip()}
                    </ModalBody>
                </Modal>
            </Form>
        )
    }

    renderSelect(id, opt1, opt2, opt3) {
        return (
            <FormGroup>
                <Label for={id}>{id}</Label>
                <Input type="select" id={id} onChange={this.connectOneTwoOrThreeOpt}>
                    <option>{opt1}</option><option>{opt2}</option><option>{opt3}</option>
                </Input>
            </FormGroup>
        )
    }

    displayOptPopover() { this.setState({showOpt : !this.state.showOpt});}

    connectOneTwoOrThreeOpt(){
        let response = document.getElementById('response').value
        if (response != '' && (response > 60 || response < 1)) {
            alert("Invalid response time")
        }
        this.setState({
            response:  response,
            construction: document.getElementById('construction').value,
            improvement: document.getElementById('improvement').value
        })
    }

    renderModifyButtons() {
        if (this.state.numInputs >= 1) {
            return (
                <ButtonGroup>
                    <Button className="ml-1" onClick={this.reverseTrip}>{UNICODE_REVERSE_SYMBOL}</Button>
                    <Button className="ml-1" onClick={this.handleInputChange}>Submit</Button>
                </ButtonGroup>
            )
        }
    }

    displayStartBox() { this.setState({showStartBox: !this.state.showStartBox})}

    renderMultiple(numRenders, renderFunction) {
        let components = [];
        for (let i=0; i < numRenders; i++)
            components.push(renderFunction(i));
        return components;
    }

    addToTripButton() {
        return ( <Button onClick={this.addUserMarker} color="primary" size="sm">Add to trip</Button> )
    }

    addUserMarker() {
        this.addInputBox(() => {
            this.setInput(this.state.numInputs-1, {
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
        }else{
            alert("File must be a JSON or CSV")
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
        if (format === 'csv') {
            data.pop();
            if (data[0].requestVersion !== PROTOCOL_VERSION.toString()) {
                alert("Old trip version")
            }
        }
        else {
            if (tripData.requestVersion != PROTOCOL_VERSION){
                alert("Old trip version")
            }
        }
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
        this.setState({
            inputCoords: this.state.inputCoords,
            inputNames: this.state.inputNames
        })
    }

    renderInputBox(index) {
        return (
            <AtlasInput key={"input"+index} id={index} index={index}
                        valid={this.state.inputError[index]}
                        invalid={!this.state.inputError[index] && (this.state.inputCoords[index] !== "") && this.state.inputSubmitted[index]}
                        onChange={this.handleOnChange}
                        nameValue={this.state.inputNames[index]}
                        coordsValue={this.state.inputCoords[index]}
                        handleSwitch= {this.handleSwitch}
                        handleDeleteFunction = {this.handleDeleteFunction}/>
        )
    }

    addInputBox(callback) {
        this.state.inputCoords[this.state.numInputs] = '';
        this.state.inputNames[this.state.numInputs] = '';
        this.setState({
            numInputs: this.state.numInputs+1,
            inputCoords: this.state.inputCoords,
            inputNames: this.state.inputNames
        }, callback);
    }

    renderDestination(index) {
        return (
            <AtlasMarker key={"Marker"+index} position={this.state.destinations[index]} name={this.state.destinations[index].name} pan={true}/>
        )
    }

     handleInputChange () {
        this.state.destinations = [];
        this.state.markerPosition = null;
        for (let i=0; i < this.state.numInputs; i++) {
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
                tripCall(this.state.destinations, EARTH_RADIUS_UNITS_DEFAULT.miles, this.props.serverPort, this.updateRoundTripDistance, this.state.response, this.state.construction, this.state.improvement);
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

    reverseTrip() {
        let oldDestinations = this.getOldDestinations(0);
        let counter = this.state.numInputs;
        for (let i=0; i < this.state.numInputs; i++) {
            let newIndex = counter - 1;
            this.setInput(newIndex, oldDestinations[i]);
            counter = counter - 1;
        }
        this.handleInputChange();
    }

    getOldDestinations(startVal){
        let oldDestinations = [];
        for (let i=startVal; i < this.state.numInputs; i++)
            oldDestinations[i] = this.getInput(i);
        return oldDestinations;
    }

    handleSwitch(direction, index){
        //ToDo: ensure itinerary so doesn't add duplicates, error catch for first and last place
        let oldDestinations = this.getOldDestinations(0);
        let curDestination = oldDestinations[index];
        if(direction === "up"){
            let prevDestination = oldDestinations[index-1];
            this.setInput(index-1, curDestination);
            this.setInput(index, prevDestination);
        }
        if(direction === "down"){
            let nextDestination = oldDestinations[index+1];
            this.setInput(index+1, curDestination);
            this.setInput(index, nextDestination);
        }
        this.handleInputChange();
    }

    handleDeleteFunction(index){
        let oldDestinations = this.getOldDestinations(0);
        for (let i=0; i < this.state.numInputs; i++) {
            if(i>index){
                let newIndex = i-1;
                this.setInput(newIndex, oldDestinations[i]);
            }
        }
        this.setState({numInputs: this.state.numInputs - 1});
        this.handleInputChange();
    }

    handleOnChange(evt) {
        const target = evt.target;
        const value = target.value;
        const name = target.name;
        let index = parseIndex(name);
        let stateName = parseStateName(name);
        if (stateName === "inputCoords") {
            this.state.inputCoords[index] = value;
            this.setState({inputCoords: this.state.inputCoords});
        } else if (stateName === "inputName") {
            this.state.inputNames[index] = value;
            this.setState({inputNames: this.state.inputNames});
        }
        this.state.inputSubmitted[index] = false;
        this.setState({
            inputSubmitted: this.state.inputSubmitted
        })
    }

    setInput(index, input) {
        this.state.inputNames[index] = input.name;
        this.state.inputCoords[index] = input.coord;
        this.setState({
            inputNames: this.state.inputNames,
            inputCoords: this.state.inputCoords
        })
    }

    getInput(index) {
        return {
            coord: this.state.inputCoords[index],
            name: this.state.inputNames[index]
        }
    }
}
