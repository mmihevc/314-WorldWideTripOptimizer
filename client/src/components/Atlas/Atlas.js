import React, {Component} from 'react';
import {Col, Container, Row, Button} from 'reactstrap';

import {Map, Marker, Popup, TileLayer} from 'react-leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';

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

    this.state = {
        markerPosition: null,
        centerPosition: MAP_CENTER_DEFAULT,
        userInput: null
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
             onClick={this.addMarker}
             style={{height: MAP_STYLE_LENGTH, maxWidth: MAP_STYLE_LENGTH}}>
          <TileLayer url={MAP_LAYER_URL} attribution={MAP_LAYER_ATTRIBUTION}/>
          {this.getMarker(this.getMarkerPosition(), this.state.markerPosition)}
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
          <form>
              <label> <br/> <b>Enter Longitude and Latitude Here:</b> </label>
              <input type="text" id="longitudeLatitude" size="40"/>
              <Button type='button' onClick={() => this.getUserInput()}>Submit</Button>
          </form>
      )
  }

  getUserInput() {
      this.setState({
          userInput : document.getElementById('longitudeLatitude').value
      });
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

  getDistance(long1, lat1, long2, lat2){
      let L1=lat1 * Math.PI/180;
      let L2=lat2 * Math.PI/180;
      let DY=Math.abs(long1-long2) * Math.PI/180;
      let distance=Math.acos(Math.sin(L1)*Math.sin(L2)+Math.cos(L1)*Math.cos(L2)*Math.cos(DY))*3959;
      alert("the  distance between your points is: " + distance);
      return distance;
  }
}

