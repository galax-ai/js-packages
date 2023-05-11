"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    BadRequest: function() {
        return BadRequest;
    },
    NotFound: function() {
        return NotFound;
    },
    Unauthorized: function() {
        return Unauthorized;
    },
    Forbidden: function() {
        return Forbidden;
    },
    ServiceUnavailable: function() {
        return ServiceUnavailable;
    },
    ExternalServiceError: function() {
        return ExternalServiceError;
    },
    ServerError: function() {
        return ServerError;
    },
    Unauthenticated: function() {
        return Unauthenticated;
    },
    PermissionDenied: function() {
        return PermissionDenied;
    }
});
const _AppErrors = require("./AppErrors");
const _DataErrors = require("./DataErrors");
const _httpstatuscodes = /*#__PURE__*/ _interop_require_default(require("http-status-codes"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
class BadRequest extends _DataErrors.ValidationError {
    constructor(message, info){
        super(message, info);
        this.code = 'E_BAD_REQUEST';
    }
}
class NotFound extends _AppErrors.ExposableError {
    constructor(message, info){
        super(message, info, _httpstatuscodes.default.NOT_FOUND, 'E_NOT_FOUND');
    }
}
class Unauthorized extends _AppErrors.ExposableError {
    constructor(message, info){
        super(message, info, _httpstatuscodes.default.UNAUTHORIZED, 'E_UNAUTHENTICATED');
    }
}
class Forbidden extends _AppErrors.ExposableError {
    constructor(message, info){
        super(message, info, _httpstatuscodes.default.FORBIDDEN, 'E_FORBIDDEN');
    }
}
class ServiceUnavailable extends _AppErrors.GeneralError {
    constructor(message, info){
        super(message, info, _httpstatuscodes.default.SERVICE_UNAVAILABLE, 'E_UNAVAILABLE');
    }
}
class ExternalServiceError extends _AppErrors.GeneralError {
    constructor(message, info){
        super(message, info, _httpstatuscodes.default.SERVICE_UNAVAILABLE, 'E_EXTERNAL');
    }
}
class ServerError extends _AppErrors.ApplicationError {
    constructor(message, info){
        super(message, info, 'E_SERVER');
    }
}
const Unauthenticated = Unauthorized; // try use Unauthenticated instead of Unauthorized for better expressing the error in code
const PermissionDenied = Forbidden;
