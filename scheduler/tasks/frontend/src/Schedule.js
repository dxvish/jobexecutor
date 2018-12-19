import React, { Component } from "react";
import TimePicker from 'rc-time-picker';
import moment from 'moment';
import 'rc-time-picker/assets/index.css';
import { Form, FormGroup, Col, ControlLabel, Panel, Radio, Checkbox, Button, FormControl } from 'react-bootstrap';

const format = 'h:mm a';
const now = moment().hour(0).minute(0);

class Schedule extends Component {
    render() {
        return (
            <div>
                <Panel>
                    <Panel.Body>
                        <Form horizontal>
                            <FormGroup >
                                <Col componentClass={ControlLabel} sm={2}>
                                    <span htmlFor="event">Job Name</span>
                                </Col>
                                <Col sm={9}>
                                    <input type="text" value={this.props.jobname} name="job_name" onChange={this.props.handleJob} />
                                </Col>
                                <Col sm={4}>
                                    <Radio checked={this.props.time_event} value="time" onChange={this.props.handleEventType} name="event_type" inline>
                                        Time
                                </Radio>{' '}
                                    <Radio onChange={this.props.handleEventType} value="event" name="event_type" inline>
                                        Event
                                </Radio>{' '}
                                </Col>

                            </FormGroup>


                            {this.props.time_event ?
                                <div>
                                    <FormGroup >
                                        <Col componentClass={ControlLabel} sm={2}>
                                            <span htmlFor="event">Select Time</span>
                                        </Col>
                                        <Col sm={3}>
                                            <TimePicker showSecond={false} defaultValue={now} className="xxx" onChange={this.props.handleTime} format={format} use12Hours />

                                            <Checkbox name="recurring" value={this.props.is_recurrance} checked={this.props.is_recurrance} onChange={this.props.isRecurrance} readOnly>
                                                Recurring
                                            </Checkbox>
                                        </Col>
                                    </FormGroup>

                                </div>
                                :
                                <FormGroup >
                                    <Col componentClass={ControlLabel} sm={2}>
                                        <span htmlFor="event">Event</span>
                                    </Col>
                                    <Col sm={3}>
                                        <FormControl componentClass="select" placeholder="select">

                                            {this.props.event_types.map((event, index) => {
                                                return (
                                                    <option value={event.id}>{event.display_name}</option>

                                                );
                                            })}
                                        </FormControl>

                                        <select />
                                    </Col>
                                </FormGroup>
                            }
                            <FormGroup >
                                <Col componentClass={ControlLabel} sm={2}>
                                    <span htmlFor="event">Priority</span>
                                </Col>
                                <Col sm={2}>

                                    <FormControl componentClass="select" placeholder="select">
                                    {this.props.priority.map((p, index) => {
                                                return (
                                                    <option value={p}>{p}</option>

                                                );
                                            })}
                                    </FormControl>
                                </Col>
                            </FormGroup>
                            <Button onClick={this.props.submitJob}>Save</Button>
                        </Form>

                    </Panel.Body>
                </Panel>
            </div>
        );
    }
}
export default Schedule;
