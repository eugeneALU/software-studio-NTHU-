import axios from 'axios';
import uuid from 'uuid/v4';
import moment from 'moment';
import 'babel-polyfill';
import cookie from 'react-cookie';

const postKey = 'posts';

export function listPosts(searchText = '') {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(_listPosts(searchText));
        }, 500);
    });
}

// Simulated server-side code
function _listPosts(searchText = '') {
    let postString = localStorage.getItem(postKey);
    let posts = postString ? JSON.parse(postString) : [];
    if (posts.length > 0 && searchText) {
        posts = posts.filter(p => {
            return p.text.toLocaleLowerCase().indexOf(searchText.toLowerCase()) !== -1
        });
    }
    return posts;
};

export function createPost(mood, text) {
    return new Promise((resolve, reject) => {
        resolve(_createPost(mood, text));
    });
}

// Simulated server-side code
function _createPost(mood, text) {
    const newPost = {
        id: uuid(),
        mood: mood,
        text: text,
        ts: moment().unix(),
        clearVotes: 0,
        cloudsVotes: 0,
        drizzleVotes: 0,
        rainVotes: 0,
        thunderVotes: 0,
        snowVotes: 0,
        windyVotes: 0,
        voter:[ ]
    };
    const posts = [
        newPost,
        ..._listPosts()
    ];
    localStorage.setItem(postKey, JSON.stringify(posts));
    return newPost;
}

export function createVote(id, mood ,userid) {
    return new Promise((resolve, reject) => {
        _createVote(id, mood,userid);
        resolve();
    });
}

// Simulated server-side code
function _createVote(id, mood,userid) {
    const posts = _listPosts().map(p => {
        if (p.id === id) {
        var mod =   p["voter"][userid];
        p["voter"][userid]=mood;
        console.log(p["voter"][userid]);
            if (mod==='Clear'){p['clearVotes']--;}
            if (mod==='Clouds'){p['cloudsVotes']--;}
            if (mod==='Drizzle'){p['drizzleVotes']--;}
            if (mod==='Rain'){p['rainVotes']--;}
            if (mod==='Thunder'){p['thunderVotes']--;}
            if (mod==='Snow'){p['snowVotes']--;}
            if (mod==='Windy'){p['windyVotes']--;}

            p[mood.toLowerCase() + 'Votes']++;
        }
        return p;
    });
    localStorage.setItem(postKey, JSON.stringify(posts));
}
