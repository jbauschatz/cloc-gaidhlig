import {Noun} from '../model/noun';
import {translateNumber, translateNumberedNoun} from './number-util';

describe(translateNumber, () => {
    it('should translate 1-10', () => {
        expect(translateNumber(1)).toEqual('aon');
        expect(translateNumber(2)).toEqual('dhà');
        expect(translateNumber(3)).toEqual('trì');
        expect(translateNumber(4)).toEqual('ceithir');
        expect(translateNumber(5)).toEqual('còig');
        expect(translateNumber(6)).toEqual('sia');
        expect(translateNumber(7)).toEqual('seachd');
        expect(translateNumber(8)).toEqual('ochd');
        expect(translateNumber(9)).toEqual('naoi');
    });

    it('should translate 10', () => {
        expect(translateNumber(10)).toEqual('deich');
    });

    it('should translate 11-19', () => {
        expect(translateNumber(11)).toEqual('aon deug');
        expect(translateNumber(12)).toEqual('dhà dheug');
        expect(translateNumber(13)).toEqual('trì deug');
        expect(translateNumber(14)).toEqual('ceithir deug');
        expect(translateNumber(15)).toEqual('còig deug');
        expect(translateNumber(16)).toEqual('sia deug');
        expect(translateNumber(17)).toEqual('seachd deug');
        expect(translateNumber(18)).toEqual('ochd deug');
        expect(translateNumber(19)).toEqual('naoi deug');
    });

    it('should translate 20', () => {
        expect(translateNumber(20)).toEqual('fichead');
    });

    it('should translate 21-29', () => {
        expect(translateNumber(21)).toEqual('fichead \'s a h-aon');
        expect(translateNumber(22)).toEqual('fichead \'s a dhà');
        expect(translateNumber(23)).toEqual('fichead \'s a trì');
        expect(translateNumber(24)).toEqual('fichead \'s a ceithir');
        expect(translateNumber(25)).toEqual('fichead \'s a còig');
        expect(translateNumber(26)).toEqual('fichead \'s a sia');
        expect(translateNumber(27)).toEqual('fichead \'s a seachd');
        expect(translateNumber(28)).toEqual('fichead \'s a h-ochd');
        expect(translateNumber(29)).toEqual('fichead \'s a naoi');
    });

    it('does not support 100 and above yet', () => {
        expect(
            () => translateNumber(100),
        ).toThrow('Number is out of range for translation: 100');
    });
});

describe(translateNumberedNoun, () => {
    const noun = new Noun('càr', 'càir', 'chàr');

    it('should use the singular after 1', () => {
        expect(translateNumberedNoun(1, noun)).toEqual('aon càr');
    });

    it('should lenite the noun 2', () => {
        expect(translateNumberedNoun(2, noun)).toEqual('dà chàr');
    });

    it('should pluralize the noun after 3-10', () => {
        expect(translateNumberedNoun(3, noun)).toEqual('trì càir');
        expect(translateNumberedNoun(4, noun)).toEqual('ceithir càir');
        expect(translateNumberedNoun(5, noun)).toEqual('còig càir');
        expect(translateNumberedNoun(6, noun)).toEqual('sia càir');
        expect(translateNumberedNoun(7, noun)).toEqual('seachd càir');
        expect(translateNumberedNoun(8, noun)).toEqual('ochd càir');
        expect(translateNumberedNoun(9, noun)).toEqual('naoi càir');
        expect(translateNumberedNoun(10, noun)).toEqual('deich càir');
    });

    it('should should insert the noun in the middle for numbers 11-19', () => {
        expect(translateNumberedNoun(11, noun)).toEqual('aon càr deug');
        expect(translateNumberedNoun(12, noun)).toEqual('dà chàr dheug');
        expect(translateNumberedNoun(13, noun)).toEqual('trì càir deug');
        expect(translateNumberedNoun(19, noun)).toEqual('naoi càir deug');
    });

    it('should use the singlar noun after 20-99 (decimal system)', () => {
        expect(translateNumberedNoun(20, noun)).toEqual('fichead càr');
        expect(translateNumberedNoun(21, noun)).toEqual('fichead càr \'s a h-aon');
        expect(translateNumberedNoun(22, noun)).toEqual('fichead càr \'s a dhà');
        expect(translateNumberedNoun(23, noun)).toEqual('fichead càr \'s a trì');
        expect(translateNumberedNoun(24, noun)).toEqual('fichead càr \'s a ceithir');
        expect(translateNumberedNoun(25, noun)).toEqual('fichead càr \'s a còig');
        expect(translateNumberedNoun(26, noun)).toEqual('fichead càr \'s a sia');
        expect(translateNumberedNoun(27, noun)).toEqual('fichead càr \'s a seachd');
        expect(translateNumberedNoun(28, noun)).toEqual('fichead càr \'s a h-ochd');
        expect(translateNumberedNoun(29, noun)).toEqual('fichead càr \'s a naoi');

        expect(translateNumberedNoun(30, noun)).toEqual('trithead càr');
        expect(translateNumberedNoun(31, noun)).toEqual('trithead càr \'s a h-aon');
        expect(translateNumberedNoun(39, noun)).toEqual('trithead càr \'s a naoi');

        expect(translateNumberedNoun(40, noun)).toEqual('ceathrad càr');
        expect(translateNumberedNoun(41, noun)).toEqual('ceathrad càr \'s a h-aon');
        expect(translateNumberedNoun(49, noun)).toEqual('ceathrad càr \'s a naoi');

        expect(translateNumberedNoun(50, noun)).toEqual('caogad càr');
        expect(translateNumberedNoun(51, noun)).toEqual('caogad càr \'s a h-aon');
        expect(translateNumberedNoun(59, noun)).toEqual('caogad càr \'s a naoi');

        expect(translateNumberedNoun(60, noun)).toEqual('seasgad càr');
        expect(translateNumberedNoun(61, noun)).toEqual('seasgad càr \'s a h-aon');
        expect(translateNumberedNoun(69, noun)).toEqual('seasgad càr \'s a naoi');

        expect(translateNumberedNoun(70, noun)).toEqual('seachdad càr');
        expect(translateNumberedNoun(71, noun)).toEqual('seachdad càr \'s a h-aon');
        expect(translateNumberedNoun(79, noun)).toEqual('seachdad càr \'s a naoi');

        expect(translateNumberedNoun(80, noun)).toEqual('ochdad càr');
        expect(translateNumberedNoun(81, noun)).toEqual('ochdad càr \'s a h-aon');
        expect(translateNumberedNoun(89, noun)).toEqual('ochdad càr \'s a naoi');

        expect(translateNumberedNoun(90, noun)).toEqual('naochad càr');
        expect(translateNumberedNoun(91, noun)).toEqual('naochad càr \'s a h-aon');
        expect(translateNumberedNoun(99, noun)).toEqual('naochad càr \'s a naoi');
    });

    it('does not support 100 and above yet', () => {
        expect(
            () => translateNumberedNoun(100, noun),
        ).toThrow('Number is out of range for translation: 100');
    });
});
