import React, {Component} from 'react';
import {Container, Row, Col, Button} from 'reactstrap';
import {Card, CardImg, CardTitle} from 'reactstrap';
import {CLIENT_TEAM_NAME, JACKIE_BIO, KAIS_BIO, KEVIN_BIO, MADDIE_BIO, TEAM_STATEMENT} from "../Constants";
import '../tcowebstyle.css';
import kevinImage from './images/kevin.jpg';
import maddieImage from './images/maddie.jpg';
import kaiImage from './images/kai.jpg';
import jackieImage from './images/Jackie.jpg';



const NAME_FORMAT = 'mt-3 font-weight-bold';

export default class About extends Component {

    constructor(props) {
      super(props);

      this.state = {
        bio: TEAM_STATEMENT
      }
    }

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
          {this.renderBio()}
          <hr color="black" />
          {this.renderTeam()}
        </Container>
      )
    }

    renderBio() {
      return (
        <Row>
          <Col>
            <h5>{this.state.bio}</h5>
          </Col>
        </Row>
      )
    }

    renderTeam() {
      return (
        <Row>
          {this.renderPerson(KEVIN_BIO, kevinImage, 'Kevin Schroeder')}
          {this.renderPerson(MADDIE_BIO, maddieImage, 'Maddie Mihevc')}
          {this.renderPerson(KAIS_BIO, kaiImage, 'Kai Griem')}
          {this.renderPerson(JACKIE_BIO, jackieImage, 'Jackie Clotfelter')}
        </Row>
      )
    }

    renderPerson(bio, img, name) {
      return (
        <Col>
          <Card onClick={() => {this.setBio(bio)}}>
            <CardImg src={img} />
            <CardTitle className={NAME_FORMAT}>{name}</CardTitle>
          </Card>
        </Col>
      )
    }

    setBio(newBio) {
      if (this.strCompare(newBio, this.state.bio)) {
        this.setState({
          bio: TEAM_STATEMENT
        })
      } else {
        this.setState({
          bio: newBio
        })
      }
    }

    strCompare(str1, str2) {
      return (str1.localeCompare(str2) === 0);
    }
}
