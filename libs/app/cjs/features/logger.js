"use strict";Object.defineProperty(exports,"__esModule",{value:true});Object.defineProperty(exports,"default",{enumerable:true,get:function(){return _default}});const _Feature=_interop_require_default(require("../Feature"));const _utils=require("@galaxar/utils");function _interop_require_default(obj){return obj&&obj.__esModule?obj:{default:obj}}const _default={stage:_Feature.default.SERVICE,groupable:true,load_:function(app,config,name){const pino=app.tryRequire("pino");config=app.featureConfig(config,{schema:{transport:{type:"object",optional:true}}},name);const options={nestedKey:"payload",transport:{target:"pino-pretty",options:{colorize:true}},...config};const names=name.split("-",2);let isAppLogger=true;if(names.length>1){options.name=names[1];isAppLogger=false}const logger=pino({level:app.options.logLevel==="verbose"?"debug":app.options.logLevel,...options});if(isAppLogger){logger.verbose=logger.debug.bind(logger);if(app._logCache.length>0){app._logCache.forEach(([level,message,obj])=>logger[level](obj,message))}app.logger=logger;app.log=(level,message,info)=>{logger[level](info,message);return this}}app.registerService(name,logger)}};
//# sourceMappingURL=logger.js.map