import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorIndicator from '../error-indicator';
import PeoplePage from '../people-page';
import ErrorButton from '../error-button';
import ItemDetails, { Record } from '../item-details/item-details';
import Row from '../row';
import SwapiService from '../../services/swapi-service';
import ErrorBoundry from '../error-boundry';
import ItemList from '../item-list';
import DummySwapiService from '../../services/dummy-swapi-service';

import { SwapiServiceProvider } from '../swapi-service-context';

import { 
    PersonList, 
    PlanetList, 
    StarshipList, 
    PersonDetails, 
    PlanetDetails, 
    StarshipDetails 
} from '../sw-components';

import './app.css';

export default class App extends Component {

    state = {
        showRandomPlanet: true,
        hasError: false,
        swapiService: new DummySwapiService()
    };

    onServiceChange = () => {
        this.setState(({ swapiService }) => {
           
            const Service = swapiService instanceof SwapiService ? DummySwapiService : SwapiService;

            return {
                swapiService: new Service()
            };
        });
    };

    toggleRandomPlanet = () => {
        this.setState((state) => {
            return {
                showRandomPlanet: !state.showRandomPlanet
            }
        });
    };

    componentDidCatch() {
        this.setState({ hasError: true });
    }

    render() {

        if (this.state.hasError) {
            return <ErrorIndicator />
        }

        const planet = this.state.showRandomPlanet ? <RandomPlanet /> : null;

        return (
        
            <ErrorBoundry>
                <SwapiServiceProvider value={this.state.swapiService} >
                    <div className="stardb-app">
                        <Header 
                            onServiceChange={this.onServiceChange} />

                        <PersonDetails itemId={11} />

                        <PlanetDetails itemId={5} />

                        <StarshipDetails itemId={9} />
                        
                        <PersonList />

                        <StarshipList />

                        <PlanetList />
                    </div>
                </SwapiServiceProvider>
            </ErrorBoundry>
        );
    }    
};