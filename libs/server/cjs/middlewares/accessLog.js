"use strict";Object.defineProperty(exports,"__esModule",{value:true});const _types=require("@galaxar/types");const _Helpers=require("../helpers/Helpers");const _httpstatuscodes=_interop_require_default(require("http-status-codes"));function _interop_require_default(obj){return obj&&obj.__esModule?obj:{default:obj}}module.exports=(opt,app)=>{app.requireFeatures(["timezone","loggers"],app,"accessLog");if(!opt.logger){throw new _types.InvalidConfiguration("Missing logger id.",app,"middlewares.accessLog.logger")}let logger=app.getService("logger."+opt.logger);if(!logger){throw new _types.InvalidConfiguration("Logger not found. Id: "+opt.logger,app,"middlewares.accessLog.logger")}return async(ctx,next)=>{let startAt=app.now();await next();let info={ip:ctx.ip,method:ctx.method,url:ctx.url,originalUrl:ctx.originalUrl,httpVersion:ctx.req.httpVersion,protocol:ctx.protocol.toUpperCase(),status:ctx.status,size:ctx.length||"-",referer:ctx.header["referer"]||"-",userAgent:ctx.header["user-agent"]||"-",isoTimestamp:startAt.toISO(),duration:app.now().diff(startAt).milliseconds};let level="info";if(ctx.status>=500){level="error"}else if(ctx.status>=400){level="warn"}logger.log(level,_httpstatuscodes.default.getStatusText(ctx.status),info)}};
//# sourceMappingURL=accessLog.js.map