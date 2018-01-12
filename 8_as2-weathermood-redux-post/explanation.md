# post-actions.js

## POST
 
1.@POST/LOADING : set the loading flag when list the post <br/>
2.@POST/UNLOADING : unset the loading flag when end to list the post <br/>
3.@POST/ENDPOST : actual state that finishing geting post and list them out <br/>
4.@POST/RESETPOST : reset post <br/>

## POSTFORM

1.@POSTFORM/MOODTOGGLE : toogle the mood select list <br/>
2.@POSTFORM/MOODTOGGLE_TRUE : open the mood select list <br/>
3.@POSTFORM/SELECTMOOD : select the mood <br/>
4.@POSTFORM/INPUT : get input from PostForm<br/>
5.@POSTFORM/INPUT_DANGER : set input area in DANGER<br/>
6.@POSTFORM/RESET : reset PostForm <br/>
7.EXPORT Function listpost : asyn action to create post/vote then list them in postlist<br/>

## PostItem 

1.@POSTITEM/OPEN_TOOLTIP : open PostItem's tooltip<br/>
2.@POSTITEM/TOOGLE_TOOLTIP : toggle tooltip<br/>
3.@POSTITEM/CLOSE_TOOLTIP : close tooltip<br/>

## search(NavBar)

1.@SEARCH/NAVTOGGLE : toogle navbar<br/>
2.@SEARCH/KEYPRESS : read in search input <br/>
3.@SEARCH/CLEARTEXT : clear search input<br/>

# post-reducers.js 

## POST

* post

## POSTFORM

* postform

## PostItem

* postitem

## search(NavBar)

* search




