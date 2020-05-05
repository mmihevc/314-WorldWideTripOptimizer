import React, {Component} from "react";
import {Input, Label, ModalBody} from "reactstrap";


export default class SearchFind extends Component {

    constructor(props) {
        super(props);
        this.handleTermChange = this.handleTermChange.bind(this);
        this.state = {
            searchTerm: "placeholder",
        };
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
                />
            </ModalBody>
        );
    }

    handleTermChange(e) {
        //console.log(e.target.value)
        this.props.handleSearchItinerary(e.target.value)
    }

}

