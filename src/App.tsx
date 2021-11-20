import React from 'react';
import {GaelicTimeIdiom, translateTime} from './util/time-util';

type AppState = {
    time : GaelicTimeIdiom
}

/**
 * Component function for the top-level application
 */
export class App extends React.Component<{}, AppState> {
    /**
     * Initializes the application
     */
    constructor(props: {}) {
        super(props);
        const time = translateTime(new Date());

        this.state = {
            time,
        };
    }

    /**
     * Renders the component
     */
    render() {
        return <div>
            <div>{this.state.time.prefix}</div>
            <div>{this.state.time.hourOfDay}</div>
        </div>;
    }
}

export default App;
