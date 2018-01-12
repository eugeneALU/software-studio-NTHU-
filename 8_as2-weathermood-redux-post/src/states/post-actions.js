import {listPosts} from 'api/posts.js';

/* Post */ 
function loading(){
    return {
        type:'@POST/LOADING'
    };
}
function unloading(){
    return {
        type:'@POST/UNLOADING',
    };
}
function endpost(posts){
    return {
        type:'@POST/ENDPOST',
        posts:posts
    };
}
function resetpost(){
    return {
        type:'@POST/RESETPOST'
    };
}

export function listpost(searchtext){
    return (dispatch,getState) => {
        dispatch(loading());
        setTimeout(() => {
            dispatch(unloading());
        }, 600);

        return listPosts(searchtext).then(posts => {
            dispatch(endpost(posts));                           //set 
        }).catch(err =>{ 
            console.error('Error creating posts', err);
            dispatch(resetpost());                              //reset 
        });
    };
}

/* PostForm */
export function moodtoggle(moodToggle){
    return {
        type:'@POSTFORM/MOODTOGGLE',
        moodToggle:moodToggle
    };
}
export function moodtoggle_true(){
    return {
        type:'@POSTFORM/MOODTOGGLE_TRUE'
    }
}
export function selectmood(mood) {
    return {
        type:'@POSTFORM/SELECTMOOD',
        mood: mood
    };
}
export function input(text){
    return {
        type:'@POSTFORM/INPUT',
        inputValue: text
    };
}
export function input_danger(){
    return {
        type:'@POSTFORM/INPUT_DANGER'
    }
}
export function reset(){
    return {
        type:'@POSTFORM/RESET'
    }
}

/* PosrItem */
export function opentooltip(id){
    return {
        type:'@POSTITEM/OPEN_TOOLTIP',
        id
    };
}
export function toogletooltip(tooltipOpen){
    return {
        type:'@POSTITEM/TOOGLE_TOOLTIP',
        tooltipOpen
    };
}
export function closetooltip(){
    return {
        type:'@POSTITEM/CLOSE_TOOLTIP'
    };
}

/* Search */
export function navtoggle(navbarToggle){
    return {
        type:'@SEARCH/NAVTOGGLE',
        navbarToggle: navbarToggle
    }
}
export function searchkeypress(text){
    return {
        type:'@SEARCH/KEYPRESS',
        searchText:text
    };
}
export function clearsearch(){
    return {
        type:'@SEARCH/CLEARTEXT',
        searchText:''
    };
}