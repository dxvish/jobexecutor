import React, { Component } from "react";
import Event from './Event';
import Schedule from './Schedule';

let initialState = {
    time_event: true,
    selected_time: "",
    is_recurrance: false,
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
    isRecurrance = (event) => {
        console.log(event)
        this.setState({ selected_time: event });
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
    render() {
        return (
            <div>
                <Schedule handleEventType={this.handleEventType} isRecurrance={this.isRecurrance} is_recurrance={this.state.is_recurrance} time_event={this.state.time_event} handleTime={this.handleTime} />

            </div>
        );
    }
}
export default Body;
