import { JSONSchema7 } from 'json-schema';
export declare type R<I extends Input> = Promise<Schema<I>>;
export declare type Method = Post | Get | Delete | Patch | Put;
export declare type Get = 'get';
export declare type Delete = 'delete';
export declare type Patch = 'patch';
export declare type Post = 'post';
export declare type Put = 'put';
export declare type Schema<I extends Input> = I extends ListCatalogSources ? {
    sources: SourceCatalogModel[];
    next_page_token?: string;
} : I extends GetCatalogSource ? SourceCatalogModel : I extends ListCatalogDestinations ? {
    destinations: DestinationCatalogModel[];
    next_page_token?: string;
} : I extends GetCatalogDestination ? DestinationConfig : I extends GetWorkspace ? Workspace : I extends CreateSource ? Source : I extends GetSource ? Source & {
    display_name: string;
} : I extends ListSources ? {
    sources: (Source & {
        display_name: string;
    })[];
    next_page_token?: string;
} : I extends GetSchemaConfiguration ? {
    [key: string]: JSON;
} : I extends UpdateSchemaConfiguration ? {
    [key: string]: JSON;
} : I extends DeleteSource ? {} : I extends CreateDestination ? DestinationConfig : I extends GetDestination ? DestinationConfig : I extends ListDestinations ? {
    destinations: DestinationConfig['destination'][];
    next_page_token?: string;
} : I extends UpdateDestination ? DestinationConfig : I extends CreateTrackingPlan ? TrackingPlan : I extends GetTrackingPlan ? TrackingPlan : I extends ListTrackingPlans ? {
    tracking_plans: TrackingPlan[];
    next_page_token?: string;
} : I extends UpdateTrackingPlan ? TrackingPlan : I extends ListFilters ? {
    filters: (Filter & {
        name: string;
    })[];
    next_page_token?: string;
} : I extends GetFilter ? (Filter & {
    name: string;
}) : I extends CreateFilter ? Filter & {
    name: string;
} : I extends UpdateFilter ? {
    filter: Filter & {
        name: string;
    };
} : I extends DeleteFilter ? {} : I extends BatchTrackingPlanSourceConnection ? {
    connections: TrackingPlanSourceConnectionResult[];
} : I extends CreateTrackingPlanSourceConnection ? {
    connection: TrackingPlanSourceConnectionResult;
} : I extends ListTrackingPlanSourceConnections ? {
    connections: TrackingPlanSourceConnectionResult[];
    next_page_token?: string;
} : I extends DeleteTrackingPlanSourceConnection ? {} : I extends DeleteTrackingPlan ? {} : I extends CreateFunction ? FunctionResponse : I extends GetFunction ? FunctionResponse : I extends UpdateFunction ? FunctionResponse : I extends DeleteFunction ? {} : I extends ListFunctions ? {
    functions: FunctionResponse[];
    next_page_token?: string;
} : I extends PreviewFunction ? InvokeFunctionResponse : I extends DeployFunction ? {} : I extends IsLatestFunction ? {
    is_latest: boolean;
} : never;
export declare type InvokeFunctionResponse = {
    invoke: {
        success: boolean;
        output: string;
        error_reason: string | null;
    };
    logs: {
        message: string;
        created_at: string;
    }[];
    logs_truncated: boolean;
    session_id: string;
};
export declare type FunctionResponse = {
    code: string;
    buildpack: string;
    id: string;
    workspace_id: string;
    display_name: string;
    created_at: string;
    created_by: string;
};
export declare type SourceCatalogModel = {
    categories: string[];
    description: string;
    display_name: string;
    name: string;
};
export declare type DestinationCatalogModel = {
    categories: string[];
    components: Component[];
    description: string;
    display_name: string;
    name: string;
    website?: string;
    type: 'STREAMING';
    status: 'PUBLIC' | 'PRIVATE';
    settings: JSON[];
    logos: {
        [name: string]: string;
    };
};
export declare type Workspace = {
    name: string;
    display_name: string;
    id: string;
    create_time: Date;
};
export declare type Source = {
    name: string;
    parent: string;
    catalog_name: string;
    write_keys: string[];
    library_config: {
        [key: string]: JSON;
    };
    create_time: Date;
    labels: {
        [key: string]: string;
    };
    id: string;
};
export declare type Component = {
    type: 'IOS' | 'ANDROID' | 'CLOUD' | 'WEB';
};
export declare type IDLoc = Pre | Suc | None;
export declare type Pre = 'pre';
export declare type Suc = 'suc';
export declare type None = 'none';
export declare type ConnectionMode = 'UNSPECIFIED' | 'CLOUD' | 'DEVICE';
export declare type Page = {
    page_size?: number;
    page_token?: string;
};
export declare type ConfigValue = {
    name: string;
} & ({
    type: 'string' | 'password' | 'color';
    value: string;
} | {
    type: 'boolean';
    value: boolean;
} | {
    type: 'map';
    value: {
        [k: string]: string;
    };
} | {
    type: 'number';
    value: number;
} | {
    type: 'list';
    value: string[];
} | {
    type: 'mixed';
    value: any;
});
export declare type DestinationConfig = {
    destination: {
        name: string;
        config: ConfigValue[];
        enabled: boolean;
        connection_mode: ConnectionMode;
    };
};
export declare type TrackingPlanCreation = {
    display_name: string;
    rules: {
        events?: RuleMetadata[];
        global?: JSONSchema7;
        identify?: JSONSchema7;
        group?: JSONSchema7;
    };
};
export declare type TrackingPlan = TrackingPlanCreation & {
    name: string;
    create_time: Date;
    update_time: Date;
};
export interface RuleMetadata {
    name: string;
    description?: string;
    rules: JSONSchema7;
    version?: number;
}
export declare type CreateSourceConfig = {
    name: string;
    catalog_name: string;
};
export declare type UpdateSchemaConfig = {
    schema_config: {};
    update_mask: {};
};
export declare type Input = ListCatalogSources | GetCatalogSource | ListCatalogDestinations | GetCatalogDestination | GetWorkspace | CreateSource | GetSource | ListSources | GetSchemaConfiguration | UpdateSchemaConfiguration | DeleteSource | CreateDestination | GetDestination | ListDestinations | UpdateDestination | DeleteDestination | CreateTrackingPlan | GetTrackingPlan | UpdateTrackingPlan | DeleteTrackingPlan | ListTrackingPlans | ListFilters | GetFilter | CreateFilter | UpdateFilter | DeleteFilter | BatchTrackingPlanSourceConnection | CreateTrackingPlanSourceConnection | ListTrackingPlanSourceConnections | DeleteTrackingPlanSourceConnection | CreateFunction | GetFunction | UpdateFunction | DeleteFunction | ListFunctions | PreviewFunction | DeployFunction | IsLatestFunction;
export declare type NestedInput = null | [string, IDLoc, string | null, NestedInput];
export declare type Prefix = 'catalog' | 'workspaces';
export declare type Suffix = 'sources' | 'destinations' | 'tracking-plans' | 'schema-config';
export declare type ListCatalogSources = ['catalog/sources', Get, None, null, {}, Page, null];
export declare type GetCatalogSource = ['catalog/sources', Get, Suc, string, {}, {}, null];
export declare type ListCatalogDestinations = ['catalog/destinations', Get, None, null, {}, Page, null];
export declare type GetCatalogDestination = ['catalog/destinations', Get, Suc, string, {}, {}, null];
export declare type GetWorkspace = ['workspaces', Get, Suc, string, {}, {}, null];
export declare type CreateSource = ['workspaces', Post, Suc, string, {
    source: CreateSourceConfig;
}, {}, ['sources', None, null, null]];
export declare type GetSource = ['workspaces', Get, Suc, string, {}, {}, ['sources', Suc, string, null]];
export declare type ListSources = ['workspaces', Get, Suc, string, {}, Page, ['sources', None, null, null]];
export declare type GetSchemaConfiguration = ['workspaces', Get, Suc, string, {}, {}, ['sources', Suc, string, ['schema-config', None, null, null]]];
export declare type UpdateSchemaConfiguration = ['workspaces', Patch, Suc, string, UpdateSchemaConfig, {}, ['sources', Suc, string, ['schema-config', None, null, null]]];
export declare type DeleteSource = ['workspaces', Delete, Suc, string, {}, {}, ['sources', Suc, string, null]];
export declare type CreateDestination = ['workspaces', Post, Suc, string, DestinationConfig, {}, ['sources', Suc, string, ['destinations', None, null, null]]];
export declare type GetDestination = ['workspaces', Get, Suc, string, {}, {}, ['sources', Suc, string, ['destinations', Suc, string, null]]];
export declare type ListDestinations = ['workspaces', Get, Suc, string, {}, Page, ['sources', Suc, string, ['destinations', None, null, null]]];
export declare type UpdateDestination = ['workspaces', Patch, Suc, string, DestinationConfig, {}, ['sources', Suc, string, ['destinations', Suc, string, null]]];
export declare type DeleteDestination = ['workspaces', Delete, Suc, string, {}, {}, ['sources', Suc, string, ['destinations', Suc, string, null]]];
export declare type CreateTrackingPlan = ['workspaces', Post, Suc, string, {
    tracking_plan: TrackingPlanCreation;
}, {}, ['tracking-plans', None, null, null]];
export declare type GetTrackingPlan = ['workspaces', Get, Suc, string, {}, {}, ['tracking-plans', Suc, string, null]];
export declare type ListTrackingPlans = ['workspaces', Get, Suc, string, {}, Page, ['tracking-plans', None, null, null]];
export declare type UpdateTrackingPlan = ['workspaces', Put, Suc, string, UpdateTrackingPlanConfig, {}, ['tracking-plans', Suc, string, null]];
export declare type DeleteTrackingPlan = ['workspaces', Delete, Suc, string, {}, {}, ['tracking-plans', Suc, string, null]];
export declare type ListTrackingPlanSourceConnections = ['workspaces', Get, Suc, string, {}, Page, ['tracking-plans', Suc, string, ['source-connections', None, null, null]]];
export declare type BatchTrackingPlanSourceConnection = ['workspaces', Post, Suc, string, {
    'source_names': string[];
}, {}, ['tracking-plans', Suc, string, ['source-connections:batchCreateConnections', None, null, null]]];
export declare type CreateTrackingPlanSourceConnection = ['workspaces', Post, Suc, string, {
    'source_name': string;
}, {}, ['tracking-plans', Suc, string, ['source-connections', None, null, null]]];
export declare type DeleteTrackingPlanSourceConnection = ['workspaces', Delete, Suc, string, {}, {}, ['tracking-plans', Suc, string, ['source-connections', Suc, string, null]]];
export declare type ListFilters = ['workspaces', Get, Suc, string, {}, Page, ['sources', Suc, string, ['destinations', Suc, string, ['filters', None, null, null]]]];
export declare type GetFilter = ['workspaces', Get, Suc, string, {}, {}, ['sources', Suc, string, ['destinations', Suc, string, ['filters', Suc, string, null]]]];
export declare type CreateFilter = ['workspaces', Post, Suc, string, {
    filter: Filter;
}, {}, ['sources', Suc, string, ['destinations', Suc, string, ['filters', None, null, null]]]];
export declare type UpdateFilter = ['workspaces', Patch, Suc, string, FilterUpdate, {}, ['sources', Suc, string, ['destinations', Suc, string, ['filters', Suc, string, null]]]];
export declare type DeleteFilter = ['workspaces', Post, Suc, string, {}, {}, ['sources', Suc, string, ['destinations', Suc, string, ['filters', Suc, string, null]]]];
export declare type CreateFunction = ['workspaces', Post, Suc, string, CreateFunctionBody, CreateFunctionArgs, ['functions', None, null, null]];
export declare type GetFunction = ['workspaces', Get, Suc, string, {}, {}, ['functions', Suc, string, null]];
export declare type UpdateFunction = ['workspaces', Patch, Suc, string, UpdateFunctionBody, {}, ['functions', Suc, string, null]];
export declare type DeleteFunction = ['workspaces', Delete, Suc, string, {}, {}, ['functions', Suc, string, null]];
export declare type ListFunctions = ['workspaces', Get, Suc, string, {}, ListFunctionsArgs, ['functions', None, null, null]];
export declare type PreviewFunction = ['workspaces', Post, Suc, string, PreviewFunctionBody, CreateFunctionArgs, ['functions', None, null, ['preview', None, null, null]]];
export declare type DeployFunction = ['workspaces', Post, Suc, string, {}, {}, ['functions', Suc, string, ['deploy', None, null, null]]];
export declare type IsLatestFunction = ['workspaces', Get, Suc, string, {}, {}, ['functions', Suc, string, ['is-latest-version', None, null, null]]];
export declare type CreateFunctionArgs = {
    type: 'SOURCE' | 'DESTINATION';
};
export declare type FunctionBody = {
    code: string;
    buildpack: 'boreal';
    settings?: {
        name: string;
        label: string;
        type: 'string' | 'boolean' | 'text-map' | 'array';
        description?: string;
        required?: boolean;
        sensitive?: boolean;
    }[];
};
export declare type CreateFunctionBody = {
    function: FunctionBody & {
        display_name: string;
    };
};
export declare type UpdateFunctionBody = {
    function: FunctionBody;
    update_mask: {
        paths: ('function.code' | 'function.buildpack' | 'function.settings')[];
    };
};
export declare type ListFunctionsArgs = {
    type: 'SOURCE' | 'DESTINATION';
    page_size?: number;
    page_token?: string;
};
export declare type PreviewFunctionBody = {
    function: FunctionBody;
    payload: string;
    session_id?: string;
};
export declare type TrackingPlanSourceConnectionResult = {
    source_name: string;
    tracking_plan_id: string;
};
export declare type UpdateTrackingPlanConfig = {
    update_mask: {
        paths: ('tracking_plan.display_name' | 'tracking_plan.rules' | 'tracking_plan.rules.events' | 'tracking_plan.rules.global' | 'tracking_plan.rules.identify' | 'tracking_plan.rules.group')[];
    };
    tracking_plan: Partial<TrackingPlanCreation>;
};
export declare type Filter = {
    title: string;
    if: string;
    actions: ({
        type: 'drop_event';
    } | {
        type: 'sample_event';
        percent: number;
        path?: string;
    } | {
        type: 'whitelist_fields';
        fields: {
            [k: string]: {
                field: string[];
            };
        };
    } | {
        type: 'blacklist_fields';
        fields: {
            [k: string]: {
                field: string[];
            };
        };
    })[];
    enabled: boolean;
};
export declare type FilterUpdate = {
    filter: Filter;
    update_mask: {
        paths: ('if' | 'title' | 'actions')[];
    };
};
export declare function request<I extends Input>(token: string, input: I): Promise<Schema<I>>;
