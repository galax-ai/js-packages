/**
 * Get the nth call file name from callstack
 * @param {integer} depth - the nth depth, 0 means the file call this function, usually depth 1 is most expected result
 * @returns {string} filename
 */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
function dbgGetCallerFile() {
    var depth = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 1;
    var originalFunc = Error.prepareStackTrace;
    var callerfile;
    try {
        var err = new Error();
        var currentfile;
        var currentDepth = 0;
        Error.prepareStackTrace = function(err, stack) {
            return stack;
        };
        currentfile = err.stack.shift().getFileName();
        while(err.stack.length){
            callerfile = err.stack.shift().getFileName();
            if (currentfile !== callerfile) {
                currentDepth++;
                currentfile = callerfile;
                if (currentDepth > depth) break;
            }
        }
    // eslint-disable-next-line no-empty
    } finally{}
    Error.prepareStackTrace = originalFunc;
    return callerfile;
}
var _default = dbgGetCallerFile;
