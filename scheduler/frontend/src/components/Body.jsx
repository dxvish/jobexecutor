var React  = require('react');
var WorkflowLinkForm = require('WorkflowLinkForm')
var EventDetail = require('EventDetail')
var Submit = require('Submit')
var Connection = require('Connection')
var FileEvent = require('FileEvent')
var DBEvent = require('DBEvent')
var ScheduleContainer = require('ScheduleContainer')

class Body extends React.Component{
    render(){
    const {active_tab,active_event,event_name,workflow_link,start_date,end_date,selectedFilter,file_template,db_template,link_param_id,param_default,db_active,selected_file,selected_db,query_output_type,connection_info} = this.props.state;
        
        var formChange = this.props.formChange;
        return (
            <div>
                <EventDetail event_name = {event_name} start_date = {start_date} end_date = {end_date} formChange = {formChange} />
                <ScheduleContainer setCron = {this.props.setCron} formChange = {formChange} selectedFilter={selectedFilter}/>
                
                {
                    active_event != 1  &&
                        <Connection active_event = {active_event} connection_info={connection_info} connectionChange={this.props.connectionChange}/>
                }
                {
                    active_event === 2 &&
                        <FileEvent selected_file={selected_file} fileInputChange = {this.props.fileInputChange} fileTemplateChange = {this.props.fileTemplateChange} file_template = {file_template}/>
                }
                {
                    active_event === 3 &&
                        
                        <DBEvent queryOutputTypeToggle = {this.props.queryOutputTypeToggle} customSqlUpload={this.props.customSqlUpload}  selected_db={selected_db} changeDBEvent={this.props.changeDBEvent} dbValueUpdate={this.props.dbValueUpdate} dbTemplateChange = {this.props.dbTemplateChange} db_active = {db_active} db_template = {db_template} query_output_type = {query_output_type}/>
                }
                <WorkflowLinkForm workflow_link = {workflow_link} addWorflowLink = {this.props.addWorflowLink} editWorflowLink = {this.props.editWorflowLink} deleteWorkflowLink={this.props.deleteWorkflowLink} link_param_array={link_param_id} param_default = {param_default} />

            </div>
        );
    }
}
module.exports = Body;
