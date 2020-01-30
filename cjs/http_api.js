"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
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