import React, {Component} from "react";
import {Form, Input, InputGroup, InputGroupAddon, InputGroupText} from "reactstrap";

export default class AtlasInput extends Component {

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <br/>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>🌎</InputGroupText>
                        {this.renderNameBox(this.props.index)}
                    </InputGroupAddon>
                    {this.renderLngLatBox(this.props.valid, this.props.invalid, this.props.index)}
                </InputGroup>
            </Form>
        );
    }

    renderNameBox(index) {
        return (
            <Input id={"name"+index}
                   placeholder="Name"/>
        )
    }

    renderLngLatBox(valid, invalid, index) {
        return (
            <Input valid={valid}
                   invalid={invalid}
                   id={"longitudeLatitude"+index}
                   placeholder="Longitude and Latitude"/>
        );
    }

    handleSubmit(event) {
        event.preventDefault();
    }

}