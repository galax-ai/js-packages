"use strict";Object.defineProperty(exports,"__esModule",{value:true});Object.defineProperty(exports,"default",{enumerable:true,get:function(){return _default}});const _template=_interop_require_default(require("lodash/template"));function _interop_require_default(obj){return obj&&obj.__esModule?obj:{default:obj}}const templateSettings={escape:false,evaluate:false,imports:false,interpolate:/{{([\s\S]+?)}}/g,variable:false};const compile=(str,settings)=>{return(0,_template.default)(str,settings??templateSettings)};const _default=compile;
//# sourceMappingURL=compile.js.map