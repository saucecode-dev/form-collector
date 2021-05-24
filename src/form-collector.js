class FormCollector {
    /**
     * @type {object}
     */
    #form = null;

    /**
     * @type {array}
     */
    #inputs = null;

    /**
     * Allowed element tag names
     * @type {array}
     */
    #allowedTagNames = ['input', 'textarea', 'select'];

    /**
     * These inputs will have special rules and exception,
     * Basically input.checked  value will be used as value instead if input.value
     *
     * @type {[string, string]}
     */
    #checkInputs = ['checkbox', 'radio'];

    /**
     * @param {HTMLFormElement} formElement
     */
    constructor(formElement) {
        this.collection = {};

        this.#form = formElement;
        this.#inputs = formElement.elements;

        this.startCollecting().then(() => {
            // If we ever need to do stuff, event and so on.
        });
    }

    async startCollecting() {
        return await this.collect();
    }

    collect() {
        // Make sure we have elements to iterate through.
        if (this.#inputs.length !== 0) {
            // Start loopint through the array / node list.
            for (let key in this.#inputs) {
                // Make array/node list has element
                if (key in this.#inputs) {

                    // Collect some info
                    let input = this.#inputs[ key ];
                    let type = input.type;
                    let tag = input.tagName;

                    // Ww have to make sure that it's a string before we can use .toLowerCase();
                    if (typeof tag === 'string') {

                        // Make sure it's lower case, just preference.
                        tag = tag.toLowerCase();
                    }

                    // Check if tag is allowed.
                    if (this.#allowedTagNames.includes(tag)) {
                        /**
                         * Current iterations input.name
                         * @type {string}
                         */
                        let name;

                        /**
                         * Current iterations input baseName
                         * baseName is for inputs with array names like these...
                         *
                         * Doing input.name will include the bracket/array parts.
                         * baseName is without the brackets/array parts.
                         *
                         * @example <input name="example[]" />
                         * @example <input name="example[key][key2][]" />
                         *
                         * @type {string}
                         */
                        let baseName;

                        /**
                         * Current iterations input.value
                         * @type {string|boolean}
                         */
                        let value;

                        name = baseName = input.name;
                        value = input.value;

                        /**
                         * Check if "checked" based input.
                         */
                        if (this.#checkInputs.includes(type)) {
                            value = input.checked;
                        }

                        // Check that we have all that we need.
                        if (input && name && tag) {
                            /**
                             * Check if the name has left square bracket [
                             * Important later on when we actually start collecting the data.
                             */
                            let match1 = name.includes('[]');
                            let match2 = name.includes('[') && !name.includes('[]');

                            if (match1) {
                                let baseName = name.split('[')[ 0 ];

                                if (typeof this.collection[ baseName ] === 'undefined') {
                                    this.collection[ baseName ] = [];
                                }

                                this.collection[ baseName ].push(value);
                            } else if (match2) {
                                /**
                                 * If we do have some sort of square bracket in the name
                                 * It means that the input name is probably of the array sort!
                                 *
                                 * Which is by far the most difficult to retrieve and format.
                                 */
                                let baseName = name.split('[')[ 0 ];
                                let matches = [...name.matchAll(/\[(.*?)]/g)];

                                // Rework the data a bit, we only want array index 1.
                                for (let i in matches) {
                                    // matched value
                                    matches[ i ] = matches[ i ][ 1 ];
                                }

                                // Just make sure the base exist!
                                if (typeof this.collection[ baseName ] === 'undefined') {
                                    this.collection[ baseName ] = matches[ 0 ] === '' ? [] : {};
                                }

                                // If 1 matches
                                if (typeof this.collection[ baseName ][ matches[ 0 ] ] === 'undefined') {
                                    this.collection[ baseName ][ matches[ 0 ] ] = matches[ 0 ] === '' ? [] : {};
                                }

                                if (matches.length >= 2 && typeof this.collection[ baseName ][ matches[ 0 ] ][ matches[ 1 ] ] === 'undefined') {
                                    this.collection[ baseName ][ matches[ 0 ] ][ matches[ 1 ] ] = matches[ 1 ] === '' ? [] : {};
                                }

                                if (matches.length >= 3 && typeof this.collection[ baseName ][ matches[ 0 ] ][ matches[ 1 ] ][ matches[ 2 ] ] === 'undefined') {
                                    this.collection[ baseName ][ matches[ 0 ] ][ matches[ 1 ] ][ matches[ 2 ] ] = matches[ 2 ] === '' ? [] : {};
                                }

                                switch (matches.length) {
                                    case 0:
                                        this.collection[ baseName ][ matches[ 0 ] ].constructor.name === 'Array' ?
                                            this.collection[ baseName ].push(value) :
                                            this.collection[ baseName ] = value;
                                        break;

                                    case 1:
                                        this.collection[ baseName ][ matches[ 0 ] ].constructor.name === 'Array' ?
                                            this.collection[ baseName ][ matches[ 0 ] ].push(value) :
                                            this.collection[ baseName ][ matches[ 0 ] ] = value;
                                        break;

                                    case 2:
                                        this.collection[ baseName ][ matches[ 0 ] ][ matches[ 1 ] ].constructor.name === 'Array' ?
                                            this.collection[ baseName ][ matches[ 0 ] ][ matches[ 1 ] ].push(value) :
                                            this.collection[ baseName ][ matches[ 0 ] ][ matches[ 1 ] ] = value;
                                        break;

                                    case 3:
                                        this.collection[ baseName ][ matches[ 0 ] ][ matches[ 1 ] ][ matches[ 2 ] ].constructor.name === 'Array' ?
                                            this.collection[ baseName ][ matches[ 0 ] ][ matches[ 1 ] ][ matches[ 2 ] ].push(value) :
                                            this.collection[ baseName ][ matches[ 0 ] ][ matches[ 1 ] ][ matches[ 2 ] ] = value;
                                        break;
                                }
                            } else {
                                this.collection[ baseName ] = value;
                            }
                        }
                    }
                }
            }
        }

        return new Promise(resolve => {
            resolve(true);
        });
    }

    getCollection(asString = false) {
        if (asString && this.collection.constructor.name === 'Object') {
            return JSON.stringify(this.collection);
        }

        return this.collection;
    }
}

export default FormCollector;
