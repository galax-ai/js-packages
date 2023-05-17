"use strict";Object.defineProperty(exports,"__esModule",{value:true});Object.defineProperty(exports,"default",{enumerable:true,get:function(){return _default}});const _utils=require("@galaxar/utils");const _sys=require("@galaxar/sys");const _nodepath=_interop_require_default(require("node:path"));const _types=require("@galaxar/types");function _interop_require_default(obj){return obj&&obj.__esModule?obj:{default:obj}}let favicon=(options,app)=>{if(typeof options==="string"){options={path:options}}let faviconPath=options&&options.path&&app.toAbsolutePath(options.path)||_nodepath.default.join(app.publicPath,"favicon.ico");if(!_sys.fs.existsSync(faviconPath)){throw new _types.InvalidConfiguration(`Favicon path "${faviconPath}" not exists.`,app,"middlewares.favicon")}let icon;const maxAge=options.maxAge==null?864e5:Math.min(Math.max(0,options.maxAge),31556926e3);const cacheControl=`public, max-age=${maxAge/1e3|0}`;return async(ctx,next)=>{if("/favicon.ico"!==ctx.path||"GET"!==ctx.method&&"HEAD"!==ctx.method){return next()}if(!icon){let stats=await _sys.fs.stat(faviconPath);if(stats.size>1048576){app.log("warn","favicon.ico too large.",stats);ctx.throw(_types.HttpCode.NOT_FOUND)}icon=await _sys.fs.readFile(faviconPath)}ctx.set("Cache-Control",cacheControl);ctx.type="image/x-icon";ctx.body=icon}};const _default=favicon;
//# sourceMappingURL=favicon.js.map