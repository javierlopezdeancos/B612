let mydom = (function (undefined) {

    /**
     * Duration constants
     * @type {Object}
     */
    const DURATION = {
        DEFAULT: 500
    };

    /**
     * Style constants
     * @type {Object}
     */
    const STYLE = {
        SHOW: 'block',
        HIDE: 'none',
    };

    /**
     * Style property constants
     * @type {Object}
     */
    const PROPERTY = {
        DISPLAY: 'display',
    };

    /**
     * Type constants
     * @type {Object}
     */
    const TYPE = {
        FUNCTION: 'function',
        STRING: 'string',
    };

    /**
     * Map elements to events
     * @type {WeakMap}
     */
    const eventMap = new WeakMap();

    /**
     * Function to fade an element
     * @param  {HTMLElement} element
     * @param  {Number} from
     * @param  {Number} to
     * @param  {Number} duration
     * @param  {Function} callback
     * @return {void}
     */
    const fade = function fade (element, from, to, duration, callback) {
        const start = window.performance.now();

        element.style.display = STYLE.SHOW;

        window.requestAnimationFrame(function step (timestamp) {
            const progress = timestamp - start;
            element.style.opacity = from + (progress / duration) * (to - from);

            if (progress < duration) {
                window.requestAnimationFrame(step);
            } else {
                if (element.style.opacity <= 0) {
                    element.style.display = STYLE.HIDE;
                }

                if (callback) {
                    callback.call(element);
                }
            }
        })
    };

    /**
     * The methods in the collection'S prototype
     * @type {Object}
     */
    const prototype = {

        /**
         * Check if a node is already contained in the collection
         * @param  {HTMLElement} element
         * @return {Boolean}
         */
        has: function(element) {
            return Array.from(this).includes(element);
        },

        /**
         * Add an element or a list of elements to the collection
         * @param   {mixed} element
         * @returns {this}
         */
        add: function(element) {
            const elements = element.length !== undefined ? element : [element];

            Array.from(elements).forEach(element => {
                if (element && !this.has(element)) {
                    Array.prototype.push.call(this, element);
                }
            });

            return this;
        },

        /**
         * Find descendants of the current collection matching a selector
         * @param  {String} selector
         * @return {this}
         */
        find: function(selector) {
            return Array.from(this).reduce(
                (carry, element) => carry.add(element.querySelectorAll(selector)), Object.create(prototype)
            )
        },

        /**
         * Filter the current collection by a selector or filter function
         * @param  {String|Function} selector
         * @return {this}
         */
        filter: function(selector) {
            return Object.create(prototype).add(
                Array.from(this).filter(
                    typeof selector === TYPE.FUNCTION ? selector : element => element.matches(selector)
                )
            )
        },

        /**
         * Get a collection containing the adjecent next siblings
         * of the current collection, optionally filtered by a selector
         * @param  {String|undefined} selector
         * @return {this}
         */
        next: function(selector) {
            return Object.create(prototype).add(
                Array.from(this)
                    .map(element => element.nextElementSibling)
                    .filter(element => element && (!selector || element.matches(selector)))
            )
        },

        /**
         * Get a collection containing the adjecent previous siblings
         * of the current collection, optionally filtered by a selector
         * @param  {String|undefined} selector
         * @return {this}
         */
        prev: function(selector) {
            return Object.create(prototype).add(
                Array.from(this)
                    .map(element => element.previousElementSibling)
                    .filter(element => element && (!selector || element.matches(selector)))
            )
        },

        /**
         * Get a collection containing the immediate parents of
         * the current collection, optionally filtered by a selector
         * @param  {String|undefined} selector
         * @return {this}
         */
        parent: function(selector) {
            return Object.create(prototype).add(
                Array
                    .from(this)
                    .map(element => element.parentNode)
                    .filter(element => !selector || element.matches(selector))
            )
        },

        /**
         * Get a collection containing the immediate parents of the
         * current collection, or, if a selector is specified, the next
         * ancestor that matches that selector
         * @param  {String|undefined} selector
         * @return {this}
         */
        parents: function(selector) {
            return Object.create(prototype).add(
                Array.from(this).map(function walk (element) {
                    const parent = element.parentNode;

                    return parent && (!selector || parent.matches(selector)) ? parent : walk(parent);
                })
            )
        },

        /**
         * Get a collection containing the immediate children of the
         * current collection, optionally filtered by a selector
         * @param  {String|undefined} selector
         * @return {this}
         */
        children: function(selector) {
            return Object.create(prototype).add(
                Array
                    .from(this)
                    .reduce((carry, element) => carry.concat(...element.children), [])
                    .filter(element => !selector || element.matches(selector))
            )
        },

        /**
         * Add a class to all elements in the current collection
         * @param   {String} className
         * @returns {this}
         */
        addClass: function(className) {
            Array.from(this).forEach(el => {
                el.classList.add(className);
            });

            return this;
        },

        /**
         * Remove a class from all elements in the current collection
         * @param  {String} className
         * @return {this}
         */
        removeClass: function(className) {
            Array.from(this).forEach(el => {
                el.classList.remove(className);
            });

            return this;
        },

        /**
         * Set the value property of all elements in the current
         * collection, or, if no value is specified, get the value
         * of the first element in the collection
         * @param  {mixed} newVal
         * @return {this}
         */
        val: function (newVal) {
            if (!newVal) {
                return this[0].value;
            }

            Array.from(this).forEach(el => {
                el.value = newVal;
            });

            return this;
        },

        /**
         * Set the HTML of all elements in the current collection,
         * or, if no markup is specified, get the HTML of the first
         * element in the collection
         * @param  {String|undefined} newHtml
         * @return {this}
         */
        html: function(newHtml) {
            if (!newHtml) {
                return this[0].innerHtml;
            }

            Array.from(this).forEach(el => {
                el.innerHtml = newVal;
            });

            return this;
        },

        /**
         * Set the text of all elements in the current collection,
         * or, if no markup is specified, get the HTML of the first
         * element in the collection
         * @param  {String|undefined} newText
         * @return {this}
         */
        text: function(newText) {
            if (!newText) {
                return this[0].textContent;
            }

            Array.from(this).forEach(el => {
                el.textContent = newText;
            });

            return this;
        },

        /**
         * Hide all elements in the current collection
         * @return {this}
         */
        hide: function() {
            Array.from(this).forEach(element => {
                element.style.display = null;

                if (window.getComputedStyle(element).getPropertyValue(PROPERTY.DISPLAY) !== STYLE.HIDE) {
                    element.style.display = STYLE.HIDE;
                }
            });

            return this;
        },

        /**
         * Show all elements in the current collection
         * @return {this}
         */
        show: function() {
            Array.from(this).forEach(element => {
                element.style.display = null;

                if (window.getComputedStyle(element).getPropertyValue(PROPERTY.DISPLAY) === STYLE.HIDE) {
                    element.style.display = STYLE.SHOW;
                }
            });

            return this;
        },

        /**
         * Set the CSS of the elements in the current collection
         * by either specifying the CSS property and value, or
         * an object containing the style declarations
         * @param  {String|object} style
         * @param  {mixed} value
         * @return {this}
         */
        css: function(style, value) {
            const currentStyle = {};

            if (typeof style === TYPE.STRING) {

                if (!value) {
                    return this[0] && window
                            .getComputedStyle(this[0])
                            .getPropertyValue(style);
                }

                currentStyle[style] = value
            } else {
                Object.assign(currentStyle, style);
            }

            Array.from(this).forEach(element => {
                Object.assign(element.style, currentStyle);
            });

            return this;
        },

        /**
         * Fade the elements in the current collection in; optionally
         * takes the fade duration and a callback that gets executed
         * on each element after the animation finished
         * @param  {Number|undefined} duration
         * @param  {Function|undefined} callback
         * @return {this}
         */
        fadeIn: function(duration, callback) {
            Array.from(this).forEach(element => {
                fade(element, 0, 1, duration || DURATION.DEFAULT, callback);
            });

            return this;
        },

        /**
         * Fade the elements in the current collection out; optionally
         * takes the fade duration and a callback that gets executed
         * on each element after the animation finished
         * @param  {Number|undefined} duration
         * @param  {Function|undefined} callback
         * @return {this}
         */
        fadeOut: function(duration, callback) {
            Array.from(this).forEach(element => {
                fade(element, 1, 0, duration || DURATION.DEFAULT, callback);
            });

            return this;
        },

        /**
         * Bind event listeners to all elements in the current collection,
         * optionally delegated to a target element specified as 2nd argument
         * @param  {String} type
         * @param  {Function|String} target
         * @param  {Function|undefined} callback
         * @return {this}
         */
        on: function(type, target, callback) {
            const handler = callback ? function (event) {
                if (event.target.matches(target)) {
                    callback.call(this, event);
                }
            } : target;

            Array.from(this).forEach(element => {
                const events = eventMap.get(element) || eventMap.set(element, {}).get(element);

                events[type] = events[type] || [];
                events[type].push(handler);
                element.addEventListener(type, handler);
            });

            return this;
        },

        /**
         * Remove event listeners from the elements in the current
         * collection; if no handler is specified, all listeners of
         * the given type will be removed
         * @param  {String} type
         * @param  {Function|undefined} callback
         * @return {this}
         */
        off: function(type, callback) {
            Array.from(this).forEach(element => {
                const events = eventMap.get(element);
                const callbacks = events && events[type];

                if (callback) {
                    element.removeEventListener(type, callback);

                    if (callbacks) {
                        events[type] = callbacks.filter(current => current !== callback);
                    }
                } else if (callbacks) {
                    delete events[type];

                    callbacks.forEach(callback => {
                        element.removeEventListener(type, callback);
                    })
                }
            });

            return this;
        },

        /**
         * Execute a funtion on each element in the current collection
         * @param  {Function} fn
         * @return {this}
         */
        each: function(fn) {
            Array.from(this).forEach(element => {
                fn.call(element);
            });

            return this;
        }
    };

    /**
     * Create a new collection
     * @param  {String} selector
     * @param  {HTMLElement|undefined} context
     * @return {Object}
     */
    return function createCollection (selector, context) {
        const initial = typeof selector === TYPE.STRING ? (context || document).querySelectorAll(selector) : selector;
        const instance = Object.create(prototype);

        return initial ? instance.add(initial) : instance;
    }
})();