import * as r from './config_request'

function get_name(id: string): string {
  return id.indexOf('/') == -1 ? id : id.substring(id.lastIndexOf('/') + 1)
}

function get_src_id(work_id: string, src_id: string): string {
  return src_id.indexOf('workspaces/') == -1 ? `workspaces/${work_id}/sources/${src_id}` : src_id
}
function get_dest_id(work_id: string, src_id: string, dest_id: string): string {
  return dest_id.indexOf('workspaces/') == -1 ? `workspaces/${work_id}/sources/${get_name(src_id)}/destinations/${dest_id}` : dest_id
}
function get_config_key(work_id: string, src_id: string, dest_id: string, config_key: string): string {
  return config_key.indexOf('workspaces/') == -1 ? `workspaces/${work_id}/sources/${get_name(src_id)}/destinations/${get_name(dest_id)}/config/${config_key}` : config_key
}

function get_catalog_name(catalog_name: string): string {
  return catalog_name.indexOf('catalog/sources/') == -1 ? `catalog/sources/${catalog_name}` : catalog_name
}

export function listCatalogSources(token: string, page?: r.Page): r.R<r.ListCatalogSources> {
  return r.request(token, ['catalog/sources', 'get', 'none', null, {}, page || {}, null])
}
export async function listAllCatalogSources(token: string): r.R<r.ListCatalogSources> {
  let page: r.Page | {} = {}
  let sources: r.Schema<r.ListCatalogSources> = {
    sources: []
  }
  while (true) {
    let result = await listCatalogSources(token, page)
    sources.sources = sources.sources.concat(result.sources)
    if (result.next_page_token) {
      page = {
        page_token: result.next_page_token
      }
    } else {
      break
    }
  }
  return sources
}

export function getCatalogSource(token: string, id: string): r.R<r.GetCatalogSource> {
  return r.request(token, ['catalog/sources', 'get', 'suc', get_name(id), {}, {}, null])
}
export function listCatalogDestinations(token: string, page?: r.Page): r.R<r.ListCatalogDestinations> {
  return r.request(token, ['catalog/destinations', 'get', 'none', null, {}, page || {}, null])
}
export async function listAllCatalogDestinations(token: string): r.R<r.ListCatalogDestinations> {
  let page: r.Page | {} = {}
  let destinations: r.Schema<r.ListCatalogDestinations> = {
    destinations: []
  }
  while (true) {
    let result = await listCatalogDestinations(token, page)
    destinations.destinations = destinations.destinations.concat(result.destinations)
    if (result.next_page_token) {
      page = {
        page_token: result.next_page_token
      }
    } else {
      break
    }
  }
  return destinations
}
export function getCatalogDestination(token: string, id: string): r.R<r.GetCatalogDestination> {
  return r.request(token, ['catalog/destinations', 'get', 'suc', get_name(id), {}, {}, null])
}

