"use strict";Object.defineProperty(exports,"__esModule",{value:true});Object.defineProperty(exports,"default",{enumerable:true,get:function(){return _default}});const _nodepath=_interop_require_default(require("node:path"));const _utils=require("@galaxar/utils");const _sys=require("@galaxar/sys");const _types=require("@genx/types");const _Feature=_interop_require_default(require("../Feature"));const _LibModule=_interop_require_default(require("../LibModule"));function _interop_require_default(obj){return obj&&obj.__esModule?obj:{default:obj}}const _default={stage:_Feature.default.PLUGIN,load_:async(app,entries)=>{return(0,_utils.batchAsync_)(entries,async(config,name)=>{let options={env:app.env,logWithAppName:app.options.logWithAppName,...config.options};let appPath;if(config.npmModule){appPath=app.toAbsolutePath("node_modules",name)}else{appPath=_nodepath.default.join(app.libModulesPath,name)}let exists=await _sys.fs.pathExists(appPath)&&await (0,_sys.isDir_)(appPath);if(!exists){throw new _types.InvalidConfiguration(`Lib [${name}] not exists.`,app,`libModules.${name}`)}let lib=new _LibModule.default(app,name,appPath,options);lib.on("configLoaded",()=>{if(!_utils._.isEmpty(config.settings)){lib.config.settings={...lib.config.settings,...config.settings};app.log("verbose",`Lib settings of [${lib.name}] is overrided.`)}});let relativePath=_nodepath.default.relative(app.workingPath,appPath);app.log("verbose",`Loading lib [${lib.name}] from "${relativePath}" ...`);await lib.start_();app.registerLib(lib);app.log("verbose",`Lib [${lib.name}] is loaded.`)})}};
//# sourceMappingURL=libModules.js.map