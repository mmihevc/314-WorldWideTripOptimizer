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

    constructor(props) {
        super(props);

        this.openPopup = this.openPopup.bind(this);
    }


    render() {
        if (this.props.position) {
            let coordString = this.props.position.lat.toFixed(2) + ', ' + this.props.position.lng.toFixed(2);
            return (
                <Marker ref={popup => {this.popup = popup; this.openPopup()}} position={this.props.position} icon={MARKER_ICON}>
                    <Popup offset={[0, -18]}
                           autoClose={false}
                           autoPan={this.props.pan}>
                        <div>
                            <p>{this.renderName()}
                            <b>{coordString}</b><br/>
                            {this.renderAddon()}</p>
                        </div>
                    </Popup>
                </Marker>
            );
        }
        return null;
    }

    openPopup() {
        if (this.popup && this.props.popup)
            this.popup.leafletElement.openPopup();
    }

    renderName() {
        if (this.props.name) {
            return (
                <span>
                    {this.props.name}<br/>
                </span>
            )
        }
    }

    renderAddon() {
        if (this.props.addon)
            return this.props.addon();
        return null;
    }

}