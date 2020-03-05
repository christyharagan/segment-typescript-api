import * as r from './config_request'

export function listCatalogSources(token: string, page?: r.Page): r.R<r.ListCatalogSources> {
  return r.request(token, ['catalog/sources', 'get', 'none', null, page || {}, {}, null])
}
export function getCatalogSource(token: string, id: string): r.R<r.GetCatalogSource> {
  return r.request(token, ['catalog/sources', 'get', 'suc', id, {}, {}, null])
}
export function listCatalogDestinations(token: string, page?: r.Page): r.R<r.ListCatalogDestinations> {
  return r.request(token, ['catalog/destinations', 'get', 'none', null, page || {}, {}, null])
}
export function getCatalogDestination(token: string, id: string): r.R<r.GetCatalogDestination> {
  return r.request(token, ['catalog/destinations', 'get', 'suc', id, {}, {}, null])
}

export function getWorkspace(token: string, work_id: string): r.R<r.GetWorkspace> {
  return r.request(token, ['workspaces', 'get', 'suc', work_id, {}, {}, null])
}
export function createSource(token: string, work_id: string, source: r.CreateSourceConfig): r.R<r.CreateSource> {
  return r.request(token, ['workspaces', 'post', 'suc', work_id, {
    source: {
      catalog_name: `catalog/sources/${source.catalog_name}`,
      name: `workspaces/${work_id}/sources/${source.name}`
    }
  }, {}, ['sources', 'none', null, null]])
}
export function getSource(token: string, work_id: string, src_id: string): r.R<r.GetSource> {
  return r.request(token, ['workspaces', 'get', 'suc', work_id, {}, {}, ['sources', 'suc', src_id, null]])
}
export function listSources(token: string, work_id: string): r.R<r.ListSources> {
  return r.request(token, ['workspaces', 'get', 'suc', work_id, {}, {}, ['sources', 'none', null, null]])
}
export function getSchemaConfiguration(token: string, work_id: string, src_id: string): r.R<r.GetSchemaConfiguration> {
  return r.request(token, ['workspaces', 'get', 'suc', work_id, {}, {}, ['sources', 'suc', src_id, ['schema-config', 'none', null, null]]])
}
export function updateSchemaConfiguration(token: string, work_id: string, src_id: string, schema_config: r.UpdateSchemaConfig): r.R<r.UpdateSchemaConfiguration> {
  return r.request(token, ['workspaces', 'patch', 'suc', work_id, schema_config, {}, ['sources', 'suc', src_id, ['schema-config', 'none', null, null]]])
}
export function deleteSource(token: string, work_id: string, src_id: string): r.R<r.DeleteSource> {
  return r.request(token, ['workspaces', 'del', 'suc', work_id, {}, {}, ['sources', 'suc', src_id, null]])
}
export function createDestination(token: string, work_id: string, src_id: string, config: r.DestinationConfig): r.R<r.CreateDestination> {
  return r.request(token, ['workspaces', 'post', 'suc', work_id, config, {}, ['sources', 'suc', src_id, ['destinations', 'none', null, null]]])
}
export function getDestination(token: string, work_id: string, src_id: string, dest_id: string): r.R<r.GetDestination> {
  return r.request(token, ['workspaces', 'get', 'suc', work_id, {}, {}, ['sources', 'suc', src_id, ['destinations', 'suc', dest_id, null]]])
}
export function listDestinations(token: string, work_id: string, src_id: string): r.R<r.ListDestinations> {
  return r.request(token, ['workspaces', 'get', 'suc', work_id, {}, {}, ['sources', 'suc', src_id, ['destinations', 'none', null, null]]])
}
export function updateDestination(token: string, work_id: string, src_id: string, dest_id: string, config: r.DestinationConfig): r.R<r.UpdateDestination> {
  return r.request(token, ['workspaces', 'patch', 'suc', work_id, config, {}, ['sources', 'suc', src_id, ['destinations', 'suc', dest_id, null]]])
}
export function deleteDestination(token: string, work_id: string, src_id: string, dest_id: string): r.R<r.DeleteDestination> {
  return r.request(token, ['workspaces', 'del', 'suc', work_id, {}, {}, ['sources', 'suc', src_id, ['destinations', 'suc', dest_id, null]]])
}
export function createTrackingPlan(token: string, work_id: string, config: r.TrackingPlanCreation): r.R<r.CreateTrackingPlan> {
  return r.request(token, ['workspaces', 'post', 'suc', work_id, { tracking_plan: config }, {}, ['tracking-plans', 'none', null, null]])
}
export function getTrackingPlan(token: string, work_id: string, track_id: string): r.R<r.GetTrackingPlan> {
  return r.request(token, ['workspaces', 'get', 'suc', work_id, {}, {}, ['tracking-plans', 'suc', track_id, null]])
}
export function updateTrackingPlan(token: string, work_id: string, track_id: string, config: r.TrackingPlan): r.R<r.UpdateTrackingPlan> {
  return r.request(token, ['workspaces', 'put', 'suc', work_id, config, {}, ['tracking-plans', 'suc', track_id, null]])
}
export function listTrackingPlans(token: string, work_id: string): r.R<r.ListTrackingPlans> {
  return r.request(token, ['workspaces', 'get', 'suc', work_id, {}, {}, ['tracking-plans', 'none', null, null]])
}

