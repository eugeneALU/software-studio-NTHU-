import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
// import loggerMiddleware from 'redux-logger';
import {Provider} from 'react-redux';

import Today from 'components/Today.jsx';
import Forecast from 'components/Forecast.jsx';
import Nav_ from 'components/Nav.jsx';
import {unit, weather, weatherForm, forecast} from 'states/weather-reducers.js';
import {post,postitem,postform,search} from 'states/post-reducers.js';

import './Main.css';

export default class Main extends React.Component {
    constructor(props) {
        super(props);

        this.store = null;
        this.searchEl = null;

    }

    componentWillMount() {
        const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
        this.store = createStore(combineReducers({
            unit,
            weather,
            weatherForm,
            forecast,
            postitem,
            post,
            postform,
            search
        }), composeEnhancers(applyMiddleware(thunkMiddleware/*, loggerMiddleware*/)));
    }

    render() {
        return (
            <Provider store={this.store}>
                <Router>
                    <div className='main'>
                        <div className='bg-faded'>
                            <div className='container'>
                                <Nav_ />
                            </div>
                        </div>

                        <Route exact path="/" render={() => (
                            <Today />
                        )}/>
                        <Route exact path="/forecast" render={() => (
                            <Forecast />
                        )}/>
                        <div className='footer'>
                            DataLab.
                        </div>
                    </div>
                </Router>
            </Provider>
        );
    }
}
