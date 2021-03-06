import axios from 'axios';
import uuid from 'uuid/v4';
import moment from 'moment';
import 'babel-polyfill';

const todoKey = 'todos';
// const postBaseUrl = 'http://localhost:8080/api';
const postBaseUrl = 'http://weathermood-13.ap-northeast-1.elasticbeanstalk.com/api';

export function listTodos(unaccomplishedOnly = false, searchText = '') {
    let url = `${postBaseUrl}/todos?unaccomplishedOnly=${unaccomplishedOnly}`;
    if (searchText)
        url += `&searchText=${searchText}`;  //query 

    console.log(`Making GET request to: ${url}`);

    return axios.get(url).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);
    
        return res.data;
    });
}

export function createTodo(mood, text) {
    let url = `${postBaseUrl}/todos`;

    console.log(`Making POST request to: ${url}`);

    return axios.post(url, {                        //body 
        mood,
        text
    }).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}

export function accomplishTodo(id) {
    let url = `${postBaseUrl}/todos/${id}`;    //param

    console.log(`Making POST request to: ${url}`);

    return axios.post(url).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}
