import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Body from './Body';
import Jobs from './Jobs';



const AppRouter = () => (
  <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
            
          </li>
          <li><Link to="/jobs">Jobs</Link></li>
        </ul>
      </nav>

      <Route path="/" exact component={Body} />
      <Route path="/jobs" exact component={Jobs} />
    </div>
  </Router>
);

export default AppRouter;