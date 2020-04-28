import React, { useState, useEffect } from 'react'

const PlanetInfo = (props) => {

    console.log(props)
    return (
        <div className="card">
             {/* <img src="img_avatar.png" alt="Avatar"/> */}
            <div className="container">
            <div>{props.planet.name}</div>
            </div>
        </div>
    )
}

const PlanetList = (props) => {

    const [planets, setPlanets] = useState([]);

    useEffect(() => {
        fetch('https://swapi.dev/api/planets/')
            .then((response) => {
                //console.log(response.json)
                return response.json();
            })
            .then((jsonData) => {
                console.log(jsonData.results)
                setPlanets(jsonData.results)
            })
    }, [])

    return (
        <div className="planet-list">
            Planet List:
            <ul>
                {
                    planets && planets.map((item, idx) => <PlanetInfo key={idx} planet={item} />)
                }
            </ul>
        </div>
    )
}


export { PlanetInfo, PlanetList }
