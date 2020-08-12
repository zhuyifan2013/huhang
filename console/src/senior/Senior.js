import React from "react";
import axios from "../axios";
import {Button, Container, Modal, Table, Form} from "react-bootstrap";
import SeniorItem from "./SeniorItem";


class SeniorComponent extends React.Component {

    handleClose = () => this.setState({show: false})
    handleShow = () => this.setState({show: true})

    constructor(props) {
        super(props);
        this.state = {
            seniors: [],
            show: false
        }
    }

    componentDidMount() {
        axios.get('/senior/unverified').then(res => {

            console.log(res.data.data)
            this.setState({
                    seniors: JSON.parse(res.data.data)
                }
            )
        })
    }


    render() {
        return <Container>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>User Name</th>
                    <th>School Name</th>
                </tr>
                </thead>
                <tbody>
                {this.state.seniors.map(senior =>
                    <SeniorItem key={senior.wechat_openid} user={senior} onReview={() => {
                        this.reviewSenior = senior
                        this.handleShow()
                    }}/>
                )}
                </tbody>
            </Table>
            <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>用户审核</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>学校</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    }
}

export default SeniorComponent;
