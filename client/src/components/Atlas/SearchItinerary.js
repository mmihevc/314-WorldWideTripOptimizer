import React, {Component} from "react";
import {Button, Form, FormGroup, Input, Label, ModalBody} from "reactstrap";
import {latLngToString} from "../../utils/input";


export default class SearchFind extends Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (


                    <ModalBody>
                        <Label for="itinerarySearch">Search Itinerary</Label>
                        <Input
                            type="search"
                            name="search"
                            id="itinerarySearch"
                            placeholder="Search a place in the itinerary"
                            onChange={this.handleTermChange}
                            onKeyDown={this.handleEnter}
                        />
                    </ModalBody>

        );
    }
}

/*handleTermChange(e){
    this.setState({ searchTerm: e.target.value , searchCoords: latLngToString(0.0, 0.0)});
    this.handleSearch();
}

handleSearch(e){
    //implement search
}

handleEnter(e){
    if (e.key === 13) {
        // this.handleSearch();
        this.handleTermChange(e);
    }
}*/

