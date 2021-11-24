import React, {useMemo} from 'react';

/**
 * Builds transform attribute to rotate about the point 50,50 by the given number of degrees
 */
function getRotateDegreesTransform(degrees: number) {
    return `rotate(${degrees} 50 50)`;
}

/**
 * Renders the given time on an analog clock face
 */
export function ClockFace({time}: {time: Date}) {
    // Rotate second hand 6 degrees per second
    const secondsTransform = useMemo(
        () => getRotateDegreesTransform(6 * time.getSeconds()),
        [time.getSeconds()]
    );

    // Rotate minute hand 6 degrees per minute
    const minutesTransform = useMemo(
        () => getRotateDegreesTransform(6 * time.getMinutes()),
        [time.getMinutes()]
    );

    // Rotate hour hand proprtionally to hours and minutes
    const hoursTransform = useMemo(
        () => getRotateDegreesTransform(30*(time.getHours() % 12) + time.getMinutes() / 2),
        [time.getMinutes()]
    );

    return <div>
        <svg id="clock-face" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45"/>
            <g>
                <rect className="hour-marker" x="50" y="8" width="1" height="8" rx="1" ry="1" transform="rotate(0 50 50)"/>
                <rect className="hour-marker" x="50" y="8" width=".5" height="8" rx="1" ry="1" transform="rotate(30 50 50)"/>
                <rect className="hour-marker" x="50" y="8" width=".5" height="8" rx="1" ry="1" transform="rotate(60 50 50)"/>

                <rect className="hour-marker" x="50" y="8" width="1" height="8" rx="1" ry="1" transform="rotate(90 50 50)"/>
                <rect className="hour-marker" x="50" y="8" width=".5" height="8" rx="1" ry="1" transform="rotate(120 50 50)"/>
                <rect className="hour-marker" x="50" y="8" width=".5" height="8" rx="1" ry="1" transform="rotate(150 50 50)"/>

                <rect className="hour-marker" x="50" y="8" width="1" height="8" rx="1" ry="1" transform="rotate(180 50 50)"/>
                <rect className="hour-marker" x="50" y="8" width=".5" height="8" rx="1" ry="1" transform="rotate(210 50 50)"/>
                <rect className="hour-marker" x="50" y="8" width=".5" height="8" rx="1" ry="1" transform="rotate(240 50 50)"/>

                <rect className="hour-marker" x="50" y="8" width="1" height="8" rx="1" ry="1" transform="rotate(270 50 50)"/>
                <rect className="hour-marker" x="50" y="8" width=".5" height="8" rx="1" ry="1" transform="rotate(300 50 50)"/>
                <rect className="hour-marker" x="50" y="8" width=".5" height="8" rx="1" ry="1" transform="rotate(330 50 50)"/>
            </g>
            <g>
                <line id="hour-hand" x1="50" y1="50" x2="50" y2="20" strokeLinecap="round" transform={hoursTransform}/>
                <line id="minute-hand" x1="50" y1="50" x2="50" y2="15" strokeLinecap="round" transform={minutesTransform}/>
                <line id="second-hand" x1="50" y1="50" x2="50" y2="8" strokeLinecap="round" transform={secondsTransform}/>
                <circle id="clock-center" cx="50" cy="50" r="2"/>
            </g>
        </svg>
    </div>;
}
