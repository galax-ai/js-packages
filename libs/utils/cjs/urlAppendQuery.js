"use strict";Object.defineProperty(exports,"__esModule",{value:true});Object.defineProperty(exports,"default",{enumerable:true,get:function(){return _default}});const _urlObjectToQueryString=_interop_require_default(require("./urlObjectToQueryString"));const _urlQueryStringToObject=_interop_require_default(require("./urlQueryStringToObject"));function _interop_require_default(obj){return obj&&obj.__esModule?obj:{default:obj}}function appendQuery(url,query){if(!query){return url}const posQM=url.indexOf("?");if(posQM===-1){if(typeof query!=="string"){query=(0,_urlObjectToQueryString.default)(query)}return query?url+"?"+query:url}const[base,qs]=url.split("?",2);const previousObj=(0,_urlQueryStringToObject.default)(qs);const newObj=typeof query==="string"?(0,_urlQueryStringToObject.default)(query):query;const newQs=(0,_urlObjectToQueryString.default)({...previousObj,...newObj});return newQs?base+"?"+newQs:url}const _default=appendQuery;
//# sourceMappingURL=urlAppendQuery.js.map