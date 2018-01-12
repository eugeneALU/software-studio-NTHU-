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

import Today from 'components/Today.jsx';
import Forecast from 'components/Forecast.jsx';
import GeoForecast from 'components/GeoForecast.jsx';

import './Main.css';

export default class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            city:'Hsinchu',
            unit: 'metric',
            navbarToggle: false
        };

        this.handleNavbarToggle = this.handleNavbarToggle.bind(this);
        this.handleUnitChange = this.handleUnitChange.bind(this);
        this.handleCityChange = this.handleCityChange.bind(this);

    }

    render() {
        return (
            <Router>
                <div className={`main bg-faded ${this.state.group}`}> 
                  
                    <div className='container'>
                        <Navbar color="faded" light toggleable>
                            <NavbarToggler right onClick={this.handleNavbarToggle}/>
                            <NavbarBrand className='text-info' href="/">WeatherMood</NavbarBrand>
                            <Collapse isOpen={this.state.navbarToggle} navbar>
                                <Nav navbar>
                                    <NavItem>
                                        <NavLink tag={Link} to='/'>Today</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={Link} to='/forecast'>Forecast</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={Link} to='/geoforecast'>GeoForecast</NavLink>
                                    </NavItem>
                                </Nav>
                                <span className='navbar-text ml-auto'>DataLab</span>
                            </Collapse>
                        </Navbar>
                    </div>

                    <Route exact path="/" render={() => (
                        <Today city={this.state.city} unit={this.state.unit} onUnitChange={this.handleUnitChange} onCityChange={this.handleCityChange}/>
                    )}/>
                    <Route exact path="/forecast" render={() => (
                        <Forecast city={this.state.city} unit={this.state.unit} onUnitChange={this.handleUnitChange} onCityChange={this.handleCityChange}/>
                    )}/>
                    <Route exact path="/geoforecast" render={() => (
                        <GeoForecast city={this.state.city} unit={this.state.unit} onUnitChange={this.handleUnitChange} onCityChange={this.handleCityChange}/>
                    )}/>
                </div>
            </Router>
        );
    }



    handleNavbarToggle() {
        this.setState((prevState, props) => ({
            navbarToggle: !prevState.navbarToggle
        }));
    }

    handleUnitChange(unit) {
        this.setState({
            unit: unit
        });
    }

    handleCityChange(city) {
        this.setState({
            city: city
        });
    }
}
