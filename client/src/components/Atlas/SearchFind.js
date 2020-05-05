import React, {Component} from "react";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";


export default class SearchFind extends Component {

    constructor(props) {
        super(props);
        this.handleTermChange = this.handleTermChange.bind(this);

        this.state = {
            searchTerm: "placeholder",
            searchCoords: ""
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


}
