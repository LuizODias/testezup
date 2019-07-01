import React from 'react';
import PropTypes from 'prop-types';

import './App.css';
import './static/css/base.css';
import './static/font-awesome/css/font-awesome.min.css'
import 'bootstrap/dist/css/bootstrap.css';

class Usuario extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      user:[]
    };
  }

  render(){
    
    if(!this.props.show) {
        return null;
    }

    const backdropStyle = {
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.3)',
        padding: 50
      };

    const modalStyle = {
        backgroundColor: '#fff',
        borderRadius: 5,
        maxWidth: 500,
        minHeight: 300,
        margin: '0 auto',
        padding: 30
    };

    return ( 
    <div className="backdrop" style={{backdropStyle}}>
        <div className="modal" style={{modalStyle}}>
          {this.props.children}

          <div className="footer">
            <button onClick={this.props.onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Usuario.propTypes = {
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool,
    children: PropTypes.node
};
  
export default Usuario;
