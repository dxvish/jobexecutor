var React  = require('react');

import * as consts from 'static/js/app/data/consts'

class FileEvent extends React.Component{

    render(){        
        const inputFields = this.props.file_template.map((Element, index) => {
            let obj = Element;
            let Tag = obj.template;
            let schema = obj.schema;

            return <Tag onChange={this.props.fileInputChange}  className="marginLeft" formData={this.props.selected_file} key={index} schema = {schema}>&nbsp;</Tag>
        });
        return (
            
                <div className="panel panel-default">
                    <div className="panel-heading">File Event</div>
                    <div className="panel-body form-horizontal">
                        <div className="form-group">        

                            <label htmlFor="file_template" className="control-label col-sm-2">Template</label>
                            <div className="col-md-4">
                                <select name="file_template" className="form-control " onChange={this.props.fileTemplateChange} id="file_template">
                                    <option value="">Choose a Template</option>
                                    {
                                        consts.file_templates.map(function(obj){
                                            return <option key={obj.id} value={obj.id}>{obj.name}</option>
                                        })
                                    }
                                </select>
                            </div>
                                
                            <div className="col-md-4">
                                {inputFields}
                            </div>
                        </div>
                    </div>
            </div>                
            
        );
    }
}
module.exports = FileEvent;
