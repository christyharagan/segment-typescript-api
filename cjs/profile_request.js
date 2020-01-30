"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cross_fetch_1 = __importDefault(require("cross-fetch"));
const base_64_1 = __importDefault(require("base-64"));
function toCommaSeparatedString(v) {
    let cs = v.reduce((s, v) => `${v},${s}`);
    return cs.substr(0, cs.length - 1);
}
function urlArgsToString(urlArgs) {
    let keys = Object.keys(urlArgs);
    if (keys.length == 0) {
        return '';
    }
    let s = '?';
    keys.forEach(key => {
        let value = urlArgs[key];
        let value_str = Array.isArray(value) ? toCommaSeparatedString(value) : value;
        s += '&' + key + '=' + value_str;
    });
    return s;
}
function idsToString(ids) {
    let idStr = Object.keys(ids).reduce((s, id) => `${id}:${ids[id]},${s}`, '');
    return idStr.substr(0, idStr.length - 1);
}
async function request(token, input, namespace_id, verbose) {
    let [prefix, suffix, id, args] = input;
    let id_string = id == undefined ? undefined : (typeof id == 'string') ? id : idsToString(id);
    const response = await cross_fetch_1.default(`https://profiles.segment.com/v1/spaces/${namespace_id}/collections/${prefix}/${id_string ? `${id_string}/` : ''}${suffix}${urlArgsToString(args)}`, {
        headers: {
            'Authorization': 'Basic ' + base_64_1.default.encode(token + ':'),
            'Method': 'get',
            'Content-Type': 'application/json'
        },
    });
    return await response.json();
}
exports.request = request;
//# sourceMappingURL=profile_request.js.map