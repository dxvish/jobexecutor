var React  = require('react');
import * as ReactBootstrap from 'react-bootstrap';

class FileDetail extends React.Component{
    render(){
        return <ReactBootstrap.Form horizontal>
            <ReactBootstrap.FormGroup >
                <ReactBootstrap.Col md={2}>
                    <ReactBootstrap.ControlLabel htmlFor={this.props.name}>File Name</ReactBootstrap.ControlLabel>
                </ReactBootstrap.Col>
                <ReactBootstrap.Col md={4}>
                    <ReactBootstrap.FormControl type="text" name={this.props.name} id={this.props.name}  onChange={(evt)=> this.props.formChange(evt,"file_name")} defaultValue={this.props.file_name} placeholder="File Name" />
                </ReactBootstrap.Col>
                <ReactBootstrap.Col md={2}>
                    <ReactBootstrap.ControlLabel htmlFor={this.props.path}>File Path</ReactBootstrap.ControlLabel>
                </ReactBootstrap.Col>
                <ReactBootstrap.Col md={4}>
                    <ReactBootstrap.FormControl type="text" name={this.props.path} id={this.props.path}onChange={(evt)=> this.props.formChange(evt,"file_path")} defaultValue={this.props.file_path} placeholder="File Path" />
                </ReactBootstrap.Col>
            </ReactBootstrap.FormGroup>
        </ReactBootstrap.Form>
    }
}
module.exports = FileDetail;


