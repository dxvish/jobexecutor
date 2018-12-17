var React  = require('react');
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as consts from 'static/js/app/data/consts.js'
import CronBuilder from  'react-cron-builder';

class ScheduleContainer extends React.Component{

  render(){
    return (
<div className="panel panel-default">
                <div className="panel-heading">Schedule Event</div>
                <div className="panel-body">
                                <CronBuilder  onChange={(e)=>this.props.setCron(e)} showResult={false}/>
                    
                </div>
            </div>

    );
  }
}
module.exports = ScheduleContainer;
