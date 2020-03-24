import React, {Component} from "react";
import {Marker, Popup} from "react-leaflet";
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import icon from 'leaflet/dist/images/marker-icon.png';
const MARKER_ICON = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: [12, 40]  // for proper placement
});

export default class AtlasMarker extends Component {

    render() {
        if (this.props.position) {
            let coordString = this.props.position.lat.toFixed(2) + ', ' + this.props.position.lng.toFixed(2);
            return (
                <Marker ref={this.openPopup} position={this.props.position} icon={MARKER_ICON}>
                    <Popup offset={[0, -18]}
                           autoClose={false}
                           autoPan={this.props.pan}>
                        <div>
                            <p>{this.props.name}<br/>
                            <b>{coordString}</b></p>
                        </div>
                    </Popup>
                </Marker>
            );
        }
        return null;
    }

    openPopup(ref) {
        if (ref)
            ref.leafletElement.openPopup();
    }

}