import {translateTime} from './time-util';

/**
 * Builds a Date with the specified time portion, for testing purposes
 */
function buildTime(hour: number, minute: number) {
    return new Date(2021, 11, 20, hour, minute);
}

describe(translateTime, () => {
    it('should translate even hours', () => {
        expect(translateTime(buildTime(0, 0))).toEqual({
            hourOfDay: 'meadhan-oidhche',
            prefix: undefined,
        });
        expect(translateTime(buildTime(1, 0))).toEqual({
            hourOfDay: 'uair',
            prefix: undefined,
        });
        expect(translateTime(buildTime(2, 0))).toEqual({
            hourOfDay: 'dà uair',
            prefix: undefined,
        });
        expect(translateTime(buildTime(3, 0))).toEqual({
            hourOfDay: 'trì uairean',
            prefix: undefined,
        });
        expect(translateTime(buildTime(10, 0))).toEqual({
            hourOfDay: 'deich uairean',
            prefix: undefined,
        });
        expect(translateTime(buildTime(11, 0))).toEqual({
            hourOfDay: 'aon uair deug',
            prefix: undefined,
        });
        expect(translateTime(buildTime(12, 0))).toEqual({
            hourOfDay: 'meadhan-là',
            prefix: undefined,
        });
        expect(translateTime(buildTime(13, 0))).toEqual({
            hourOfDay: 'uair',
            prefix: undefined,
        });
        expect(translateTime(buildTime(14, 0))).toEqual({
            hourOfDay: 'dà uair',
            prefix: undefined,
        });
    });
    it('should translate quarter after the hour', () => {
        expect(translateTime(buildTime(0, 15))).toEqual({
            hourOfDay: 'meadhan-oidhche',
            prefix: {
                minutes: 'cairteal',
                preposition: 'an dèidh'
            }
        });
        expect(translateTime(buildTime(1, 15))).toEqual({
            hourOfDay: 'uair',
            prefix: {
                minutes: 'cairteal',
                preposition: 'an dèidh'
            }
        });
        expect(translateTime(buildTime(2, 15))).toEqual({
            hourOfDay: 'dhà',
            prefix: {
                minutes: 'cairteal',
                preposition: 'an dèidh'
            }
        });
        expect(translateTime(buildTime(10, 15))).toEqual({
            hourOfDay: 'deich',
            prefix: {
                minutes: 'cairteal',
                preposition: 'an dèidh'
            }
        });
        expect(translateTime(buildTime(11, 15))).toEqual({
            hourOfDay: 'aon deug',
            prefix: {
                minutes: 'cairteal',
                preposition: 'an dèidh'
            }
        });
        expect(translateTime(buildTime(12, 15))).toEqual({
            hourOfDay: 'meadhan-là',
            prefix: {
                minutes: 'cairteal',
                preposition: 'an dèidh'
            }
        });
        expect(translateTime(buildTime(13, 15))).toEqual({
            hourOfDay: 'uair',
            prefix: {
                minutes: 'cairteal',
                preposition: 'an dèidh'
            }
        });
    });
    it('should translate minutes past the hour', () => {
        expect(translateTime(buildTime(0, 1))).toEqual({
            hourOfDay: 'meadhan-oidhche',
            prefix: {
                minutes: 'aon mionaid',
                preposition: 'an dèidh'
            }
        });
        expect(translateTime(buildTime(1, 1))).toEqual({
            hourOfDay: 'uair',
            prefix: {
                minutes: 'aon mionaid',
                preposition: 'an dèidh'
            }
        });
        expect(translateTime(buildTime(2, 3))).toEqual({
            hourOfDay: 'dhà',
            prefix: {
                minutes: 'trì mionaidean',
                preposition: 'an dèidh'
            }
        });
        expect(translateTime(buildTime(10, 12))).toEqual({
            hourOfDay: 'deich',
            prefix: {
                minutes: 'dà mhionaid dheug',
                preposition: 'an dèidh'
            }
        });
        expect(translateTime(buildTime(11, 29))).toEqual({
            hourOfDay: 'aon deug',
            prefix: {
                minutes: 'fichead mionaid \'s a naoi',
                preposition: 'an dèidh'
            }
        });
        expect(translateTime(buildTime(12, 1))).toEqual({
            hourOfDay: 'meadhan-là',
            prefix: {
                minutes: 'aon mionaid',
                preposition: 'an dèidh'
            }
        });
        expect(translateTime(buildTime(13, 1))).toEqual({
            hourOfDay: 'uair',
            prefix: {
                minutes: 'aon mionaid',
                preposition: 'an dèidh'
            }
        });
    });
    it('should translate half past the hour', () => {
        expect(translateTime(buildTime(0, 30))).toEqual({
            hourOfDay: 'meadhan-oidhche',
            prefix: {
                minutes: 'leth-uair',
                preposition: 'an dèidh'
            }
        });
        expect(translateTime(buildTime(1, 30))).toEqual({
            hourOfDay: 'uair',
            prefix: {
                minutes: 'leth-uair',
                preposition: 'an dèidh'
            }
        });
        expect(translateTime(buildTime(2, 30))).toEqual({
            hourOfDay: 'dhà',
            prefix: {
                minutes: 'leth-uair',
                preposition: 'an dèidh'
            }
        });
        expect(translateTime(buildTime(10, 30))).toEqual({
            hourOfDay: 'deich',
            prefix: {
                minutes: 'leth-uair',
                preposition: 'an dèidh'
            }
        });
        expect(translateTime(buildTime(11, 30))).toEqual({
            hourOfDay: 'aon deug',
            prefix: {
                minutes: 'leth-uair',
                preposition: 'an dèidh'
            }
        });
        expect(translateTime(buildTime(12, 30))).toEqual({
            hourOfDay: 'meadhan-là',
            prefix: {
                minutes: 'leth-uair',
                preposition: 'an dèidh'
            }
        });
        expect(translateTime(buildTime(13, 30))).toEqual({
            hourOfDay: 'uair',
            prefix: {
                minutes: 'leth-uair',
                preposition: 'an dèidh'
            }
        });
    });
    it('should translate quarter til the hour', () => {
        expect(translateTime(buildTime(0, 45))).toEqual({
            hourOfDay: 'uair',
            prefix: {
                minutes: 'cairteal',
                preposition: 'gu'
            }
        });
        expect(translateTime(buildTime(1, 45))).toEqual({
            hourOfDay: 'dhà',
            prefix: {
                minutes: 'cairteal',
                preposition: 'gu'
            }
        });
        expect(translateTime(buildTime(9, 45))).toEqual({
            hourOfDay: 'deich',
            prefix: {
                minutes: 'cairteal',
                preposition: 'gu'
            }
        });
        expect(translateTime(buildTime(10, 45))).toEqual({
            hourOfDay: 'aon deug',
            prefix: {
                minutes: 'cairteal',
                preposition: 'gu'
            }
        });
        expect(translateTime(buildTime(11, 45))).toEqual({
            hourOfDay: 'meadhan-là',
            prefix: {
                minutes: 'cairteal',
                preposition: 'gu'
            }
        });
        expect(translateTime(buildTime(12, 45))).toEqual({
            hourOfDay: 'uair',
            prefix: {
                minutes: 'cairteal',
                preposition: 'gu'
            }
        });
        expect(translateTime(buildTime(23, 45))).toEqual({
            hourOfDay: 'meadhan-oidhche',
            prefix: {
                minutes: 'cairteal',
                preposition: 'gu'
            }
        });
    });
    it('should translate minutes til the hour', () => {
        expect(translateTime(buildTime(0, 59))).toEqual({
            hourOfDay: 'uair',
            prefix: {
                minutes: 'aon mionaid',
                preposition: 'gu'
            }
        });
        expect(translateTime(buildTime(1, 57))).toEqual({
            hourOfDay: 'dhà',
            prefix: {
                minutes: 'trì mionaidean',
                preposition: 'gu'
            }
        });
        expect(translateTime(buildTime(9, 48))).toEqual({
            hourOfDay: 'deich',
            prefix: {
                minutes: 'dà mhionaid dheug',
                preposition: 'gu'
            }
        });
        expect(translateTime(buildTime(10, 31))).toEqual({
            hourOfDay: 'aon deug',
            prefix: {
                minutes: 'fichead mionaid \'s a naoi',
                preposition: 'gu'
            }
        });
        expect(translateTime(buildTime(11, 59))).toEqual({
            hourOfDay: 'meadhan-là',
            prefix: {
                minutes: 'aon mionaid',
                preposition: 'gu'
            }
        });
        expect(translateTime(buildTime(12, 59))).toEqual({
            hourOfDay: 'uair',
            prefix: {
                minutes: 'aon mionaid',
                preposition: 'gu'
            }
        });
        expect(translateTime(buildTime(23, 59))).toEqual({
            hourOfDay: 'meadhan-oidhche',
            prefix: {
                minutes: 'aon mionaid',
                preposition: 'gu'
            }
        });
    });
});
