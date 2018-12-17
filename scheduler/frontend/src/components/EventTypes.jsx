var React  = require('react');
import { Button,ButtonToolbar,ToggleButtonGroup,ToggleButton} from 'react-bootstrap';
import * as ReactBootstrap from 'react-bootstrap';


class EventTypes extends React.Component{

render(){
    return (
        <ReactBootstrap.ButtonToolbar>
          <ReactBootstrap.ToggleButtonGroup justified type="radio" onChange={(e)=> this.props.event_toggle(e)}  name="event_type" defaultValue={this.props.active_event}>
            {
              this.props.event_list.map(function(event){
                return <ReactBootstrap.ToggleButton key={event.id}  value={event.id}>{event.display_name}</ReactBootstrap.ToggleButton>
              })
            }
          </ReactBootstrap.ToggleButtonGroup>
        </ReactBootstrap.ButtonToolbar>
    );
  }
}
module.exports = EventTypes;
