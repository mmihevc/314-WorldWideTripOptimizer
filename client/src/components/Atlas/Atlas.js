import React, {Component} from 'react';
import {Col, Container, Row, Button, InputGroup,Input,Form,InputGroupAddon,InputGroupText} from 'reactstrap';
import {Map, Marker, Popup, TileLayer} from 'react-leaflet';
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
    this.markInitialLocation=this.markInitialLocation.bind(this);
    this.handleInputChange=this.handleInputChange.bind(this);

    this.state = {
        markerPosition: null,
        centerPosition: MAP_CENTER_DEFAULT,
        userInput: ['', ''],
        valueError: [],
        isSubmit: []
    };

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
                {this.renderLongitudeLatitudeBoxes(0)}
                {this.renderLongitudeLatitudeBoxes(1)}
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
          {this.getUserMarker(0)}
        </Map>
    )
  }


  renderHomeButton() {
    return (
        <Button className="mt-1"
                onClick={() => this.getCurrentLocation(this.markAndFlyHome)}>
           Where Am I?
        </Button>
      )
  }


  renderLongitudeLatitudeBoxes(index) {
      return (
          <Form onSubmit={this.handleSubmit}>
              <br/>
              <InputGroup size="md">
                  <InputGroupAddon addonType="prepend">
                      <InputGroupText>🌎</InputGroupText>
                  </InputGroupAddon>
                  <Input valid={this.state.valueError[index]}
                         invalid={!this.state.valueError[index] && (this.state.userInput[index])}
                         id={"longitudeLatitude"+index}
                         placeholder="Enter Longitude and Latitude Here"
                  />
                  <Button onClick={() => this.handleInputChange(index)}>Submit</Button>
              </InputGroup>
          </Form>
      )
  }

  handleSubmit(event) {
      event.preventDefault();
  }

  getUserMarker(index){
      let userPosition;
      try {
          if (this.state.isSubmit) {
              userPosition = new Coordinates(this.state.userInput[index]);
              //it is currently entering the if but userPosition is getting set to an empty string
              let latitude = userPosition.getLatitude();
              let longitude = userPosition.getLongitude();
              let cord = latitude.toFixed(2) +", " +  longitude.toFixed(2) ;
              let markerPosition = {lat: userPosition.getLatitude(), lng: userPosition.getLongitude()};
              return this.getMarker(cord, markerPosition);
          }
      }catch(error){
          return;
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
  };

  validateValue (v, index) {
      try {
          new Coordinates(v);
          this.state.valueError[index] = true
          this.state.isSubmit[index] = true
          this.setState({
              valueError: this.state.valueError,
              isSubmit: this.state.isSubmit
          });
              this.addMarker(v);

      } catch (error) {
          this.state.valueError[index] = false
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
  distancecall(){
        const values = {
            requestVersion: 2,
            requestType: 'distance',
            place1 : {
                longitude: '90',
                latitude: '90'
            },
            place2 : {
                longitude: '45',
                latitude: '45'
            },
            earthRadius: 3959
        };
        sendServerRequestWithBody('distance', values).then(
            adistance=>{this.processDistanceResponse(adistance);
                console.log(adistance.body);}
        );
  }
  processDistanceResponse(adistance){
      if(isJsonResponseValid(adistance.body, distanceSchema)){
          alert('error fetching distance')
      }
      else if(adistance.statusCode === HTTP_OK){
          return adistance;
      }
  }

  getCenterOfMarkers(markers) {
      let center = {
          lat: 0,
          lng: 0
      };
      let marker;
      for (marker of markers) {
          center.lat += marker.lat;
          center.lng += marker.lng;
      }
      center.lat /= markers.length;
      center.lng /= markers.length;
      return center;
  }

}
