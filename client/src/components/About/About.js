import React, {Component} from 'react';
import {Container, Row, Col, Button} from 'reactstrap';
import {Card, CardImg, CardTitle} from 'reactstrap';
import {CLIENT_TEAM_NAME} from "../Constants";
import '../tcowebstyle.css';
import kevinImage from './images/kevin.jpg';

export default class About extends Component {

    render() {
      return (
        <Container id="about">
          <Row>
            <Col>
              <h2 className="font-weight-bold" >
                {CLIENT_TEAM_NAME}
              </h2>
            </Col>
            <Col id="closeAbout" xs='auto' >
              <Button className='btn-csu w-100' onClick={this.props.closePage} xs={1}>
                Close
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card>
                <CardImg top width="100%" src={kevinImage} />
                <CardTitle className="mt-3 font-weight-bold">Kevin Schroeder</CardTitle>
              </Card>
            </Col>
            <Col></Col>
            <Col></Col>
            <Col></Col>
          </Row>
        </Container>
      )
    }
}
