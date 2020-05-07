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
                    {this.renderSearchAndLimit(3, "limit",  "optional")}
                    {this.renderSearchAndLimit(9, "semanticSearch", "Place name, municipality, region, and/or country")}
                </Row>
            </Form>
                {this.renderAddToItineraryButton()}
            </div>
        );
    }

    renderSearchAndLimit(num, id, placeholder) {
        return (
            <Col md={num}>
                <FormGroup>
                    <Label for={id}>Limit</Label>
                    <Input id={id}
                           type="search"
                           name="search"
                           placeholder={placeholder}
                           onChange={this.handleTermChange}
                           onKeyDown={this.handleEnter}
                    />
                </FormGroup>
            </Col>
        )
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
        //implement search
    }

    handleEnter(e){
        if (e.key === 13) {
            // this.handleSearch();
            this.handleTermChange(e);
        }
    }

}