export function getWorkspace(token: string, work_id: string): r.R<r.GetWorkspace> {
  return r.request(token, ['workspaces', 'get', 'suc', work_id, {}, {}, null])
}
export function createSource(token: string, work_id: string, source: r.CreateSourceConfig): r.R<r.CreateSource> {
  return r.request(token, ['workspaces', 'post', 'suc', work_id, {
    source: {
      catalog_name: get_catalog_name(source.catalog_name),
      name: get_src_id(work_id, source.name)
    }
  }, {}, ['sources', 'none', null, null]])
}
export function getSource(token: string, work_id: string, src_id: string): r.R<r.GetSource> {
  return r.request(token, ['workspaces', 'get', 'suc', work_id, {}, {}, ['sources', 'suc', get_name(src_id), null]])
}
export function listSources(token: string, work_id: string, page?: r.Page): r.R<r.ListSources> {
  return r.request(token, ['workspaces', 'get', 'suc', work_id, {}, page || {}, ['sources', 'none', null, null]])
}
export async function listAllSources(token: string, work_id: string): r.R<r.ListSources> {
  let page: r.Page | {} = {}
  let sources: r.Schema<r.ListSources> = {
    sources: []
  }
  while (true) {
    let result = await listSources(token, work_id, page)
    sources.sources = sources.sources.concat(result.sources)
    if (result.next_page_token) {
      page = {
        page_token: result.next_page_token
      }
    } else {
      break
    }
  }
  return sources
}
export function getSchemaConfiguration(token: string, work_id: string, src_id: string): r.R<r.GetSchemaConfiguration> {
  return r.request(token, ['workspaces', 'get', 'suc', work_id, {}, {}, ['sources', 'suc', get_name(src_id), ['schema-config', 'none', null, null]]])
}
export function updateSchemaConfiguration(token: string, work_id: string, src_id: string, schema_config: r.UpdateSchemaConfig): r.R<r.UpdateSchemaConfiguration> {
  return r.request(token, ['workspaces', 'patch', 'suc', work_id, schema_config, {}, ['sources', 'suc', get_name(src_id), ['schema-config', 'none', null, null]]])
}
export function deleteSource(token: string, work_id: string, src_id: string): r.R<r.DeleteSource> {
  return r.request(token, ['workspaces', 'delete', 'suc', work_id, {}, {}, ['sources', 'suc', get_name(src_id), null]])
}
export function createDestination(token: string, work_id: string, src_id: string, config: r.DestinationConfig): r.R<r.CreateDestination> {
  let _config = { ...config }
  let dest_id = config.destination.name
  _config.destination.name = get_dest_id(work_id, src_id, dest_id)
  _config.destination.config = _config.destination.config.map(config => {
    let _config = { ...config }
    _config.name = get_config_key(work_id, src_id, dest_id, config.name)
    return _config
  })
  return r.request(token, ['workspaces', 'post', 'suc', work_id, _config, {}, ['sources', 'suc', get_name(src_id), ['destinations', 'none', null, null]]])
}
export function getDestination(token: string, work_id: string, src_id: string, dest_id: string): r.R<r.GetDestination> {
  return r.request(token, ['workspaces', 'get', 'suc', work_id, {}, {}, ['sources', 'suc', get_name(src_id), ['destinations', 'suc', get_name(dest_id), null]]])
}
export function listDestinations(token: string, work_id: string, src_id: string, page?: r.Page): r.R<r.ListDestinations> {
  return r.request(token, ['workspaces', 'get', 'suc', work_id, {}, page || {}, ['sources', 'suc', get_name(src_id), ['destinations', 'none', null, null]]])
}
export async function listAllDestinations(token: string, work_id: string, src_id: string): r.R<r.ListDestinations> {
  let page: r.Page | {} = {}
  let destinations: r.Schema<r.ListDestinations> = {
    destinations: []
  }
  while (true) {
    let result = await listDestinations(token, work_id, src_id, page)
    destinations.destinations = destinations.destinations.concat(result.destinations)
    if (result.next_page_token) {
      page = {
        page_token: result.next_page_token
      }
    } else {
      break
    }
  }
  return destinations
}
export function updateDestination(token: string, work_id: string, src_id: string, dest_id: string, config: r.DestinationConfig): r.R<r.UpdateDestination> {
  return r.request(token, ['workspaces', 'patch', 'suc', work_id, config, {}, ['sources', 'suc', get_name(src_id), ['destinations', 'suc', get_name(dest_id), null]]])
}
export function deleteDestination(token: string, work_id: string, src_id: string, dest_id: string): r.R<r.DeleteDestination> {
  return r.request(token, ['workspaces', 'delete', 'suc', work_id, {}, {}, ['sources', 'suc', get_name(src_id), ['destinations', 'suc', get_name(dest_id), null]]])
}
export function createTrackingPlan(token: string, work_id: string, config: r.TrackingPlanCreation): r.R<r.CreateTrackingPlan> {
  return r.request(token, ['workspaces', 'post', 'suc', work_id, { tracking_plan: config }, {}, ['tracking-plans', 'none', null, null]])
}
export function getTrackingPlan(token: string, work_id: string, track_id: string): r.R<r.GetTrackingPlan> {
  return r.request(token, ['workspaces', 'get', 'suc', work_id, {}, {}, ['tracking-plans', 'suc', get_name(track_id), null]])
}
export function updateTrackingPlan(token: string, work_id: string, track_id: string, config: r.UpdateTrackingPlanConfig): r.R<r.UpdateTrackingPlan> {
  return r.request(token, ['workspaces', 'put', 'suc', work_id, config, {}, ['tracking-plans', 'suc', get_name(track_id), null]])
}
export function listTrackingPlans(token: string, work_id: string, page?: r.Page): r.R<r.ListTrackingPlans> {
  return r.request(token, ['workspaces', 'get', 'suc', work_id, {}, page || {}, ['tracking-plans', 'none', null, null]])
}
export async function listAllTrackingPlans(token: string, work_id: string): r.R<r.ListTrackingPlans> {
  let page: r.Page | {} = {}
  let tracking_plans: r.Schema<r.ListTrackingPlans> = {
    tracking_plans: []
  }
  while (true) {
    let result = await listTrackingPlans(token, work_id, page)
    tracking_plans.tracking_plans = tracking_plans.tracking_plans.concat(result.tracking_plans)
    if (result.next_page_token) {
      page = {
        page_token: result.next_page_token
      }
    } else {
      break
    }
  }
  return tracking_plans
}
export function deleteTrackingPlan(token: string, work_id: string, track_id: string): r.R<r.DeleteTrackingPlan> {
  return r.request(token, ['workspaces', 'delete', 'suc', work_id, {}, {}, ['tracking-plans', 'suc', get_name(track_id), null]])
}

