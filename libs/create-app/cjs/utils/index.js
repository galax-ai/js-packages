"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    appNameToFileName: function() {
        return _appNameToFileName.default;
    },
    copyFileFromTemplate: function() {
        return _createFileFromTemplate_.default;
    },
    deleteLines: function() {
        return _deleteLines_.default;
    },
    download: function() {
        return _download_.default;
    },
    exitWithError: function() {
        return _exitWithError.default;
    },
    getTempPath: function() {
        return _getTempPath.default;
    },
    tryDo: function() {
        return _tryDo_.default;
    }
});
const _appNameToFileName = /*#__PURE__*/ _interop_require_default(require("./appNameToFileName"));
const _createFileFromTemplate_ = /*#__PURE__*/ _interop_require_default(require("./createFileFromTemplate_"));
const _deleteLines_ = /*#__PURE__*/ _interop_require_default(require("./deleteLines_"));
const _download_ = /*#__PURE__*/ _interop_require_default(require("./download_"));
const _exitWithError = /*#__PURE__*/ _interop_require_default(require("./exitWithError"));
const _getTempPath = /*#__PURE__*/ _interop_require_default(require("./getTempPath"));
const _tryDo_ = /*#__PURE__*/ _interop_require_default(require("./tryDo_"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}

//# sourceMappingURL=index.js.map