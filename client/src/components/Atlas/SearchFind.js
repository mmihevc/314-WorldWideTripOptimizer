import React, {Component} from "react";
import {Button, Form, FormGroup, Input, Label, Row, Col} from "reactstrap";
import {latLngToString} from "../../utils/input";


export default class SearchFind extends Component {

    constructor(props) {
        super(props);
        this.handleTermChange = this.handleTermChange.bind(this);

        this.state = {
            searchTerm: "placeholder",
            searchCoords: latLngToString(0.0, 0.0),
            limit: ""
        };
    }

    render() {
        return (
            <div>
            <Form className={"searchbox"} onSubmit={this.handleSubmit}>
                <Row form>
                    <Col md={3}>
                        <FormGroup>
                            <Label for="limit">Limit</Label>
                            <Input id="limit"
                                   type="search"
                                   name="search"
                                   placeholder="optional"
                                   onChange={this.handleTermChange}
                                   onKeyDown={this.handleEnter}
                            />
                        </FormGroup>
                    </Col>
                    <Col md={9}>
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
                    </Col>
                </Row>
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
        let limit = document.getElementById("limit").value;
        if (!isNaN(limit)) {
            this.setState({limit: limit});
        }
        else {
            alert("limit must be a number");
        }
        this.handleSearch();
    }

    handleSearch(e){
        alert(this.state.limit);
        alert(this.state.searchTerm);
        //implement search
    }

    handleEnter(e){
        if (e.key === 13) {
            // this.handleSearch();
            this.handleTermChange(e);
        }
    }

}
