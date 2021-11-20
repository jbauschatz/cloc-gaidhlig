import {Noun} from '../model/noun';

/**
 * Translates a number into Gaelic, using the decimal system
 */
export function translateNumber(number: number) : string {
    return translateNumberInternal(number, false, false);
}

/**
 * Translates a number into Gaelic using the decimal system, with some clues from context about what form the number should take
 *
 * @param number the number to translate
 * @param isLenited whether the number should be lenited, because it is following "dà"
 * @param isCounting whether the number is in its counting form, ie following "'s a"
 */
function translateNumberInternal(number: number, isLenited: boolean, isCounting: boolean) : string {
    switch (number) {
    case 1:
        return isCounting ? 'h-aon' : 'aon';
    case 2:
        return 'dhà';
    case 3:
        return 'trì';
    case 4:
        return 'ceithir';
    case 5:
        return 'còig';
    case 6:
        return 'sia';
    case 7:
        return 'seachd';
    case 8:
        return isCounting ? 'h-ochd' : 'ochd';
    case 9:
        return 'naoi';
    case 10:
        return 'deich';
    case 12:
        return 'dhà dheug';
    case 20:
        return 'fichead';
    case 30:
        return 'trithead';
    case 40:
        return 'ceathrad';
    case 50:
        return 'caogad';
    case 60:
        return 'seasgad';
    case 70:
        return 'seachdad';
    case 80:
        return 'ochdad';
    case 90:
        return 'naochad';
    default:
        if (number > 10 && number < 20) {
            const onesPlace = number % 10;
            return translateNumberInternal(onesPlace, false, false) + ' deug';
        } else if (number > 20 && number < 30) {
            const onesPlace = number % 10;
            return 'fichead \'s a ' + translateNumberInternal(onesPlace, false, true);
        }

        throw 'Number is out of range for translation: ' + number;
    }
}

/**
 * Translates a numbered noun into Gaelic.
 *
 * This will incorporate the appropriate form of the noun into the decimal representation of the number.
 */
export function translateNumberedNoun(number: number, noun: Noun): string {
    if (number == 1) {
        return 'aon ' + noun.singularForm;
    } else if (number == 2) {
        return 'dà ' + noun.lenitedForm;
    } else if (number < 10) {
        // Form "tri chair"
        const onesPlace = number % 10;
        return translateNumber(onesPlace) + ' ' + noun.pluralForm;
    } else if (number == 10) {
        // Form "deic cair"
        return 'deich ' + noun.pluralForm;
    } else if (number < 20) {
        // Form "aon char deug"
        const onesPlace = number % 10;
        const tenRepresentation = onesPlace == 2 ? 'dheug' : 'deug';
        return translateNumberedNoun(onesPlace, noun) + ' ' + tenRepresentation;
    } else if (number < 100) {
        const onesPlace = number % 10;

        const tensPlace = number - onesPlace;
        const tensPlaceString = translateNumber(tensPlace) +
                ' ' +
                noun.singularForm;
        if (onesPlace == 0) {
            // Form "fichead car"
            return tensPlaceString;
        } else {
            // Form "fichead car 's a tri"
            return tensPlaceString +
                ' \'s a ' +
                translateNumberInternal(onesPlace, false, true);
        }
    }

    throw 'Number is out of range for translation: ' + number;
}
