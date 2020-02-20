import React, { Component } from "react";
import { Container, Modal, ModalHeader, Button, ModalBody, ModalFooter} from "reactstrap";

import ServerSettings from "./ServerSettings";

import "./header-footer.css";


const UNICODE_LINK_SYMBOL = "\uD83D\uDD17";
const UNICODE_WARNING_SIGN = "\u26A0";
const UNKNOWN_SERVER_NAME = "Unknown";


export default class Footer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            serverSettingsOpen: false,
            modal: false
        };
        this.toggle = this.toggle.bind(this);
    }

    render() {
        return (
            <div className="full-width footer">
                {this.renderServerInformation()}
                {this.renderConfigInformation()}
            </div>
        );
    }

    renderServerInformation() {
        const serverName = this.getServerNameFromConnectionStatus();
        const linkStatusSymbol = this.getSymbolFromConnectionStatus();
        return (
            <div className="vertical-center tco-text">
                <Container>
                    <div className="centered">
                        {linkStatusSymbol} Connected to
                        <a onClick={() => this.setState({modal: true})}> {serverName}</a>
                        <a className="tco-text" onClick={() => this.setState({serverSettingsOpen: true})}>
                            ({this.props.serverSettings.serverPort}).
                        </a>
                    {this.renderServerSettings()}
                    </div>
                </Container>
            </div>
        );
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    renderConfigInformation() {
        return (
            <div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}> Server Configuration </ModalHeader>
                    <ModalBody>

                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.toggle}>Close</Button>
                    </ModalFooter>

                </Modal>
            </div>
        );
    }

    getSymbolFromConnectionStatus() {
        return this.connectedToValidServer() ? UNICODE_LINK_SYMBOL : UNICODE_WARNING_SIGN;
    }

    getServerNameFromConnectionStatus() {
        return this.connectedToValidServer() ? this.props.serverSettings.serverConfig.serverName : UNKNOWN_SERVER_NAME;

    }

    connectedToValidServer() {
        return this.props.serverSettings.serverConfig && this.props.serverSettings.serverConfig.serverName;
    }

    renderServerSettings() {
        return (
            <ServerSettings
                isOpen={this.state.serverSettingsOpen}
                toggleOpen={(isOpen = !this.state.serverSettingsOpen) => this.setState({serverSettingsOpen: isOpen})}
                serverSettings={this.props.serverSettings}
                updateServerConfig={this.props.updateServerConfig}
            />
        );
    }
}
