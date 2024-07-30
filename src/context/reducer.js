import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { action } from './action'
const { searched, upcomingAnime, airingAnime, popularAnime, loading } = action
const reducer = (state, action) => {
  switch (action.type) {
    case loading:
      //console.log(state.loading)
      return { ...state, loading: true }
    case popularAnime:
       // console.log(state.popularAnime);
        return{...state,popularAnime:action.payload,loading:false}
    case searched:
      return{...state,searchResults:action.payload , loading:false}
    case upcomingAnime:
      return{...state,upcomingAnime:action.payload,loading:false}
    case airingAnime:
     return{...state,airingAnime:action.payload,loading:false}
    default:
      break
  }
  //console.log(action.type)
  return { ...state }
}

export default reducer;
