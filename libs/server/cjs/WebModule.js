"use strict";Object.defineProperty(exports,"__esModule",{value:true});Object.defineProperty(exports,"default",{enumerable:true,get:function(){return _default}});const _utils=require("@galaxar/utils");const _app=require("@galaxar/app");const _Routable=_interop_require_default(require("./Routable"));function _interop_require_default(obj){return obj&&obj.__esModule?obj:{default:obj}}class WebModule extends(0,_app.ModuleBase)((0,_Routable.default)(_app.ServiceContainer)){requireFromApp(appName,relativePath){return this.server.requireFromApp(appName,relativePath)}constructor(server,name,route,appPath,options){super(server,name,appPath,options);this.server=this.host;this.route=_utils.text.ensureStartsWith(_utils.text.dropIfEndsWith(route,"/"),"/")}}const _default=WebModule;
//# sourceMappingURL=WebModule.js.map