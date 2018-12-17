import customStyles from 'static/css/custom.css';
var React  = require('react');
import {Grid,Row,Navbar, Jumbotron, Button ,Col} from 'react-bootstrap';
var Navigation = require('Navigation');
var axiosAPI = require('axiosAPI');

import * as consts from 'static/js/app/data/consts'
import { ToastContainer, toast } from 'react-toastify';
var {Route, Router, IndexRoute, browserHistory} = require('react-router');

import 'react-toastify/dist/ReactToastify.min.css'; 
const initialState = {
    active_tab:"list_all",
    event_list : []
};
class Routing extends React.Component{
    constructor(props){
        super(props);
        this.state = initialState;
    }
    componentDidMount(){
        var self=this;

        axiosAPI.get("/event/list_all/").then(function(response){
            self.setState({
                event_list:response
            });     
        },function(err){
            console.log("err"+err)
        });
    }

    deleteEvent=(obj)=>{
        var self=this;
        axiosAPI.get("/event/delete_event/"+obj).then(function(response){
            console.log(response)
            self.setState({
                event_list:response
            });     
            console.log(response)
        },function(err){
            console.log("err"+err)
        });
    }
    disableEvent=(obj)=>{
        var self=this;
        axiosAPI.get("/event/disable_event/"+obj).then(function(response){
            console.log(response)
            self.setState({
                event_list:response
            });     
            console.log(response)
        },function(err){
            console.log("err"+err)
        });
    }
    render(){
        return (
            <div>
                <Navigation active_tab ={this.state.active_tab}/> 
                <div className="container">
                    <div className="col-md-12">
                            <h4>Available Events</h4>      
                        <hr/>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th className="th_align">Event Name</th>
                                    <th className="th_align">Start Date</th>
                                    <th className="th_align">End Date</th>
                                    <th className="th_align">CRON</th>
                                    <th className="th_align">Disable</th>
                                    <th className="th_align">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.event_list.map((event,index)=>{
                                        return <tr key={index}><td className="th_align"><a href="#">{event.eventname}</a></td><td className="th_align">{event.start_date}</td><td className="th_align">{event.end_date}</td><td className="th_align">{event.cron}</td>
                                            <td className="th_align">
                                                <button type="button" className = "btn btn-sm btn-info " disabled = {event.disabled}
                                                     onClick={()=> this.disableEvent(event.event_id)}>Disable</button>
                                            </td>
                                            <td className="th_align">
                                                <button type="button" className = "btn btn-sm btn-danger" onClick={()=> this.deleteEvent(event.event_id)}>Delete</button>
                                            </td></tr>    
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}
module.exports = Routing;
