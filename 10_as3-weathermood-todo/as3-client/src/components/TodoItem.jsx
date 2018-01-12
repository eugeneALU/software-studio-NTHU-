import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import moment from 'moment';

import {accomplishTodo} from 'states/todo-actions.js';
import {getMoodIcon} from 'utilities/weather.js';

import './TodoItem.css';

class TodoItem extends React.Component {
    static propTypes = {
        id: PropTypes.number,
        mood: PropTypes.string,
        text: PropTypes.string,
        ts: PropTypes.string,
        donets: PropTypes.string,
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.handleCheckboxCheck = this.handleCheckboxCheck.bind(this);
    }

    render() {
        const {id, mood, text, ts, donets} = this.props;

        return (
            <div className={'todo-item d-flex flex-column ' + (donets ? 'done' : 'undone')}  onClick={this.handleCheckboxCheck}>
                <div className='todo d-flex'>
                    <div className='mood'><i className={getMoodIcon(mood)}></i></div>
                    <div className='wrap'>
                        <div className='ts'>{'Created: ' + moment(ts * 1000).calendar()}</div>
                        <div className='text'>{text}</div>
                    </div>
                </div>
                <div className='check d-flex justify-content-end align-items-center'>
                    <div className='done-ts'>{
                        !!donets &&
                        <span>{moment(donets * 1000).calendar()}</span>
                    }</div>
                    <div className='checkbox' >
                        <i className={'fa ' + (donets ? 'fa-check-square' : 'fa-square-o')} aria-hidden="true"></i>
                    </div>
                </div>
            </div>
        );
    }

    handleCheckboxCheck(e) {
        if (!this.props.donets) {
            this.props.dispatch(accomplishTodo(this.props.id));
        }
    }
}

export default connect()(TodoItem);
