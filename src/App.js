import React, {Component}  from 'react';

import './App.css';
import './static/css/base.css';
import './static/font-awesome/css/font-awesome.min.css'
import 'bootstrap/dist/css/bootstrap.css';
import Usuario from './Usuario';

class App extends Component {
  constructor(props){
    super(props);

    this.showDeleteds   = this.showDeleteds.bind(this);
    this.showAll        = this.showAll.bind(this);
    this.showAttendeds  = this.showAttendeds.bind(this)
    this.search         = this.search.bind(this);

    this.deleteUser     = this.deleteUser.bind(this);
    this.recoveryUser   = this.recoveryUser.bind(this);
    this.attendUser     = this.attendUser.bind(this);

    this.setShowed      = this.setShowed.bind(this);
    this.setUsers       = this.setUsers.bind(this);
    this.setDeleteds    = this.setDeleteds.bind(this);
    this.setAttendeds   = this.setAttendeds.bind(this);
    this.setSearch      = this.setSearch.bind(this);

    this.state = {
      users:          [],
      deleteds:       [],
      attendeds:      [],
      usersIntegral:  [],
      show:           [],
      showIntegral:   [],
      pesquisa:       '',
      excluidos:      true,
      todos:          false,
      atendidos:      true,
      isOpen:         false,
    };
  }

  componentDidMount() {
    this.fetchUser();
  }

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  
  setShowed(array){
    this.setState({show: array});
  }

  setShowedIntegral(array){
    this.setState({showIntegral: array});
  }

  setSearch(evento){
    this.setState({pesquisa: evento.target.value});
  }

  setUsers(array){
    this.setState({users: array});
  }

  setDeleteds(array){
    this.setState({deleteds: array});
  }

  setAttendeds(array){
    this.setState({attendeds: array});
  }

  showDeleteds(){
    this.setState({show: this.state.deleteds, showIntegral: this.state.deleteds, excluidos: false, todos: true, atendidos: true});
  }

  showAll(){
    this.setState({show: this.state.users, showIntegral: this.state.users, excluidos: true, todos: false, atendidos: true});
  }

  showAttendeds(){
    this.setState({show: this.state.attendeds, showIntegral: this.state.attendeds, excluidos: true, todos: true, atendidos: false});
    let li = document.getElementById("liAtendidos");

    console.log(li);
  }

  fetchUser(){
    fetch('https://randomuser.me/api/?results=10&nat=br')
      .then(response => response.json())
      .then(result =>{
          this.setState({users:result['results'], showIntegral:result['results'], show:result['results']});        
        } 
      );
  }
  
  search(evento){
    debugger;
    let pesquisa = evento.target.value;

    var array = JSON.parse(JSON.stringify(this.state.showIntegral));

    array = array.filter(function(user){        
      return user.name.first.includes(pesquisa) || user.email.includes(pesquisa);
    });    

    this.setShowed(array);
  }

  deleteUser(user) {
    let cloneUsers      = JSON.parse(JSON.stringify(this.state.users));;
    let cloneDeleteds   = JSON.parse(JSON.stringify(this.state.deleteds));
    let cloneAttendeds  = JSON.parse(JSON.stringify(this.state.attendeds));
    
    if(cloneUsers.find(x => x.login.uuid === user.login.uuid)){
      let removed = cloneUsers.filter(item => item.login.uuid===user.login.uuid);
    
      cloneDeleteds.push(removed[0]);

      cloneUsers = cloneUsers.filter(item => item.login.uuid!==user.login.uuid);
      
      this.setDeleteds(cloneDeleteds);
      this.setUsers(cloneUsers);
      this.setShowed(cloneUsers);
      this.setShowedIntegral(cloneUsers);
    }
    else if(cloneAttendeds.find(x => x.login.uuid)){
      let removed = cloneAttendeds.filter(item => item.login.uuid===user.login.uuid);
    
      cloneDeleteds.push(removed[0]);

      cloneAttendeds = cloneAttendeds.filter(item => item.login.uuid!==user.login.uuid);
      
      this.setDeleteds(cloneDeleteds);
      this.setAttendeds(cloneAttendeds);
      this.setShowed(cloneAttendeds);
      this.setShowedIntegral(cloneAttendeds);
    }
    else
      alert('Você não pode excluir o usuário já deletado!');
  }

  recoveryUser(user) {
    let cloneUsers      = JSON.parse(JSON.stringify(this.state.users));
    let cloneDeleteds   = JSON.parse(JSON.stringify(this.state.deleteds));
    let cloneAttendeds  = JSON.parse(JSON.stringify(this.state.attendeds));

    if(cloneAttendeds.find(x => x.login.uuid === user.login.uuid)){
      let removed = cloneAttendeds.filter(item => item.login.uuid===user.login.uuid);
    
      cloneUsers.push(removed[0]);

      cloneAttendeds = cloneAttendeds.filter(item => item.login.uuid!==user.login.uuid);

      this.setUsers(cloneUsers);      
      this.setAttendeds(cloneAttendeds);
      this.setShowed(cloneAttendeds);
      this.setShowedIntegral(cloneAttendeds);
    }
    else if(cloneDeleteds.find(x => x.login.uuid)){
      let removed = cloneDeleteds.filter(item => item.login.uuid===user.login.uuid);
    
      cloneUsers.push(removed[0]);

      cloneDeleteds = cloneDeleteds.filter(item => item.login.uuid!==user.login.uuid);
      
      this.setUsers(cloneUsers);
      this.setDeleteds(cloneDeleteds);
      this.setShowed(cloneDeleteds);
      this.setShowedIntegral(cloneDeleteds);
    }
    else
      alert('Você não pode recuperar o usuário já recuperado!');
  }

