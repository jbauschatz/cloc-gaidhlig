import {Noun} from '../model/noun';
import {translateNumber, translateNumberedNoun} from './number-util';

/**
 * The time of day as described in Gaelic idiom
 */
export class GaelicTimeIdiom {
    hourOfDay: string;
    prefix?: string;

    /**
     * Constructs a Gaelic Time with the given components
     *
     * Prefix is optional, and will be blank for times that fall directly on the hour
     */
    constructor(hourOfDay: string, prefix?: string) {
        this.hourOfDay = hourOfDay;
        if (typeof prefix !== 'undefined') {
            this.prefix = prefix;
        }
    }
}

/**
 * Gaelic noun for hour, "uair".
 *
 * Note: Does not lenite.
 */
const hourNoun = new Noun('uair', 'uairean');

/**
 * Gaelic noun for minute, "mionaid"
 */
const minuteNoun = new Noun('mionaid', 'mionaidean', 'mhionaid');

/**
 * Translates an hour of day into Gaelic.
 *
 * Example: "uair" or "cethir uairean"
 *
 * @param hour the hour of day
 * @param includeHour whether to include the noun "uair/uairean" meaning "hour" in the string.
 */
function translateHour(hour: number, includeHour: boolean = true) {
    hour = hour % 12;

    if (hour == 1) {
        return hourNoun.singularForm;
    }

    if (hour == 0) {
        hour = 12;
    }

    return includeHour ?
        translateNumberedNoun(hour, hourNoun) :
        translateNumber(hour);
}

/**
 * Translates the time portion of a given date into Gaelic
 */
export function translateTime(time: Date): GaelicTimeIdiom {
    const minutes = time.getMinutes();

    if (minutes == 0) {
        // exactly on the hour
        const hourTranslation = translateHour(time.getHours());
        return new GaelicTimeIdiom(hourTranslation);
    } else if (minutes == 15) {
        // Quarter past the hour
        const hourTranslation = translateHour(time.getHours(), false);
        return new GaelicTimeIdiom(hourTranslation, 'cairteal an dèidh');
    } else if (minutes < 30) {
        // Some number of minutes past the hour
        const hourTranslation = translateHour(time.getHours(), false);
        const minutesAfterTranslation = translateNumberedNoun(time.getMinutes(), minuteNoun) +
                ' an dèidh';

        return new GaelicTimeIdiom(hourTranslation, minutesAfterTranslation);
    } else if (minutes == 30) {
        // Half past the hour
        const hourTranslation = translateHour(time.getHours(), false);
        return new GaelicTimeIdiom(hourTranslation, 'leth-uair an dèidh');
    } else if (minutes == 45) {
        // Quarter til the hour
        const nextHour = (time.getHours() + 1) % 12;
        const hourTranslation = translateHour(nextHour, false);
        return new GaelicTimeIdiom(hourTranslation, 'cairteal gu');
    } else {
        // Some number of minutes until the hour
        const nextHour = (time.getHours() + 1) % 12;
        const hourTranslation = translateHour(nextHour, false);

        const minutesUntilHour = 60 - time.getMinutes();
        const minutesUntilTranslation = translateNumberedNoun(minutesUntilHour, minuteNoun) +
                ' gu';

        return new GaelicTimeIdiom(hourTranslation, minutesUntilTranslation);
    }
}
