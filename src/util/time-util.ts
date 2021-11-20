import {Noun} from '../model/noun';
import {translateNumber, translateNumberedNoun} from './number-util';

/**
 * The time of day as described in Gaelic idiom
 */
export class GaelicTimeIdiom {
    hourOfDay: string;
    prefix?: TimeIdiomPrefix;

    /**
     * Constructs a Gaelic Time with the given components
     *
     * Prefix is optional, and will be blank for times that fall directly on the hour
     */
    constructor(hourOfDay: string, prefix?: TimeIdiomPrefix) {
        this.hourOfDay = hourOfDay;
        if (typeof prefix !== 'undefined') {
            this.prefix = prefix;
        }
    }
}

/**
 * Prefix component of a Gaelic time idiom.
 * 
 * This separates the minutes from the preposition so that they can be displayed differently
 * if desired.
 */
export class TimeIdiomPrefix {
    minutes: string;
    preposition: string;

    /**
     * Constructs a new TimeIdiomPrefix
     */
    constructor(minutes: string, preposition: string) {
        this.minutes = minutes;
        this.preposition = preposition;
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
    if (hour == 0) {
        // 12 midnight, literally "mid-night"
        return 'meadhan-oidhche';
    } else if (hour == 12) {
        // 12 noon, literally "mid-day";
        return 'meadhan-là';
    }

    hour = hour % 12;

    if (hour == 1) {
        // 1 'o clock, literally just "hour"
        return hourNoun.singularForm;
    }

    return includeHour ?
        translateNumberedNoun(hour, hourNoun) :
        translateNumber(hour);
}

/**
 * Word for "quarter"
 */
const quarter = 'cairteal';

/**
 * Preposition for "after"
 */
const afterPreposition = 'an dèidh';

/**
 * Preposition for "to"
 */
const toPreposition = 'gu';

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
        return new GaelicTimeIdiom(hourTranslation, new TimeIdiomPrefix(quarter, afterPreposition));
    } else if (minutes < 30) {
        // Some number of minutes past the hour
        const hourTranslation = translateHour(time.getHours(), false);
        const minutesAfterPrefix = new TimeIdiomPrefix(
            translateNumberedNoun(time.getMinutes(), minuteNoun),
            afterPreposition
        );

        return new GaelicTimeIdiom(hourTranslation, minutesAfterPrefix);
    } else if (minutes == 30) {
        // Half past the hour
        const hourTranslation = translateHour(time.getHours(), false);
        return new GaelicTimeIdiom(hourTranslation, new TimeIdiomPrefix('leth-uair', afterPreposition));
    } else if (minutes == 45) {
        // Quarter til the hour
        const nextHour = (time.getHours() + 1) % 24;
        const hourTranslation = translateHour(nextHour, false);
        return new GaelicTimeIdiom(hourTranslation, new TimeIdiomPrefix(quarter, toPreposition));
    } else {
        // Some number of minutes until the hour
        const nextHour = (time.getHours() + 1) % 24;
        const hourTranslation = translateHour(nextHour, false);

        const minutesUntilHour = 60 - time.getMinutes();
        const minutesUntilPrefix = new TimeIdiomPrefix(
            translateNumberedNoun(minutesUntilHour, minuteNoun),
            toPreposition
        );

        return new GaelicTimeIdiom(hourTranslation, minutesUntilPrefix);
    }
}
