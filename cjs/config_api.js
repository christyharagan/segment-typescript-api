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
function get_name(id) {
    return id.indexOf('/') == -1 ? id : id.substring(id.lastIndexOf('/') + 1);
}
function get_src_id(work_id, src_id) {
    return src_id.indexOf('workspaces/') == -1 ? `workspaces/${work_id}/sources/${src_id}` : src_id;
}
function get_dest_id(work_id, src_id, dest_id) {
    return dest_id.indexOf('workspaces/') == -1 ? `workspaces/${work_id}/sources/${get_name(src_id)}/destinations/${dest_id}` : dest_id;
}
function get_config_key(work_id, src_id, dest_id, config_key) {
    return config_key.indexOf('workspaces/') == -1 ? `workspaces/${work_id}/sources/${get_name(src_id)}/destinations/${get_name(dest_id)}/config/${config_key}` : config_key;
}
function get_catalog_name(catalog_name) {
    return catalog_name.indexOf('catalog/sources/') == -1 ? `catalog/sources/${catalog_name}` : catalog_name;
}
function listCatalogSources(token, page) {
    return r.request(token, ['catalog/sources', 'get', 'none', null, {}, page || {}, null]);
}
exports.listCatalogSources = listCatalogSources;
async function listAllCatalogSources(token) {
    let page = {};
    let sources = {
        sources: []
    };
    while (true) {
        let result = await listCatalogSources(token, page);
        sources.sources = sources.sources.concat(result.sources);
        if (result.next_page_token) {
            page = {
                page_token: result.next_page_token
            };
        }
        else {
            break;
        }
    }
    return sources;
}
exports.listAllCatalogSources = listAllCatalogSources;
function getCatalogSource(token, id) {
    return r.request(token, ['catalog/sources', 'get', 'suc', get_name(id), {}, {}, null]);
}
exports.getCatalogSource = getCatalogSource;
function listCatalogDestinations(token, page) {
    return r.request(token, ['catalog/destinations', 'get', 'none', null, {}, page || {}, null]);
}
exports.listCatalogDestinations = listCatalogDestinations;
async function listAllCatalogDestinations(token) {
    let page = {};
    let destinations = {
        destinations: []
    };
    while (true) {
        let result = await listCatalogDestinations(token, page);
        destinations.destinations = destinations.destinations.concat(result.destinations);
        if (result.next_page_token) {
            page = {
                page_token: result.next_page_token
            };
        }
        else {
            break;
        }
    }
    return destinations;
}
exports.listAllCatalogDestinations = listAllCatalogDestinations;
function getCatalogDestination(token, id) {
    return r.request(token, ['catalog/destinations', 'get', 'suc', get_name(id), {}, {}, null]);
}
exports.getCatalogDestination = getCatalogDestination;
function getWorkspace(token, work_id) {
    return r.request(token, ['workspaces', 'get', 'suc', work_id, {}, {}, null]);
}
exports.getWorkspace = getWorkspace;
function createSource(token, work_id, source) {
    return r.request(token, ['workspaces', 'post', 'suc', work_id, {
            source: {
                catalog_name: get_catalog_name(source.catalog_name),
                name: get_src_id(work_id, source.name)
            }
        }, {}, ['sources', 'none', null, null]]);
}
exports.createSource = createSource;
function getSource(token, work_id, src_id) {
    return r.request(token, ['workspaces', 'get', 'suc', work_id, {}, {}, ['sources', 'suc', get_name(src_id), null]]);
}
exports.getSource = getSource;
function listSources(token, work_id, page) {
    return r.request(token, ['workspaces', 'get', 'suc', work_id, {}, page || {}, ['sources', 'none', null, null]]);
}
exports.listSources = listSources;
async function listAllSources(token, work_id) {
    let page = {};
    let sources = {
        sources: []
    };
    while (true) {
        let result = await listSources(token, work_id, page);
        sources.sources = sources.sources.concat(result.sources);
        if (result.next_page_token) {
            page = {
                page_token: result.next_page_token
            };
        }
        else {
            break;
        }
    }
    return sources;
}
exports.listAllSources = listAllSources;
function getSchemaConfiguration(token, work_id, src_id) {
    return r.request(token, ['workspaces', 'get', 'suc', work_id, {}, {}, ['sources', 'suc', get_name(src_id), ['schema-config', 'none', null, null]]]);
}
exports.getSchemaConfiguration = getSchemaConfiguration;
function updateSchemaConfiguration(token, work_id, src_id, schema_config) {
    return r.request(token, ['workspaces', 'patch', 'suc', work_id, schema_config, {}, ['sources', 'suc', get_name(src_id), ['schema-config', 'none', null, null]]]);
}
exports.updateSchemaConfiguration = updateSchemaConfiguration;
function deleteSource(token, work_id, src_id) {
    return r.request(token, ['workspaces', 'delete', 'suc', work_id, {}, {}, ['sources', 'suc', get_name(src_id), null]]);
}
exports.deleteSource = deleteSource;
function createDestination(token, work_id, src_id, config) {
    let _config = Object.assign({}, config);
    let dest_id = config.destination.name;
    _config.destination.name = get_dest_id(work_id, src_id, dest_id);
    _config.destination.config = _config.destination.config.map(config => {
        let _config = Object.assign({}, config);
        _config.name = get_config_key(work_id, src_id, dest_id, config.name);
        return _config;
    });
    return r.request(token, ['workspaces', 'post', 'suc', work_id, _config, {}, ['sources', 'suc', get_name(src_id), ['destinations', 'none', null, null]]]);
}
exports.createDestination = createDestination;
function getDestination(token, work_id, src_id, dest_id) {
    return r.request(token, ['workspaces', 'get', 'suc', work_id, {}, {}, ['sources', 'suc', get_name(src_id), ['destinations', 'suc', get_name(dest_id), null]]]);
}
exports.getDestination = getDestination;
function listDestinations(token, work_id, src_id, page) {
    return r.request(token, ['workspaces', 'get', 'suc', work_id, {}, page || {}, ['sources', 'suc', get_name(src_id), ['destinations', 'none', null, null]]]);
}
exports.listDestinations = listDestinations;
async function listAllDestinations(token, work_id, src_id) {
    let page = {};
    let destinations = {
        destinations: []
    };
    while (true) {
        let result = await listDestinations(token, work_id, src_id, page);
        destinations.destinations = destinations.destinations.concat(result.destinations);
        if (result.next_page_token) {
            page = {
                page_token: result.next_page_token
            };
        }
        else {
            break;
        }
    }
    return destinations;
}
exports.listAllDestinations = listAllDestinations;
function updateDestination(token, work_id, src_id, dest_id, config) {
    return r.request(token, ['workspaces', 'patch', 'suc', work_id, config, {}, ['sources', 'suc', get_name(src_id), ['destinations', 'suc', get_name(dest_id), null]]]);
}
exports.updateDestination = updateDestination;
function deleteDestination(token, work_id, src_id, dest_id) {
    return r.request(token, ['workspaces', 'delete', 'suc', work_id, {}, {}, ['sources', 'suc', get_name(src_id), ['destinations', 'suc', get_name(dest_id), null]]]);
}
exports.deleteDestination = deleteDestination;
function createTrackingPlan(token, work_id, config) {
    return r.request(token, ['workspaces', 'post', 'suc', work_id, { tracking_plan: config }, {}, ['tracking-plans', 'none', null, null]]);
}
exports.createTrackingPlan = createTrackingPlan;
function getTrackingPlan(token, work_id, track_id) {
    return r.request(token, ['workspaces', 'get', 'suc', work_id, {}, {}, ['tracking-plans', 'suc', get_name(track_id), null]]);
}
exports.getTrackingPlan = getTrackingPlan;
function updateTrackingPlan(token, work_id, track_id, config) {
    return r.request(token, ['workspaces', 'put', 'suc', work_id, config, {}, ['tracking-plans', 'suc', get_name(track_id), null]]);
}
exports.updateTrackingPlan = updateTrackingPlan;
function listTrackingPlans(token, work_id, page) {
    return r.request(token, ['workspaces', 'get', 'suc', work_id, {}, page || {}, ['tracking-plans', 'none', null, null]]);
}
exports.listTrackingPlans = listTrackingPlans;
async function listAllTrackingPlans(token, work_id) {
    let page = {};
    let tracking_plans = {
        tracking_plans: []
    };
    while (true) {
        let result = await listTrackingPlans(token, work_id, page);
        tracking_plans.tracking_plans = tracking_plans.tracking_plans.concat(result.tracking_plans);
        if (result.next_page_token) {
            page = {
                page_token: result.next_page_token
            };
        }
        else {
            break;
        }
    }
    return tracking_plans;
}
exports.listAllTrackingPlans = listAllTrackingPlans;
function deleteTrackingPlan(token, work_id, track_id) {
    return r.request(token, ['workspaces', 'delete', 'suc', work_id, {}, {}, ['tracking-plans', 'suc', get_name(track_id), null]]);
}
exports.deleteTrackingPlan = deleteTrackingPlan;
function listFilters(token, work_id, src_id, dest_id, page) {
    return r.request(token, ['workspaces', 'get', 'suc', work_id, {}, page || {}, ['sources', 'suc', get_name(src_id), ['destinations', 'suc', get_name(dest_id), ['filters', 'none', null, null]]]]);
}
exports.listFilters = listFilters;
async function listAllFilters(token, work_id, src_id, dest_id) {
    let page = {};
    let filters = {
        filters: []
    };
    while (true) {
        let result = await listFilters(token, work_id, src_id, dest_id, page);
        filters.filters = filters.filters.concat(result.filters);
        if (result.next_page_token) {
            page = {
                page_token: result.next_page_token
            };
        }
        else {
            break;
        }
    }
    return filters;
}
exports.listAllFilters = listAllFilters;
function getFilter(token, work_id, src_id, dest_id, filter_id) {
    return r.request(token, ['workspaces', 'get', 'suc', work_id, {}, {}, ['sources', 'suc', get_name(src_id), ['destinations', 'suc', get_name(dest_id), ['filters', 'suc', get_name(filter_id), null]]]]);
}
exports.getFilter = getFilter;
function createFilter(token, work_id, src_id, dest_id, config) {
    return r.request(token, ['workspaces', 'post', 'suc', work_id, { filter: config }, {}, ['sources', 'suc', get_name(src_id), ['destinations', 'suc', get_name(dest_id), ['filters', 'none', null, null]]]]);
}
exports.createFilter = createFilter;
function updateFilter(token, work_id, src_id, dest_id, filter_id, config) {
    return r.request(token, ['workspaces', 'patch', 'suc', work_id, config, {}, ['sources', 'suc', get_name(src_id), ['destinations', 'suc', get_name(dest_id), ['filters', 'suc', get_name(filter_id), null]]]]);
}
exports.updateFilter = updateFilter;
function deleteFilter(token, work_id, src_id, dest_id, filter_id) {
    return r.request(token, ['workspaces', 'get', 'suc', work_id, {}, {}, ['sources', 'suc', get_name(src_id), ['destinations', 'suc', get_name(dest_id), ['filters', 'suc', get_name(filter_id), null]]]]);
}
exports.deleteFilter = deleteFilter;
function batchTrackingPlanSourceConnection(token, work_id, track_id, src_ids) {
    return r.request(token, ['workspaces', 'post', 'suc', work_id, { source_names: src_ids.map(src_id => get_src_id(work_id, src_id)) }, {}, ['tracking-plans', 'suc', get_name(track_id), ['source-connections:batchCreateConnections', 'none', null, null]]]);
}
exports.batchTrackingPlanSourceConnection = batchTrackingPlanSourceConnection;
function createTrackingPlanSourceConnection(token, work_id, track_id, src_id) {
    return r.request(token, ['workspaces', 'post', 'suc', work_id, { source_name: get_src_id(work_id, src_id) }, {}, ['tracking-plans', 'suc', get_name(track_id), ['source-connections', 'none', null, null]]]);
}
exports.createTrackingPlanSourceConnection = createTrackingPlanSourceConnection;
function listTrackingPlanSourceConnections(token, work_id, track_id, page) {
    return r.request(token, ['workspaces', 'get', 'suc', work_id, {}, page || {}, ['tracking-plans', 'suc', get_name(track_id), ['source-connections', 'none', null, null]]]);
}
exports.listTrackingPlanSourceConnections = listTrackingPlanSourceConnections;
async function listAllTrackingPlanSourceConnectionss(token, work_id, track_id) {
    let page = {};
    let connections = {
        connections: []
    };
    while (true) {
        let result = await listTrackingPlanSourceConnections(token, work_id, track_id, page);
        connections.connections = connections.connections.concat(result.connections);
        if (result.next_page_token) {
            page = {
                page_token: result.next_page_token
            };
        }
        else {
            break;
        }
    }
    return connections;
}
exports.listAllTrackingPlanSourceConnectionss = listAllTrackingPlanSourceConnectionss;
function deleteTrackingPlanSourceConnection(token, work_id, track_id, src_id) {
    return r.request(token, ['workspaces', 'delete', 'suc', work_id, {}, {}, ['tracking-plans', 'suc', get_name(track_id), ['source-connections', 'suc', get_name(src_id), null]]]);
}
exports.deleteTrackingPlanSourceConnection = deleteTrackingPlanSourceConnection;
//# sourceMappingURL=config_api.js.map