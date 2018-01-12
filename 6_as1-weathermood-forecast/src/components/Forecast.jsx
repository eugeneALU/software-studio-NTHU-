import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';

import WeatherDisplay from 'components/WeatherDisplay.jsx';
import WeatherForm from 'components/WeatherForm.jsx';
import WeatherTable from 'components/WeatherTable.jsx';
import {getForecast,cancelForecast} from 'api/open-weather-map.js';

import './weather.css';

export default class Forecast extends React.Component {
    static propTypes = {
        masking: React.PropTypes.bool,
        group: React.PropTypes.string,
        description: React.PropTypes.string,
        temp: React.PropTypes.number,
        unit: React.PropTypes.string
    };

    static getInitWeatherState() {
        return {
            city: 'na',
            code: -1,
            group: 'na',
            description: 'N/A',
            temp: NaN
        };
    }
    constructor(props) {
        super(props);

        this.state = {
            ...Forecast.getInitWeatherState(),
            data:'',
            loading: false,
            masking: false
        };

       this.handleFormQuery = this.handleFormQuery.bind(this);

       this.maskInterval = null;
    }

    componentDidMount() {
        this.getForecast(this.props.city, this.props.unit);
    }

    componentWillUnmount() {
        if (this.state.loading) {
            cancelForcast();
        }
    }

    render() {
        return (
            <div className={`forecast weather-bg ${this.state.group}`}>
                <div className={`mask ${this.state.masking ? 'masking' : ''}`}>
                    <h3>Tomorrow</h3>
                    <WeatherDisplay {...this.state}/>
                    <WeatherTable {...this.state}/>
                    <WeatherForm city={this.props.city} unit={this.props.unit} onQuery={this.handleFormQuery}/>
                </div>
            </div>
        );
    }
    getForecast(city, unit) {
        this.setState({
            loading: true,
            masking: true,
            city:this.notifyCityChange(city),  //why this work?
            unit:this.notifyUnitChange(unit)
          //  city: city // set city state immediately to prevent input text (in WeatherForm) from blinking;
        }, () => { // called back after setState completes
            getForecast(city, unit).then(forecast => {
                this.setState({
                    ...forecast,
                    loading: false
                });    //, () => this.notifyUnitChange(unit)
            }).catch(err => {
                console.error('Error getting weather', err);

                this.setState({
                    ...Forecast.getInitWeatherState(unit),
                    loading: false
                });   //, () => this.notifyUnitChange(unit));
            });
        });

        this.maskInterval = setInterval(() => {
            clearInterval(this.maskInterval);
            this.setState({
                masking: false
            });
        }, 600);
    }

    handleFormQuery(city, unit) {
        this.getForecast(city, unit);
    }

    notifyUnitChange(unit) {
        if (this.props.units !== unit) {
            this.props.onUnitChange(unit);
        }
    }
    notifyCityChange(city) {
        if (this.props.city !== city) {
            this.props.onCityChange(city);
        }
    }

}
