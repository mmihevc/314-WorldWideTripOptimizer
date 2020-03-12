import React, {Component} from 'react';
import {Col, Container, Row, Button, InputGroup,Input,Form,InputGroupAddon,InputGroupText, Alert} from 'reactstrap';
import {Map, Marker, Polyline, Popup, TileLayer} from 'react-leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import Coordinates from 'coordinate-parser';
import {isJsonResponseValid, sendServerRequestWithBody} from "../../utils/restfulAPI";
import {HTTP_OK} from "../Constants";
import * as distanceSchema from "../../../schemas/DistanceResponse";

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
        this.markAndFlyHome = this.markAndFlyHome.bind(this);
        this.markInitialLocation = this.markInitialLocation.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.goToUserMarkers = this.goToUserMarkers.bind(this);
        this.renderLongitudeLatitudeBox = this.renderLongitudeLatitudeBox.bind(this);
        this.getUserMarker = this.getUserMarker.bind(this);

        this.state = {
            markerPosition: null,
            centerPosition: MAP_CENTER_DEFAULT,
            userInput: [],
            valueError: [],
            isSubmit: [],
            userMarkers: [],
            markerArray : [],
            numDestinations: 1,
            roundTripDistance: null
        };

        let i;
        for (i=0; i < this.state.numDestinations; i++)
            this.state.userInput[i] = '';

        this.getCurrentLocation(this.markInitialLocation);
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
                {this.renderMultiple(this.state.numDestinations, this.getUserMarker)}
                {this.getLines(this.state.userMarkers)}
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
                    onClick={() => this.getCurrentLocation(this.markAndFlyHome)}>
                Where Am I?
            </Button>
        )
    }

    renderMultiple(numRenders, renderFunction) {
        let i;
        const components = [];
        for (i=0; i < numRenders; i++) {
            components.push(<div key={i}>{renderFunction(i)}</div>);
        }
        return components;
    }

    renderLongitudeLatitudeBox(index) {
        return (
            <Form onSubmit={this.handleSubmit}>
                <br/>
                <InputGroup size="md">
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>🌎</InputGroupText>
                    </InputGroupAddon>
                    <Input valid={this.state.valueError[index]}
                           invalid={!this.state.valueError[index] && (this.state.userInput[index] !== "")}
                           id={"longitudeLatitude"+index}
                           placeholder="Enter Longitude and Latitude Here"
                    />
                    <Button onClick={() => this.handleInputChange(index)}>Submit</Button>
                </InputGroup>
            </Form>
        )
    }

    renderAddDestinationButton() {
        return (
            <Button title="Add Destination" className="mt-1"
                    onClick={() => {this.addDestination()}}>
                +
            </Button>
        )
    }

    addDestination() {
        this.state.userInput[this.state.numDestinations] = ''
        this.setState({
            numDestinations: this.state.numDestinations+1,
            userInput: this.state.userInput
        });
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    getUserMarker(index){
        if (this.state.isSubmit[index]) {
            let latitude = this.state.userMarkers[index].lat;
            let longitude = this.state.userMarkers[index].lng;
            let cord = latitude.toFixed(2) +", " +  longitude.toFixed(2) ;
            if (this.state.userMarkers[index]) {
                return (
                    <Marker position={this.state.userMarkers[index]} icon={MARKER_ICON}>
                        <Popup offset={[0, -18]} className="font-weight-bold">{cord}</Popup>
                    </Marker>
                );
            }
        }
    };

    handleInputChange (index) {
        this.state.userInput[index] = document.getElementById('longitudeLatitude'+index).value;
        this.state.isSubmit[index] = true;
        this.setState({
            userInput: this.state.userInput,
            isSubmit: this.state.isSubmit
        });
        this.validateValue(this.state.userInput[index], index);
        if(this.state.userMarkers.length==2){
            this.distancecall(""+this.state.userMarkers[0].lat, ""+this.state.userMarkers[0].lng, ""+this.state.userMarkers[1].lat, ""+this.state.userMarkers[1].lng, 3959);
        }
    };

    validateValue (v, index) {
        try {
            let userPosition = new Coordinates(this.state.userInput[index]);
            this.state.valueError[index] = true;
            this.state.isSubmit[index] = true;
            let markerPosition = {lat: userPosition.getLatitude(), lng: userPosition.getLongitude()};
            this.state.userMarkers[index]= markerPosition;
            this.setState({
                valueError: this.state.valueError,
                isSubmit: this.state.isSubmit,
                userMarkers: this.state.userMarkers
            }, this.goToUserMarkers);
            this.addMarker(v);

        } catch (error) {
            this.state.valueError[index] = false;
            this.setState({
                valueError: this.state.valueError
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

    error() {
        alert("This application needs access to your location to work.");
    }

    getCurrentLocation(anything) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => anything([position.coords.latitude, position.coords.longitude]), this.error);
        } else {
            console.log("Geolocation is not supported by your browser.")
        }
    }

    markInitialLocation(homeLocation){
        let homelat = homeLocation[0];
        let homelng = homeLocation[1];
        this.setState({
            markerPosition:{lat:homelat, lng:homelng},
            centerPosition:{lat:homelat, lng:homelng}
        });
    }

    markAndFlyHome(homeLocation) {
        let homeLat = homeLocation[0];
        let homeLng = homeLocation[1];

        this.setState({
            markerPosition: {
                lat: homeLat,
                lng: homeLng
            }});
        this.leafletMap.leafletElement.flyTo(L.latLng(homeLat, homeLng), MAP_ZOOM_MAX);
    }

    distancecall(lat1, long1, lat2, long2, rad){
        const values = {
            requestVersion: 2,
            requestType: 'distance',
            place1 : {
                longitude: long1,
                latitude: lat1
            },
            place2 : {
                longitude: long2,
                latitude: lat2
            },
            earthRadius: rad
        };
        sendServerRequestWithBody('distance', values, this.props.serverPort).then(
            adistance=>{this.processDistanceResponse(adistance);
                alert("the distance between your points is: "+adistance.body.distance);}
        );
    }

    processDistanceResponse(adistance){
        if(!isJsonResponseValid(adistance.body, distanceSchema)){
            alert('error fetching distance')
        }
        else if(adistance.statusCode === HTTP_OK){
            return adistance;
        }
    }

    goToUserMarkers() {
        let markers = this.state.userMarkers;
        let markerGroup = [];
        let i;
        for (i=0; i < markers.length; i++) {
            if (markers[i]) {
                markerGroup[i] = [markers[i].lat, markers[i].lng]
            }
        }
        this.setState({markerArray : markerGroup})
        this.leafletMap.leafletElement.fitBounds(markerGroup);
    }

    lineCrossesMeridian(line) {
        return Math.abs(line[0].lng - line[1].lng) >= 180;
    }

}