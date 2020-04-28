import React, {useReducer} from 'react';
import './App.css';

import {MovieContext, movieChangerReducer} from './sw/contexts'

// import { PlanetList } from './sw/planets'
import { Crawl, Films } from './sw/movies'
// import { Cart} from './cart/cart'

// import {PeopleList} from './sw/people'


function App() {

  let [currMovie, movieSwitchDispatch] = useReducer(movieChangerReducer) 

  return (
    <div className="App">
      <header className="App-header">
        React Wars
      </header>

      <MovieContext.Provider value={{episode: currMovie, dispatch: movieSwitchDispatch}}>
        <div className="App-toolbar">
          <Films></Films>
        </div>

        <Crawl episode="IV"/>
      </MovieContext.Provider>

    </div>
  );
}

export default App;
