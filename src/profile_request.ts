import fetch from 'cross-fetch'
import base64 from 'base-64'

export type R<I extends Input, Verbose extends boolean> = Promise<Schema<I, Verbose>>

export type Id = string | { [key: string]: string }

export type Schema<I extends Input, Verbose extends boolean> =
  I extends ListUsers ? Users :
  I extends UsersExternalIds ? ExternalIds<Verbose> :
  I extends UsersMetadata ? Metadata :
  I extends UsersEvents ? Events :
  I extends UsersLinks ? Links<Verbose> :
  I extends UsersTraits ? Traits<Verbose> :
  never

export type Input = ListUsers | UsersTraits | UsersExternalIds | UsersMetadata | UsersEvents | UsersLinks

export type IncludeLimitArgs = {
  include?: string[]
  limit?: number
}
export type MetadataArgs = IncludeLimitArgs & {
  exclude?: string[]
  start?: Date
  end?: Date
  sort?: 'asc' | 'dsc'
}

export type ListUsers = ['users', 'profiles', undefined, {}]
export type UsersTraits = ['users/profiles', 'traits', Id, IncludeLimitArgs]
export type UsersExternalIds = ['users/profiles', 'external_ids', Id, IncludeLimitArgs]
export type UsersMetadata = ['users/profiles', 'metadata', Id, MetadataArgs]
export type UsersEvents = ['users/profiles', 'events', Id, {}]
export type UsersLinks = ['users/profiles', 'links', Id, {}]

export type Cursor = {
  url: string,
  has_more: boolean,
  next: string
}

export type Users = {
  cursor: Cursor
  data: {
    segment_id: string
    metadata: {
      created_at: Date
      modified_at: Date
    }
  }[]
}

export type Traits<Verbose extends boolean> = {
  cursor: Cursor
  traits: {
    [T: string]: Verbose extends true ? {
      value: string
      source_id: string
      updated_at: string
    } : string
  }
}

export type ExternalId<Verbose extends boolean, C extends 'users' | 'accounts'> = Verbose extends true ? {
  source_id: string
  collection: C
  id: string
  type: string
  created_at: Date,
  encoding: 'none',
  first_message_id: string
} : {
  collection: 'users'
  id: string
  type: string
  encoding: 'none',
}

export type Events = {
  // TODO
}

export type ExternalIds<Verbose extends boolean> = {
  cursor: Cursor
  data: ExternalId<Verbose, 'users'>[]
}

export type Metadata = {
  metadata: {
    created_at: Date,
    updated_at: Date,
    expires_at: Date | null,
    first_message_id: string,
    first_source_id: string,
    last_message_id: string,
    last_source_id: string
  }
}

export type Links<Verbose extends boolean> = {
  data: {
    to_collection: 'accounts'
    external_ids: ExternalId<Verbose, 'accounts'>[]
  }[]
}

function toCommaSeparatedString(v: string[]) {
  let cs = v.reduce((s, v) => `${v},${s}`)
  return cs.substr(0, cs.length - 1)
}

function urlArgsToString(urlArgs: { [key: string]: any }) {
  let keys = Object.keys(urlArgs);
  if (keys.length == 0) {
    return ''
  }
  let s = '?'
  keys.forEach(key => {
    let value = urlArgs[key]
    let value_str = Array.isArray(value) ? toCommaSeparatedString(value) : value
    s += '&' + key + '=' + value_str
  })
  return s
}

function idsToString(ids: { [key: string]: string }) {
  let idStr = Object.keys(ids).reduce((s, id) => `${id}:${ids[id]},${s}`, '')
  return idStr.substr(0, idStr.length - 1)
}

export async function request<I extends Input, Verbose extends boolean>(token: string, input: I, namespace_id: string, verbose: Verbose): Promise<Schema<I, Verbose>> {
  let [prefix, suffix, id, args] = input;

  let id_string = id == undefined ? undefined : (typeof id == 'string') ? id : idsToString(id)

  const response = await fetch(`https://profiles.segment.com/v1/spaces/${namespace_id}/collections/${prefix}/${id_string ? `${id_string}/` : ''}${suffix}${urlArgsToString(args)}`, {
    headers: {
      'Authorization': 'Basic ' + base64.encode(token + ':'),
      'Method': 'get',
      'Content-Type': 'application/json'
    },
  })
  return await response.json() as Schema<I, Verbose>
}
