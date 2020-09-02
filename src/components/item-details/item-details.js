import React, { Component } from 'react';

import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';
import ErrorButton from '../error-button';

import './item-details.css';

const Record = ({ item, field, label }) => {
    return (
        <li className="list-group-item">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    );
};

export { Record };

export default class ItemDetails extends Component {

    swapiService = new SwapiService();

    state = {
        item: null,
        image: null,
        loading: false
    };

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId) {
            this.updateItem();
        }
    }

    onItemDetailsLoaded = (item) => {

        const {getImageUrl} = this.props;

        this.setState({
            item,
            image: getImageUrl(item),
            loading: false
        });
    };

    updateItem = () => {
        const { itemId, getData, getImageUrl } = this.props;

        if (!itemId) {
            return;
        }

        this.setState({
            loading: true
        });
    
        getData(itemId)
            .then((item) => {
                this.setState({
                    loading: false,
                    image: getImageUrl(item),
                    item
                });
            });
    };

    render() {

        const { item, loading, image } = this.state;

        const notSelected = !item && !image && !loading; 
        const hasData = item && image && !loading;

        const hint = notSelected ? <span>Select person from the list</span> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = hasData ? <ItemDetailsView item={item} image={image} children={this.props.children} /> : null;

        return (

            <div className="item-details card">
                {hint}
                {spinner}
                {content}
            </div>
        );
    }
}

const ItemDetailsView = ({ item, image, children }) => {

    const { name } = item;

    return (
        <React.Fragment>
            <img className="item-image"
                    src={image} />

                <div className="card-body">
                    <h4>{name}</h4>
                    <ul className="list-group list-group-flush">
                        {
                            React.Children.map(children, (child) => {
                                return React.cloneElement(child, {item});
                            })
                        }
                    </ul>
                    <ErrorButton />
                </div>
        </React.Fragment>
    );
};