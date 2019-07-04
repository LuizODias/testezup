import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import Usuario from './Usuario';

ReactDOM.render(
    (<BrowserRouter>
		<Switch>
			<Route exact path="/" component={App}/>
			<Route exact path="/usuario" component={Usuario}/>
		</Switch>
	</BrowserRouter>), 
    document.getElementById('root')
);
serviceWorker.unregister();
