import React from 'react';

import { PersonDetails, PersonList } from '../sw-components';
import Row from '../row';
import { withRouter } from 'react-router-dom';

const PeoplePage = ({ history, match }) => {

    const {id} = match.params;

    return (
        <div>
            <h2>People</h2>
            <Row 
                left={<PersonList onItemSelected={(id) => history.push(id)} />}
                right={<PersonDetails itemId={id} />}
            />
        </div>
    );
};

export default withRouter(PeoplePage);