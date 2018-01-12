/* Post */
const initialpost = {  
    postLoading: false,
    posts: []
}

export function post(state = initialpost, action){
    switch(action.type){
        case '@POST/LOADING':
            return {
                ...state,
                postLoading: true
            }
        case '@POST/UNLOADING':
            return {
                ...state,
                postLoading: false
            }
        case '@POST/ENDPOST':
            return {
                ...state,
                posts:action.posts
            }
        case '@POST/RESETPOST':
            return {
                ...state,
                posts:[],
                postLoading: false
            }
        default :
            return state;
    }
}
/* PostItem */
const initialtooltip = {
    tooltipOpen: false,
    clickid:''
}

export function postitem(state = initialtooltip, action){
    switch(action.type){
        case '@POSTITEM/OPEN_TOOLTIP':
            return {
                ...state,
                tooltipOpen: true,
                clickid:action.id
            }
        case '@POSTITEM/CLOSE_TOOLTIP':
            return {
                ...state,
                tooltipOpen: false,
                clickid:''
            }
        default :
            return state;
    }
}

/* PostForm */ 
const initialmood = {
    inputValue: '',
    mood: 'na'
}

export function postform(state = initialmood, action){
    switch(action.type){
        case '@POSTFORM/MOODTOGGLE':
            return {
                ...state,
               moodToggle: !action.moodToggle
            }
        case '@POSTFORM/MOODTOGGLE_TRUE':
            return {
                ...state,
               moodToggle: true
            }
        case '@POSTFORM/SELECTMOOD':
            return {
                ...state,
                mood: action.mood
            }
        case '@POSTFORM/INPUT':
            return {
                ...state,
                inputValue: action.inputValue,
                inputDanger: false
            }
        case '@POSTFORM/INPUT_DANGER':
            return {
                ...state,
                inputDanger: true
            }
        case '@POSTFORM/RESET':
            return {
                ...state,
                inputValue: '',
                inputDanger: false,
                mood: 'na'
            }
        default :
            return state;
    }
}
/* Search */
const initialsearch = {
    searchText: '',
    navbarToggle: false
}

export function search(state = initialsearch, action){
    switch(action.type){
        case '@SEARCH/NAVTOGGLE':
            return {
                ...state,
                navbarToggle: !action.navbarToggle
            }
        case '@SEARCH/KEYPRESS':
            return {
                ...state,
                searchText:action.searchText
            }
        case '@SEARCH/CLEARTEXT':
            return {
                ...state,
                searchText:action.searchText
            }
        default :
            return state;
    }
}
