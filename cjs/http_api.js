"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.batch = exports.alias = exports.screen = exports.page = exports.track = exports.group = exports.identify = void 0;
const r = __importStar(require("./http_request"));
function identify(token, input, externalIds) {
    return r.request(token, ['identify', input], externalIds);
}
exports.identify = identify;
function group(token, input, externalIds) {
    return r.request(token, ['group', input], externalIds);
}
exports.group = group;
function track(token, input, externalIds) {
    return r.request(token, ['track', input], externalIds);
}
exports.track = track;
function page(token, input, externalIds) {
    return r.request(token, ['page', input], externalIds);
}
exports.page = page;
function screen(token, input, externalIds) {
    return r.request(token, ['screen', input], externalIds);
}
exports.screen = screen;
function alias(token, input, externalIds) {
    return r.request(token, ['alias', input], externalIds);
}
exports.alias = alias;
function batch(token, input, externalIds) {
    return r.request(token, ['batch', input], externalIds);
}
exports.batch = batch;
//# sourceMappingURL=http_api.js.map