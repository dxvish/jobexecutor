import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Body from './Body';
import { Navbar, Nav} from 'react-bootstrap';


class App extends Component {
  render() {
    return (
      <Router>
        <div><Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#home">Job Scheduler</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
          </Nav>
        </Navbar>
          <Route path="/" exact component={Body} />
        </div>
      </Router>
    );
  }
}

export default App;
