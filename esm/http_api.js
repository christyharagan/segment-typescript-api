import * as r from './http_request';
export function identify(token, input, externalIds) {
    return r.request(token, ['identify', input], externalIds);
}
export function group(token, input, externalIds) {
    return r.request(token, ['group', input], externalIds);
}
export function track(token, input, externalIds) {
    return r.request(token, ['track', input], externalIds);
}
export function page(token, input, externalIds) {
    return r.request(token, ['page', input], externalIds);
}
export function screen(token, input, externalIds) {
    return r.request(token, ['screen', input], externalIds);
}
export function alias(token, input, externalIds) {
    return r.request(token, ['alias', input], externalIds);
}
export function batch(token, input, externalIds) {
    return r.request(token, ['batch', input], externalIds);
}
//# sourceMappingURL=http_api.js.map