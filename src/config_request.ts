import fetch from 'cross-fetch'
import { JSONSchema7 } from 'json-schema'

export type R<I extends Input> = Promise<Schema<I>>

export type Method = Post | Get | Delete | Patch | Put
export type Get = 'get'
export type Delete = 'del'
export type Patch = 'patch'
export type Post = 'post'
export type Put = 'put'

export type Schema<I extends Input> = I extends ListCatalogSources ? { sources: SourceCatalogModel[] } :
  I extends GetCatalogSource ? SourceCatalogModel :
  I extends ListCatalogDestinations ? { destinations: DestinationCatalogModel[] } :
  I extends GetCatalogDestination ? DestinationConfig :
  I extends GetWorkspace ? Workspace :
  I extends CreateSource ? Source :
  I extends GetSource ? Source :
  I extends ListSources ? { sources: Source[] } :
  I extends GetSchemaConfiguration ? { [key: string]: JSON } :
  I extends UpdateSchemaConfiguration ? { [key: string]: JSON } :
  I extends DeleteSource ? {} :
  I extends CreateDestination ? DestinationConfig :
  I extends GetDestination ? DestinationConfig :
  I extends ListDestinations ? { destinations: DestinationConfig[] } :
  I extends UpdateDestination ? DestinationConfig :
  I extends CreateTrackingPlan ? TrackingPlan :
  I extends GetTrackingPlan ? TrackingPlan :
  I extends ListTrackingPlans ? { tracking_plans: TrackingPlan[] } :
  I extends UpdateTrackingPlan ? TrackingPlan :
  I extends ListFilters ? { filters: Filter[] } :
  I extends GetFilter ? Filter :
  I extends CreateFilter ? Filter & {name: string} :
  I extends UpdateFilter ? { filter: Filter } :
  I extends DeleteFilter ? {} :
  never

export type SourceCatalogModel = {
  categories: string[],
  description: string,
  display_name: string,
  name: string
}

export type DestinationCatalogModel = {
  categories: string[],
  components: Component[],
  description: string,
  display_name: string,
  name: string,
  website?: string,
  type: 'STREAMING',
  status: 'PUBLIC' | 'PRIVATE',
  settings: JSON[],
  logos: { [name: string]: string }
}

export type Workspace = {
  name: string,
  display_name: string,
  id: string,
  create_time: Date
}

export type Source = {
  name: string,
  parent: string,
  catalog_name: string,
  write_keys: string[],
  library_config: { [key: string]: JSON }
  create_time: Date
  labels: { [key: string]: string }
  id: string
}

export type Component = {
  type: 'IOS' | 'ANDROID' | 'CLOUD' | 'WEB'
}

export type IDLoc = Pre | Suc | None
export type Pre = 'pre'
export type Suc = 'suc'
export type None = 'none'

export type ConnectionMode = 'UNSPECIFIED' | 'CLOUD' | 'DEVICE'

export type Page = { page_size?: number, page_token?: string };

export type Type = 'string'

export type DestinationConfig = { destination: { name: string, config: { name: string, type: Type, value?: string }[], enabled: boolean, connection_mode: ConnectionMode } }

export type TrackingPlanCreation = {
  display_name: string
  rules: {
    events?: RuleMetadata[]
    global?: JSONSchema7
    identify?: JSONSchema7
    group?: JSONSchema7
    // TODO...?
    // identify_traits: RuleMetadata[]
    // group_traits: RuleMetadata[]
  }
}

export type TrackingPlan = TrackingPlanCreation & {
  name: string
  create_time: Date
  update_time: Date
}

export interface RuleMetadata {
  name: string
  description?: string
  rules: JSONSchema7
  version?: number
}



export type CreateSourceConfig = { name: string, catalog_name: string }

export type UpdateSchemaConfig = { schema_config: {/** TODO */ }, update_mask: {/** TODO */ } }

export type Input = ListCatalogSources |
  GetCatalogSource |
  ListCatalogDestinations |
  GetCatalogDestination |
  GetWorkspace |
  CreateSource |
  GetSource |
  ListSources |
  GetSchemaConfiguration |
  UpdateSchemaConfiguration |
  DeleteSource |
  CreateDestination |
  GetDestination |
  ListDestinations |
  UpdateDestination |
  DeleteDestination |
  CreateTrackingPlan |
  GetTrackingPlan |
  UpdateTrackingPlan |
  ListTrackingPlans |
  ListFilters |
  GetFilter |
  CreateFilter |
  UpdateFilter |
  DeleteFilter

export type NestedInput = null | [string, IDLoc, string | null, NestedInput]

export type Prefix = 'catalog' | 'workspaces'
export type Suffix = 'sources' | 'destinations' | 'tracking-plans' | 'schema-config'

export type ListCatalogSources = ['catalog/sources', Get, None, null, Page, {}, null]
export type GetCatalogSource = ['catalog/sources', Get, Suc, string, {}, {}, null]

