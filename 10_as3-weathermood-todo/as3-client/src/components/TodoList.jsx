import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
    ListGroup,
    ListGroupItem
} from 'reactstrap';
import InfiniteScroll from 'react-infinite-scroller';
import {listMoreTodos} from 'states/todo-actions.js';

import TodoItem from 'components/TodoItem.jsx';
import './TodoList.css';

class TodoList extends React.Component {
    static propTypes = {
        todos: PropTypes.array
    };

    constructor(props) {
        super(props);

        this.handleScroll = this.handleScroll.bind(this);
    }

    render() {
        const {todos, hasMoreTodo} = this.props;

        let children = (
            <ListGroupItem className='empty d-flex justify-content-center align-items-center'>
                <div className='empty-text'>All todos are accomplished.<br />Anything else?</div>
            </ListGroupItem>
        );
        if (todos.length) {
            children = todos.map(t => (
                <ListGroupItem key={t.id} action={!t.doneTs}>
                    <TodoItem {...t} />
                </ListGroupItem>
            ));
        }

        return (
            <div className='todo-list'>
                <ListGroup>
                    <InfiniteScroll initialLoad={false} loadMore={this.handleScroll} hasMore={hasMoreTodo}>
                        {children}
                    </InfiniteScroll>
                </ListGroup>
            </div>
        );
    }

    handleScroll() {
        if (!this.props.todoLoading){
            const {todos, searchText} = this.props;
            this.props.dispatch(listMoreTodos(searchText, todos[todos.length - 1].id));
        }
    }
}

export default connect(state => ({
    ...state.todo,
     searchText: state.searchText
}))(TodoList);
