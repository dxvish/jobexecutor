var React  = require('react');

class WorkFlowInput extends React.Component{
setDisableFlag(arr,index){
    if(arr.indexOf(index) != -1){
    return ""    
   }else{
       return "disabled"
   }
}
render(){
    return <tr>
                <td>
                    <label htmlFor={this.props.name}>Link {this.props.index}</label>
                </td>
                <td>
                    <input type="text" name={this.props.name} id={this.props.name} onChange={(evt)=> this.props.editWorflowLink(evt,this.props.index,"worflowname_edit")} className="form-control" value={this.props.param_default} />
                </td>
                <td className="td_align">
                    
                    <input type="checkbox" onChange={(evt)=> this.props.editWorflowLink(evt,this.props.index,"has_param")} name={`has_param_${this.props.index}`} className="answer" />
                </td>
                <td className="td_align">
                    <textarea  onChange={(evt)=> this.props.editWorflowLink(evt,this.props.index,"change_param")} name={`param_${this.props.index}`} className="form-control" disabled={this.setDisableFlag(this.props.link_param_array,this.props.index)} value={this.props.param_default} ></textarea>
                </td>
                <td className="td_align">
                    <span onClick={()=>this.props.deleteWorkflowLink(this.props.index)} className="glyphicon glyphicon-remove " aria-hidden="true"></span>
                </td>
        </tr>
  }
}
module.exports = WorkFlowInput;
