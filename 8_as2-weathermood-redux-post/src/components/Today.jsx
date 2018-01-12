import React from 'react';
import PropTypes from 'prop-types';
import {Alert} from 'reactstrap';
import {connect} from 'react-redux';

import WeatherDisplay from 'components/WeatherDisplay.jsx';
import WeatherForm from 'components/WeatherForm.jsx';
import {cancelWeather} from 'api/open-weather-map.js';
import {getWeather} from 'states/weather-actions.js';
import {listpost} from 'states/post-actions.js';
import PostForm from 'components/PostForm.jsx';
import PostList from 'components/PostList.jsx';

import './Today.css';

class Today extends React.Component {
    static propTypes = {
        city: PropTypes.string,
        code: PropTypes.number,
        group: PropTypes.string,
        description: PropTypes.string,
        temp: PropTypes.number,
        unit: PropTypes.string,
        weatherLoading: PropTypes.bool,
        masking: PropTypes.bool,
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);
    
    }

    componentDidMount() {
        this.props.dispatch(getWeather('Hsinchu', this.props.unit));
        this.props.dispatch(listpost(this.props.searchText));
    }

    componentWillUnmount() {
        if (this.props.weatherLoading) {
            cancelWeather();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.searchText !== this.props.searchText) {
            this.props.dispatch(listpost(nextProps.searchText));
        }
    }

    render() {
        const {city, group, description, temp, unit, masking} = this.props;
        const {posts, postLoading} = this.props;

        document.body.className = `weather-bg ${group}`;
        document.querySelector('.weather-bg .mask').className = `mask ${masking ? 'masking' : ''}`;

        return (
            <div className='today'>
                <div className='weather'>
                    <WeatherForm city={city} defaultUnit={unit} submitAction={getWeather} />
                    <WeatherDisplay {...{group, description, temp, unit, masking}} day='today'/>
                </div>
                <div className='posts'>
                    <PostForm  />
                    <PostList posts={posts}  />{
                        postLoading &&
                        <Alert color='warning' className='loading'>Loading...</Alert>
                    }
                </div>
            </div>
        );
    }
}

export default connect((state) => {
    return {
        ...state.weather,
        unit: state.unit,                  // assign which state this component will get 
        ...state.post,                 //if no assign it will get all of the state
        ...state.search
    };
})(Today);
