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
const _nodehttp = /*#__PURE__*/ _interop_require_default(require("node:http"));
const _koa = /*#__PURE__*/ _interop_require_default(require("koa"));
const _koamount = /*#__PURE__*/ _interop_require_default(require("koa-mount"));
const _utils = require("@galaxar/utils");
const _types = require("@galaxar/types");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
class KoaEngine {
    _initialize(options) {
        const koa = this.engine;
        const server = this.server;
        koa.proxy = options.trustProxy && (0, _utils.toBoolean)(options.trustProxy);
        if (options.subdomainOffset != null) {
            if (options.subdomainOffset < 2) {
                throw new _types.InvalidConfiguration('Invalid subdomainOffset. Should be larger or equal to 2.', this.server, 'koa.subdomainOffset');
            }
            koa.subdomainOffset = options.subdomainOffset;
        }
        if (options.keys) {
            koa.keys = _utils._.castArray(options.keys);
        }
        koa.on('error', (err, ctx)=>{
            const info = {
                err,
                app: ctx.appModule.name
            };
            if (err.status && err.status < 500) {
                if (ctx.log) {
                    ctx.log.warn(info);
                } else {
                    ctx.appModule.log('warn', 'REQUEST ERROR', info);
                }
                return;
            }
            if (ctx.log) {
                ctx.log.error(info);
            } else {
                ctx.appModule.log('error', 'SERVER ERROR', info);
            }
        });
        server.httpServer = _nodehttp.default.createServer(koa.callback());
        let port = options.httpPort || 2331;
        server.on('ready', ()=>{
            server.httpServer.listen(port, function(err) {
                if (err) throw err;
                let address = server.httpServer.address();
                let host;
                if (address.family === 'IPv6' && address.address === '::') {
                    host = '127.0.0.1';
                } else {
                    host = address.address;
                }
                server.host = `${host}:${address.port}`;
                server.port = address.port;
                server.log('info', `A http service is listening on port [${address.port}] ...`);
                /**
                 * Http server ready event
                 * @event WebServer#httpReady
                 */ server.emit_('httpReady', server);
            });
        });
    }
    use(middleware) {
        this.engine.use(middleware);
    }
    mount(route, subEngine) {
        this.engine.use((0, _koamount.default)(route, subEngine.engine));
    }
    middleware(fn) {
        return fn;
    }
    constructor(server){
        this.server = server;
        this.engine = new _koa.default();
        if (this.server.runnable) {
            this.server.on('configFinalized', (config)=>{
                const koaConfig = config.koa;
                this._initialize({
                    ...koaConfig
                });
                delete config.koa;
            });
        }
    }
}
const _default = KoaEngine;

//# sourceMappingURL=koa.js.map