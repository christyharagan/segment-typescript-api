"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cross_fetch_1 = __importDefault(require("cross-fetch"));
const base_64_1 = __importDefault(require("base-64"));
require("segment-typescript-definitions/common");
async function request(token, input, externalIds) {
    let [prefix, body] = input;
    if (externalIds) {
        body.options = {
            externalIds
        };
    }
    const response = await cross_fetch_1.default(`https://api.segment.io/v1/${prefix}`, {
        headers: {
            'Authorization': 'Basic ' + base_64_1.default.encode(token + ':'),
            'Method': 'post',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    await response.text();
}
exports.request = request;
//# sourceMappingURL=http_request.js.map