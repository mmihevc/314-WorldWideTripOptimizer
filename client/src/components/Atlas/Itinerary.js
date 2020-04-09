import React, {Component} from "react";
import {Button, Table, ListGroup} from "reactstrap";

export default class Itinerary extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showItinerary: false
        };
    }

    render() {
        return (
            <div className="mt-1">
                {this.renderToggleButton()}
                {this.renderItinerary()}
            </div>
        )
    }

    renderToggleButton() {
        if (this.props.destinations.length >= 1) {
            return (
                <Button className="mb-1" onClick={() => {
                    this.setState({showItinerary: !this.state.showItinerary})
                }}>
                    Click to view itinerary
                </Button>
            )
        }
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
        if (this.props.destinations.length >= 2) {
            let rows = [];
            rows.push(this.formatData(this.props.destinations[0].name, 0, 0));
            for (let i = 0; i < this.props.destinations.length; i++) {
                let name;
                if (i === this.props.destinations.length - 1)
                    name = this.props.destinations[0].name;
                else
                    name = this.props.destinations[i+1].name;
                let leg = this.props.destinations[i].distance;
                let cumulative = this.props.destinations[i].cumulativeDistance;
                rows.push(this.formatData(name, leg, cumulative));
            }
            return rows;
        } else if (this.props.destinations.length === 1) {
            return this.formatData(this.props.destinations[0].name, 0, 0);
        } else {
            return null;
        }
    }

    formatData(name, leg, cumulative) {
        return (
            <tr key={name + ', ' + cumulative}>
                <td>{name}</td>
                <td>{leg}</td>
                <td>{cumulative}</td>
            </tr>
        )
    }

}