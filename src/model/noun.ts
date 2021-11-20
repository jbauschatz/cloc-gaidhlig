/**
 * A Gaelic noun.
 *
 * Different forms of the word are included so they can be used where appropriate,
 * without having to determine the correct form using rules.
 *
 * (The genitive form is not required here because it doesn't factor into the number/date rules)
 */
export class Noun {
    /**
     * Singular or root form of the noun
     */
    singularForm: string;

    /**
     * Lenited form of the noun.
     *
     * If the noun does not lenite, this is identical to the singular form
     */
    lenitedForm: string;

    /**
     * Plural form of the noun
     */
    pluralForm: string;

    /**
     * Constructs a noun with the given forms.
     *
     * If the noun does not lenite, leave lenitedForm undefined and it will match the singular
     */
    constructor(
        singularForm: string,
        pluralForm: string,
        lenitedForm?: string,
    ) {
        this.singularForm = singularForm;
        this.pluralForm = pluralForm;

        // Default the lenited form to matching the singular if none is provided
        if (typeof lenitedForm !== 'undefined') {
            this.lenitedForm = lenitedForm;
        } else {
            this.lenitedForm = singularForm;
        }
    }
}
