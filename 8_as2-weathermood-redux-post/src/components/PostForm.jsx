import React from 'react';
import PropTypes from 'prop-types';
import {
    Alert,
    Input,
    Button,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';

import {getMoodIcon} from 'utilities/weather.js';
import {connect} from 'react-redux';
import {moodtoggle,moodtoggle_true,selectmood,input,input_danger,reset,listpost} from 'states/post-actions.js';
import {createPost} from 'api/posts.js';
import './PostForm.css';

class PostForm extends React.Component {

    constructor(props) {
        super(props);

        this.inputEl = null;
        this.moodToggleEl = null;

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDropdownSelect = this.handleDropdownSelect.bind(this);
        this.handleMoodToggle = this.handleMoodToggle.bind(this);
        this.CreatePost = this.CreatePost.bind(this);
        this.handlePost = this.handlePost.bind(this);
    }

    render() {
        const {inputValue, moodToggle, mood} = this.props;
        const inputDanger = this.props.inputDanger ? 'has-danger' : '';

        return (
            <div className='post-form'>
                <Alert color='info' className={`d-flex flex-column flex-sm-row justify-content-center ${inputDanger}`}>
                    <div className='mood align-self-start'>
                        <ButtonDropdown type='buttom' isOpen={moodToggle} toggle={this.handleMoodToggle}>
                            <DropdownToggle className='mood-toggle' type='button' caret color="secondary">
                                <i className={getMoodIcon(mood)}></i>&nbsp;{
                                    mood === 'na' ? 'Mood' : mood
                                }
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem type='button' onClick={() => this.handleDropdownSelect('Clear')}><i className={getMoodIcon('Clear')}></i>&nbsp;&nbsp;Clear</DropdownItem>
                                <DropdownItem type='button' onClick={() => this.handleDropdownSelect('Clouds')}><i className={getMoodIcon('Clouds')}></i>&nbsp;&nbsp;Clouds</DropdownItem>
                                <DropdownItem type='button' onClick={() => this.handleDropdownSelect('Drizzle')}><i className={getMoodIcon('Drizzle')}></i>&nbsp;&nbsp;Drizzle</DropdownItem>
                                <DropdownItem type='button' onClick={() => this.handleDropdownSelect('Rain')}><i className={getMoodIcon('Rain')}></i>&nbsp;&nbsp;Rain</DropdownItem>
                                <DropdownItem type='button' onClick={() => this.handleDropdownSelect('Thunder')}><i className={getMoodIcon('Thunder')}></i>&nbsp;&nbsp;Thunder</DropdownItem>
                                <DropdownItem type='button' onClick={() => this.handleDropdownSelect('Snow')}><i className={getMoodIcon('Snow')}></i>&nbsp;&nbsp;Snow</DropdownItem>
                                <DropdownItem type='button' onClick={() => this.handleDropdownSelect('Windy')}><i className={getMoodIcon('Windy')}></i>&nbsp;&nbsp;Windy</DropdownItem>
                            </DropdownMenu>
                        </ButtonDropdown>
                    </div>
                    <Input className='input' type='textarea' getRef={el => {this.inputEl = el}} value={inputValue} onChange={this.handleInputChange} placeholder="What's on your mind?"></Input>
                    <Button className='btn-post align-self-end' color="info" onClick={this.handlePost}>Post</Button>
                </Alert>
            </div>
        );
    }

    handleDropdownSelect(mood) {
        this.props.dispatch(selectmood(mood));
    }

    handleInputChange(e) {
        const text = e.target.value
        this.props.dispatch(input(text));
        if (!text) {
            this.props.dispatch(input_danger());
        }
    }

    handleMoodToggle(e) {
        this.props.dispatch(moodtoggle(this.props.moodToggle));
    }

    handlePost() {
        if (this.props.mood === 'na') {
           this.props.dispatch(moodtoggle_true());
            return;
        }
        if (!this.props.inputValue) {
           this.props.dispatch(input_danger());
            return;
        }

        this.CreatePost(this.props.mood, this.props.inputValue);
        this.props.dispatch(reset());
    }
    
    CreatePost(mood, text) {
        createPost(mood, text).then(() => {
            this.props.dispatch(listpost(this.props.searchText));
        }).catch(err => {
            console.error('Error creating posts', err);
        });
    }
}

export default connect((state) => {
    return {
        ...state.postform,
        ...state.search
    };
})(PostForm);