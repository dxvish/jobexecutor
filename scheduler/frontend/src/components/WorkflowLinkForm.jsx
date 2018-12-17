var React  = require('react');



var WorkflowLinkForm = React.createClass({
    render: function(){
        const inputFields = this.props.workflow_link.map((Element, index) => {
            return <Element  key={ index } editWorflowLink={this.props.editWorflowLink} deleteWorkflowLink = {this.props.deleteWorkflowLink} name={`wf_link_${index}`} index={ index } link_param_array={this.props.link_param_array} param_default = {this.props.param_default}/>
        });
        return (

            <div>
                <div className="panel panel-default">
                    <div className="panel-heading">Add Workflows</div>
                    <div className="panel-body">
                        <button onClick={ this.props.addWorflowLink } className="btn btn-default">Add</button>

                        { inputFields.length > 0 &&
                            <div className="inputs">


                                <table className="table table-bordered table-margin">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th className="th_align">URL</th>
                                            <th className="th_align">Send POST data</th>
                                            <th className="th_align">Parameter</th>
                                            <th className="th_align">Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { inputFields }
                                    </tbody>
                                </table>
                            </div>
                        }

                    </div>
                </div>

            </div>

        );
    }
})
module.exports = WorkflowLinkForm;
