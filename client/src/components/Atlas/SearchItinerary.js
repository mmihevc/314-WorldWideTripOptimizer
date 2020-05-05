import React, {Component} from "react";
import {Button, Input, Label, ModalBody} from "reactstrap";


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
                {this.renderGetMatchesButton()}
            </ModalBody>
        );
    }

    renderGetMatchesButton(){
        return(
            <div>
            <Button onClick={() => {this.props.handleSearchItinerary(this.state.searchTerm)}} className="ml-1">Search Itinerary for Matches</Button>
            </div>
        )
    }

    handleTermChange(e){
        this.setState({ searchTerm: e.target.value});
    }

}

