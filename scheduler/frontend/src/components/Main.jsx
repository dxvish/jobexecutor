import customStyles from 'static/css/custom.css';
var React  = require('react');
var WorkFlowInput = require('WorkFlowInput')
//var FileTemplates = require('FileTemplates')
//var DBTemplates = require('DBTemplates')
var Body = require('Body');
var Connection = require('Connection');
var Footer = require('Footer');
var Navigation = require('Navigation');
var axiosAPI = require('axiosAPI');
var EventTypes = require('EventTypes');
var ValidationModal = require('ValidationModal');
import Form from 'react-jsonschema-form';
var Submit = require('Submit')
var invalid_field = [];
var valid_form = false;
import moment from 'moment';
import * as consts from 'static/js/app/data/consts'
import { ToastContainer, toast } from 'react-toastify';
var {Route, Router, IndexRoute, browserHistory} = require('react-router');

import 'react-toastify/dist/ReactToastify.min.css'; 
const initialState = {
    active_tab :"create",
    active_event :1,
    event_name :"",
    workflow_link :[],
    start_date : null,
    end_date : null,
    selectedFilter:"1",
    workflow_data :{},
    file_template :[],
    cron_expression:"",
    db_template:[],
    link_param_id :[],
    param_default :undefined,
    connection_info : [],
    db_active:"1",
    selected_file:{},
    selected_db:{},
    active_file_template:"",
    active_db_template:"",
    connection:null,
    custom_sql_file:null,
    query_output_type : "1",
    custom_user_query:"",
    show:false
};

class Main extends React.Component{
    constructor(props){
        super(props);
        this.state = initialState;
        this.formChange = this.formChange.bind(this);

    }
    validateField=(currentState)=>{
        invalid_field = []
        if(currentState.event_name == null || (currentState.event_name.toString().trim().length == 0)){
            invalid_field.push({"field":"event_name","message":"Event Name required"})
        }            
        if (currentState.start_date == null || (currentState.start_date.toString().trim().length == 0))
        {
            invalid_field.push({"field":"start_date","message":"Start Date required"})
        }
        if (currentState.end_date == null || (currentState.end_date.toString().trim().length == 0)) {

            invalid_field.push({"field":"end_date","message":"End Date required"})
        }
        if(currentState.cron_expression ==null || (currentState.cron_expression.toString().trim().length == 0)){
            invalid_field.push({"field":"cron_expression","message":"Cron Expression required"})
        }
        if(currentState.workflow_link.length ==0){
            invalid_field.push({"field":"workflow_link","message":"Workflow Link is required"})

        }
        if(currentState.active_event==2){

            if(currentState.connection ==null || (currentState.connection.toString().trim().length == 0)){
                invalid_field.push({"field":"connection","message":"Connection required"})
            }
            if(currentState.active_file_template ==null || (currentState.active_file_template.toString().trim().length == 0)){
                invalid_field.push({"field":"active_file_template","message":"File Template required"})
            }
            if(Object.keys(currentState.selected_file).length == 0){
                invalid_field.push({"field":"selected_file","message":"Fill in File template fields"})
            }
        }
        else if (currentState.active_event ==3){

            if(currentState.db_active == "1"){
                if(currentState.query_output_type == "1"){
                    if(currentState.custom_sql_file ==null || (currentState.custom_sql_file.toString().trim().length == 0)){
                        invalid_field.push({"field":"custom_sql_file","message":"Custom Query File is required"})
                    }

                }
                if(currentState.query_output_type == "2"){
                    if(currentState.custom_user_query ==null || (currentState.custom_user_query.toString().trim().length == 0)){
                        invalid_field.push({"field":"custom_user_query","message":"Custom Query is required"})
                    }
                }

            }
            else if(currentState.db_active == "2"){
                if(currentState.active_db_template ==null || (currentState.active_db_template.toString().trim().length == 0)){
                    invalid_field.push({"field":"active_db_template","message":"DB Template required"})
                }
                if(Object.keys(currentState.selected_db).length == 0){
                    invalid_field.push({"field":"selected_db","message":"Fill in DB template fields"})
                }    
            }

            if(currentState.connection ==null || (currentState.connection.toString().trim().length == 0)){
                invalid_field.push({"field":"connection","message":"Connection required"})
            }
        }

    }
    onSave=()=>{
        const currentState = this.state;
        this.showModal();
        this.validateField(currentState);

    }
    onSubmit =()=>{
        const currentState = this.state;
        if (invalid_field.length == 0){
            const save_event_url = consts.save_event;
            axiosAPI.postFormData(currentState,save_event_url).then(function(a){
                toast.success("Event Saved!",{className:'dark-toast',autoClose:5000});
                this.setState(initialState);
           
            },function(error){
                console.log(error);
                toast.error("Event Not Saved!",{className:'dark-toast',autoClose:5000});
            });
            this.hideModal();

        }
    }
    setCron=(cron)=>{
        this.setState({
            cron_expression:cron
        });
        toast.success("Cron "+cron+" added Successfully!",{className:'dark-toast',autoClose:5000});
    }
    showModal=()=> {
        this.setState({ show: true });
    }

