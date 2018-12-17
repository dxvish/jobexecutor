import React, { Component } from "react";
import TimePicker from 'rc-time-picker';
import Event from './Event';

import moment from 'moment';
import 'rc-time-picker/assets/index.css';
const format = 'h:mm a';
const now = moment().hour(0).minute(0);
function onChange(value) {
    console.log(value && value.format(format));
}
function TimeBased(props) {
    return
}

function EventBased(props) {
    return <h1>Sle</h1>;
}
class Schedule extends Component {
    render() {
        return (
            <div>
                <span htmlFor="event">Job Name</span>
                <input type="text" value="" name="job_name" /><br />
                Time specific <input type="radio" value="time" checked={this.props.time_event} onChange={this.props.handleEventType} name="event_type" />
                Event specific <input type="radio" value="event" onChange={this.props.handleEventType} name="event_type" />
                <input type="checkbox" checked={this.props.is_recurrance} onChange={this.props.isRecurrance} />
                <div>
                    {this.props.time_event ?
                        <div>
                            <TimePicker showSecond={false} defaultValue={now} className="xxx" onChange={this.props.handleTime} format={format} use12Hours />

                        </div>
                        :
                        <Event />
                    }
                </div>

            </div>
        );
    }
}
export default Schedule;
