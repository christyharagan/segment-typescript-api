import * as r from './profile_request'

export function listUsers<V extends boolean>(token: string, namespace_id: string, verbose: V = false as V):r.R<r.ListUsers, V> {
  return r.request(token, ['users', 'profiles', undefined, {}], namespace_id, verbose)
}

export function usersTraits<V extends boolean>(token: string, namespace_id: string, id: r.Id, args: r.IncludeLimitArgs, verbose: V = false as V):r.R<r.UsersTraits, V> {
  return r.request(token, ['users/profiles', 'traits', id, args], namespace_id, verbose)
}

export function usersExternalIds<V extends boolean>(token: string, namespace_id: string, id: r.Id, args: r.IncludeLimitArgs, verbose: V = false as V):r.R<r.UsersExternalIds, V> {
  return r.request(token, ['users/profiles', 'external_ids', id, args], namespace_id, verbose)
}

export function usersMetadata<V extends boolean>(token: string, namespace_id: string, id: r.Id, args: r.IncludeLimitArgs, verbose: V = false as V):r.R<r.UsersMetadata, V> {
  return r.request(token, ['users/profiles', 'metadata', id, args], namespace_id, verbose)
}

export function usersEvents<V extends boolean>(token: string, namespace_id: string, id: r.Id, args: r.IncludeLimitArgs, verbose: V = false as V):r.R<r.UsersEvents, V> {
  return r.request(token, ['users/profiles', 'events', id, args], namespace_id, verbose)
}

export function usersLinks<V extends boolean>(token: string, namespace_id: string, id: r.Id, args: r.IncludeLimitArgs, verbose: V = false as V):r.R<r.UsersLinks, V> {
  return r.request(token, ['users/profiles', 'links', id, args], namespace_id, verbose)
}