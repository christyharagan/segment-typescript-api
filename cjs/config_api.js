"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const r = __importStar(require("./config_request"));
function listCatalogSources(token, page) {
    return r.request(token, ['catalog/sources', 'get', 'none', null, page || {}, {}, null]);
}
exports.listCatalogSources = listCatalogSources;
function getCatalogSource(token, id) {
    return r.request(token, ['catalog/sources', 'get', 'suc', id, {}, {}, null]);
}
exports.getCatalogSource = getCatalogSource;
function listCatalogDestinations(token, page) {
    return r.request(token, ['catalog/destinations', 'get', 'none', null, page || {}, {}, null]);
}
exports.listCatalogDestinations = listCatalogDestinations;
function getCatalogDestination(token, id) {
    return r.request(token, ['catalog/destinations', 'get', 'suc', id, {}, {}, null]);
}
exports.getCatalogDestination = getCatalogDestination;
function getWorkspace(token, work_id) {
    return r.request(token, ['workspaces', 'get', 'suc', work_id, {}, {}, null]);
}
exports.getWorkspace = getWorkspace;
function createSource(token, work_id, source) {
    return r.request(token, ['workspaces', 'post', 'suc', work_id, {
            source: {
                catalog_name: `catalog/sources/${source.catalog_name}`,
                name: `workspaces/${work_id}/sources/${source.name}`
            }
        }, {}, ['sources', 'none', null, null]]);
}
exports.createSource = createSource;
function getSource(token, work_id, src_id) {
    return r.request(token, ['workspaces', 'get', 'suc', work_id, {}, {}, ['sources', 'suc', src_id, null]]);
}
exports.getSource = getSource;
function listSources(token, work_id) {
    return r.request(token, ['workspaces', 'get', 'suc', work_id, {}, {}, ['sources', 'none', null, null]]);
}
exports.listSources = listSources;
function getSchemaConfiguration(token, work_id, src_id) {
    return r.request(token, ['workspaces', 'get', 'suc', work_id, {}, {}, ['sources', 'suc', src_id, ['schema-config', 'none', null, null]]]);
}
exports.getSchemaConfiguration = getSchemaConfiguration;
function updateSchemaConfiguration(token, work_id, src_id, schema_config) {
    return r.request(token, ['workspaces', 'patch', 'suc', work_id, schema_config, {}, ['sources', 'suc', src_id, ['schema-config', 'none', null, null]]]);
}
exports.updateSchemaConfiguration = updateSchemaConfiguration;
function deleteSource(token, work_id, src_id) {
    return r.request(token, ['workspaces', 'del', 'suc', work_id, {}, {}, ['sources', 'suc', src_id, null]]);
}
exports.deleteSource = deleteSource;
function createDestination(token, work_id, src_id, config) {
    return r.request(token, ['workspaces', 'post', 'suc', work_id, config, {}, ['sources', 'suc', src_id, ['destinations', 'none', null, null]]]);
}
exports.createDestination = createDestination;
function getDestination(token, work_id, src_id, dest_id) {
    return r.request(token, ['workspaces', 'get', 'suc', work_id, {}, {}, ['sources', 'suc', src_id, ['destinations', 'suc', dest_id, null]]]);
}
exports.getDestination = getDestination;
function listDestinations(token, work_id, src_id) {
    return r.request(token, ['workspaces', 'get', 'suc', work_id, {}, {}, ['sources', 'suc', src_id, ['destinations', 'none', null, null]]]);
}
exports.listDestinations = listDestinations;
function updateDestination(token, work_id, src_id, dest_id, config) {
    return r.request(token, ['workspaces', 'patch', 'suc', work_id, config, {}, ['sources', 'suc', src_id, ['destinations', 'suc', dest_id, null]]]);
}
exports.updateDestination = updateDestination;
function deleteDestination(token, work_id, src_id, dest_id) {
    return r.request(token, ['workspaces', 'del', 'suc', work_id, {}, {}, ['sources', 'suc', src_id, ['destinations', 'suc', dest_id, null]]]);
}
exports.deleteDestination = deleteDestination;
function createTrackingPlan(token, work_id, config) {
    return r.request(token, ['workspaces', 'post', 'suc', work_id, { tracking_plan: config }, {}, ['tracking-plans', 'none', null, null]]);
}
exports.createTrackingPlan = createTrackingPlan;
function getTrackingPlan(token, work_id, track_id) {
    return r.request(token, ['workspaces', 'get', 'suc', work_id, {}, {}, ['tracking-plans', 'suc', track_id, null]]);
}
exports.getTrackingPlan = getTrackingPlan;
function updateTrackingPlan(token, work_id, track_id, config) {
    return r.request(token, ['workspaces', 'put', 'suc', work_id, config, {}, ['tracking-plans', 'suc', track_id, null]]);
}
exports.updateTrackingPlan = updateTrackingPlan;
function listTrackingPlans(token, work_id) {
    return r.request(token, ['workspaces', 'get', 'suc', work_id, {}, {}, ['tracking-plans', 'none', null, null]]);
}
exports.listTrackingPlans = listTrackingPlans;
function listFilters(token, work_id, src_id, dest_id) {
    return r.request(token, ['workspaces', 'get', 'suc', work_id, {}, {}, ['sources', 'suc', src_id, ['destinations', 'suc', dest_id, ['filters', 'none', null, null]]]]);
}
exports.listFilters = listFilters;
function getFilter(token, work_id, src_id, dest_id, filter_id) {
    return r.request(token, ['workspaces', 'get', 'suc', work_id, {}, {}, ['sources', 'suc', src_id, ['destinations', 'suc', dest_id, ['filters', 'suc', filter_id, null]]]]);
}
exports.getFilter = getFilter;
function createFilter(token, work_id, src_id, dest_id, config) {
    return r.request(token, ['workspaces', 'post', 'suc', work_id, { filter: config }, {}, ['sources', 'suc', src_id, ['destinations', 'suc', dest_id, ['filters', 'none', null, null]]]]);
}
exports.createFilter = createFilter;
function updateFilter(token, work_id, src_id, dest_id, filter_id, config) {
    return r.request(token, ['workspaces', 'patch', 'suc', work_id, { filter: config }, {}, ['sources', 'suc', src_id, ['destinations', 'suc', dest_id, ['filters', 'suc', filter_id, null]]]]);
}
exports.updateFilter = updateFilter;
function deleteFilter(token, work_id, src_id, dest_id, filter_id) {
    return r.request(token, ['workspaces', 'get', 'suc', work_id, {}, {}, ['sources', 'suc', src_id, ['destinations', 'suc', dest_id, ['filters', 'suc', filter_id, null]]]]);
}
exports.deleteFilter = deleteFilter;
function batchTrackingPlanSourceConnection(token, work_id, track_id, src_ids) {
    return r.request(token, ['workspaces', 'post', 'suc', work_id, { source_names: src_ids }, {}, ['tracking-plans', 'suc', track_id, ['source-connections:batchCreateConnections', 'none', null, null]]]);
}
exports.batchTrackingPlanSourceConnection = batchTrackingPlanSourceConnection;
function createTrackingPlanSourceConnection(token, work_id, track_id, src_id) {
    return r.request(token, ['workspaces', 'post', 'suc', work_id, { source_name: src_id }, {}, ['tracking-plans', 'suc', track_id, ['source-connections', 'none', null, null]]]);
}
exports.createTrackingPlanSourceConnection = createTrackingPlanSourceConnection;
function listTrackingPlanSourceConnections(token, work_id, track_id) {
    return r.request(token, ['workspaces', 'get', 'suc', work_id, {}, {}, ['tracking-plans', 'suc', track_id, ['source-connections', 'none', null, null]]]);
}
exports.listTrackingPlanSourceConnections = listTrackingPlanSourceConnections;
function deleteTrackingPlanSourceConnection(token, work_id, track_id, src_id) {
    return r.request(token, ['workspaces', 'del', 'suc', work_id, { source_name: src_id }, {}, ['tracking-plans', 'suc', track_id, ['source-connections', 'suc', src_id, null]]]);
}
exports.deleteTrackingPlanSourceConnection = deleteTrackingPlanSourceConnection;
//# sourceMappingURL=config_api.js.map