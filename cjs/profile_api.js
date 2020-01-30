"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const r = __importStar(require("./profile_request"));
function listUsers(token, namespace_id, verbose = false) {
    return r.request(token, ['users', 'profiles', undefined, {}], namespace_id, verbose);
}
exports.listUsers = listUsers;
function usersTraits(token, namespace_id, id, args, verbose = false) {
    return r.request(token, ['users/profiles', 'traits', id, args], namespace_id, verbose);
}
exports.usersTraits = usersTraits;
function usersExternalIds(token, namespace_id, id, args, verbose = false) {
    return r.request(token, ['users/profiles', 'external_ids', id, args], namespace_id, verbose);
}
exports.usersExternalIds = usersExternalIds;
function usersMetadata(token, namespace_id, id, args, verbose = false) {
    return r.request(token, ['users/profiles', 'metadata', id, args], namespace_id, verbose);
}
exports.usersMetadata = usersMetadata;
function usersEvents(token, namespace_id, id, args, verbose = false) {
    return r.request(token, ['users/profiles', 'events', id, args], namespace_id, verbose);
}
exports.usersEvents = usersEvents;
function usersLinks(token, namespace_id, id, args, verbose = false) {
    return r.request(token, ['users/profiles', 'links', id, args], namespace_id, verbose);
}
exports.usersLinks = usersLinks;
//# sourceMappingURL=profile_api.js.map