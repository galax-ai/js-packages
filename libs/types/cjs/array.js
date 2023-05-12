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
const _errors = require("./errors");
const _types = require("./types");
const _csvLineParse = /*#__PURE__*/ _interop_require_default(require("@galaxar/utils/csvLineParse"));
const _arrayToCsv = /*#__PURE__*/ _interop_require_default(require("@galaxar/utils/arrayToCsv"));
const _padding = require("@galaxar/utils/padding");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const T_ARRAY = {
    name: "array",
    alias: [
        "list"
    ],
    defaultValue: [],
    validate: (value)=>Array.isArray(value),
    sanitize: (value, meta, i18n, path)=>{
        const [isDone, sanitized] = (0, _types.beginSanitize)(value, meta, i18n, path);
        if (isDone) return sanitized;
        const raw = value;
        if (typeof value === "string") {
            if (meta.csv) {
                value = (0, _csvLineParse.default)(value, {
                    delimiter: meta.delimiter || ","
                });
            } else {
                const trimmed = value.trim();
                if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
                    value = JSON.parse(trimmed);
                }
            }
        }
        if (Array.isArray(value)) {
            if (meta.elementSchema) {
                const schema = typeof meta.elementSchema === "function" ? meta.elementSchema() : meta.elementSchema;
                return value.map((a, i)=>_types.Types.sanitize(a, schema, i18n, (0, _padding.padLeft)(`[${i}]`, path)));
            }
            return value;
        }
        throw new _errors.ValidationError("Invalid array value.", {
            value: raw,
            meta,
            i18n,
            path
        });
    },
    serialize: (value, typeInfo)=>value == null ? null : typeInfo?.csv ? (0, _arrayToCsv.default)(value, typeInfo?.delimiter, (0, _types.getStringifier)()) : (0, _types.safeJsonStringify)(value)
};
const _default = T_ARRAY;
