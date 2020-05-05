import React, {Component} from "react";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import {latLngToString} from "../../utils/input";


export default class SearchFind extends Component {

    constructor(props) {
        super(props);
        this.handleTermChange = this.handleTermChange.bind(this);

        this.state = {
            searchTerm: "placeholder",
            searchCoords: latLngToString(0.0, 0.0)
        };
    }

    render() {
        return (
            <div>
            <Form className={"searchbox"} onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Label for="semanticSearch">Search Place</Label>
                    <Input
                        type="search"
                        name="search"
                        id="semanticSearch"
                        placeholder="Place name, municipality, region, and/or country"
                        onChange={this.handleTermChange}
                        onKeyDown={this.handleEnter}
                    />
                </FormGroup>
            </Form>
                {this.renderAddToItineraryButton()}
            </div>
    );
    }

    renderAddToItineraryButton(){
        return(
            <Button onClick={() => {this.props.handleAddToItinerary(this.state.searchTerm, this.state.searchCoords)}} className="ml-1">Add To Itinerary️</Button>
        )
    }

    handleSubmit(){
        //implement submit
    }

    handleTermChange(e){
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
    }

}
