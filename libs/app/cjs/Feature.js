"use strict";Object.defineProperty(exports,"__esModule",{value:true});function _export(target,all){for(var name in all)Object.defineProperty(target,name,{enumerable:true,get:all[name]})}_export(exports,{validate:function(){return validate},config:function(){return config},default:function(){return _default}});const _types=require("@galaxar/types");const Feature={CONF:"Config",INIT:"Initial",SERVICE:"Services",PLUGIN:"Plugins",FINAL:"Final"};const validate=featureObject=>{return featureObject&&featureObject.hasOwnProperty("stage")&&typeof featureObject.load_==="function"};const config=(app,options,typeInfo,featureName)=>{try{return _types.Types.sanitize(options,{type:"object",...typeInfo},undefined,featureName)}catch(err){throw new _types.InvalidConfiguration(err.message,app,{feature:featureName})}};const _default=Feature;
//# sourceMappingURL=Feature.js.map