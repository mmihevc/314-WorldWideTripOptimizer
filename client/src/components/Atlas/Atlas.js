import React, {Component} from 'react';
import {Col, Container, Row, Button, InputGroup,Input,Form,InputGroupAddon,InputGroupText} from 'reactstrap';
import {Map, Marker, Popup, TileLayer} from 'react-leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import Coordinates from 'coordinate-parser';

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
        userInput: null,
        valueError: '',
        isSubmit: false
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
                {this.renderLongitudeLatitudeBox()}
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
             onClick={this.addMarker} //addMarker
            // onSubmit={this.getUserMarker()}
             style={{height: MAP_STYLE_LENGTH, maxWidth: MAP_STYLE_LENGTH}}>
          <TileLayer url={MAP_LAYER_URL} attribution={MAP_LAYER_ATTRIBUTION}/>
          {this.getMarker(this.getMarkerPosition(), this.state.markerPosition)}
          {this.getUserMarker()}
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


  renderLongitudeLatitudeBox() {
      return (
          <Form onSubmit={e => {e.preventDefault();}}>
              <br/>
              <InputGroup size="md">
                  <InputGroupAddon addonType="prepend">
                      <InputGroupText>🌎</InputGroupText>
                  </InputGroupAddon>
                  <Input valid={this.state.valueError} invalid={!this.state.valueError && this.state.userInput} onChange={this.handleInputChange} id="longitudeLatitude" placeholder="Enter Longitude and Latitude Here"/>
                  <Button type='button' onClick={() => this.getUserInput()}>Submit</Button>
                  {/*this.getUserInput(this.state.userInput)*/}
              </InputGroup>
          </Form>
      )

  }
  getUserMarker(){
      let userPosition;
      try {
          if (this.state.isSubmit) {
              userPosition = new Coordinates(this.state.userInput);
              let markerPosition = {lat: userPosition.getLatitude(), lng: userPosition.getLongitude()};
              return this.getMarker(this.state.userInput, markerPosition);
          }
      }catch(error){
          return;
      }
  };

  handleInputChange (event) {
      this.setState({userInput: event.target.value});
      //  this.setState({
      //      userInput : document.getElementById('longitudeLatitude').value
      //  });
      this.validateValue(this.state.userInput);
  };

  validateValue (v) {
      let isValid= false;
      let userPosition;
          try {
              userPosition = new Coordinates(v);
              let latitude = userPosition.getLatitude();
              let longitude = userPosition.getLongitude();
              alert(latitude);
              if (((latitude > -90 && latitude < 90 )&&( longitude > -180 && longitude < 180))) {
                  isValid = true;
              }
                  this.setState({
                      valueError: isValid,
                      isSubmit: false
                  });
                  this.addMarker(v);
          } catch (error) {
              isValid = false;
              this.setState({
                  valueError: isValid
              });

          }
  };

  getUserInput() {
      this.setState({
          userInput : document.getElementById('longitudeLatitude').value

      });
      this.setState({isSubmit: true});
      //this.validateValue(this.state.userInput);
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

}
