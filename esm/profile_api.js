import * as r from './profile_request';
export function listUsers(token, namespace_id, verbose = false) {
    return r.request(token, ['users', 'profiles', undefined, {}], namespace_id, verbose);
}
export function usersTraits(token, namespace_id, id, args, verbose = false) {
    return r.request(token, ['users/profiles', 'traits', id, args], namespace_id, verbose);
}
export function usersExternalIds(token, namespace_id, id, args, verbose = false) {
    return r.request(token, ['users/profiles', 'external_ids', id, args], namespace_id, verbose);
}
export function usersMetadata(token, namespace_id, id, args, verbose = false) {
    return r.request(token, ['users/profiles', 'metadata', id, args], namespace_id, verbose);
}
export function usersEvents(token, namespace_id, id, args, verbose = false) {
    return r.request(token, ['users/profiles', 'events', id, args], namespace_id, verbose);
}
export function usersLinks(token, namespace_id, id, args, verbose = false) {
    return r.request(token, ['users/profiles', 'links', id, args], namespace_id, verbose);
}
//# sourceMappingURL=profile_api.js.map