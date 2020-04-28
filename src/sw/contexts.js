import React from 'react'

export const MOVIES = {
    currentMovie: -1,
    currentMovieUrl: ''
}

export const MovieContext = React.createContext(MOVIES);

export function movieChangerReducer(state, newUrl) {
    let s = { ...state, ...newUrl }
    console.log("movieChangerReducer", state, s)
    return s
}


