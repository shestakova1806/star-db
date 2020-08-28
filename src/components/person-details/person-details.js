import React, { Component } from 'react';

import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';
import ErrorButton from '../error-button';

import './person-details.css';

export default class PersonDetails extends Component {

    swapiService = new SwapiService();

    state = {
        person: null,
        loading: false
    };

    componentDidMount() {
        this.updatePerson();
    }

    componentDidUpdate(prevProps) {
        if (this.props.personId !== prevProps.personId) {
            this.updatePerson();
        }
    }

    onPersonDetailsLoaded = (person) => {
        this.setState({
            person,
            loading: false,
            error: false
        });
    };

    updatePerson() {
        const { personId } = this.props;

        if (!personId) {
            return;
        }

        this.swapiService
            .getPerson(personId)
            .then(this.setState({
                loading: true
            }))
            .then(this.onPersonDetailsLoaded)       
    }

    render() {

        const { person, loading } = this.state;

        const notSelected = !person && !loading; 
        const hasData = person && !loading;

        const hint = notSelected ? <span>Select person from the list</span> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = hasData ? <PersonDetailsView personDetails={person} /> : null;

        return (

            <div className="person-details card">
                {hint}
                {spinner}
                {content}
            </div>
        );
    }
}

const PersonDetailsView = ({ personDetails }) => {

    const { id, name, gender, birthYear, eyeColor } = personDetails;

    return (
        <React.Fragment>
            <img className="person-image"
                    src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} />

                <div className="card-body">
                    <h4>{name}</h4>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            <span className="term">Gender</span>
                            <span>{gender}</span>
                        </li>
                        <li className="list-group-item">
                            <span className="term">Birth Year</span>
                            <span>{birthYear}</span>
                        </li>
                        <li className="list-group-item">
                            <span className="term">Eye Color</span>
                            <span>{eyeColor }</span>
                        </li>
                    </ul>
                    <ErrorButton />
                </div>
        </React.Fragment>
    );
};