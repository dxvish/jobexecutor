var React  = require('react');
//            <button onClick={ this.props.resetWorflowLink } className="btn btn-danger pull-right">Reset</button>

class Submit  extends React.Component{
  render(){
    return (
        <div>
            
            <button className="btn btn-primary pull-right" onClick = {this.props.onSubmit}>Save</button>
        </div>
    );
  }
}
module.exports = Submit;
