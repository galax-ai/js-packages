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
const _Feature = /*#__PURE__*/ _interop_require_default(require("../Feature"));
const _HttpClient = /*#__PURE__*/ _interop_require_default(require("../helpers/HttpClient"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const _default = {
    /**
     * This feature is loaded at init stage
     * @member {string}
     */ stage: _Feature.default.SERVICE,
    /**
     * This feature can be grouped by serviceGroup
     * @member {boolean}
     */ groupable: true,
    /**
     * Load the feature
     * @param {App} app - The cli app module object
     * @param {object} settings - Settings of rest clients
     * @returns {Promise.<*>}
     */ load_: async function(app, settings, name) {
        const adapter = app.tryRequire('@galaxar/adapters/supertest');
        let client = new _HttpClient.default(adapter(), settings);
        app.registerService(name, client);
    }
};

//# sourceMappingURL=superTest.js.map