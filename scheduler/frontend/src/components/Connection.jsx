var React  = require('react');
var axiosAPI = require('axiosAPI');


class Connection  extends React.Component{
    render(){
        return (
            <div className="panel panel-default">
                <div className="panel-heading">Connection Information Details</div>
                <div className="panel-body">
                    <div className="form-group form-horizontal">
                        <label htmlFor="connection_info" className="control-label col-sm-2">Available Connections </label>
                        <div className="col-sm-4">
                            <select className="form-control"  name="connection_info" onChange={this.props.connectionChange} id="file_template">
                                <option value="">Choose an Option</option>
                                { this.props.connection_info.length > 0 &&
                                    this.props.connection_info.map(function(obj){
                                        return <option key={obj.pk} value={obj.pk}>{obj.fields.custom_id}</option>
                                    })
                                }
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
module.exports = Connection;
