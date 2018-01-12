import React from 'react';

import './WeatherTable.css';
import 'reactstrap';

export default class WeatherTable extends React.Component {
    constructor(props) {
        super(props);
    }
    render(){
        var d = new Date();
        var weekday = new Array(7);
        weekday[0] = "Sun";
        weekday[1] = "Mon";
        weekday[2] = "Tue";
        weekday[3] = "Wed";
        weekday[4] = "Thu";
        weekday[5] = "Fri";
        weekday[6] = "Sat";

        if(this.props.data!==''){
            return(
                <div className ='d-flex justify-content-center'>
                    <div className={`visible table-display ${this.props.masking? 'masking': ''}`}>
                        <h1 className='week'>{weekday[(d.getDay()+2)%7]}</h1>
                        <i className={`owf owf-${this.props.data[2].weather[0].id} owf-3x`}></i>
                        <p className='description'>{this.props.data[2].weather[0].description}</p>&nbsp;
                        <h1 className='temp'>
                            <span className='num'>{this.props.data[2].temp.day.toFixed(0)}&ordm;</span>
                            &nbsp;{(this.props.unit === 'metric')
                                ? 'C'
                                : 'F'}
                        </h1>
                    </div>
                    <div className={`visible table-display ${this.props.masking? 'masking': ''}`}>
                        <h1 className='week'>{weekday[(d.getDay()+3)%7]}</h1>
                        <i className={`owf owf-${this.props.data[3].weather[0].id} owf-3x`}></i>
                        <p className='description'>{this.props.data[3].weather[0].description}</p>&nbsp;
                        <h1 className='temp'>
                            <span className='num'>{this.props.data[3].temp.day.toFixed(0)}&ordm;</span>
                            &nbsp;{(this.props.unit === 'metric')
                                ? 'C'
                                : 'F'}
                        </h1>
                    </div>
                    <div className={`hide table-display ${this.props.masking? 'masking': ''}`}>
                        <h1 className='week'>{weekday[(d.getDay()+4)%7]}</h1>
                        <i className={`owf owf-${this.props.data[4].weather[0].id} owf-3x`}></i>
                        <p className='description'>{this.props.data[4].weather[0].description}</p>&nbsp;
                        <h1 className='temp'>
                            <span className='num'>{this.props.data[4].temp.day.toFixed(0)}&ordm;</span>
                            &nbsp;{(this.props.unit === 'metric')
                                ? 'C'
                                : 'F'}
                        </h1>
                    </div>
                    <div className={`hide table-display ${this.props.masking? 'masking': ''}`}>
                        <h1 className='week'>{weekday[(d.getDay()+5)%7]}</h1>
                        <i className={`owf owf-${this.props.data[5].weather[0].id} owf-3x`}></i>
                        <p className='description'>{this.props.data[5].weather[0].description}</p>&nbsp;
                        <h1 className='temp'>
                            <span className='num'>{this.props.data[5].temp.day.toFixed(0)}&ordm;</span>
                            &nbsp;{(this.props.unit === 'metric')
                                ? 'C'
                                : 'F'}
                        </h1>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div></div>
            )
        }
    }
}

