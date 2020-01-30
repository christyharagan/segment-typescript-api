import fetch from 'cross-fetch';
import base64 from 'base-64';
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
export async function request(token, input, namespace_id, verbose) {
    let [prefix, suffix, id, args] = input;
    let id_string = id == undefined ? undefined : (typeof id == 'string') ? id : idsToString(id);
    const response = await fetch(`https://profiles.segment.com/v1/spaces/${namespace_id}/collections/${prefix}/${id_string ? `${id_string}/` : ''}${suffix}${urlArgsToString(args)}`, {
        headers: {
            'Authorization': 'Basic ' + base64.encode(token + ':'),
            'Method': 'get',
            'Content-Type': 'application/json'
        },
    });
    return await response.json();
}
//# sourceMappingURL=profile_request.js.map