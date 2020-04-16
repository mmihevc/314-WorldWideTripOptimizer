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
                        {this.renderSwitchUpButton(this.props.index)}
                        {this.renderSwitchDownButton(this.props.index)}
                        {this.renderNameBox(this.props.index)}
                    </InputGroupAddon>
                    {this.renderLngLatBox(this.props.valid, this.props.invalid, this.props.index)}
                    <InputGroupAddon addonType="append">
                        {this.renderDeleteButton(this.props.index)}
                    </InputGroupAddon>
                </InputGroup>
            </Form>
        );
    }

    renderNameBox(index) {
        return (
            <Input id={"name"+index}
                   placeholder="Name"
                   size='16'/>
        )
    }

//TODO: Implement delete function
    renderDeleteButton(index) {
        return (
            <Button className="ml-1" onClick={() => {this.handleDeleteFunction()}}>✕️</Button>
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
                   id={"longitudeLatitude"+index}
                   placeholder="Longitude and Latitude"/>
        );
    }

   /* handleSwitch(direction, index){
        if(direction === "up"){
            //Switch current with previous destination, rerender line, itinerary, and input boxes
            let oldDestinations = [];
            for (let i=0; i < this.props.numInputs; i++)
                oldDestinations[i] = getInput(i);
            let prevDestination = oldDestinations[index-1];
            let curDestination = oldDestinations[index];
            setInput(index-1, curDestination);
            setInput(index, prevDestination);
            this.props.handleInputChange();
        }
        if(direction === "down"){
            //Switch current with next destination, rerender line, itinerary, and input boxes
        }
    }
   /* handleSwitch(direction, index){
        if(direction === "up"){
            //let newDestinations = [];
            //Switch current with previous destination, rerender line and input boxes
        }
        if(direction === "down"){
            //Switch current with next destination, rerender line and input boxes
        }
    }*/

    handleSubmit(event) {
        event.preventDefault();
    }

}