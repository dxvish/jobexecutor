import React, { Component } from "react";
import { Grid, Row, Col, Table, Glyphicon } from 'react-bootstrap';
class Jobs extends Component {
  render() {
    return (
               <Row className="show-grid">
          <Col xs={12} md={12}>
            <Table bordered condensed hover>
              <thead>
                <tr>
                  <th>Job Name</th>
                  <th>Job Type</th>
                  <th>Priority</th>
                  <th>Stop</th>
                  <th>Retry</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
              {this.props.job_list.map(( job, index ) => {
          return (
            <tr key={index}>
              <td>{job.jobname}</td>
              <td>{job.jobtype}</td>
              <td>{job.priority}</td>
              <td><Glyphicon glyph="stop" /></td>
              <td><Glyphicon glyph="pause" /></td>
              <td><Glyphicon glyph="refresh" /></td>
              <td><Glyphicon onClick={()=> this.props.deletejob(job.job_id)} glyph="remove" /></td>
            </tr>
          );
        })}
              </tbody>
            </Table>
        </Col>
        </Row>
    );
  }
}
export default Jobs;
