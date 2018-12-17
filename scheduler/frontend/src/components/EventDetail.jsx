var React  = require('react');
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

class EventDetail extends React.Component{

    render(){
        return (
            <div className="panel panel-default">
                <div className="panel-heading">Event Details</div>
                <div className="panel-body form-horizontal">

                    <div className="form-group">
                        <label htmlFor="event_name" className="control-label col-sm-2">Event Name</label>
                        <div className="col-sm-4">
                            <input type="text" name="event_name" className="form-control" id="event_name" onChange={(evt)=> this.props.formChange(evt,"event_name")} value ={this.props.event_name}  placeholder="Event Name"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-2" htmlFor="start_date">Start Date</label>
                        <div className="col-sm-4">
                            <DatePicker utcOffset='1' className="form-control" dateFormat="YYYY-MM-DD HH:mm"
    id="start_date"  value ={this.props.start_date} selected={this.props.start_date} showYearDropdown onChange={(evt)=> this.props.formChange(evt,"start_date")} showTimeSelect minDate={moment()} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-2" htmlFor="end_date">End Date</label>
                        <div className="col-sm-4">
                            <DatePicker className="form-control" 
      id="end_date"  value ={this.props.end_date} selected={this.props.end_date} showYearDropdown onChange={(evt)=> this.props.formChange(evt,"end_date")} dateFormat="YYYY-MM-DD HH:mm" minDate={moment()} showTimeSelect utcOffset='1'/>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
};
module.exports = EventDetail;
