import React, {useState} from "react";
import axios from '../axios';
import {Button, Container, Modal, Table} from "react-bootstrap";
import UserItem from "./UserItem";

class UsersComponent extends React.Component {

    handleClose = () => this.setState({show: false})
    handleShow = () => this.setState({show: true})

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            show: false,
        }

    }

    componentDidMount() {
        axios.get('/user').then(res => {
            this.setState({
                    users: JSON.parse(res.data.data)
                }
            )
        })
    }


    render() {
        return <Container>
            <Button
                variant="primary"
                onClick={this.handleShow}
            />
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Wechat OpenID</th>
                    <th>User Name</th>
                    <th>User Role</th>
                </tr>
                </thead>
                <tbody>

                {this.state.users.map(user =>
                    <UserItem key={user.wechat_openid} user={user}/>
                )}
                </tbody>

            </Table>
            <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>添加新用户</Modal.Title>
                </Modal.Header>
                <Modal.Body>

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

export default UsersComponent;
