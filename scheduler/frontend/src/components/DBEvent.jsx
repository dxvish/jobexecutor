var React  = require('react');
import * as consts from 'static/js/app/data/consts'


class DBEvent extends React.Component{
    render(){
        const inputFields = this.props.db_template.map((Element, index) => {
            let obj = Element;
            let Tag = obj.template;
            let schema = obj.schema;
            console.log(obj.schema);
            return <Tag formData={this.props.selected_db} onChange={this.props.dbValueUpdate} key={index} schema = {schema}>&nbsp;</Tag>
        });
        return (
            <div>
                <div className="panel panel-default">
                    <div className="panel-heading">DB Event</div>
                    <div className="panel-body form-horizontal">
                        {
                            <div>
                                <label htmlFor="dbeventType" className="control-label col-sm-2">Event Type</label>
                                <div className="col-sm-4">
                                    <select className="form-control dbeventType" onChange={this.props.changeDBEvent}>
                                        {
                                            consts.db_type_event.map(function(obj){
                                                return <option key={obj.id} value={obj.id}>{obj.name}</option>
                                            })
                                        }

                                    </select>
                                </div>

                            </div>
                        }
                        {
                            this.props.db_active === "1" &&
                                <div className="row">
                                    <div className="col-md-5">
                                        <select name="db_template" className="form-control" onChange={this.props.queryOutputTypeToggle} id="db_template">
                                            <option value="1">Upload Query</option>
                                            <option value="2">Write Query</option>
                                        </select>
                                        
                                    {    
                                        this.props.query_output_type === "1"   &&
                                        <input id="custom_sql" onChange={(e)=>this.props.customSqlUpload(e,"file")} type="file"/>     
                                    } 
                                    {    
                                        this.props.query_output_type === "2"   &&
                                        <textarea onChange={(e)=>this.props.customSqlUpload(e,"user_query")} className="form-control marginTop"></textarea>   
                                    } 

                                    </div>
                                </div>

                        }
                        {
                            this.props.db_active === "2"  &&
                                <div>
                                    <div className="row">

                                        <div className="col-md-5">
                                            <select name="db_template" className="form-control" onChange={this.props.dbTemplateChange} id="db_template">
                                                <option value="">Choose a Template</option>
                                                {
                                                    consts.db_templates.map(function(obj){
                                                        return <option key={obj.id} value={obj.id}>{obj.name}</option>
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-3">
                                        </div>
                                        <div className="col-md-5 margin">
                                            {inputFields}
                                        </div>
                                    </div>
                                </div>
                        }
                        {
                            this.props.db_active === "3" &&
                                <div>
                                    <h6>NEO QL</h6>
                                </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}
module.exports = DBEvent;
