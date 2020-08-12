import React from "react";
import {Button, Container, Table} from "react-bootstrap";
import axios from "./axios";

class StudyGroupComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            studyGroupUsers: [],
        }
    }

    componentDidMount() {
        axios.get('/study_group').then(res => {
            this.setState({
                    studyGroupUsers: JSON.parse(res.data.data)
                }
            )
        })
    }

    render() {
        return <Container>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Wechat OpenID</th>
                    <th>User Name</th>
                    <th>User Role</th>
                </tr>
                </thead>
                <tbody>
                {}
                </tbody>
            </Table>
        </Container>

    }

    buildItem(user) {

    }
}

export default StudyGroupComponent;
