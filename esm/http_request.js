import fetch from 'cross-fetch';
import base64 from 'base-64';
import 'segment-typescript-definitions/common';
export async function request(token, input, externalIds) {
    let [prefix, body] = input;
    if (externalIds) {
        body.options = {
            externalIds
        };
    }
    const response = await fetch(`https://api.segment.io/v1/${prefix}`, {
        headers: {
            'Authorization': 'Basic ' + base64.encode(token + ':'),
            'Method': 'post',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    await response.text();
}
//# sourceMappingURL=http_request.js.map