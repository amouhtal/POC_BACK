"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.AccessService = void 0;
var common_1 = require("@nestjs/common");
var axios_1 = require("axios");
var crypto = require("crypto");
var AccessService = /** @class */ (function () {
    function AccessService(jwtService) {
        this.jwtService = jwtService;
        this.encryptWithAES = function (text) {
            var passphrase = '123';
            var hash = crypto.createHmac('sha256', passphrase)
                .update(text)
                .digest('hex');
            return hash;
        };
        this.decryptWithAES = function (ciphertext) {
            // const passphrase = '123';
            // const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase);
            // const originalText = bytes.toString(CryptoJS.enc.Utf8);
            // return originalText;
        };
    }
    AccessService.prototype.checkeycloackAccess = function (authorizationToken, planToCheck) {
        return __awaiter(this, void 0, void 0, function () {
            var headers, body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        headers = {
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        };
                        body = {
                            client_id: 'saas-app-demo',
                            client_secret: '12iu7uig7MhbXJfQZFCVF8683RqkBW7R',
                            token: authorizationToken
                        };
                        return [4 /*yield*/, axios_1["default"]
                                .post('http://localhost:8080/realms/saas-client-demo/protocol/openid-connect/token/introspect', body, headers)
                                .then(function (data) {
                                console.log(data.data.active &&
                                    data.data.resource_access['saas-app-demo'].roles.includes(planToCheck));
                                return (data.data.active &&
                                    data.data.resource_access !== undefined &&
                                    data.data.resource_access['saas-app-demo'].roles.includes(planToCheck));
                            })["catch"](function (err) {
                                console.log(err);
                                return false;
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AccessService = __decorate([
        (0, common_1.Injectable)()
    ], AccessService);
    return AccessService;
}());
exports.AccessService = AccessService;
