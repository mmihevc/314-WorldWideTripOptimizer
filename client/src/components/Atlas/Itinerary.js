import React, {Component} from "react";
import {Button, Form, Table} from "reactstrap";

export default class Itinerary extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showItinerary: false
        };
    }

    render() {
        return (
            <Form>
                <br />
                <Button onClick={() => {this.setState({showItinerary: !this.state.showItinerary})}}>
                    Click to view itinerary
                </Button>
                {this.renderItinerary()}
            </Form>
        )
    }

    renderItinerary() {
        if (this.state.showItinerary) {
            return (
                <Table bordered>
                    <thead>
                    <tr>
                        <th>Destination</th>
                        <th>Leg Distance</th>
                        <th>Cumulative Distance</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.populateRows()}
                    </tbody>
                </Table>
            )
        }
    }

    populateRows() {
        let rows = [];
        this.props.destinations.map((destination, index) => {
            let beginning = destination.name;
            rows.push(this.formatData(index, beginning));
            index++;
        });
        return rows;
    }

    formatData(index, beg) {
        return (
            <tr key={index}>
                <td>{beg}</td>
                <td>{this.props.destinations[index].distance}</td>
                <td>{this.props.destinations[index].cumulativeDistance}</td>
            </tr>
        )
    }

}