    hideModal=()=>{
        this.setState({ show: false });
    } 
    customSqlUpload=(input,type)=>{
        if(type=="file"){
            var data = new FormData();
            data.append('file', input.target.files[0]);
            this.setState({
                custom_user_query:"",
                custom_sql_file:input.target.files[0]
            });
        }else if(type=="user_query"){
            this.setState({
                custom_sql_file:null,
                custom_user_query:input.target.value
            });
        }
    }
    addWorflowLink=(workflow_input)=>{
        var workflow_link_arr = this.state.workflow_link;
        workflow_link_arr.push(WorkFlowInput)
        this.setState({
            workflow_link:workflow_link_arr
        });
    }
    resetWorflowLink=()=>{
        this.setState(initialState);
    }
    fileTemplateChange=(template)=>{
        if (typeof template != "undefined" && template !=""){

            let file_template_arr=[];
            if(Number.isInteger(parseInt(template.target.value))){
                var selectedTemplate = template.target.value;
                var self=this;
                axiosAPI.get("get_file_template/"+template.target.value).then(function(response){
                    const schema = JSON.parse(response);
                    var formData = {} 
                    Object.keys(schema.properties).map(function(obj){
                        formData[obj] = null;
                    });
                    file_template_arr[0] = {"template":Form,"schema":schema};
                    self.setState({
                        active_file_template:selectedTemplate,
                        file_template:file_template_arr,
                        selected_file : formData
                    });
                });

            }
        }
    }
    changeDBEvent=(obj)=>{
        //reset all the values here when moving to next filter
        this.setState({
            custom_sql_file:null,
            query_output_type : "1",
            custom_user_query:"",
            db_active:obj.target.value
        })

    }
    connectionChange=(obj)=>{
        this.setState({
            connection:obj.target.value
        });
    }
    fileValueUpdate=({formData})=>{
        this.setState({
            selected_file:formData
        });
    }
    dbValueUpdate=({formData})=>{
        this.setState({
            selected_db:formData
        });
    }
    dbTemplateChange=(template)=>{
        if (typeof template != "undefined" && template !=""){
            let db_template_arr=[];
            if(Number.isInteger(parseInt(template.target.value))){
                var selectedTemplate = template.target.value;

                var self=this;
                axiosAPI.get("get_db_template/"+template.target.value).then(function(response){
                    const schema = JSON.parse(response);
                    var formData = {} 
                    Object.keys(schema.properties).map(function(obj){
                        formData[obj] = null;
                    });
                    db_template_arr[0] = {"template":Form,"schema":schema};
                    self.setState({
                        active_db_template:selectedTemplate,
                        db_template:db_template_arr,
                        selected_db:formData
                    });
                });

            }
        }

    }
    queryOutputTypeToggle = (option) =>{
        this.setState({
            query_output_type:option.target.value
        });
    }
    editWorflowLink=(workflow_input,index,type="")=>{
        let link_param_array = this.state.link_param_id;
        let links = this.state.workflow_data;
        let current_obj = links[index];
        if(typeof current_obj == "undefined"){
            current_obj = { "link":workflow_input.target.value,"has_param":false,"parameter_payload":""};
            links[index] = current_obj;
        }
        if(type == "worflowname_edit"){
            current_obj["link"] = workflow_input.target.value;    

            links[index] = current_obj;

        }else if(type == "has_param"){
            if(workflow_input.target.checked == true){
                link_param_array = this.state.link_param_id.concat(index);
                current_obj["has_param"] = true;
                current_obj["parameter_payload"] = null;              
            }else{
                link_param_array.splice( link_param_array.indexOf(index), 1 );
                current_obj["has_param"] = false;
                current_obj["parameter_payload"] = null;              
            }    
            links[index] = current_obj;
        }else if(type == "change_param"){
            current_obj["has_param"] = true;
            current_obj["parameter_payload"] = workflow_input.target.value;         
        }
        this.setState({
            workflow_data:links,
            link_param_id:link_param_array
        });

    }
    deleteWorkflowLink=(index)=>{
        let workflow_link_arr = this.state.workflow_link;
        let workflow_data = this.state.workflow_data;
        console.log(index);
        console.log(workflow_link_arr.length)
        workflow_link_arr.splice(index,1);

        delete workflow_data[index]
        //        console.log(workflow_data)
        this.setState({
            workflow_link:workflow_link_arr,
            workflow_data:workflow_data,
        });
    }
    formChange = (obj,type="") =>{
        var cloned_state ={...this.state.form_data};
        if(type == "event_name"){
            if(obj.target.name == "event_name"){
                this.setState({
                    event_name:obj.target.value,            
                });
            }else{
                cloned_state[obj.target.name] = value;    
            }   
        }
        if(type == "start_date"){
            this.setState({
                start_date:obj,            
            });
        }else if(type == "end_date"){
            this.setState({
                end_date:obj,            
            });
        }

    }
    event_toggle = (event_selected) => {
        var newState = initialState;
        var self=this;
        if (event_selected != 1){
            axiosAPI.get("http://192.168.3.160:8001/connection/filter_connection/"+event_selected).then(function(response){
                self.setState({
                    connection_info:JSON.parse(response)
                });
            },function(err){
                console.log("err"+err)
            }); 
        }
        newState["active_event"] = event_selected;
        this.setState(newState);
    }
    render(){
        return (

            <div>
                <Navigation active_tab ={this.state.active_tab}/> 
                <div className="container">
                    <div className="col-md-12">
                        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick pauseOnHover />
                        <EventTypes event_toggle = {this.event_toggle} active_event = {this.state.active_event} event_list = {event_list}/>
                        <br/>
                        <Body state={this.state} connectionChange={this.connectionChange} fileInputChange = {this.fileValueUpdate} changeDBEvent={this.changeDBEvent} dbValueUpdate = {this.dbValueUpdate} formChange={this.formChange} addWorflowLink ={this.addWorflowLink} editWorflowLink={this.editWorflowLink} deleteWorkflowLink = {this.deleteWorkflowLink} 
                            fileTemplateChange = {this.fileTemplateChange} customSqlUpload={this.customSqlUpload} dbTemplateChange = {this.dbTemplateChange} setCron = {this.setCron} queryOutputTypeToggle={this.queryOutputTypeToggle}  />
                        <Submit showModal={this.showModal}  onSubmit = {this.onSave}  resetWorflowLink= {this.resetWorflowLink}/>
                        <ValidationModal show={this.state.show} invalid_field= {invalid_field}  onSubmit = {this.onSubmit} hideModal = {this.hideModal}/>
                    </div>
                </div>
            </div>
        );
    }
}
module.exports = Main;