export type ListCatalogDestinations = ['catalog/destinations', Get, None, null, Page, {}, null]
export type GetCatalogDestination = ['catalog/destinations', Get, Suc, string, {}, {}, null]

export type GetWorkspace = ['workspaces', Get, Suc, string, {}, {}, null]

export type CreateSource = ['workspaces', Post, Suc, string, { source: CreateSourceConfig }, {}, ['sources', None, null, null]]
export type GetSource = ['workspaces', Get, Suc, string, {}, {}, ['sources', Suc, string, null]]
export type ListSources = ['workspaces', Get, Suc, string, Page, {}, ['sources', None, null, null]]
export type GetSchemaConfiguration = ['workspaces', Get, Suc, string, {}, {}, ['sources', Suc, string, ['schema-config', None, null, null]]]
export type UpdateSchemaConfiguration = ['workspaces', Patch, Suc, string, UpdateSchemaConfig, {}, ['sources', Suc, string, ['schema-config', None, null, null]]]
export type DeleteSource = ['workspaces', Delete, Suc, string, {}, {}, ['sources', Suc, string, null]]

export type CreateDestination = ['workspaces', Post, Suc, string, DestinationConfig, {}, ['sources', Suc, string, ['destinations', None, null, null]]]
export type GetDestination = ['workspaces', Get, Suc, string, {}, {}, ['sources', Suc, string, ['destinations', Suc, string, null]]]
export type ListDestinations = ['workspaces', Get, Suc, string, {}, {}, ['sources', Suc, string, ['destinations', None, null, null]]]
export type UpdateDestination = ['workspaces', Patch, Suc, string, DestinationConfig, {}, ['sources', Suc, string, ['destinations', Suc, string, null]]]
export type DeleteDestination = ['workspaces', Delete, Suc, string, {}, {}, ['sources', Suc, string, ['destinations', Suc, string, null]]]

export type CreateTrackingPlan = ['workspaces', Post, Suc, string, { tracking_plan: TrackingPlanCreation }, {}, ['tracking-plans', None, null, null]]
export type GetTrackingPlan = ['workspaces', Get, Suc, string, {}, {}, ['tracking-plans', Suc, string, null]]
export type ListTrackingPlans = ['workspaces', Get, Suc, string, {}, {}, ['tracking-plans', None, null, null]]
export type UpdateTrackingPlan = ['workspaces', Put, Suc, string, TrackingPlan, {}, ['tracking-plans', Suc, string, null]]

export type ListFilters = ['workspaces', Get, Suc, string, {}, {}, ['sources', Suc, string, ['destinations', Suc, string, ['filters', None, null, null]]]]
export type GetFilter = ['workspaces', Get, Suc, string, {}, {}, ['sources', Suc, string, ['destinations', Suc, string, ['filters', Suc, string, null]]]]
export type CreateFilter = ['workspaces', Post, Suc, string, { filter: Filter }, {}, ['sources', Suc, string, ['destinations', Suc, string, ['filters', None, null, null]]]]
export type UpdateFilter = ['workspaces', Patch, Suc, string, { filter: Filter }, {}, ['sources', Suc, string, ['destinations', Suc, string, ['filters', Suc, string, null]]]]
export type DeleteFilter = ['workspaces', Post, Suc, string, {}, {}, ['sources', Suc, string, ['destinations', Suc, string, ['filters', Suc, string, null]]]]

export type Filter = {
  title: string
  if: string
  actions: ({
    type: 'drop_event'
  } | {
    type: 'sample_event'
    percent: number
    path?: string
  } | {
    type: 'whitelist_fields'
    fields: { [k: string]: { field: string[] } }
  } | {
    type: 'blacklist_fields'
    fields: { [k: string]: { field: string[] } }
  })[]
  enabled: boolean
}
// ['workspaces', 'regulations']
// ['workspaces', 'invites']
// ['workspaces', 'suppressed-users']
// ['workspaces', 'invites']

function urlArgsToString(urlArgs: { [key: string]: any }) {
  let keys = Object.keys(urlArgs);
  if (keys.length == 0) {
    return ''
  }
  let s = '?'
  keys.forEach(key => {
    s += '&' + key + '=' + urlArgs[key]
  })
  return s
}

export async function request<I extends Input>(token: string, input: I): Promise<Schema<I>> {
  let [prefix, method, id_pos, id, body, args, _nested] = input;
  let nested = _nested as NestedInput;
  let nested_str = ''

  let body_str = Object.keys(body).length == 0 ? undefined : JSON.stringify(body)

  while (nested != null) {
    let [nested_suffix, nested_id_pos, id, nested_nested] = nested;
    nested_str += `/${nested_suffix}${nested_id_pos == 'suc' && id ? `/${id}` : ``}`
    nested = nested_nested
  }

  const response = await fetch(`https://platform.segmentapis.com/v1beta/${prefix}${id_pos == 'suc' && id ? `/${id}` : ``}${nested_str}${urlArgsToString(args)}`, {
    method: method,
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    body: body_str
  })
  return await response.json() as Schema<I>
}