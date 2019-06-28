import React, {Component}  from 'react';
import './App.css';
import './static/css/base.css';
import './static/font-awesome/css/font-awesome.min.css'
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      users: []
    };
  }

  componentWillMount() {
    debugger;
    fetch('https://randomuser.me/api/?nat=br')
        .then(response => response.json())
        .then(result =>{
          this.setState({users:result['results'][0]});
          console.log(result['results']);        
        } 
        );
  }

  render(){
    return (
      <div className="body">
        <div className="divHeader">
          <span className="logo">
              <img src={require("./static/img/zup.svg")} className="imglogo" alt="logo"/>
              {/* A própria logo que tá no site */}
          </span>
          <span>
              <span className="icon"><i className="fa fa-search"></i></span>
              <input className="input" type="text" placeholder=" Buscar" />
          </span>
          <span className="login">
              <i className="fa fa-user fa-2x user"></i>
          </span>
        </div>
        <div className="row listusers">
          <div className="divFilters">
            <ul>
                <li>
                    <i className="fa fa-list"></i><span className="textFilter">Todos</span>
                </li>
                <li>
                    <i className="fa fa-check"></i><span className="textFilter">Atendidos</span>
                </li>
                <li>
                    <i className="fa fa-trash filter"></i><span className="textFilter">Lixeira</span>
                </li>
            </ul>
          </div>
          <div className="divList">aaaaaa
          </div>
        </div>
      </div>
    );
  }
}
export default App;
