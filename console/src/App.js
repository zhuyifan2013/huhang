import React from 'react';
import Nav from "react-bootstrap/Nav";
import {Route, Switch} from "react-router-dom";
import StudyGroup from "./StudyGroup";
import SeniorComponent from "./senior/Senior";
import Container from "react-bootstrap/Container";
import UsersComponent from "./users/Users";

function App() {
  return (
      <Container>
          <Nav variant="pills" defaultActiveKey="/home">
              <Nav.Item>
                  <Nav.Link href="/home">所有用户</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                  <Nav.Link href="/senior">学长审核</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                  <Nav.Link href="/study_group">
                      Disabled
                  </Nav.Link>
              </Nav.Item>
          </Nav>
          <Switch>
              <Route path="/home">
                  <UsersComponent/>
              </Route>
              <Route path="/senior">
                  <SeniorComponent/>
              </Route>
              <Route path="/study_group">
                  <StudyGroup/>
              </Route>
          </Switch>
      </Container>
  );
}

export default App;
