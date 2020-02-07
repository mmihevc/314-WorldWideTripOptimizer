import React, {Component} from 'react';
import {Container, Row, Col, Button} from 'reactstrap';
import {Card, CardImg, CardTitle} from 'reactstrap';
import {CLIENT_TEAM_NAME} from "../Constants";
import '../tcowebstyle.css';
import kevinImage from './images/kevin.jpg';
import maddieImage from './images/maddie.jpg';
import kaiImage from './images/kai.jpg';
import jackieImage from './images/Jackie.jpg';

const TEAM_STATEMENT = 'Team [hip, hip] aims to work together combining our unique talents to provide exceptional ' +
                       'work all while doing it with a smile!';

const KEVIN_BIO = 'Kevin is a mechanical engineering student in his fourth year at Colorado State University. ' +
                  'He is pursuing a minor in computer science and has a passion for all things tech. Currently he ' +
                  'works at Spirae in old town Fort Collins, where he is helping to prototype a control and ' +
                  'monitoring application for a cloud-connected portable microgrid electric system. He enjoys ' +
                  'hobbies such as downhill skiing, indoor bouldering, binging online TV series, and playing classic ' +
                  'World of Warcraft. Kevin is originally from Maryland where he grew up and went to high school, ' +
                  'but is now a full blown Coloradan who loves the state.';
const JACKIE_BIO ='Jackie is a senior at Colorado State University majoring in Applied Computing Technology.' +
                  'She believes when we support each other we can accomplish great things and thrives in team ' +
                  'settings. Coming into the major with little to no experience in the field, her knowledge of ' +
                  'computer science is constantly growing as she is eager to learn. She has experience working in ' +
                  'an industry setting with two summer internships at Webroot Cyber Security where she interned ' +
                  'under a product owner working with Salesforce and Oracle teams. Originally born in the bay area ' +
                  'of California, her family moved to Colorado when she was a young age to pursue their love for ' +
                  'the skiing and the outdoors. She loves plants, pugs, and painting and despises being cold.';

const MADDIE_BIO = 'Maddie is an Applied Computing Technology major in her third year at Colorado State University. ' +
                   'She is currently the lead TA for CS150 and wants to take the knowledge she has learned in that ' +
                   'position to become a computer science high school teacher or professor. She enjoys learning about and working ' +
                   'towards improving computer science education and is very passionate about getting students involved ' +
                   'in computer science, especially girls. She enjoys numerous outdoor activities including slacklining,' +
                   'mountain biking and rafting. She is from Littleton, Colorado and does not ever plan on living in any other state.';

const KAIS_BIO =  'Kai was born in Virginia Mason hospital on April 5th, 1999 to Michelle and Torsten. He had ' +
                  'no choice in the matter and remains annoyed by this fact. He probably went to high school or ' +
                  'something. Kai started college as an electrical engineering major before switching to computer ' +
                  'science to pursue programming. He most recently worked demolition for a small construction '+
                  'company. He recommends "The Sparrow" by Maria Doria Russell.';
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
          <Row>
            <Col>
                <h5>{this.state.bio}</h5>
            </Col>
          </Row>
          <hr color="black" />
          <Row>
            <Col>
              <Card onClick={() => {this.setBio(KEVIN_BIO)}}>
                <CardImg top width="100%" src={kevinImage} />
                <CardTitle className="mt-3 font-weight-bold">Kevin Schroeder</CardTitle>
              </Card>
            </Col>
            <Col>
              <Card onClick={() => {this.setBio(MADDIE_BIO)}}>
                  <CardImg top width="100%" src={maddieImage} />
                  <CardTitle className="mt-3 font-weight-bold">Maddie Mihevc</CardTitle>
              </Card>
            </Col>
            <Col>
              <Card onClick={() => {this.setBio(KAIS_BIO)}}>
                <CardImg top width="100" src={kaiImage}  />
                <CardTitle className="mt-3 font-weight-bold">Kai Griem</CardTitle>
              </Card>
            </Col>
            <Col>
              <Card onClick={() => {this.setBio(JACKIE_BIO)}}>
                <CardImg top width="100%" src={jackieImage} />
                <CardTitle className="mt-3 font-weight-bold">Jackie Clotfelter</CardTitle>
              </Card>
            </Col>
          </Row>
        </Container>
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
