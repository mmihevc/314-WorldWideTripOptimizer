import React, {Component} from 'react';
import {Col, Container, Row} from 'reactstrap';

import {Map, Marker, Popup, TileLayer} from 'react-leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import {setPosition} from "leaflet/src/dom/DomUtil";

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

//let currentPosition = '';

let currentPosition = {
    getCurrentPos : function(callback) {
        let updateLocation = function (position) {
            this.latitude = position.coords.latitude;
            this.longitude = position.coords.longitude;
            callback(this);
        };

        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(updateLocation);
        }
        else {
            alert("Error");
        }
    }
};

currentPosition.getCurrentPos(function (currentPosition) {
    alert(currentPosition.latitude);
    alert(currentPosition.longitude);
});



export default class Atlas extends Component {

  constructor(props) {
    super(props);

    this.addMarker = this.addMarker.bind(this);

    this.state = {
      markerPosition: null,
    };
    //this.getGeolocation();
  }

  render() {
    return (
        <div>
          <Container>
            <Row>
              <Col sm={12} md={{size: 6, offset: 3}}>
                {this.renderLeafletMap()}
              </Col>
            </Row>
          </Container>
        </div>
    );
  }

  renderLeafletMap() {
    return (
        <Map center={MAP_CENTER_DEFAULT}
             zoom={MAP_ZOOM_MIN}
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

  /*getGeolocation(callback) {
      if (navigator.geolocation) {
          /*navigator.geolocation.getCurrentPosition(
              function (position) {
                  let currentLocation = {
                      latitude: position.coords.latitude,
                      longitude: position.coords.longitude
                  }
                  callback(currentLocation);
              }
          ) //end inner comment
          navigator.geolocation.getCurrentPosition(success,error)
      } else {
          status.textContent = 'Geolocation is not supported by your browser';
      }

      function success(position) {
          let currentLocation = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
          }
          alert(currentLocation);
      }
      function error(error) {
          alert("Error!" + error);
      }
  }*/


}
