import * as r from './config_request';
export declare function listCatalogSources(token: string, page?: r.Page): r.R<r.ListCatalogSources>;
export declare function listAllCatalogSources(token: string): r.R<r.ListCatalogSources>;
export declare function getCatalogSource(token: string, id: string): r.R<r.GetCatalogSource>;
export declare function listCatalogDestinations(token: string, page?: r.Page): r.R<r.ListCatalogDestinations>;
export declare function listAllCatalogDestinations(token: string): r.R<r.ListCatalogDestinations>;
export declare function getCatalogDestination(token: string, id: string): r.R<r.GetCatalogDestination>;
export declare function getWorkspace(token: string, work_slug: string): r.R<r.GetWorkspace>;
export declare function createSource(token: string, work_slug: string, source: r.CreateSourceConfig): r.R<r.CreateSource>;
export declare function getSource(token: string, work_slug: string, src_id: string): r.R<r.GetSource>;
export declare function listSources(token: string, work_slug: string, page?: r.Page): r.R<r.ListSources>;
export declare function listAllSources(token: string, work_slug: string): r.R<r.ListSources>;
export declare function getSchemaConfiguration(token: string, work_slug: string, src_id: string): r.R<r.GetSchemaConfiguration>;
export declare function updateSchemaConfiguration(token: string, work_slug: string, src_id: string, schema_config: r.UpdateSchemaConfig): r.R<r.UpdateSchemaConfiguration>;
export declare function deleteSource(token: string, work_slug: string, src_id: string): r.R<r.DeleteSource>;
export declare function createDestination(token: string, work_slug: string, src_id: string, config: r.DestinationConfig): r.R<r.CreateDestination>;
export declare function getDestination(token: string, work_slug: string, src_id: string, dest_id: string): r.R<r.GetDestination>;
export declare function listDestinations(token: string, work_slug: string, src_id: string, page?: r.Page): r.R<r.ListDestinations>;
export declare function listAllDestinations(token: string, work_slug: string, src_id: string): r.R<r.ListDestinations>;
export declare function updateDestination(token: string, work_slug: string, src_id: string, dest_id: string, config: r.DestinationConfig): r.R<r.UpdateDestination>;
export declare function deleteDestination(token: string, work_slug: string, src_id: string, dest_id: string): r.R<r.DeleteDestination>;
export declare function createTrackingPlan(token: string, work_slug: string, config: r.TrackingPlanCreation): r.R<r.CreateTrackingPlan>;
export declare function getTrackingPlan(token: string, work_slug: string, track_id: string): r.R<r.GetTrackingPlan>;
export declare function updateTrackingPlan(token: string, work_slug: string, track_id: string, config: r.UpdateTrackingPlanConfig): r.R<r.UpdateTrackingPlan>;
export declare function listTrackingPlans(token: string, work_slug: string, page?: r.Page): r.R<r.ListTrackingPlans>;
export declare function listAllTrackingPlans(token: string, work_slug: string): r.R<r.ListTrackingPlans>;
export declare function deleteTrackingPlan(token: string, work_slug: string, track_id: string): r.R<r.DeleteTrackingPlan>;
export declare function listFilters(token: string, work_slug: string, src_id: string, dest_id: string, page?: r.Page): r.R<r.ListFilters>;
export declare function listAllFilters(token: string, work_slug: string, src_id: string, dest_id: string): r.R<r.ListFilters>;
export declare function getFilter(token: string, work_slug: string, src_id: string, dest_id: string, filter_id: string): r.R<r.GetFilter>;
export declare function createFilter(token: string, work_slug: string, src_id: string, dest_id: string, config: r.Filter): r.R<r.CreateFilter>;
export declare function updateFilter(token: string, work_slug: string, src_id: string, dest_id: string, filter_id: string, config: r.FilterUpdate): r.R<r.UpdateFilter>;
export declare function deleteFilter(token: string, work_slug: string, src_id: string, dest_id: string, filter_id: string): r.R<r.DeleteFilter>;
export declare function batchTrackingPlanSourceConnection(token: string, work_slug: string, track_id: string, src_ids: string[]): r.R<r.BatchTrackingPlanSourceConnection>;
export declare function createTrackingPlanSourceConnection(token: string, work_slug: string, track_id: string, src_id: string): r.R<r.CreateTrackingPlanSourceConnection>;
export declare function listTrackingPlanSourceConnections(token: string, work_slug: string, track_id: string, page?: r.Page): r.R<r.ListTrackingPlanSourceConnections>;
export declare function listAllTrackingPlanSourceConnectionss(token: string, work_slug: string, track_id: string): r.R<r.ListTrackingPlanSourceConnections>;
export declare function deleteTrackingPlanSourceConnection(token: string, work_slug: string, track_id: string, src_id: string): r.R<r.DeleteTrackingPlanSourceConnection>;
export declare function createFunction(token: string, work_id: string, type: r.CreateFunctionArgs['type'], body: r.CreateFunctionBody['function']): r.R<r.CreateFunction>;
export declare function getFunction(token: string, work_id: string, function_id: string): r.R<r.GetFunction>;
export declare function updateFunction(token: string, work_id: string, function_id: string, body: r.UpdateFunctionBody): r.R<r.UpdateFunction>;
export declare function deleteFunction(token: string, work_id: string, function_id: string): r.R<r.DeleteFunction>;
export declare function listFunctions(token: string, work_id: string, args: r.ListFunctionsArgs): r.R<r.ListFunctions>;
export declare function previewSrcFunction(token: string, work_id: string, body: Omit<r.PreviewFunctionBody, 'payload'>, payload: SrcPreviewPayload): r.R<r.PreviewFunction>;
export declare function previewDestFunction(token: string, work_id: string, body: Omit<r.PreviewFunctionBody, 'payload'>, payload: DestPreviewPayload): r.R<r.PreviewFunction>;
export declare type SrcPreviewPayload = {
    payload: {
        body: object | string;
        headers: {
            [key: string]: string[];
        };
        queryParameters: {
            [key: string]: string | boolean | string[] | {
                [key: string]: string;
            };
        };
    };
};
export declare type DestPreviewPayload = SegmentTrackEvent | SegmentIdentifyEvent | SegmentScreenEvent | SegmentPageEvent | SegmentAliasEvent | SegmentGroupEvent;
export declare function deployFunction(token: string, work_id: string, function_id: string): r.R<r.DeployFunction>;
export declare function isLatestFunction(token: string, work_id: string, function_id: string): r.R<r.IsLatestFunction>;
