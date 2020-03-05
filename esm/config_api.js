import * as r from './config_request';
export function listCatalogSources(token, page) {
    return r.request(token, ['catalog/sources', 'get', 'none', null, page || {}, {}, null]);
}
export function getCatalogSource(token, id) {
    return r.request(token, ['catalog/sources', 'get', 'suc', id, {}, {}, null]);
}
export function listCatalogDestinations(token, page) {
    return r.request(token, ['catalog/destinations', 'get', 'none', null, page || {}, {}, null]);
}
export function getCatalogDestination(token, id) {
    return r.request(token, ['catalog/destinations', 'get', 'suc', id, {}, {}, null]);
}
export function getWorkspace(token, work_id) {
    return r.request(token, ['workspaces', 'get', 'suc', work_id, {}, {}, null]);
}
export function createSource(token, work_id, source) {
    return r.request(token, ['workspaces', 'post', 'suc', work_id, {
            source: {
                catalog_name: `catalog/sources/${source.catalog_name}`,
                name: `workspaces/${work_id}/sources/${source.name}`
            }
        }, {}, ['sources', 'none', null, null]]);
}
export function getSource(token, work_id, src_id) {
    return r.request(token, ['workspaces', 'get', 'suc', work_id, {}, {}, ['sources', 'suc', src_id, null]]);
}
export function listSources(token, work_id) {
    return r.request(token, ['workspaces', 'get', 'suc', work_id, {}, {}, ['sources', 'none', null, null]]);
}
export function getSchemaConfiguration(token, work_id, src_id) {
    return r.request(token, ['workspaces', 'get', 'suc', work_id, {}, {}, ['sources', 'suc', src_id, ['schema-config', 'none', null, null]]]);
}
export function updateSchemaConfiguration(token, work_id, src_id, schema_config) {
    return r.request(token, ['workspaces', 'patch', 'suc', work_id, schema_config, {}, ['sources', 'suc', src_id, ['schema-config', 'none', null, null]]]);
}
export function deleteSource(token, work_id, src_id) {
    return r.request(token, ['workspaces', 'del', 'suc', work_id, {}, {}, ['sources', 'suc', src_id, null]]);
}
export function createDestination(token, work_id, src_id, config) {
    return r.request(token, ['workspaces', 'post', 'suc', work_id, config, {}, ['sources', 'suc', src_id, ['destinations', 'none', null, null]]]);
}
export function getDestination(token, work_id, src_id, dest_id) {
    return r.request(token, ['workspaces', 'get', 'suc', work_id, {}, {}, ['sources', 'suc', src_id, ['destinations', 'suc', dest_id, null]]]);
}
export function listDestinations(token, work_id, src_id) {
    return r.request(token, ['workspaces', 'get', 'suc', work_id, {}, {}, ['sources', 'suc', src_id, ['destinations', 'none', null, null]]]);
}
export function updateDestination(token, work_id, src_id, dest_id, config) {
    return r.request(token, ['workspaces', 'patch', 'suc', work_id, config, {}, ['sources', 'suc', src_id, ['destinations', 'suc', dest_id, null]]]);
}
export function deleteDestination(token, work_id, src_id, dest_id) {
    return r.request(token, ['workspaces', 'del', 'suc', work_id, {}, {}, ['sources', 'suc', src_id, ['destinations', 'suc', dest_id, null]]]);
}
export function createTrackingPlan(token, work_id, config) {
    return r.request(token, ['workspaces', 'post', 'suc', work_id, { tracking_plan: config }, {}, ['tracking-plans', 'none', null, null]]);
}
export function getTrackingPlan(token, work_id, track_id) {
    return r.request(token, ['workspaces', 'get', 'suc', work_id, {}, {}, ['tracking-plans', 'suc', track_id, null]]);
}
export function updateTrackingPlan(token, work_id, track_id, config) {
    return r.request(token, ['workspaces', 'put', 'suc', work_id, config, {}, ['tracking-plans', 'suc', track_id, null]]);
}
export function listTrackingPlans(token, work_id) {
    return r.request(token, ['workspaces', 'get', 'suc', work_id, {}, {}, ['tracking-plans', 'none', null, null]]);
}
export function listFilters(token, work_id, src_id, dest_id) {
    return r.request(token, ['workspaces', 'get', 'suc', work_id, {}, {}, ['sources', 'suc', src_id, ['destinations', 'suc', dest_id, ['filters', 'none', null, null]]]]);
}
export function getFilter(token, work_id, src_id, dest_id, filter_id) {
    return r.request(token, ['workspaces', 'get', 'suc', work_id, {}, {}, ['sources', 'suc', src_id, ['destinations', 'suc', dest_id, ['filters', 'suc', filter_id, null]]]]);
}
export function createFilter(token, work_id, src_id, dest_id, config) {
    return r.request(token, ['workspaces', 'post', 'suc', work_id, { filter: config }, {}, ['sources', 'suc', src_id, ['destinations', 'suc', dest_id, ['filters', 'none', null, null]]]]);
}
export function updateFilter(token, work_id, src_id, dest_id, filter_id, config) {
    return r.request(token, ['workspaces', 'patch', 'suc', work_id, { filter: config }, {}, ['sources', 'suc', src_id, ['destinations', 'suc', dest_id, ['filters', 'suc', filter_id, null]]]]);
}
export function deleteFilter(token, work_id, src_id, dest_id, filter_id) {
    return r.request(token, ['workspaces', 'get', 'suc', work_id, {}, {}, ['sources', 'suc', src_id, ['destinations', 'suc', dest_id, ['filters', 'suc', filter_id, null]]]]);
}
export function batchTrackingPlanSourceConnection(token, work_id, track_id, src_ids) {
    return r.request(token, ['workspaces', 'post', 'suc', work_id, { source_names: src_ids }, {}, ['tracking-plans', 'suc', track_id, ['source-connections:batchCreateConnections', 'none', null, null]]]);
}
export function createTrackingPlanSourceConnection(token, work_id, track_id, src_id) {
    return r.request(token, ['workspaces', 'post', 'suc', work_id, { source_name: src_id }, {}, ['tracking-plans', 'suc', track_id, ['source-connections', 'none', null, null]]]);
}
export function listTrackingPlanSourceConnections(token, work_id, track_id) {
    return r.request(token, ['workspaces', 'get', 'suc', work_id, {}, {}, ['tracking-plans', 'suc', track_id, ['source-connections', 'none', null, null]]]);
}
export function deleteTrackingPlanSourceConnection(token, work_id, track_id, src_id) {
    return r.request(token, ['workspaces', 'del', 'suc', work_id, { source_name: src_id }, {}, ['tracking-plans', 'suc', track_id, ['source-connections', 'suc', src_id, null]]]);
}
//# sourceMappingURL=config_api.js.map