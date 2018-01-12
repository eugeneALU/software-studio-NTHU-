import React from 'react';
import PropTypes from 'prop-types';
import {
    Link
} from 'react-router-dom'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Input,
    Button
} from 'reactstrap';

import {navtoggle, searchkeypress, clearsearch} from 'states/post-actions.js';
import {connect} from 'react-redux';

class Nav_ extends React.Component {

    constructor(props) {
        super(props);

        this.handleNavbarToggle = this.handleNavbarToggle.bind(this);
        this.handleSearchKeyPress = this.handleSearchKeyPress.bind(this);
        this.handleClearSearch = this.handleClearSearch.bind(this);
    }

    render() {
        return (
            <Navbar color='faded' light toggleable>
                <NavbarToggler right onClick={this.handleNavbarToggle} />
                <NavbarBrand className='text-info' href="/">WeatherMood</NavbarBrand>
                <Collapse isOpen={this.props.navbarToggle} navbar>
                    <Nav navbar>
                        <NavItem>
                            <NavLink tag={Link} to='/'>Today</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} to='/forecast'>Forecast</NavLink>
                        </NavItem>
                    </Nav>
                    <div className='search ml-auto'>
                        <Input className='ml-auto' type='text' getRef={this.searchEl} placeholder='Search' onKeyPress={this.handleSearchKeyPress} getRef={e => this.searchEl = e}></Input>{
                            this.props.searchText &&
                            <i className='navbar-text fa fa-times' onClick={this.handleClearSearch}></i>
                        }
                    </div>
                </Collapse>
            </Navbar>
        );
    }
    handleNavbarToggle() {
        this.props.dispatch(navtoggle(this.props.navbarToggle));
    }

    handleSearchKeyPress(e) {
        var keyCode = e.keyCode || e.which;
        if (keyCode === 13){
            this.props.dispatch(searchkeypress(e.target.value));
        }
    }

    handleClearSearch() {
        this.props.dispatch(clearsearch());
        this.searchEl.value = '';
    }
}
export default connect((state) => {
    return {
        ...state.search
    };
})(Nav_);