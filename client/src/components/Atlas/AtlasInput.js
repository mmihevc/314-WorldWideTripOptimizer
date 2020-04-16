import React, {Component} from "react";
import {Button, Form, Input, InputGroup, InputGroupAddon, InputGroupText} from "reactstrap";

const UNICODE_UP_SYMBOL = '\u2191';
const UNICODE_DOWN_SYMBOL = '\u2193';

export default class AtlasInput extends Component {

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>🌎</InputGroupText>
                        {this.renderNameBox(this.props.index)}
                    </InputGroupAddon>
                    {this.renderLngLatBox(this.props.valid, this.props.invalid, this.props.index)}
                    <InputGroupAddon addonType="append">
                        {this.renderSwitchUpButton(this.props.index)}
                        {this.renderSwitchDownButton(this.props.index)}
                        {this.renderDeleteButton(this.props.index)}
                    </InputGroupAddon>
                </InputGroup>
            </Form>
        );
    }

    renderNameBox(index) {
        return (
            <Input name={"Name"+index}
                   placeholder="Name"
                   size='16'
                   onChange={this.props.onChange}
                   value={this.props.nameValue}/>
        )
    }

//TODO: Implement delete function
    renderDeleteButton(index) {
        return (
            <Button className="ml-1" onClick={() => {this.props.handleDeleteFunction(index)}}>✕️</Button>
        )
    }

    renderSwitchUpButton(index) {
        return (
            <Button className="ml-1" onClick={() => {this.props.handleSwitch("up", index)}}>{UNICODE_UP_SYMBOL}</Button>
        )
    }

    renderSwitchDownButton(index) {
        return (
            <Button className="ml-1" onClick={() => {this.props.handleSwitch("down", index)}}>️{UNICODE_DOWN_SYMBOL}</Button>
        );
    }

    handleDeleteFunction(){
        //TODO: Implement individual delete functionality
    }

    renderLngLatBox(valid, invalid, index) {
        return (
            <Input valid={valid}
                   invalid={invalid}
                   name={"Coords"+index}
                   placeholder="Longitude and Latitude"
                   onChange={this.props.onChange}
                   value={this.props.coordsValue}/>
        );
    }

    handleSubmit(event) {
        event.preventDefault();
    }

}