  attendUser(user) {
    let cloneUsers      = JSON.parse(JSON.stringify(this.state.users));
    let cloneDeleteds   = JSON.parse(JSON.stringify(this.state.deleteds));
    let cloneAttendeds  = JSON.parse(JSON.stringify(this.state.attendeds));
    
    if(cloneUsers.find(x => x.login.uuid === user.login.uuid)){
      let removed = cloneUsers.filter(item => item.login.uuid===user.login.uuid);
    
      cloneAttendeds.push(removed[0]);

      cloneUsers = cloneUsers.filter(item => item.login.uuid!==user.login.uuid);
      
      this.setAttendeds(cloneAttendeds);
      this.setUsers(cloneUsers);
      this.setShowed(cloneUsers);
      this.setShowedIntegral(cloneUsers);
    }
    else if(cloneDeleteds.find(x => x.login.uuid)){
      let removed = cloneDeleteds.filter(item => item.login.uuid===user.login.uuid);
    
      cloneAttendeds.push(removed[0]);

      cloneDeleteds = cloneDeleteds.filter(item => item.login.uuid!==user.login.uuid);
      
      this.setDeleteds(cloneDeleteds);
      this.setAttendeds(cloneAttendeds);
      this.setShowed(cloneDeleteds);
      this.setShowedIntegral(cloneDeleteds);
    }  
    else
      alert('Você não pode atender o usuário já foi atendido!');
  }

  render(){
    return (
      <div className="body">
        <div className="divHeader">
          <div className="logo">
              <img src={require("./static/img/zup.svg")} className="imglogo" alt="logo"/>
              {/* A própria logo que tá no site */}
          </div>
          <div>
              <span className="icon"><i className="fa fa-search"></i></span>
              <input className="input" type="text" placeholder=" Buscar" value={this.state.pesquisa} onKeyUp={this.search} onChange={this.setSearch.bind(this)}/>
          </div>
          <div className="login">
              <i className="fa fa-user fa-2x user"></i>
          </div>
        </div>
        <Usuario show={this.state.isOpen}
          onClose={this.toggleModal}>
          Here's some content for the modal
        </Usuario>
        <div className="row divList">
          <div className="col-2">
            <ul>
                <li id="liTodos">
                  <button className="btn" placeholder="Exibir todos" onClick={this.showAll}>
                    <i className="fa fa-list"></i>
                    <span className="textFilter">Todos</span>
                  </button>
                </li>
                <li id="liAtendidos">
                  <button className="btn" placeholder="Exibir atendidos" onClick={this.showAttendeds}>
                    <i className="fa fa-check"></i>
                    <span className="textFilter">Atendidos</span>
                  </button>
                </li>
                <li id="liExcluidos">
                  <button className="btn" placeholder="Exibir excluídos" onClick={this.showDeleteds}>
                    <i className="fa fa-trash filter"></i>
                    <span className="textFilter">Lixeira</span>
                  </button>
                </li>
            </ul>
          </div>
          <div className="col-10">
            <div className="tableUsers">
            {
              this.state.show.map((user) => {
                return (
                  <div className="row divUser" key={user.login.uuid}>
                    <div className="row clickUser" onClick={this.toggleModal}>
                      <div className="col-3">
                        <img src={user.picture.thumbnail} className="thumbUser" alt="user"/>
                        {user.name.first.toUpperCase()}
                      </div>
                      <div className="col-4">
                        {user.email} 
                      </div>
                      <div className="col-2">
                        {user.phone} 
                      </div>
                      <div className="col-3">
                        {user.location.city}
                      </div>
                    </div>
                    <div className="icons">
                      {(this.state.excluidos ? 
                        (<button className="btn" placeholder="Excluir" onClick={() => this.deleteUser(user)}><i className="fa fa-trash"></i></button>)
                        :(<span></span>)
                      )}
                      {(this.state.todos ?
                        (<button className="btn" placeholder="Recuperar" onClick={() => this.recoveryUser(user)}><i className="fa fa-list"></i></button>)
                        :(<span></span>)  
                      )}
                      {(this.state.atendidos ?
                        (<button className="btn" placeholder="Atendido" onClick={() => this.attendUser(user)}><i className="fa fa-check"></i></button>)
                        :(<span></span>)
                      )}
                    </div>
                  </div>
                );
              })
            }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
