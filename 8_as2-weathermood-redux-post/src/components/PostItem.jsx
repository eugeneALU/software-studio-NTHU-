import React from 'react';
import PropTypes from 'prop-types';
import {
    Tooltip
} from 'reactstrap';
import moment from 'moment';

import {getMoodIcon} from 'utilities/weather.js';
import {opentooltip,toogletooltip,closetooltip,listpost} from 'states/post-actions.js';
import {connect} from 'react-redux';
import {createVote} from 'api/posts.js';

import './PostItem.css';

class PostItem extends React.Component {
    static propTypes = {
        id: PropTypes.string,
        mood: PropTypes.string,
        text: PropTypes.string,
        clearVotes: PropTypes.number,
        cloudsVotes: PropTypes.number,
        drizzleVotes: PropTypes.number,
        rainVotes: PropTypes.number,
        thunderVotes: PropTypes.number,
        snowVotes: PropTypes.number,
        windyVotes: PropTypes.number,
        onVote: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.handleTooltipToggle = this.handleTooltipToggle.bind(this);
        this.handleClearVote = this.handleClearVote.bind(this);
        this.handleCloudsVote = this.handleCloudsVote.bind(this);
        this.handleDrizzleVote = this.handleDrizzleVote.bind(this);
        this.handleRainVote = this.handleRainVote.bind(this);
        this.handleThunderVote = this.handleThunderVote.bind(this);
        this.handleSnowVote = this.handleSnowVote.bind(this);
        this.handleWindyVote = this.handleWindyVote.bind(this);
        this.CreateVote = this.CreateVote.bind(this);
    }

    render() {
        const {id, mood, text, ts, clearVotes, cloudsVotes, drizzleVotes, rainVotes, thunderVotes, snowVotes, windyVotes} = this.props;
        if (this.props.clickid===this.props.id){
            var {tooltipOpen} = this.props;
        }
        else {
            var tooltipOpen = false;
        }
    
        return (
            <div className='post-item d-flex flex-column' onClick={this.handleClick}>
                <div className='post d-flex'>
                    <div className='mood'><i className={getMoodIcon(mood)}></i></div>
                    <div className='wrap'>
                        <div className='ts'>{moment(ts * 1000).calendar()}</div>
                        <div className='text'>{text}</div>
                    </div>
                </div>
                <div className='vote d-flex justify-content-end'>
                    <div className='vote-results'>
                        {clearVotes > 0 && (<span><i className={getMoodIcon('Clear')}></i>&nbsp;{clearVotes}&nbsp;&nbsp;</span>)}
                        {cloudsVotes > 0 && <span><i className={getMoodIcon('Clouds')}></i>&nbsp;{cloudsVotes}&nbsp;&nbsp;</span>}
                        {drizzleVotes > 0 && <span><i className={getMoodIcon('Drizzle')}></i>&nbsp;{drizzleVotes}&nbsp;&nbsp;</span>}
                        {rainVotes > 0 && <span><i className={getMoodIcon('Rain')}></i>&nbsp;{rainVotes}&nbsp;&nbsp;</span>}
                        {thunderVotes > 0 && <span><i className={getMoodIcon('Thunder')}></i>&nbsp;{thunderVotes}&nbsp;&nbsp;</span>}
                        {snowVotes > 0 && <span><i className={getMoodIcon('Snow')}></i>&nbsp;{snowVotes}&nbsp;&nbsp;</span>}
                        {windyVotes > 0 && <span><i className={getMoodIcon('Windy')}></i>&nbsp;{windyVotes}&nbsp;&nbsp;</span>}
                    </div>
                    <div className='vote-plus'>
                        <i id={`post-item-vote-${id}`} className='fa fa-plus'></i>
                    </div>
                </div>
                <Tooltip placement='left' isOpen={tooltipOpen} autohide={false} target={`post-item-vote-${id}`} toggle={this.handleTooltipToggle}>
                    <i className={`vote-tooltip ${getMoodIcon('Clear')}`} onClick={this.handleClearVote}></i>&nbsp;
                    <i className={`vote-tooltip ${getMoodIcon('Clouds')}`} onClick={this.handleCloudsVote}></i>&nbsp;
                    <i className={`vote-tooltip ${getMoodIcon('Drizzle')}`} onClick={this.handleDrizzleVote}></i>&nbsp;
                    <i className={`vote-tooltip ${getMoodIcon('Rain')}`} onClick={this.handleRainVote}></i>&nbsp;
                    <i className={`vote-tooltip ${getMoodIcon('Thunder')}`} onClick={this.handleThunderVote}></i>&nbsp;
                    <i className={`vote-tooltip ${getMoodIcon('Snow')}`} onClick={this.handleSnowVote}></i>&nbsp;
                    <i className={`vote-tooltip ${getMoodIcon('Windy')}`} onClick={this.handleWindyVote}></i>
                </Tooltip>
            </div>
        );
    }

    handleClick() {
        this.props.dispatch(opentooltip(this.props.id));
    }

    handleTooltipToggle() {
        if (this.props.tooltipOpen){
            this.props.dispatch(closetooltip());
        }
        else {
            this.props.dispatch(opentooltip(this.props.id));
        }
    }

    handleClearVote() {
        this.CreateVote(this.props.id, 'Clear');
    }

    handleCloudsVote() {
        this.CreateVote(this.props.id, 'Clouds');
    }

    handleDrizzleVote() {
        this.CreateVote(this.props.id, 'Drizzle');
    }

    handleRainVote() {
        this.CreateVote(this.props.id, 'Rain');
    }

    handleThunderVote() {
        this.CreateVote(this.props.id, 'Thunder');
    }

    handleSnowVote() {
        this.CreateVote(this.props.id, 'Snow');
    }

    handleWindyVote() {
        this.CreateVote(this.props.id, 'Windy');
    }

    CreateVote(id, mood) {
        createVote(id, mood).then(() => {
            this.props.dispatch(closetooltip());
            this.props.dispatch(listpost(this.props.searchText));
        }).catch(err => {
            console.error('Error creating vote', err);
        });
    }
}

export default  connect((state) => {
    return {
        ...state.postitem,
        ...state.post,
        ...state.search
    }
})(PostItem);