export function listFilters(token: string, work_id: string, src_id: string, dest_id: string): r.R<r.ListFilters> {
  return r.request(token, ['workspaces', 'get', 'suc', work_id, {}, {}, ['sources', 'suc', src_id, ['destinations', 'suc', dest_id, ['filters', 'none', null, null]]]])
}

export function getFilter(token: string, work_id: string, src_id: string, dest_id: string, filter_id: string): r.R<r.GetFilter> {
  return r.request(token, ['workspaces', 'get', 'suc', work_id, {}, {}, ['sources', 'suc', src_id, ['destinations', 'suc', dest_id, ['filters', 'suc', filter_id, null]]]])
}

export function createFilter(token: string, work_id: string, src_id: string, dest_id: string, config: r.Filter): r.R<r.CreateFilter> {
  return r.request(token, ['workspaces', 'post', 'suc', work_id, { filter: config }, {}, ['sources', 'suc', src_id, ['destinations', 'suc', dest_id, ['filters', 'none', null, null]]]])
}

export function updateFilter(token: string, work_id: string, src_id: string, dest_id: string, filter_id: string, config: r.Filter): r.R<r.UpdateFilter> {
  return r.request(token, ['workspaces', 'patch', 'suc', work_id, { filter: config }, {}, ['sources', 'suc', src_id, ['destinations', 'suc', dest_id, ['filters', 'suc', filter_id, null]]]])
}

export function deleteFilter(token: string, work_id: string, src_id: string, dest_id: string, filter_id: string): r.R<r.DeleteFilter> {
  return r.request(token, ['workspaces', 'get', 'suc', work_id, {}, {}, ['sources', 'suc', src_id, ['destinations', 'suc', dest_id, ['filters', 'suc', filter_id, null]]]])
}

export function batchTrackingPlanSourceConnection(token: string, work_id: string, track_id: string, src_ids: string[]): r.R<r.BatchTrackingPlanSourceConnection> {
  return r.request(token, ['workspaces', 'post', 'suc', work_id, { source_names: src_ids }, {}, ['tracking-plans', 'suc', track_id, ['source-connections:batchCreateConnections', 'none', null, null]]])
}
export function createTrackingPlanSourceConnection(token: string, work_id: string, track_id: string, src_id: string): r.R<r.CreateTrackingPlanSourceConnection> {
  return r.request(token, ['workspaces', 'post', 'suc', work_id, { source_name: src_id }, {}, ['tracking-plans', 'suc', track_id, ['source-connections', 'none', null, null]]])
}
export function listTrackingPlanSourceConnections(token: string, work_id: string, track_id: string): r.R<r.ListTrackingPlanSourceConnections> {
  return r.request(token, ['workspaces', 'get', 'suc', work_id, {}, {}, ['tracking-plans', 'suc', track_id, ['source-connections', 'none', null, null]]])
}
export function deleteTrackingPlanSourceConnection(token: string, work_id: string, track_id: string, src_id: string): r.R<r.DeleteTrackingPlanSourceConnection> {
  return r.request(token, ['workspaces', 'del', 'suc', work_id, { source_name: src_id }, {}, ['tracking-plans', 'suc', track_id, ['source-connections', 'suc', src_id, null]]])
}