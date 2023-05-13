"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _functions = require("./functions");
const _errors = require("./errors");
const _types = require("./types");
const _default = {
    name: 'text',
    alias: [
        'string'
    ],
    defaultValue: '',
    validate: (value)=>typeof value === 'string',
    sanitize: (value, meta, i18n, path)=>{
        const isString = typeof value === 'string';
        if (isString && meta.trim) {
            value = value.trim();
        }
        if (value === '' && meta.nonEmpty) {
            value = null;
        }
        const [isDone, sanitized] = (0, _types.beginSanitize)(value, meta, i18n, path);
        if (isDone) return sanitized;
        if (!isString) {
            throw new _errors.ValidationError('Invalid text value.', {
                value,
                meta,
                i18n,
                path
            });
        }
        return value;
    },
    serialize: _functions.identity
};

//# sourceMappingURL=text.js.map