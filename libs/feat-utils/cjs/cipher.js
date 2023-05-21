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
const _nodecrypto = /*#__PURE__*/ _interop_require_default(require("node:crypto"));
const _app = require("@galaxar/app");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const _default = {
    stage: _app.Feature.SERVICE,
    groupable: true,
    load_: async function(app, options, name) {
        options = app.featureConfig(options, {
            schema: {
                key: {
                    type: 'text'
                }
            },
            keepUnsanitized: true
        }, name);
        const { hashAlgorithm , cipherAlgorithm , key  } = {
            hashAlgorithm: 'sha256',
            cipherAlgorithm: 'aes-256-cbc',
            ...options
        };
        const service = {
            hash: (message, salt, encoding = 'hex', _hashAlgorithm)=>{
                const hash = _nodecrypto.default.createHash(_hashAlgorithm ?? hashAlgorithm);
                hash.update(message);
                hash.update(salt);
                return hash.digest(encoding);
            },
            encrypt: (message)=>{
                const buf = Buffer.alloc(16);
                _nodecrypto.default.randomFillSync(buf);
                const cipher = _nodecrypto.default.createCipheriv(cipherAlgorithm, key, buf);
                let encryptedData = cipher.update(message, 'utf-8', 'base64');
                encryptedData += cipher.final('base64');
                encryptedData += buf.toString('hex');
                return encryptedData;
            },
            decrypt: (message)=>{
                const l = message.length - 32;
                const iv = Buffer.from(message.substring(l), 'hex');
                const encrypted = message.substring(0, l);
                const decipher = _nodecrypto.default.createDecipheriv(cipherAlgorithm, key, iv);
                let decrypted = decipher.update(encrypted, 'base64', 'utf8');
                decrypted += decipher.final('utf8');
                return decrypted;
            }
        };
        app.registerService(name, service);
    }
};

//# sourceMappingURL=cipher.js.map