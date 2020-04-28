import React, { useState, useEffect, useContext } from 'react';

import { MovieContext } from './contexts'


export const Films = (props) => {

    const [films, setFilms] = useState([])

    const movieSwitcherCtx = useContext(MovieContext)

    const switchMovie = (movieSwitchEvent) => {
        console.log(`switchMovie: switching to ${movieSwitchEvent.url}`)
        movieSwitcherCtx.dispatch({
            currentMovie: movieSwitchEvent.episodeNumber,
            currentMovieUrl: movieSwitchEvent.url
        })
    }

    useEffect(() => {
        fetch("https://swapi.dev/api/films/")
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                console.log(data.results)
                setFilms(data.results)
            })
    }, [])

    return (
        <>
            <ul className="toolbar">
                {films && films.sort((a, b) => a.episode_id > b.episode_id ? 1 : -1).map((item, idx) => {
                    return <li key={item.url} ><button onClick={(evt) => { evt.preventDefault(); switchMovie({ episodeNumber: item.episode_id, url: item.url }) }} > <span>{item.episode_id} {item.title}</span>  </button></li>
                })}
            </ul>
        </>
    )
}

export const Crawl = (props) => {

    const [showCrawl, toggleCrawl] = useState(false)

    // IV = 1, V = 2 , etc
    // const [chosenEpisode, changeEpisode] = useState(0);

    const movieSwitcherCtx = useContext(MovieContext)
    console.log(movieSwitcherCtx)

    const [crawlTitle, setCrawlTitle] = useState("<Some Epi Title>")
    const [crawlEpisode, setCrawlEpisode] = useState("<?>")
    const [crawlText, setCrawlText] = useState("<Choose an episode>")

    function toRoman(numeral) {
        switch (numeral) {
            case 1: return "I"
            case 2: return "II"
            case 3: return "III"
            case 4: return "IV"
            case 5: return "V"
            case 6: return "VI"
            case 7:
            default:
                return "VII"
        }
    }

    useEffect(() => {
        if (!movieSwitcherCtx.episode) {
            return;
        }

        toggleCrawl(false);

        console.log("Current episode ", movieSwitcherCtx.episode.currentMovie)
        if (movieSwitcherCtx.episode.currentMovie < 1) {
            return;
        }

        console.log("Go out to internet and fetch episode info")

        fetch(movieSwitcherCtx.episode.currentMovieUrl)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                console.log(data)

                setCrawlEpisode(toRoman(data.episode_id))

                setCrawlTitle(("" + data.title).toUpperCase())

                const formattedText = data.opening_crawl

                setCrawlText(formattedText)

                toggleCrawl(true);

            })
    }, [movieSwitcherCtx.episode])

    const divStyle = { display: showCrawl ? "block" : "none" }

    return (
        // https://codepen.io/geoffgraham/pen/BpwqOE
        // https://css-tricks.com/snippets/css/star-wars-crawl-text/
        <>

            <div className="star-wars">
              
                <div style={divStyle} className={showCrawl ? "star-wars__fade sw-crawl__text_visible" : "star-wars__fade sw-crawl__text_hidden"}></div>

                <section className="star-wars__crawl-section">
                    <div className={showCrawl ? "crawl sw-crawl__text_visible" : "crawl sw-crawl__text_hidden"}  >
                        <div className="title">
                            <p>Episode {crawlEpisode}</p>
                            <h1>{crawlTitle}</h1>
                        </div>
                        <pre>{crawlText}</pre>
                    </div>
                </section >
            </div>
        </>
    )
}
