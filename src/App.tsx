import React, {useEffect, useMemo, useState} from 'react';
import {ClockFace} from './component/clock-face';
import {GaelicTimeIdiom, translateTime} from './util/time-util';

/**
 * Application's main component
 *
 * Will refresh the current time once a minute and translate it into Gaelic
 */
export function App(props: {}) {
    const [time, setTime] = useState(new Date());
    const timeTranslation: GaelicTimeIdiom = useMemo(
        () => translateTime(time),
        [time.getMinutes()]
    );

    /**
     * Update the app's current time every second
     */
    useEffect(
        () => {
            setInterval(
                () => {
                    setTime(new Date());
                },
                1000
            );
        },
        []
    );

    return <div>
        <div className="center gaelic-text">
            <div className="time-prompt non-number">
                Dè an uair a tha e? Tha e
            </div>
            {timeTranslation.prefix && <div className="time-prefix">
                <span className="number">{timeTranslation.prefix?.minutes}&nbsp;</span>
                <span className="non-number">{timeTranslation.prefix?.preposition}</span>
            </div>}
            <div className="time-hour number">
                {timeTranslation.hourOfDay}
            </div>
            <div id="clock-container">
                <ClockFace time={time}></ClockFace>
            </div>
        </div>
    </div>;
}

export default App;
