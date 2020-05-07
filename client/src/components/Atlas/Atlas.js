import React, {Component} from 'react';
import {Alert, Button, ButtonGroup, Col, Container, DropdownItem, DropdownMenu, DropdownToggle, FormGroup, Input, Label, Row, Nav, NavItem, NavLink, TabContent, TabPane, Modal} from 'reactstrap';
import Control from 'react-leaflet-control';
import {Map, TileLayer} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './mapbuttonstyle.css';
import Papa from "papaparse";
import Coordinates from 'coordinate-parser';
import {EARTH_RADIUS_UNITS_DEFAULT, PROTOCOL_VERSION} from "../Constants";
import {tripCall} from "../../utils/tripCalls";
import {getCurrentLocation} from "../../utils/geolocation";
import AtlasLine from "./AtlasLine";
import AtlasMarker from "./AtlasMarker";
import AtlasInput from "./AtlasInput";
import Itinerary from "./Itinerary";
import {latLngToString, parseIndex, parseStateName} from "../../utils/input";
import {saveCSV, saveJSON, saveKML, saveSVG} from "../../utils/save";
import Dropdown from "reactstrap/lib/Dropdown";
import WhereAmIIcon from "./images/where_am_i.png";
import DownloadIcon from "./images/download.png";
import UploadIcon from "./images/upload.png";
import SearchIcon from "./images/search.png";
import SearchFind from "./SearchFind";
import SearchItinerary from "./SearchItinerary";

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
        this.renderInputBox = this.renderInputBox.bind(this);
        this.parseJSON = this.parseJSON.bind(this);
        this.displayOptPopover = this.displayOptPopover.bind(this);
        this.setInput = this.setInput.bind(this);
        this.getInput = this.getInput.bind(this);
        this.connectOneTwoOrThreeOpt = this.connectOneTwoOrThreeOpt.bind(this);
        this.displaySIPopover = this.displaySIPopover.bind(this);
        this.handleDeleteFunction = this.handleDeleteFunction.bind(this);
        this.handleDeleteEntireItinerary = this.handleDeleteEntireItinerary.bind(this);
        this.handleAddToItinerary = this.handleAddToItinerary.bind(this);
        this.handleSearchItinerary = this.handleSearchItinerary.bind(this);
        this.resetItineraryDestinations = this.resetItineraryDestinations.bind(this);
        this.renderSaveButton = this.renderSaveButton.bind(this);

        this.state = {
            userLocation: null,
            markerPosition: null,
            centerPosition: MAP_CENTER_DEFAULT,
            inputCoords: [],
            inputNames: [],
            inputError: [],
            inputSubmitted: [],
            destinations: [],
            savedDests: [],
            markerArray: [],
            numInputs: 0,
            showReset: false,
            showItinerary: false,
            saveDropdownOpen: false,
            showOpt: false,
            showSI: false,
            response: '',
            construction: '',
            improvement: '',
            activeTab: "Trip",
        };
        getCurrentLocation(this.setUserLocation.bind(this), () => {
            this.setState({userLocation: false})
        });
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col sm={12} md={{size: 6, offset: 3}}>
                        {this.renderLeafletMap()}
                        {this.renderTabs()}
                        <Input innerRef={input => {this.tripInput = input;}} type='file' name='file' onChange={this.loadFile.bind(this)}/>
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
                <AtlasMarker position={this.state.markerPosition} pan={false} addon={this.addToTripButton.bind(this)} popup={true}/>
                {this.renderMultiple(this.state.destinations.length, this.renderDestination.bind(this))}
                {this.renderLines(this.state.destinations)}
                {this.state.userLocation && this.renderWhereAmI()}
                <Control position="bottomleft"  className="leaflet-control-container leaflet-shadow">
                    {this.renderLoadTrip()}
                    {this.renderSaveButton()}
                </Control>
                <Control position="topright">
                    {this.renderSearchItineraryButton()}
                </Control>
            </Map>
        )
    }

    renderLoadTrip() {
        return (
                <Button className="leaflet-button leaflet-button-top" title="Load Trip" onClick={_ => {
                    if (this.tripInput)
                        this.tripInput.click();
                }}>
                    <img src={UploadIcon} alt="Load Trip Icon"/>
                </Button>
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
        return (
            <Control position="topleft">
                <Button className="leaflet-button" title="Where Am I?" onClick={_ => getCurrentLocation(this.goToUserLocation)}>
                    <img src={WhereAmIIcon} alt="Where Am I Icon"/>
                </Button>
            </Control>
        )
    }

    renderSaveButton(){
        return (
                <Dropdown direction="up" isOpen={this.state.saveDropdownOpen}
                          toggle={_ => {this.setState({saveDropdownOpen: !this.state.saveDropdownOpen})}}>
                    <DropdownToggle className="leaflet-button leaflet-button-bottom" title="Save Trip">
                        <img src={DownloadIcon} alt="Download Icon"/>
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem header>Save Map</DropdownItem>
                        <DropdownItem divider/>
                        <DropdownItem onClick={() => {saveKML(this.state.destinations)}}>KML</DropdownItem>
                        <DropdownItem onClick={() => {saveSVG(this.leafletMap.leafletElement)}}>SVG</DropdownItem>
                        <DropdownItem divider/>
                        <DropdownItem header>Save Itinerary</DropdownItem>
                        <DropdownItem divider/>
                        <DropdownItem onClick={() => {saveJSON(this.state.destinations, EARTH_RADIUS_UNITS_DEFAULT.miles, this.state.response, this.state.construction, this.state.improvement, JSON)}}>JSON</DropdownItem>
                        <DropdownItem onClick={() =>{saveCSV(this.state.destinations, EARTH_RADIUS_UNITS_DEFAULT.miles, this.state.response, this.state.construction, this.state.improvement, JSON)}}>CSV</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
        )
    }

    renderTabs() {
        return (
            <div className="mt-1">
                <Nav tabs>
                    <NavItem>
                        <NavLink active={this.state.activeTab === "Trip"} onClick={_ => this.setState({activeTab: "Trip"})}>Trip</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink active={this.state.activeTab === "Find"} onClick={_ => this.setState({activeTab: "Find"})}>Find</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink active={this.state.activeTab === "Settings"} onClick={_ => this.setState({activeTab: "Settings"})}>Optimization</NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="Trip" className="mt-1">
                        {this.renderTripTab()}
                    </TabPane>
                    <TabPane tabId="Find" className="mt-1">
                        {this.renderFindTab()}
                    </TabPane>
                    <TabPane tabId="Settings" className="mt-1">
                        {this.renderOptimizationOptions()}
                    </TabPane>
                </TabContent>
            </div>
        )
    }

    renderFindTab(){
        return (
            <div>
            <SearchFind handleAddToItinerary = {this.handleAddToItinerary.bind(this)}/>
            </div>
        )
    }


    renderTripTab() {
        return (
            <div>
            <Itinerary destinations={this.state.destinations}
                       resetItineraryDestinations = {this.resetItineraryDestinations.bind(this)}/>
                {this.renderResetButton()}
                {this.renderRoundTripDistance()}
            {this.renderMultiple(this.state.numInputs, this.renderInputBox)}
            <ButtonGroup>
                <Button onClick={() => {this.addInputBox()}}>+</Button>
            </ButtonGroup>
            {this.renderModifyButtons()}
            </div>
        )
    }

    renderOptimizationOptions() {
        return (
            <div>
                <FormGroup>
                    <Label for="response">Response Time</Label>
                    <Input id="response" placeholder="Enter desired response time: 1-60" onChange={this.connectOneTwoOrThreeOpt}/><br/>
                    <Label for="construction">Construction</Label>
                    <Input type="select" id="construction" onChange={this.connectOneTwoOrThreeOpt}>
                        <option>none</option><option>one</option><option>some</option>
                    </Input><br/>
                    <Label for="improvement">Improvement</Label>
                    <Input type="select" id="improvement" onChange={this.connectOneTwoOrThreeOpt}>
                        <option>none</option><option>2opt</option><option>3opt</option>
                    </Input><br/>
                    <Button onClick={this.handleInputChange}>Apply</Button>
                </FormGroup>
            </div>
        )
    }

    renderSearchItineraryButton(){
        return(
            <div>
                <Button onClick={this.displaySIPopover} className="leaflet-button">
                    <img src={SearchIcon} alt="Search Icon"/>
                </Button>
                <Modal isOpen={this.state.showSI} toggle={this.displaySIPopover}>
               <SearchItinerary
                   handleSearchItinerary = {this.handleSearchItinerary.bind(this)} />
                </Modal>
            </div>
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

    displaySIPopover() { this.setState({showSI : !this.state.showSI});}

    connectOneTwoOrThreeOpt(){
        let response = document.getElementById('response').value;
        if (response !== '' && (response > 60 || response < 1)) {
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
                    <Button className="ml-1" onClick={this.reverseTrip.bind(this)}>{UNICODE_REVERSE_SYMBOL}</Button>
                    <Button onClick={this.handleDeleteEntireItinerary} className="ml-1">Delete All️</Button>
                </ButtonGroup>
            )
        }
    }


    renderMultiple(numRenders, renderFunction) {
        let components = [];
        for (let i=0; i < numRenders; i++)
            components.push(renderFunction(i));
        return components;
    }

    addToTripButton() {
        return ( <Button onClick={this.addUserMarker.bind(this)} color="primary" size="sm">Add to Trip</Button> )
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
                complete: this.parseCSV.bind(this)
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

    determineOldTrip(format, tripData) {
        let data = format === 'json' ? tripData.places : tripData.data;
        if (format === 'csv') {
            if (data[0].requestVersion !== PROTOCOL_VERSION.toString()) {
                alert("Old trip version")
            }
        }
        else {
            if (tripData.requestVersion !== PROTOCOL_VERSION){
                alert("Old trip version")
            }
        }
    }

    loadTripData(tripData, format) {
        let data = format === 'json' ? tripData.places : tripData.data;
        if (format === 'csv') {
            data.pop();
        }
        this.determineOldTrip(format, tripData);
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

    renderInputBox(index) {
        return (
            <AtlasInput key={"input"+index} id={index} index={index}
                        valid={this.state.inputError[index]}
                        invalid={!this.state.inputError[index] && (this.state.inputCoords[index] !== "") && this.state.inputSubmitted[index]}
                        onChange={this.handleOnChange.bind(this)}
                        nameValue={this.state.inputNames[index]}
                        coordsValue={this.state.inputCoords[index]}
                        handleSwitch= {this.handleSwitch.bind(this)}
                        handleDeleteFunction = {this.handleDeleteFunction.bind(this)}/>
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
                tripCall(this.state.destinations, EARTH_RADIUS_UNITS_DEFAULT.miles, this.props.serverPort, this.updateRoundTripDistance.bind(this), this.state.response, this.state.construction, this.state.improvement);
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

    updateRoundTripDistance(mytrip) {
        let cumulativeDistance = 0;
        this.setState({
            destinations: this.state.destinations.map((destination, i) => {
                cumulativeDistance += mytrip.distances[i];
                destination.distance = mytrip.distances[i];
                destination.cumulativeDistance = cumulativeDistance;
                destination.lat=parseFloat(mytrip.places[i].latitude);
                destination.lng=parseFloat(mytrip.places[i].longitude);
                destination.name=mytrip.places[i].name;
                return destination;
            })
        }, () => {
            this.setState({
                roundTripDistance: cumulativeDistance
            });
        });
        this.goToDestinations(this.state.destinations);
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
        let oldDestinations = this.getOldDestinations(0);
        let curDestination = oldDestinations[index];
        if(direction === "up" && (index!==0)){
            let prevDestination = oldDestinations[index-1];
            this.setInput(index-1, curDestination);
            this.setInput(index, prevDestination);
        }
        if(direction === "down" && index!==(this.state.numInputs-1)){
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

    handleSearchItinerary(searchTerm) {
        this.setState({showSI: false, showItinerary: true});
        let oldDestinations = this.state.destinations;
        let searchedDestinations = [];
        let sDlength = 0;
        for (let i = 0; i < this.state.numInputs; i++) {
            if (this.state.inputNames[i] === searchTerm) {
                searchedDestinations[sDlength] = {
                    lat: this.state.destinations[i].lat,
                    lng: this.state.destinations[i].lng,
                    name: this.state.destinations[i].name,
                };
                sDlength++;
            }
        }
        if(searchedDestinations.length!==0)
            this.setState({ destinations: searchedDestinations, savedDests: oldDestinations, showReset: true})
    }

    resetItineraryDestinations(){
        this.setState({destinations: this.state.savedDests, showReset: false})
    }

    renderResetButton(){
        if(this.state.showReset) {
            return (
                <Button onClick={() => {
                    this.resetItineraryDestinations()
                }} className="ml-1">Clear Itinerary Search</Button>
            )
        }
    }

    handleDeleteEntireItinerary() {
        this.setState({numInputs: 0}, this.handleInputChange);
        this.state.roundTripDistance = 0;
    }

    handleAddToItinerary(placename, searchCoords){
        this.addInputBox(() => {
            this.setInput(this.state.numInputs-1, {
                coord: searchCoords,
                name: placename
            });
            this.handleInputChange();
        });
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
