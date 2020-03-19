"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cross_fetch_1 = __importDefault(require("cross-fetch"));
// ['workspaces', 'regulations']
// ['workspaces', 'invites']
// ['workspaces', 'suppressed-users']
// ['workspaces', 'invites']
function urlArgsToString(urlArgs) {
    let keys = Object.keys(urlArgs);
    if (keys.length == 0) {
        return '';
    }
    let s = '?';
    keys.forEach(key => {
        s += '&' + key + '=' + urlArgs[key];
    });
    return s;
}
async function request(token, input) {
    let [prefix, method, id_pos, id, body, args, _nested] = input;
    let nested = _nested;
    let nested_str = '';
    let body_str = Object.keys(body).length == 0 ? undefined : JSON.stringify(body);
    while (nested != null) {
        let [nested_suffix, nested_id_pos, id, nested_nested] = nested;
        nested_str += `/${nested_suffix}${nested_id_pos == 'suc' && id ? `/${id}` : ``}`;
        nested = nested_nested;
    }
    const response = await cross_fetch_1.default(`https://platform.segmentapis.com/v1beta/${prefix}${id_pos == 'suc' && id ? `/${id}` : ``}${nested_str}${urlArgsToString(args)}`, {
        method: method,
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: body_str
    });
    let t = await response.text();
    try {
        let j = JSON.parse(t);
        // As described below, an error response is invalid JSON. However, assuming this is fixed, this condition here will be ready to pick it up!
        if (j.error) {
            console.error('Error making Segment Request');
            console.error(input);
            throw j;
        }
        else {
            return j;
        }
    }
    catch (e) {
        // Currently Segment's Config API returns an invalid JSON response for Error messages
        console.error('Error making Segment Request');
        console.error(input);
        throw t;
    }
    // response.text()
    // return await response.json() as Schema<I>
}
exports.request = request;
//# sourceMappingURL=config_request.js.map