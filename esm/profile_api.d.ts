import * as r from './profile_request';
export declare function listUsers<V extends boolean>(token: string, namespace_id: string, verbose?: V): r.R<r.ListUsers, V>;
export declare function usersTraits<V extends boolean>(token: string, namespace_id: string, id: r.Id, args: r.IncludeLimitArgs, verbose?: V): r.R<r.UsersTraits, V>;
export declare function usersExternalIds<V extends boolean>(token: string, namespace_id: string, id: r.Id, args: r.IncludeLimitArgs, verbose?: V): r.R<r.UsersExternalIds, V>;
export declare function usersMetadata<V extends boolean>(token: string, namespace_id: string, id: r.Id, args: r.IncludeLimitArgs, verbose?: V): r.R<r.UsersMetadata, V>;
export declare function usersEvents<V extends boolean>(token: string, namespace_id: string, id: r.Id, args: r.IncludeLimitArgs, verbose?: V): r.R<r.UsersEvents, V>;
export declare function usersLinks<V extends boolean>(token: string, namespace_id: string, id: r.Id, args: r.IncludeLimitArgs, verbose?: V): r.R<r.UsersLinks, V>;
