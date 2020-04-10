import React, {Component} from "react";
import {Form, Input, InputGroup, InputGroupAddon, InputGroupText} from "reactstrap";
import {Droppable, Draggable} from 'react-beautiful-dnd';




export default class AtlasInput extends Component {

    render() {
        return (
            <Droppable droppableId={1}>
                {provided => (
            <Form onSubmit={this.handleSubmit}
                innerRef={provided.innerRef}
                {...provided.droppableProps}
                >
                <Draggable draggableId={this.props.id} index={this.props.index}>
                    {provided => (
                <InputGroup
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    innerRef={provided.innerRef}
                >
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>🌎</InputGroupText>
                        {this.renderNameBox(this.props.index)}
                    </InputGroupAddon>
                    {this.renderLngLatBox(this.props.valid, this.props.invalid, this.props.index)}
                </InputGroup>
                    )}
                </Draggable>
                {provided.placeholder}
            </Form>
                )}
            </Droppable>
        );
    }

    renderNameBox(index) {
        return (
            <Input id={"name"+index}
                   placeholder="Name"
                   size='16'/>
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