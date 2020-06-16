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
function get_src_id(work_slug, src_id) {
    return src_id.indexOf('workspaces/') == -1 ? `workspaces/${work_slug}/sources/${src_id}` : src_id;
}
function get_dest_id(work_slug, src_id, dest_id) {
    return dest_id.indexOf('workspaces/') == -1 ? `workspaces/${work_slug}/sources/${get_name(src_id)}/destinations/${dest_id}` : dest_id;
}
function get_config_key(work_slug, src_id, dest_id, config_key) {
    return config_key.indexOf('workspaces/') == -1 ? `workspaces/${work_slug}/sources/${get_name(src_id)}/destinations/${get_name(dest_id)}/config/${config_key}` : config_key;
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
function getWorkspace(token, work_slug) {
    return r.request(token, ['workspaces', 'get', 'suc', work_slug, {}, {}, null]);
}
exports.getWorkspace = getWorkspace;
function createSource(token, work_slug, source) {
    return r.request(token, ['workspaces', 'post', 'suc', work_slug, {
            source: {
                catalog_name: get_catalog_name(source.catalog_name),
                name: get_src_id(work_slug, source.name)
            }
        }, {}, ['sources', 'none', null, null]]);
}
exports.createSource = createSource;
function getSource(token, work_slug, src_id) {
    return r.request(token, ['workspaces', 'get', 'suc', work_slug, {}, {}, ['sources', 'suc', get_name(src_id), null]]);
}
exports.getSource = getSource;
function listSources(token, work_slug, page) {
    return r.request(token, ['workspaces', 'get', 'suc', work_slug, {}, page || {}, ['sources', 'none', null, null]]);
}
exports.listSources = listSources;
async function listAllSources(token, work_slug) {
    let page = {};
    let sources = {
        sources: []
    };
    while (true) {
        let result = await listSources(token, work_slug, page);
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
function getSchemaConfiguration(token, work_slug, src_id) {
    return r.request(token, ['workspaces', 'get', 'suc', work_slug, {}, {}, ['sources', 'suc', get_name(src_id), ['schema-config', 'none', null, null]]]);
}
exports.getSchemaConfiguration = getSchemaConfiguration;
function updateSchemaConfiguration(token, work_slug, src_id, schema_config) {
    return r.request(token, ['workspaces', 'patch', 'suc', work_slug, schema_config, {}, ['sources', 'suc', get_name(src_id), ['schema-config', 'none', null, null]]]);
}
exports.updateSchemaConfiguration = updateSchemaConfiguration;
function deleteSource(token, work_slug, src_id) {
    return r.request(token, ['workspaces', 'delete', 'suc', work_slug, {}, {}, ['sources', 'suc', get_name(src_id), null]]);
}
exports.deleteSource = deleteSource;
function createDestination(token, work_slug, src_id, config) {
    let _config = Object.assign({}, config);
    let dest_id = config.destination.name;
    _config.destination.name = get_dest_id(work_slug, src_id, dest_id);
    _config.destination.config = _config.destination.config.map(config => {
        let _config = Object.assign({}, config);
        _config.name = get_config_key(work_slug, src_id, dest_id, config.name);
        return _config;
    });
    return r.request(token, ['workspaces', 'post', 'suc', work_slug, _config, {}, ['sources', 'suc', get_name(src_id), ['destinations', 'none', null, null]]]);
}
exports.createDestination = createDestination;
function getDestination(token, work_slug, src_id, dest_id) {
    return r.request(token, ['workspaces', 'get', 'suc', work_slug, {}, {}, ['sources', 'suc', get_name(src_id), ['destinations', 'suc', get_name(dest_id), null]]]);
}
exports.getDestination = getDestination;
function listDestinations(token, work_slug, src_id, page) {
    return r.request(token, ['workspaces', 'get', 'suc', work_slug, {}, page || {}, ['sources', 'suc', get_name(src_id), ['destinations', 'none', null, null]]]);
}
exports.listDestinations = listDestinations;
async function listAllDestinations(token, work_slug, src_id) {
    let page = {};
    let destinations = {
        destinations: []
    };
    while (true) {
        let result = await listDestinations(token, work_slug, src_id, page);
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
function updateDestination(token, work_slug, src_id, dest_id, config) {
    return r.request(token, ['workspaces', 'patch', 'suc', work_slug, config, {}, ['sources', 'suc', get_name(src_id), ['destinations', 'suc', get_name(dest_id), null]]]);
}
exports.updateDestination = updateDestination;
function deleteDestination(token, work_slug, src_id, dest_id) {
    return r.request(token, ['workspaces', 'delete', 'suc', work_slug, {}, {}, ['sources', 'suc', get_name(src_id), ['destinations', 'suc', get_name(dest_id), null]]]);
}
exports.deleteDestination = deleteDestination;
function createTrackingPlan(token, work_slug, config) {
    return r.request(token, ['workspaces', 'post', 'suc', work_slug, { tracking_plan: config }, {}, ['tracking-plans', 'none', null, null]]);
}
exports.createTrackingPlan = createTrackingPlan;
function getTrackingPlan(token, work_slug, track_id) {
    return r.request(token, ['workspaces', 'get', 'suc', work_slug, {}, {}, ['tracking-plans', 'suc', get_name(track_id), null]]);
}
exports.getTrackingPlan = getTrackingPlan;
function updateTrackingPlan(token, work_slug, track_id, config) {
    return r.request(token, ['workspaces', 'put', 'suc', work_slug, config, {}, ['tracking-plans', 'suc', get_name(track_id), null]]);
}
exports.updateTrackingPlan = updateTrackingPlan;
function listTrackingPlans(token, work_slug, page) {
    return r.request(token, ['workspaces', 'get', 'suc', work_slug, {}, page || {}, ['tracking-plans', 'none', null, null]]);
}
exports.listTrackingPlans = listTrackingPlans;
async function listAllTrackingPlans(token, work_slug) {
    let page = {};
    let tracking_plans = {
        tracking_plans: []
    };
    while (true) {
        let result = await listTrackingPlans(token, work_slug, page);
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
function deleteTrackingPlan(token, work_slug, track_id) {
    return r.request(token, ['workspaces', 'delete', 'suc', work_slug, {}, {}, ['tracking-plans', 'suc', get_name(track_id), null]]);
}
exports.deleteTrackingPlan = deleteTrackingPlan;
function listFilters(token, work_slug, src_id, dest_id, page) {
    return r.request(token, ['workspaces', 'get', 'suc', work_slug, {}, page || {}, ['sources', 'suc', get_name(src_id), ['destinations', 'suc', get_name(dest_id), ['filters', 'none', null, null]]]]);
}
exports.listFilters = listFilters;
async function listAllFilters(token, work_slug, src_id, dest_id) {
    let page = {};
    let filters = {
        filters: []
    };
    while (true) {
        let result = await listFilters(token, work_slug, src_id, dest_id, page);
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
function getFilter(token, work_slug, src_id, dest_id, filter_id) {
    return r.request(token, ['workspaces', 'get', 'suc', work_slug, {}, {}, ['sources', 'suc', get_name(src_id), ['destinations', 'suc', get_name(dest_id), ['filters', 'suc', get_name(filter_id), null]]]]);
}
exports.getFilter = getFilter;
function createFilter(token, work_slug, src_id, dest_id, config) {
    return r.request(token, ['workspaces', 'post', 'suc', work_slug, { filter: config }, {}, ['sources', 'suc', get_name(src_id), ['destinations', 'suc', get_name(dest_id), ['filters', 'none', null, null]]]]);
}
exports.createFilter = createFilter;
function updateFilter(token, work_slug, src_id, dest_id, filter_id, config) {
    return r.request(token, ['workspaces', 'patch', 'suc', work_slug, config, {}, ['sources', 'suc', get_name(src_id), ['destinations', 'suc', get_name(dest_id), ['filters', 'suc', get_name(filter_id), null]]]]);
}
exports.updateFilter = updateFilter;
function deleteFilter(token, work_slug, src_id, dest_id, filter_id) {
    return r.request(token, ['workspaces', 'get', 'suc', work_slug, {}, {}, ['sources', 'suc', get_name(src_id), ['destinations', 'suc', get_name(dest_id), ['filters', 'suc', get_name(filter_id), null]]]]);
}
exports.deleteFilter = deleteFilter;
function batchTrackingPlanSourceConnection(token, work_slug, track_id, src_ids) {
    return r.request(token, ['workspaces', 'post', 'suc', work_slug, { source_names: src_ids.map(src_id => get_src_id(work_slug, src_id)) }, {}, ['tracking-plans', 'suc', get_name(track_id), ['source-connections:batchCreateConnections', 'none', null, null]]]);
}
exports.batchTrackingPlanSourceConnection = batchTrackingPlanSourceConnection;
function createTrackingPlanSourceConnection(token, work_slug, track_id, src_id) {
    return r.request(token, ['workspaces', 'post', 'suc', work_slug, { source_name: get_src_id(work_slug, src_id) }, {}, ['tracking-plans', 'suc', get_name(track_id), ['source-connections', 'none', null, null]]]);
}
exports.createTrackingPlanSourceConnection = createTrackingPlanSourceConnection;
function listTrackingPlanSourceConnections(token, work_slug, track_id, page) {
    return r.request(token, ['workspaces', 'get', 'suc', work_slug, {}, page || {}, ['tracking-plans', 'suc', get_name(track_id), ['source-connections', 'none', null, null]]]);
}
exports.listTrackingPlanSourceConnections = listTrackingPlanSourceConnections;
async function listAllTrackingPlanSourceConnectionss(token, work_slug, track_id) {
    let page = {};
    let connections = {
        connections: []
    };
    while (true) {
        let result = await listTrackingPlanSourceConnections(token, work_slug, track_id, page);
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
function deleteTrackingPlanSourceConnection(token, work_slug, track_id, src_id) {
    return r.request(token, ['workspaces', 'delete', 'suc', work_slug, {}, {}, ['tracking-plans', 'suc', get_name(track_id), ['source-connections', 'suc', get_name(src_id), null]]]);
}
exports.deleteTrackingPlanSourceConnection = deleteTrackingPlanSourceConnection;
function createFunction(token, work_id, type, body) {
    return r.request(token, ['workspaces', 'post', 'suc', work_id, { function: body }, { type }, ['functions', 'none', null, null]]);
}
exports.createFunction = createFunction;
function getFunction(token, work_id, function_id) {
    return r.request(token, ['workspaces', 'get', 'suc', work_id, {}, {}, ['functions', 'suc', function_id, null]]);
}
exports.getFunction = getFunction;
function updateFunction(token, work_id, function_id, body) {
    return r.request(token, ['workspaces', 'patch', 'suc', work_id, body, {}, ['functions', 'suc', function_id, null]]);
}
exports.updateFunction = updateFunction;
function deleteFunction(token, work_id, function_id) {
    return r.request(token, ['workspaces', 'delete', 'suc', work_id, {}, {}, ['functions', 'suc', function_id, null]]);
}
exports.deleteFunction = deleteFunction;
function listFunctions(token, work_id, args) {
    return r.request(token, ['workspaces', 'get', 'suc', work_id, {}, args, ['functions', 'none', null, null]]);
}
exports.listFunctions = listFunctions;
function previewSrcFunction(token, work_id, body, payload) {
    return r.request(token, ['workspaces', 'post', 'suc', work_id, Object.assign(Object.assign({}, body), { payload: JSON.stringify(payload) }), { type: 'SOURCE' }, ['functions', 'none', null, ['preview', 'none', null, null]]]);
}
exports.previewSrcFunction = previewSrcFunction;
function previewDestFunction(token, work_id, body, payload) {
    return r.request(token, ['workspaces', 'post', 'suc', work_id, Object.assign(Object.assign({}, body), { payload: JSON.stringify(payload) }), { type: 'DESTINATION' }, ['functions', 'none', null, ['preview', 'none', null, null]]]);
}
exports.previewDestFunction = previewDestFunction;
function deployFunction(token, work_id, function_id) {
    return r.request(token, ['workspaces', 'post', 'suc', work_id, {}, {}, ['functions', 'suc', function_id, ['deploy', 'none', null, null]]]);
}
exports.deployFunction = deployFunction;
function isLatestFunction(token, work_id, function_id) {
    return r.request(token, ['workspaces', 'get', 'suc', work_id, {}, {}, ['functions', 'suc', function_id, ['is-latest-version', 'none', null, null]]]);
}
exports.isLatestFunction = isLatestFunction;
//# sourceMappingURL=config_api.js.map