import customStyles from 'static/css/custom.css';
var React  = require('react');
import { Modal,Button,Header,Footer,Body,Dialog} from 'react-bootstrap';
import * as ReactBootstrap from 'react-bootstrap';

class ValidationModal extends React.Component{

    render(){
        return (
            <div>
                <Modal  show={this.props.show} onHide={this.props.hideModal} dialogClassName="custom-modal">
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-sm">Save Event</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {

                            this.props.invalid_field.length == 0 &&
                                <p>Are you sure you want to save?</p>
                        }
                        <div className="validation_message">
                        {
                            this.props.invalid_field.length > 0  &&
                                this.props.invalid_field.map((obj,key)=>{
                                return <p className="validation_error" key ={key} >{obj.message}</p>
                            })
                        }
                            </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.props.hideModal}>Close</Button>
                        {this.props.invalid_field.length > 0 &&
                            <Button bsStyle="primary" className="disabled" onClick={this.props.onSubmit}>Save changes</Button>    
                        }
                        {this.props.invalid_field.length == 0 &&
                            <Button bsStyle="primary"  onClick={this.props.onSubmit}>Save changes</Button>    
                        }
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}
module.exports = ValidationModal;
