import React, {useRef} from 'react'

export class PeopleInfo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: props.person.name
        }
    }

    render(){
        return (
            <li> {this.state.name} </li>
        );
    }
}

/**
 * Exanmple of a class Component in React
 */
export class PeopleList extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            people: []
        }
    }

    componentWillMount() {
        fetch("https://swapi.dev/api/people")
        .then( (response) => {
            return response.json()
        })
        .then( (data) => {
            this.setState({people: data.results})
        } )
    }

    render() {
        return (
            <div className="people-list">
                People:
                <FilterForm/>
                <ul>
                    { this.state.people.map( (item, idx) => {
                        return <PeopleInfo person={item} key={idx} />
                    } )  }                 
                </ul>
            
            </div>
        );
    }
}

function reducer (state, action) {


}

export const FilterForm = () => {

    const inputEL = useRef(null);

    const onClickFn = () => {
        inputEL.current.focus();
        inputEL.current.value = "Hello"
    }

    const onClickSearchFn = () => {

    }

    return (
        <>
            <label htmlFor="peopleFilterField">Filter:</label><input ref={inputEL} id="peopleFilterField" type="text"/>

            <button onClick={onClickSearchFn}>Search</button>

            <button onClick={onClickFn}>Get Focus</button>
        </>
    );

}

