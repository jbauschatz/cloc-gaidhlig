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
            <div className="center gaelic-text">
                <div className="time-prompt non-number">
                    Dè an uair a tha e? Tha e
                </div>
                <div className="time-prefix">
                    <span className="number">{this.state.time.prefix?.minutes}&nbsp;</span>
                    <span className="non-number">{this.state.time.prefix?.preposition}</span>
                </div>
                <div className="time-hour number">
                    {this.state.time.hourOfDay}
                </div>
            </div>
        </div>;
    }
}

export default App;
