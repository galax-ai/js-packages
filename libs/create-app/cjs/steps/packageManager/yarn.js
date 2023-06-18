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
const _runCommand_ = /*#__PURE__*/ _interop_require_default(require("../runCommand_"));
const _sys = require("@galaxar/sys");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const yarn = {
    install_: async (app, targetPath)=>{
        await (0, _runCommand_.default)(app, targetPath, 'yarn install');
    },
    version: ()=>{
        return _sys.cmd.runSync('yarn -v').trim();
    }
};
const _default = yarn;

//# sourceMappingURL=yarn.js.map