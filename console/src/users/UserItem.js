import React from "react";
import UsersComponent from "./Users";

class UserItem extends React.Component {

    constructor(props) {
        super(props);
    }
    render() {
        return <tr>
            <td>{this.props.user.wechat_openid}</td>
            <td>{this.props.user.user_name}</td>
            <td>{this.props.user.user_role}</td>
        </tr>
    }
}

export default UserItem;
