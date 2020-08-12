import React from "react";
import {Button} from "react-bootstrap";

class SeniorItem extends React.Component {

    constructor(props) {
        super(props);
    }
    render() {
        return <tr>
            <td>{this.props.user.user_name}</td>
            <td>{this.props.user.school_name}</td>
            <td><Button onClick={()=>{}}>审核</Button></td>
        </tr>
    }
}

export default SeniorItem;
