import React, { Component } from "react";
import Schedule from './Schedule';
import { Grid, Row, Col} from 'react-bootstrap';
import Jobs from './Jobs';
const axios = require('axios');

let initialState = {
    time_event: true,
    selected_time: "",
    is_recurrance: false,
    job_name: "",
    job_list:[]
}

class Body extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }
    handleTime = (event) => {
        console.log(event)
        this.setState({ selected_time: event });
    };
    handleJob = (event) => {
        console.log(event)
        var job_name = event.currentTarget.value;
        this.setState({ job_name: job_name });
    };
    isRecurrance = (event) => {
        var toggleval = (this.state.is_recurrance ? false : true)
        this.setState({ is_recurrance: toggleval });
    };
    handleEventType = (event) => {
        var flag = false;
        var currentSelection = event.currentTarget.value;
        if (currentSelection == "time") {
            flag = true
        } else {
            flag = false
        }
        this.setState({
            time_event: flag,
        });
    };
    componentDidMount(){
        var self=this;
        var resp = null;
        axios.get('http://127.0.0.1:8000/list_all/').then(function(response){
            resp = JSON.parse(response.data);
            self.setState({
                job_list:JSON.parse(response.data)
            });
        },function(err){
            console.log("err"+err)
        });
    }
    getJobs = () =>{
        
        axios.get('http://127.0.0.1:8000/list_all/')
        .then(function (response) {
          // handle success
          console.log(response);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    }
    submitJob = (event) =>{
        var currentState = this.state;
        var self=this;
        axios.post('http://127.0.0.1:8000/save_job/', currentState)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    deletejob = (event) =>{
        console.log(event.currentTarget.value)
    }
    render() {
        return (
            <Grid>
                <Row className="show-grid">
                    <Col xs={12} md={12}>
                        <Schedule handleJob={this.handleJob} job_name={this.state.job_name}
                            is_recurrance={this.state.is_recurrance} handleEventType={this.handleEventType}
                            isRecurrance={this.isRecurrance} event_list = {[]} priority = {[]}
                            time_event={this.state.time_event} handleTime={this.handleTime} submitJob = {this.submitJob}/>
                    </Col>
                    </Row>
                    <Row className="show-grid">
                    <Col xs={12} md={12}>
                    <Jobs job_list = {this.state.job_list} deletejob = {this.deletejob}/>
                    </Col>
                </Row>
                
            </Grid>
        );
    }
}
export default Body;