export function listFilters(token: string, work_id: string, src_id: string, dest_id: string, page?: r.Page): r.R<r.ListFilters> {
  return r.request(token, ['workspaces', 'get', 'suc', work_id, {}, page || {}, ['sources', 'suc', get_name(src_id), ['destinations', 'suc', get_name(dest_id), ['filters', 'none', null, null]]]])
}
export async function listAllFilters(token: string, work_id: string, src_id: string, dest_id: string): r.R<r.ListFilters> {
  let page: r.Page | {} = {}
  let filters: r.Schema<r.ListFilters> = {
    filters: []
  }
  while (true) {
    let result = await listFilters(token, work_id, src_id, dest_id, page)
    filters.filters = filters.filters.concat(result.filters)
    if (result.next_page_token) {
      page = {
        page_token: result.next_page_token
      }
    } else {
      break
    }
  }
  return filters
}

export function getFilter(token: string, work_id: string, src_id: string, dest_id: string, filter_id: string): r.R<r.GetFilter> {
  return r.request(token, ['workspaces', 'get', 'suc', work_id, {}, {}, ['sources', 'suc', get_name(src_id), ['destinations', 'suc', get_name(dest_id), ['filters', 'suc', get_name(filter_id), null]]]])
}

export function createFilter(token: string, work_id: string, src_id: string, dest_id: string, config: r.Filter): r.R<r.CreateFilter> {
  return r.request(token, ['workspaces', 'post', 'suc', work_id, { filter: config }, {}, ['sources', 'suc', get_name(src_id), ['destinations', 'suc', get_name(dest_id), ['filters', 'none', null, null]]]])
}

export function updateFilter(token: string, work_id: string, src_id: string, dest_id: string, filter_id: string, config: r.FilterUpdate): r.R<r.UpdateFilter> {
  return r.request(token, ['workspaces', 'patch', 'suc', work_id, config, {}, ['sources', 'suc', get_name(src_id), ['destinations', 'suc', get_name(dest_id), ['filters', 'suc', get_name(filter_id), null]]]])
}

export function deleteFilter(token: string, work_id: string, src_id: string, dest_id: string, filter_id: string): r.R<r.DeleteFilter> {
  return r.request(token, ['workspaces', 'get', 'suc', work_id, {}, {}, ['sources', 'suc', get_name(src_id), ['destinations', 'suc', get_name(dest_id), ['filters', 'suc', get_name(filter_id), null]]]])
}

export function batchTrackingPlanSourceConnection(token: string, work_id: string, track_id: string, src_ids: string[]): r.R<r.BatchTrackingPlanSourceConnection> {
  return r.request(token, ['workspaces', 'post', 'suc', work_id, { source_names: src_ids.map(src_id => get_src_id(work_id, src_id)) }, {}, ['tracking-plans', 'suc', get_name(track_id), ['source-connections:batchCreateConnections', 'none', null, null]]])
}
export function createTrackingPlanSourceConnection(token: string, work_id: string, track_id: string, src_id: string): r.R<r.CreateTrackingPlanSourceConnection> {
  return r.request(token, ['workspaces', 'post', 'suc', work_id, { source_name: get_src_id(work_id, src_id) }, {}, ['tracking-plans', 'suc', get_name(track_id), ['source-connections', 'none', null, null]]])
}
export function listTrackingPlanSourceConnections(token: string, work_id: string, track_id: string, page?: r.Page): r.R<r.ListTrackingPlanSourceConnections> {
  return r.request(token, ['workspaces', 'get', 'suc', work_id, {}, page || {}, ['tracking-plans', 'suc', get_name(track_id), ['source-connections', 'none', null, null]]])
}
export async function listAllTrackingPlanSourceConnectionss(token: string, work_id: string, track_id: string): r.R<r.ListTrackingPlanSourceConnections> {
  let page: r.Page | {} = {}
  let connections: r.Schema<r.ListTrackingPlanSourceConnections> = {
    connections: []
  }
  while (true) {
    let result = await listTrackingPlanSourceConnections(token, work_id, track_id, page)
    connections.connections = connections.connections.concat(result.connections)
    if (result.next_page_token) {
      page = {
        page_token: result.next_page_token
      }
    } else {
      break
    }
  }
  return connections
}
export function deleteTrackingPlanSourceConnection(token: string, work_id: string, track_id: string, src_id: string): r.R<r.DeleteTrackingPlanSourceConnection> {
  return r.request(token, ['workspaces', 'delete', 'suc', work_id, {}, {}, ['tracking-plans', 'suc', get_name(track_id), ['source-connections', 'suc', get_name(src_id), null]]])
}