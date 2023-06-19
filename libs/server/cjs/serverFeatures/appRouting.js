/**
 * Enable routing web requests to a child app.
 * @module Feature_AppRouting
 *
 * @example
 *
 *  'appRouting': {
 *      '<mounting point>': {
 *          name: 'app name',
 *          npmModule: false, // whether is a npm module
 *          options: { // module options
 *          },
 *          settings: { // can override module defined settings
 *          },
 *          middlewares: { // can override middlewares
 *          }
 *      }
 *  }
 */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _nodepath = /*#__PURE__*/ _interop_require_default(require("node:path"));
const _utils = require("@galaxar/utils");
const _sys = require("@galaxar/sys");
const _types = require("@galaxar/types");
const _app = require("@galaxar/app");
const _WebModule = /*#__PURE__*/ _interop_require_default(require("../WebModule"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const _default = {
    /**
     * This feature is loaded at plugin stage.
     * @member {string}
     */ stage: _app.Feature.PLUGIN,
    /**
     * Load the feature.
     * @param {WebServer} server - The web server module object.
     * @param {object} routes - Routes and configuration.
     * @returns {Promise.<*>}
     */ load_: async (server, routes)=>(0, _utils.batchAsync_)(routes, async (config, baseRoute)=>{
            if (!config.name) {
                throw new _types.InvalidConfiguration('Missing app name.', app, `appRouting.${baseRoute}.name`);
            }
            let options = {
                env: server.env,
                logLevel: server.options.logLevel,
                traceMiddlewares: server.options.traceMiddlewares,
                ...config.options
            };
            let appPath;
            if (config.npmModule) {
                appPath = server.toAbsolutePath('node_modules', config.name);
            } else {
                appPath = _nodepath.default.join(server.appModulesPath, config.name);
            }
            let exists = await _sys.fs.pathExists(appPath) && await (0, _sys.isDir_)(appPath);
            if (!exists) {
                throw new _types.InvalidConfiguration(`App [${config.name}] not found at ${appPath}`, server, `appRouting[${baseRoute}].name`);
            }
            let app = new _WebModule.default(server, config.name, baseRoute, appPath, options);
            app.now = server.now;
            app.on('configLoaded', ()=>{
                if (!_utils._.isEmpty(config.overrides)) {
                    Object.assign(app.config, config.overrides);
                    server.log('verbose', 'App config is overrided.');
                }
                if (!_utils._.isEmpty(config.settings)) {
                    app.config.settings = Object.assign({}, app.config.settings, config.settings);
                    server.log('verbose', `App settings of [${app.name}] is overrided.`);
                }
                if (!_utils._.isEmpty(config.middlewares)) {
                    let middlewaresToAppend = app.config.middlewares;
                    app.config.middlewares = {
                        ...config.middlewares
                    };
                    _utils._.defaults(app.config.middlewares, middlewaresToAppend);
                }
            });
            let relativePath = _nodepath.default.relative(server.workingPath, appPath);
            server.log('verbose', `Loading app [${app.name}] from "${relativePath}" ...`);
            await app.start_();
            server.log('verbose', `App [${app.name}] is loaded.`);
            //delayed the app routes mounting after all plugins of the server are loaded
            server.on('before:' + _app.Feature.FINAL, ()=>{
                server.mountApp(app);
            });
        })
};

//# sourceMappingURL=appRouting.js.map