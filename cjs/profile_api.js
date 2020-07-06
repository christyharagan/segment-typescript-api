"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersLinks = exports.usersEvents = exports.usersMetadata = exports.usersExternalIds = exports.usersTraits = exports.listUsers = void 0;
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