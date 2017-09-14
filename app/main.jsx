import React from 'react';
import ReactDOM from 'react-dom';
import { Route, IndexRoute, hashHistory, Router } from 'react-router';
import App from './container/App';
import userListContainer from './container/userListContainer';
import './fontIcon/index.css';

const Role = () => (
    <div>阿斯顿发生的法师打发斯蒂芬</div>
);

const Root = () => (
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute components={userListContainer} />
            <Route path="/role" components={Role} />
        </Route>
    </Router>
);

const dom = document.getElementById('root');

ReactDOM.render(<Root />, dom);
