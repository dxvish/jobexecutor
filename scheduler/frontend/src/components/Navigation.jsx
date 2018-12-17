var React  = require('react');
var {Link,IndexLink} = require('react-router');

class Navigation extends React.Component{
  render(){
          
    function MenuItems(props){
        const active_tab  = props.active_tab;
        if(active_tab == "create"){
            return  (
              <ul className="nav navbar-nav">
                <li className="active">
                    <Link to="/">Create Event</Link>
                </li>
                <li>
                    <Link to="list_all/">Events</Link>
                </li>
            </ul>
                    )
                    
        }
        return (
            <ul className="nav navbar-nav">
                <li >
                    <Link to="/">Create Event</Link>
                    
                </li>
                <li className="active">
                    <Link to="list_all/">Events</Link>
                </li>
            </ul>
        )
    }
    return (
        <nav className="navbar navbar-default ">
          <div className="container-fluid container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>                        
              </button>
              <a className="navbar-brand" href="#">Event Management</a>
            </div>
            <div className="collapse navbar-collapse" id="myNavbar">
                  <MenuItems active_tab ={this.props.active_tab}/>
            </div>
          </div>
        </nav>    
    );
  }
}
module.exports = Navigation;
