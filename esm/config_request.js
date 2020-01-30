import fetch from 'cross-fetch';
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
export async function request(token, input) {
    let [prefix, method, id_pos, id, body, args, _nested] = input;
    let nested = _nested;
    let nested_str = '';
    let body_str = Object.keys(body).length == 0 ? undefined : JSON.stringify(body);
    while (nested != null) {
        let [nested_suffix, nested_id_pos, id, nested_nested] = nested;
        nested_str += `/${nested_suffix}${nested_id_pos == 'suc' && id ? `/${id}` : ``}`;
        nested = nested_nested;
    }
    const response = await fetch(`https://platform.segmentapis.com/v1beta/${prefix}${id_pos == 'suc' && id ? `/${id}` : ``}${nested_str}${urlArgsToString(args)}`, {
        method: method,
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: body_str
    });
    return await response.json();
}
//# sourceMappingURL=config_request.js.map